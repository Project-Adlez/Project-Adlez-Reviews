 -- psql Reviews < ../Schema.sql

 COPY reviews
 FROM '/home/tlittle/Software-Development-Capstone-Reviews/Data/reviews.csv'
 DELIMITER ','
 CSV HEADER;