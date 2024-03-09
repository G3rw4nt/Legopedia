CREATE TABLE IF NOT EXISTS PART_CATEGORIES (
    id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE IF NOT EXISTS PARTS (
    part_num TEXT PRIMARY KEY,
    name TEXT,
    part_cat_id INTEGER REFERENCES PART_CATEGORIES(id)
);

CREATE TABLE IF NOT EXISTS THEMES (
    id SERIAL PRIMARY KEY,
    name TEXT,
    parent_id INTEGER
);

CREATE TABLE IF NOT EXISTS SETS (
    set_num TEXT PRIMARY KEY,
    name TEXT,
    year INTEGER,
    theme_id INTEGER REFERENCES THEMES(id),
    num_parts INTEGER
);

COPY THEMES(id, name, parent_id) FROM '/data/themes.csv' WITH (FORMAT csv, HEADER true);

COPY PART_CATEGORIES(id, name) FROM '/data/part_categories.csv' WITH (FORMAT csv, HEADER true);

COPY PARTS(part_num, name, part_cat_id) FROM '/data/parts.csv' WITH (FORMAT csv, HEADER true);

COPY SETS(set_num, name, year, theme_id, num_parts) FROM '/data/sets.csv' WITH (FORMAT csv, HEADER true);