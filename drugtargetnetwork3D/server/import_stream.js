// import_stream.js
// Usage example:
//   node import_stream.js --file "server/databases/drugResponse_sorted.json" --db nbibcdte_entertainmentbuz --coll drugResponse_sorted --uri "mongodb://127.0.0.1:27017" --batch 1000 --drop

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { chain } = require('stream-chain');
const { parser } = require('stream-json');
const { streamArray } = require('stream-json/streamers/StreamArray');
const { MongoClient } = require('mongodb');

const argv = require('minimist')(process.argv.slice(2));
const filePath = argv.file || 'server/databases/drugResponse_sorted.json';
const uri = argv.uri || 'mongodb://127.0.0.1:27017';
const dbName = argv.db || 'nbibcdte_entertainmentbuz';
const collName = argv.coll || 'drugResponse_sorted';
const batchSize = parseInt(argv.batch || 1000, 10);
const drop = !!argv.drop;

function normalize(doc) {
  // phpMyAdmin style often wraps rows under "data"
  if (doc && typeof doc === 'object') {
    if (doc.hasOwnProperty('data') && Object.keys(doc).length === 1) return doc.data;
    if (doc.data && typeof doc.data === 'object') return doc.data;
  }
  return doc;
}

(async () => {
  if (!fs.existsSync(filePath)) {
    console.error('File not found:', filePath);
    process.exit(1);
  }

  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  const coll = client.db(dbName).collection(collName);

  if (drop) {
    try { await coll.drop(); console.log('Dropped existing collection'); } catch (e) { /* ignore if not exists */ }
  }

  // detect first non-whitespace char
  const fd = fs.openSync(filePath, 'r');
  const buf = Buffer.alloc(1);
  let firstChar = null, pos = 0;
  while (fs.readSync(fd, buf, 0, 1, pos) === 1) {
    const ch = buf.toString();
    pos++;
    if (!/\s/.test(ch)) { firstChar = ch; break; }
  }
  fs.closeSync(fd);

  let total = 0;
  let batch = [];

  async function flush() {
    if (batch.length === 0) return;
    await coll.insertMany(batch, { ordered: false });
    total += batch.length;
    console.log(`Inserted ${total} documents (last batch ${batch.length})`);
    batch = [];
  }

  if (firstChar === '[') {
    console.log('Detected JSON array — streaming with stream-json');
    const pipeline = chain([fs.createReadStream(filePath), parser(), streamArray()]);
    pipeline.on('data', async ({key, value}) => {
      pipeline.pause();
      try {
        batch.push(normalize(value));
        if (batch.length >= batchSize) await flush();
      } catch (err) {
        console.error('Error processing item:', err);
      } finally {
        pipeline.resume();
      }
    });
    pipeline.on('end', async () => {
      await flush();
      console.log('Done importing (array). Total:', total);
      await client.close();
    });
    pipeline.on('error', async (err) => {
      console.error('Stream error:', err);
      await client.close();
      process.exit(1);
    });
  } else {
    console.log('Detected NDJSON or object-per-line — streaming by lines');
    const rl = readline.createInterface({ input: fs.createReadStream(filePath), crlfDelay: Infinity });
    rl.on('line', async (line) => {
      rl.pause();
      try {
        const trimmed = line.trim();
        if (!trimmed) { rl.resume(); return; }
        // remove trailing commas if present (common when file was created weirdly)
        const cleaned = trimmed.replace(/,\s*$/, '');
        const obj = JSON.parse(cleaned);
        batch.push(normalize(obj));
        if (batch.length >= batchSize) await flush();
      } catch (err) {
        console.error('Line parse error (skipping line):', err.message);
      } finally {
        rl.resume();
      }
    });
    rl.on('close', async () => {
      await flush();
      console.log('Done importing (ndjson). Total:', total);
      await client.close();
    });
  }
})();
