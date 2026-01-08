-- Recipe Finder MVP schema
-- Run: psql -d recipe_finder -f src/db/schema.sql

CREATE TABLE IF NOT EXISTS recipes (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  ingredients TEXT[] NOT NULL DEFAULT '{}',
  instructions TEXT NOT NULL,
  prep_time_minutes INTEGER,
  category TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Keep updated_at fresh
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS recipes_set_updated_at ON recipes;

CREATE TRIGGER recipes_set_updated_at
BEFORE UPDATE ON recipes
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();
