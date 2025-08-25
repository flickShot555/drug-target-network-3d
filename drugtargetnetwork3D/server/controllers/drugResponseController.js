// server/controllers/drugResponseController.js
import { execute } from '../db.js'; // ensure db.js exports execute that returns pool.execute promise

export async function search(req, res) {
  try {
    // We accept JSON, urlencoded, or multipart/form-data (handled by multer().none())
    const body = req.body || {};

    // If frontend appended arrays using keys like "Chembl_id1[]" (PHP style),
    // normalize so we can read either "Chembl_id1" or "Chembl_id1[]".
    const norm = (key) => {
      if (key in body) return body[key];
      const bracketKey = `${key}[]`;
      if (bracketKey in body) return body[bracketKey];
      return undefined;
    };

    const asArray = (v) => {
      if (v == null) return [];
      if (Array.isArray(v)) return v;
      if (typeof v === 'string') {
        if (v.includes(',')) return v.split(',').map(s => s.trim()).filter(Boolean);
        return [v];
      }
      return [v];
    };

    const pic50 = norm('pic50') ?? norm('pic50[]');
    const rawCountIncrement = norm('count_increment') ?? norm('count_increment[]');

    const Chembl_id1 = asArray(norm('Chembl_id1'));
    const MaxPhase1 = asArray(norm('MaxPhase1'));
    const oncotree_change1 = asArray(norm('oncotree_change1'));
    const DataPlatform = asArray(norm('DataPlatform'));
    const disease_class1 = asArray(norm('disease_class1'));
    const compound_class1 = asArray(norm('compound_class1'));

    const conditions = [];
    const params = [];

    let sql = `
      SELECT drugResponse_sorted.*,
             compounds_updated1.INCHI_KEY,
             compounds_updated1.COMPOUND_CLASS,
             drug_disease_sorted.Disease_class,
             drug_disease_sorted.Disease_name,
             drug_disease_sorted.Phase
      FROM drugResponse_sorted
      LEFT JOIN compounds_updated1 ON drugResponse_sorted.COMPOUND_NAME = compounds_updated1.COMPOUND_NAME
      LEFT JOIN drug_disease_sorted ON compounds_updated1.INCHI_KEY = drug_disease_sorted.INCHI_KEY
    `;

    const addInCondition = (col, arr) => {
      if (!arr || arr.length === 0) return;
      const placeholders = arr.map(() => '?').join(',');
      conditions.push(`${col} IN (${placeholders})`);
      arr.forEach(v => params.push(v));
    };

    addInCondition('drugResponse_sorted.ONCOTREE_PRIMARY_DISEASE', Chembl_id1);
    addInCondition('drugResponse_sorted.MAX_PHASE', MaxPhase1);

    if (pic50 !== undefined && pic50 !== null && String(pic50).trim() !== '') {
      const num = parseFloat(pic50);
      if (!Number.isNaN(num)) {
        conditions.push('VALUE >= ?');
        params.push(num);
      }
    }

    addInCondition('drugResponse_sorted.ONCOTREE_LINEAGE', oncotree_change1);
    addInCondition('drugResponse_sorted.DATASET', DataPlatform);
    addInCondition('drug_disease_sorted.Disease_class', disease_class1);
    addInCondition('compounds_updated1.COMPOUND_CLASS', compound_class1);

    const count_increment = parseInt(rawCountIncrement || '1', 10) || 1;

    if (conditions.length > 0) {
      if (count_increment === 1) {
        conditions.push(`drugResponse_sorted.MAX_PHASE NOT IN ('Preclinical','Unknown')`);
      }
      sql += ' WHERE ' + conditions.join(' AND ');
    } else {
      if (count_increment === 1) {
        sql += ` WHERE drugResponse_sorted.MAX_PHASE NOT IN ('Preclinical','Unknown')`;
      }
    }

    const limit = 2000 * count_increment;
    sql += ` LIMIT ?`;
    params.push(limit);

    // Execute (expect execute to return [rows, fields] like mysql2 pool.execute)
    const [rows] = await execute(sql, params);

    return res.json(rows);
  } catch (err) {
    console.error('search error', err);
    return res.status(500).json({ ok: false, error: 'Server error' });
  }
}
