DROP TABLE photos;
DROP TABLE characteristics_review;
DROP TABLE characteristics;
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
);

CREATE TABLE characteristics (
  id              SERIAL PRIMARY KEY,
  product_id      int,
  name            text
);

CREATE TABLE characteristics_review (
  id                  SERIAL PRIMARY KEY,
  characteristic_id   int,
  review_id           int,
  value               int,
  CONSTRAINT fk_characteristic_id FOREIGN KEY (characteristic_id) REFERENCES characteristics(id),
  CONSTRAINT fk_review_id FOREIGN KEY (review_id) REFERENCES reviews(review_id)
);

CREATE INDEX characteristics_id ON characteristics_review ( characteristic_id );
CREATE INDEX characteristics_product_id ON characteristics ( product_id );
CREATE INDEX photos_review_id ON photos ( review_id );
CREATE INDEX review_rating ( review_id, rating );
CREATE INDEX review_recommend ( review_id, recommend );
CREATE INDEX review_reported ( review_id, reported );
CREATE INDEX review_product_id ( product_id );
/*

*/





