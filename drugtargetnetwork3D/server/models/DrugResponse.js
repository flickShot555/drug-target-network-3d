// server/models/DrugResponse.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const drugResponseSchema = new Schema({
  drugresponse_id: { type: String },
  COMPOUND_NAME: { type: String },
  CELL_LINE_NAME: { type: String },
  VALUE: { type: Number }, // convert in seeder where possible
  METRIC: { type: String },
  DATASET: { type: String },
  Pubmed_ID: { type: String },
  PUBCHEM_ID: { type: String },
  CHEMBL_ID: { type: String },
  MAX_PHASE: { type: String },
  RRID: { type: String },
  ONCOTREE_LINEAGE: { type: String },
  ONCOTREE_PRIMARY_DISEASE: { type: String },
  created_at: { type: Date }
}, {
  collection: 'drugResponse_sorted', // ensure collection name matches file name
  strict: false // allow extra fields if present
});

module.exports = mongoose.model('DrugResponseSorted', drugResponseSchema);
