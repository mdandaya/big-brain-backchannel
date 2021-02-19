const { Pool } = require('pg');

try {
  const config = require('./config');
  const {
    db: { host, database, user, port, password },
  } = config;

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
} catch (ex) {
  console.log('no config file');
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
  module.exports = pool;
}
