// server/db.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'your_db',
  waitForConnections: true,
  connectionLimit: 10
});

// export the pool.execute promise (so controller can do: const [rows] = await execute(sql, params))
export const execute = (sql, params) => pool.execute(sql, params);
export default pool;
