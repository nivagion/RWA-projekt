-- Seed data (optional)
-- Run after schema.sql

INSERT INTO recipes (title, description, ingredients, instructions, prep_time_minutes, category)
VALUES
  (
    'Pasta Aglio e Olio',
    'Brza tjestenina s češnjakom i maslinovim uljem.',
    ARRAY['tjestenina', 'češnjak', 'maslinovo ulje', 'peršin', 'chili'],
    'Skuhaj tjesteninu. Na ulju lagano preprži češnjak i chili, dodaj tjesteninu i peršin.',
    15,
    'Pasta'
  ),
  (
    'Piletina s rižom',
    'Jednostavan ručak u jednoj tavi.',
    ARRAY['piletina', 'riža', 'luk', 'začini'],
    'Zapeći piletinu, dodaj luk, rižu i vodu. Kuhaj dok riža ne omekša.',
    35,
    'Main'
  )
ON CONFLICT DO NOTHING;
