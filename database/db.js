import pg from "pg";
const { Pool } = pg;
// pools will use environment variables
// for connection information

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'b2p',
  password: '1320',
  port: '5432',
});

// you can also use async/await
const res = await pool.query("SELECT NOW();");
console.log(res.rows);

export default pool;
