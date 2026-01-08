const pool = require("../db/pool");

/**
 * Build a simple, safe query from query params.
 * Keep it "good enough" for MVP, and extend later.
 */
exports.listRecipes = async ({
  search,
  category,
  maxTime,
  sort,
  limit,
  offset,
} = {}) => {
  const values = [];
  const where = [];
  let i = 1;

  if (search) {
    values.push(`%${search}%`);
    where.push(
      `(title ILIKE $${i} OR array_to_string(ingredients, ' ') ILIKE $${i})`
    );
    i += 1;
  }

  if (category) {
    values.push(category);
    where.push(`category = $${i}`);
    i += 1;
  }

  if (maxTime !== undefined && maxTime !== null && String(maxTime).trim() !== "") {
    const n = Number(maxTime);
    if (!Number.isNaN(n)) {
      values.push(n);
      where.push(`prep_time_minutes <= $${i}`);
      i += 1;
    }
  }

  const safeLimit = Math.min(Math.max(parseInt(limit ?? "50", 10) || 50, 1), 200);
  const safeOffset = Math.max(parseInt(offset ?? "0", 10) || 0, 0);

  values.push(safeLimit);
  const limitParam = i;
  i += 1;

  values.push(safeOffset);
  const offsetParam = i;
  i += 1;

  let orderBy = "created_at DESC";
  if (sort === "old") orderBy = "created_at ASC";
  if (sort === "title") orderBy = "title ASC";

  const sql = `
    SELECT *
    FROM recipes
    ${where.length ? "WHERE " + where.join(" AND ") : ""}
    ORDER BY ${orderBy}
    LIMIT $${limitParam}
    OFFSET $${offsetParam}
  `;

  const { rows } = await pool.query(sql, values);
  return rows;
};

exports.getRecipeById = async (id) => {
  const { rows } = await pool.query("SELECT * FROM recipes WHERE id = $1", [id]);
  return rows[0] || null;
};

exports.createRecipe = async (data) => {
  const {
    title,
    description = null,
    ingredients = [],
    instructions,
    prep_time_minutes = null,
    category = null,
  } = data;

  const { rows } = await pool.query(
    `
    INSERT INTO recipes (title, description, ingredients, instructions, prep_time_minutes, category)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
    `,
    [title, description, ingredients, instructions, prep_time_minutes, category]
  );

  return rows[0];
};

exports.updateRecipe = async (id, data) => {
  // Partial update: only fields provided are updated
  const allowed = [
    "title",
    "description",
    "ingredients",
    "instructions",
    "prep_time_minutes",
    "category",
  ];

  const sets = [];
  const values = [];
  let i = 1;

  for (const key of allowed) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      sets.push(`${key} = $${i}`);
      values.push(data[key]);
      i += 1;
    }
  }

  if (!sets.length) {
    // Nothing to update; still check existence
    return await exports.getRecipeById(id);
  }

  values.push(id);

  const { rows } = await pool.query(
    `
    UPDATE recipes
    SET ${sets.join(", ")}
    WHERE id = $${i}
    RETURNING *
    `,
    values
  );

  return rows[0] || null;
};

exports.deleteRecipe = async (id) => {
  const { rowCount } = await pool.query("DELETE FROM recipes WHERE id = $1", [id]);
  return rowCount > 0;
};
