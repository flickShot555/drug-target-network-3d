const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const DrugDiseaseSorted = require("../models/drugDiseaseSorted");

const MONGO_URI = "mongodb://127.0.0.1:27017/nbibcdte_entertainmentbuz"; 

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected..."))
.catch(err => console.error("MongoDB connection error:", err));

async function seedDatabase() {
  try {
    // Read the JSON file
    const filePath = path.join(__dirname + "/../databases/drug_disease_sorted.json");
    const fileData = fs.readFileSync(filePath, "utf-8");
    const jsonData = JSON.parse(fileData);

    // Extract only the "data" array
    const records = jsonData.find(entry => entry.type === "table").data;

    // Clear old collection data
    await DrugDiseaseSorted.deleteMany({});
    console.log("Old collection cleared.");

    // Insert new data
    await DrugDiseaseSorted.insertMany(records);
    console.log("Data successfully seeded into 'drug_disease_sorted' collection!");

  } catch (err) {
    console.error("Seeding error:", err);
  } finally {
    mongoose.connection.close();
  }
}

seedDatabase();
