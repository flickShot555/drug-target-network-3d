// server/seeds/seedCompounds.js
const fs = require("fs");
const mongoose = require("mongoose");
const Compound = require("../models/Compound"); // Compound schema model

// ✅ Read file safely
const rawData = fs.readFileSync(__dirname + "/../databases/compounds_updated1.json", "utf-8");
let parsedData = JSON.parse(rawData);

// ✅ Handle phpMyAdmin style export vs plain array
let compounds;
if (Array.isArray(parsedData)) {
  const tableBlock = parsedData.find((item) => item.type === "table");
  compounds = tableBlock ? tableBlock.data : parsedData; 
} else {
  throw new Error("❌ JSON structure is invalid or not supported.");
}

async function seed() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/nbibcdte_entertainmentbuz", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    // Clean + Insert
    await Compound.deleteMany({});
    await Compound.insertMany(compounds);

    console.log(`✅ Inserted ${compounds.length} compounds successfully`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding compounds:", err);
    process.exit(1);
  }
}

seed();
