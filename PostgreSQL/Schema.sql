DROP TABLE reviews;
DROP TABLE photos;

CREATE TABLE reviews (
  review_id SERIAL PRIMARY KEY,
  product_id int,
  rating int,
  date text,
  summary text,
  body text,
  recommend boolean,
  reported boolean,
  reviewer_name text,
  reviewer_email text,
  response text,
  helpfulness int
);

-- CREATE TABLE characteristics (
--   characteristic_id   int,
--   characteristic      text,
--   rating              int,
--   product_id          int,
-- );

CREATE TABLE photos (
  id              SERIAL PRIMARY KEY,
  review_id       int,
  url             text
)