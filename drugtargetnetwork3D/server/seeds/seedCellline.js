const fs = require("fs");
const mongoose = require("mongoose");
const Cellline = require("../models/Cellline"); // your mongoose schema

// Load and parse the JSON
const raw = JSON.parse(
  fs.readFileSync(__dirname + "/../databases/cellline.json", "utf-8")
);

// Extract only the "data" array from the "table" object
const tableObj = raw.find(entry => entry.type === "table" && entry.name === "cellline");
const data = tableObj?.data || [];

async function seed() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/nbibcdte_entertainmentbuz", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    // Clear old records
    await Cellline.deleteMany({});

    // Insert only the actual cellline documents
    if (data.length > 0) {
      await Cellline.insertMany(data);
      console.log(`✅ Inserted ${data.length} documents`);
    } else {
      console.warn("⚠️ No data found in JSON file!");
    }

    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    process.exit(1);
  }
}

seed();
