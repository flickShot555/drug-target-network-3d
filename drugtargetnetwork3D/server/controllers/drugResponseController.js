// server/controllers/drugResponseController.js
// ESM module — expects server/mongo.js to export connectToDatabase() and getDb()
const { getDb } = require('../mongo.js');

/**
 * Normalize request body keys that might be posted as "key" or "key[]"
 */
const normFactory = (body) => (key) => body[key];

/**
 * Convert various input shapes into an array of non-empty strings.
 */
const asArray = (val) => Array.isArray(val) ? val : (val ? [val] : []);

/**
 * Main search handler — MongoDB version of original SQL-based search.
 */
async function search(req, res) {
  try {
    const body = req.body || {};
    const norm = normFactory(body);

    // Read inputs (supports key and key[])
    const pic50 = norm('pic50') ?? norm('pic50[]');
    const rawCountIncrement = norm('count_increment') ?? norm('count_increment[]');

    const Chembl_id1 = asArray(norm('Chembl_id1'));
    const MaxPhase1 = asArray(norm('MaxPhase1'));
    const oncotree_change1 = asArray(norm('oncotree_change1'));
    const DataPlatform = asArray(norm('DataPlatform'));
    const disease_class1 = asArray(norm('disease_class1'));
    const compound_class1 = asArray(norm('compound_class1'));

    // Defensive: cap very large IN lists
    const MAX_IN_SIZE = 2000;
    const cap = (arr) => (arr && arr.length > MAX_IN_SIZE) ? arr.slice(0, MAX_IN_SIZE) : arr;

    const chemIds = cap(Chembl_id1);
    const maxPhases = cap(MaxPhase1);
    const lineages = cap(oncotree_change1);
    const platforms = cap(DataPlatform);
    const diseaseClasses = cap(disease_class1);
    const compoundClasses = cap(compound_class1);

    const count_increment = parseInt(rawCountIncrement || '1', 10) || 1;
    const limit = Math.max(1, 2000 * count_increment);

    // Build base match
    const baseMatch = {};
    if (chemIds.length) baseMatch.ONCOTREE_PRIMARY_DISEASE = { $in: chemIds };
    if (maxPhases.length) baseMatch.MAX_PHASE = { $in: maxPhases };
    if (lineages.length) baseMatch.ONCOTREE_LINEAGE = { $in: lineages };
    if (platforms.length) baseMatch.DATASET = { $in: platforms };

    if (pic50 !== undefined && String(pic50).trim() !== '') {
      const num = parseFloat(pic50);
      if (!Number.isNaN(num)) {
        baseMatch.VALUE_num = { $gte: num };
      } else {
        console.warn('search: pic50 provided but not numeric:', pic50);
      }
    }

    if (count_increment === 1 && !baseMatch.MAX_PHASE) {
      baseMatch.MAX_PHASE = { $nin: ['Preclinical', 'Unknown'] };
    }

    // Build aggregation pipeline
    const pipeline = [
      { $addFields: { VALUE_num: { $convert: { input: '$VALUE', to: 'double', onError: null, onNull: null } } } }
    ];

    if (Object.keys(baseMatch).length) pipeline.push({ $match: baseMatch });

    pipeline.push(
      {
        $lookup: {
          from: 'compounds_updated1',
          localField: 'COMPOUND_NAME',
          foreignField: 'COMPOUND_NAME',
          as: 'compound_info'
        }
      },
      { $unwind: { path: '$compound_info', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'drug_disease_sorteds',
          localField: 'compound_info.INCHI_KEY',
          foreignField: 'INCHI_KEY',
          as: 'disease_info'
        }
      },
      { $unwind: { path: '$disease_info', preserveNullAndEmptyArrays: true } }
    );

    const postJoinMatch = {};
    if (diseaseClasses.length) postJoinMatch['disease_info.Disease_class'] = { $in: diseaseClasses };
    if (compoundClasses.length) postJoinMatch['compound_info.COMPOUND_CLASS'] = { $in: compoundClasses };
    if (Object.keys(postJoinMatch).length) pipeline.push({ $match: postJoinMatch });

    pipeline.push(
      {
        $addFields: {
          INCHI_KEY: '$compound_info.INCHI_KEY',
          COMPOUND_CLASS: '$compound_info.COMPOUND_CLASS',
          Disease_class: '$disease_info.Disease_class',
          Disease_name: '$disease_info.Disease_name',
          Phase: '$disease_info.Phase'
        }
      },
      {
        $project: {
          drugresponse_id: 1,
          COMPOUND_NAME: 1,
          CELL_LINE_NAME: 1,
          VALUE: 1,
          VALUE_num: 1,
          METRIC: 1,
          DATASET: 1,
          Pubmed_ID: 1,
          PUBCHEM_ID: 1,
          CHEMBL_ID: 1,
          MAX_PHASE: 1,
          RRID: 1,
          ONCOTREE_LINEAGE: 1,
          ONCOTREE_PRIMARY_DISEASE: 1,
          created_at: 1,
          INCHI_KEY: 1,
          COMPOUND_CLASS: 1,
          Disease_class: 1,
          Disease_name: 1,
          Phase: 1
        }
      },
      { $sort: { created_at: -1, drugresponse_id: -1 } },
      { $limit: limit }
    );

    const db = getDb();
    const rows = await db.collection('drugResponse_sorted').aggregate(pipeline, { allowDiskUse: true }).toArray();

    return res.json(rows);
  } catch (err) {
    console.error('drugResponseController.search error:', err);
    return res.status(500).json({ ok: false, error: 'Server error' });
  }
}

// export in CommonJS
module.exports = { search };

