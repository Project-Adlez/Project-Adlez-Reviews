DROP TABLE photos;
-- DROP TABLE products;
DROP TABLE reviews;

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

CREATE TABLE photos (
  id              SERIAL PRIMARY KEY,
  review_id       int,
  url             text,
  CONSTRAINT fk_review_id FOREIGN KEY (review_id) REFERENCES reviews(review_id)
)

-- CREATE TABLE characteristics (
--   characteristic_id   int,
--   characteristic      text,
--   rating              int,
--   product_id          int,
-- );


-- CREATE TABLE products (
--   id              SERIAL PRIMARY KEY,
--   review_id       int,
--   product_id      int,
--   CONSTRAINT fk_review_id FOREIGN KEY (review_id) REFERENCES reviews(review_id)
-- )




