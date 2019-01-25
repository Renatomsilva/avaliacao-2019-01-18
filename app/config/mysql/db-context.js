const mysql = require('mysql');
const util = require('util');

let dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: process.env.DB_CONNECTION_LIMIT,
};

const pool = mysql.createPool(dbConfig);
pool.query = util.promisify(pool.query)

module.exports = pool;
