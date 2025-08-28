// server/models/Compound.js
const mongoose = require("mongoose");

const compoundSchema = new mongoose.Schema({
  COMPOUND_id: String,
  COMPOUND_NAME: String,
  PREFERRED_COMPOUND_NAME: String,
  PUBCHEM_ID: String,
  CHEMBL_ID: String,
  MAX_PHASE: String,
  Source_DB_DR_ID: String,
  SMILES: String,
  INCHI_KEY: String,
  COMPOUND_CLASS: String,
  TARGETS: String, // You can make this [String] if you parse JSON properly
});

module.exports = mongoose.model("Compound", compoundSchema, "compounds_updated1");
