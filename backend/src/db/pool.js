const { Pool } = require("pg");
require("dotenv").config();

/**
 * Prefer DATABASE_URL for simplicity:
 * DATABASE_URL=postgresql://user:password@localhost:5432/recipe_finder
 */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // For managed DBs you might need SSL. For local dev, leave it off.
  // ssl: process.env.PGSSLMODE === "require" ? { rejectUnauthorized: false } : undefined,
});

pool.on("error", (err) => {
  console.error("Unexpected PG pool error", err);
});

module.exports = pool;
