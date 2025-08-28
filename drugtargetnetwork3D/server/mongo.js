// server/mongo.js
// CommonJS-style connection helper for MongoDB
// Usage:
//   const { connectToDatabase, getDb, closeDatabase } = require('./mongo');
//   await connectToDatabase();                   // run once at app startup
//   const db = getDb();                          // anywhere afterwards
//   const rows = await db.collection('...').find({}).toArray();

const { MongoClient } = require('mongodb');

const DEFAULT_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017';
const DEFAULT_DB = process.env.MONGO_DB || 'nbibcdte_entertainmentbuz';

let _client = null;
let _db = null;

/**
 * Connect to MongoDB and set the internal client & db singletons.
 * Call once on app startup (before handling requests).
 *
 * @param {string} [uri] - Mongo connection string (optional)
 * @param {string} [dbName] - Database name (optional)
 * @returns {Promise<Db>} connected Db instance
 */
async function connectToDatabase(uri = DEFAULT_URI, dbName = DEFAULT_DB) {
  if (_db) return _db; // already connected

  if (!_client) {
    _client = new MongoClient(uri); // v4+ driver: options optional
  }

  // connect() is idempotent if already connected
  await _client.connect();
  _db = _client.db(dbName);

  console.log(`MongoDB connected — database: ${dbName}`);
  return _db;
}

/**
 * Return the connected Db instance.
 * Throws if connectToDatabase() was not called yet.
 */
function getDb() {
  if (!_db) throw new Error('MongoDB not connected. Call connectToDatabase() first.');
  return _db;
}

/**
 * Return the raw MongoClient (if needed).
 */
function getClient() {
  if (!_client) throw new Error('MongoClient not available. Call connectToDatabase() first.');
  return _client;
}

/**
 * Close the connection (useful for graceful shutdowns or tests).
 */
async function closeDatabase() {
  if (_client) {
    await _client.close();
    _client = null;
    _db = null;
    console.log('MongoDB connection closed.');
  }
}

module.exports = {
  connectToDatabase,
  getDb,
  getClient,
  closeDatabase,
};
