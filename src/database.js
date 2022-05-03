const { Pool } = require("pg/lib");

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '1010',
  port: 5432,
})
pool.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
