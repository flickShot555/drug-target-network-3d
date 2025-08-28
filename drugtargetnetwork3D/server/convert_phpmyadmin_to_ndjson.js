// convert_phpmyadmin_to_ndjson.js
// Usage:
//   node convert_phpmyadmin_to_ndjson.js input.json output.ndjson

const fs = require("fs");
const { chain } = require("stream-chain");
const { parser } = require("stream-json");
const { pick } = require("stream-json/filters/Pick");
const { streamArray } = require("stream-json/streamers/StreamArray");

if (process.argv.length < 4) {
  console.error("Usage: node convert_phpmyadmin_to_ndjson.js input.json output.ndjson");
  process.exit(1);
}

const inputFile = process.argv[2];
const outputFile = process.argv[3];

if (!fs.existsSync(inputFile)) {
  console.error("Input file not found:", inputFile);
  process.exit(1);
}

const output = fs.createWriteStream(outputFile, { flags: "w" });

// Build a streaming pipeline
const pipeline = chain([
  fs.createReadStream(inputFile),
  parser(),
  // Step 1: go into the wrapper array
  pick({ filter: "2.data" }), // <-- get to [2].data
  streamArray()
]);

pipeline.on("data", ({ value }) => {
  output.write(JSON.stringify(value) + "\n");
});

pipeline.on("end", () => {
  console.log("✅ Conversion complete. Output written to", outputFile);
  output.end();
});

pipeline.on("error", (err) => {
  console.error("❌ Error during conversion:", err);
  process.exit(1);
});
