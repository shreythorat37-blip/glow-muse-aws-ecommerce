-- Glow Muse product catalogue schema (PostgreSQL-compatible starter)
CREATE TABLE products (
  id BIGINT PRIMARY KEY,
  name VARCHAR(240) NOT NULL,
  gender VARCHAR(10) NOT NULL CHECK (gender IN ('Men','Women','Unisex')),
  category VARCHAR(40) NOT NULL,
  color VARCHAR(40) NOT NULL,
  price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
  material VARCHAR(80), pattern VARCHAR(80), fit VARCHAR(80),
  sizes JSONB NOT NULL DEFAULT '[]'::jsonb,
  colors JSONB NOT NULL DEFAULT '[]'::jsonb,
  image TEXT, description TEXT,
  popularity INTEGER NOT NULL DEFAULT 0,
  record_type VARCHAR(30) NOT NULL DEFAULT 'synthetic_demo',
  stock_demo INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX idx_products_gender_category ON products(gender, category);
CREATE INDEX idx_products_color ON products(color);
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_products_name_search ON products USING GIN (to_tsvector('english', name));
-- Sizes, colours and stock are illustrative demo fields, not sellable inventory.
