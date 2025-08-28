// convert_to_ndjson.js
// Usage:
//   node convert_to_ndjson.js input.json output.ndjson

const fs = require('fs');
const path = require('path');
const { chain } = require('stream-chain');
const { parser } = require('stream-json');
const { streamArray } = require('stream-json/streamers/StreamArray');

if (process.argv.length < 4) {
  console.error("Usage: node convert_to_ndjson.js input.json output.ndjson");
  process.exit(1);
}

const inputFile = process.argv[2];
const outputFile = process.argv[3];

if (!fs.existsSync(inputFile)) {
  console.error("Input file not found:", inputFile);
  process.exit(1);
}

const output = fs.createWriteStream(outputFile, { flags: 'w' });

// phpMyAdmin often wraps rows inside { "data": { ... } }
function normalize(doc) {
  if (doc && typeof doc === 'object') {
    if (doc.hasOwnProperty('data') && Object.keys(doc).length === 1) return doc.data;
    if (doc.data && typeof doc.data === 'object') return doc.data;
  }
  return doc;
}

const pipeline = chain([
  fs.createReadStream(inputFile),
  parser(),
  streamArray()
]);

pipeline.on('data', ({ key, value }) => {
  const row = normalize(value);
  output.write(JSON.stringify(row) + '\n');
});

pipeline.on('end', () => {
  console.log("✅ Conversion complete. Output written to", outputFile);
  output.end();
});

pipeline.on('error', (err) => {
  console.error("❌ Error during conversion:", err);
  process.exit(1);
});
