const { Pool } = require('pg');

// import development config file
var config = null;
try {
  config = require('../config');
  var {
    db: { host, database, user, port, password },
  } = config;
} catch (ex) {
  console.log('no config file database.js');
}

const pool = new Pool({
  host: host,
  database: database,
  user: user,
  port: port,
  password: password,
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
