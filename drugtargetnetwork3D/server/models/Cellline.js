const mongoose = require("mongoose");

const cellLineSchema = new mongoose.Schema({
  CELL_LINE_NAME: String,
  CELL_LINE_SYNONYM: String,
  RRID: String,
  COSMIC_ID: String,
  SANGER_MODEL_ID: String,
  Source_DB_CL_ID: String,
  TCGA_STUDY_CODE: String,
  ONCOTREE_CODE: String,
  ONCOTREE_LINEAGE: String,
  ONCOTREE_PRIMARY_DISEASE: String,
  CELLOSAURUS_DISEASE: String,
  CROSS_REFERENCES_CELL_LINES: String,
  REFERENCE_ID: String,
  COMMENTS: String,
});

module.exports = mongoose.model("CellLine", cellLineSchema);
