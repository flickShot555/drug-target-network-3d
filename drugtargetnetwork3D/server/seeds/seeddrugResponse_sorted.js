const { MongoClient } = require("mongodb");
const fs = require("fs");
const readline = require("readline");

const url = "mongodb://localhost:27017"; // your MongoDB connection string
const dbName = "nbibcdte_entertainmentbuz";
const collectionName = "drugResponse_sorted";
const filePath = "databases/drugResponse_sorted.ndjson"; // path to NDJSON file
const batchSize = 1000; // adjust based on memory

async function seedDatabase() {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Drop existing collection if needed
    await collection.drop().catch(() => {});
    console.log(`Collection ${collectionName} dropped (if existed)`);

    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({ input: fileStream });

    let batch = [];
    let count = 0;

    for await (const line of rl) {
      if (!line.trim()) continue; // skip empty lines
      try {
        const doc = JSON.parse(line);
        batch.push(doc);
      } catch (err) {
        console.error("Skipping invalid JSON line:", err.message);
      }

      if (batch.length >= batchSize) {
        await collection.insertMany(batch);
        count += batch.length;
        console.log(`Inserted ${count} documents...`);
        batch = [];
      }
    }

    if (batch.length > 0) {
      await collection.insertMany(batch);
      count += batch.length;
    }

    console.log(`✅ Done! Inserted total ${count} documents`);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

seedDatabase();
