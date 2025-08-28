const mongoose = require("mongoose");

const drugDiseaseSortedSchema = new mongoose.Schema({
  disease_id: { type: String, required: true },
  Drug_name: { type: String, required: true },
  Disease_name: { type: String, required: true },
  Disease_class: { type: String, required: true },
  Phase: { type: String, required: true },
  Merged_RefNew: { type: String },   // optional link
  INCHI_KEY: { type: String },
  Disease_UML_CUI: { type: String },
  created_at: { type: Date, default: Date.now } // will convert string date to Date
});

// Notice the model name ("drug_disease_sorted") matches your JSON file name
module.exports = mongoose.model("drug_disease_sorted", drugDiseaseSortedSchema);
