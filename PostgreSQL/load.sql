--psql Reviews < ../Schema.sql

COPY reviews
FROM '/home/tlittle/Software-Development-Capstone-Reviews/Data/reviews.csv'
DELIMITER ','
CSV HEADER;

SELECT setval('reviews_review_id_seq', (SELECT MAX(review_id) FROM reviews)+1);

COPY photos
FROM '/home/tlittle/Software-Development-Capstone-Reviews/Data/reviews_photos.csv'
DELIMITER ','
CSV HEADER;

SELECT setval('photos_id_seq', (SELECT MAX(id) FROM photos)+1);

COPY characteristics
FROM '/home/tlittle/Software-Development-Capstone-Reviews/Data/characteristics.csv'
DELIMITER ','
CSV HEADER;

SELECT setval('characteristics_id_seq', (SELECT MAX(id) FROM characteristics)+1);

COPY characteristics_review
FROM '/home/tlittle/Software-Development-Capstone-Reviews/Data/characteristic_reviews.csv'
DELIMITER ','
CSV HEADER;

SELECT setval('characteristics_review_id_seq', (SELECT MAX(id) FROM characteristics_review)+1);



