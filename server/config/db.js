import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const pool = new pg.Pool({ connectionString : process.env.PG_URI});

await pool.query(`
    CREATE TABLE IF NOT EXISTS expenses (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        amount NUMERIC NOT NULL,
        category TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
    )
`);
export default pool;