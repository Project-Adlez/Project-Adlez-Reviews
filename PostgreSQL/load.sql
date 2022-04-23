--psql Reviews < ../Schema.sql

COPY reviews
FROM '/home/tlittle/Software-Development-Capstone-Reviews/Data/reviews.csv'
DELIMITER ','
CSV HEADER;

COPY photos
FROM '/home/tlittle/Software-Development-Capstone-Reviews/Data/reviews_photos.csv'
DELIMITER ','
CSV HEADER;



