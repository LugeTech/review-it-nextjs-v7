import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.BUG_DATABASE_URL,
});

export default pool;
