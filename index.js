const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

// const router = express.Router();

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get('/reviews/meta', (req, res, next) => {
  var product_id = req.query.product_id;
  console.log('Metadata request received for product #', product_id);
  db.query(`SELECT JSON_BUILD_OBJECT(
    'product_id',
    (SELECT product_id FROM reviews WHERE product_id = $1 LIMIT 1),
    'ratings',
    (SELECT JSON_BUILD_OBJECT(
      '1', (SELECT COUNT(review_id) FROM reviews WHERE review_id = $1 AND rating = 1),
      '2', (SELECT COUNT(review_id) FROM reviews WHERE review_id = $1 AND rating = 2),
      '3', (SELECT COUNT(review_id) FROM reviews WHERE review_id = $1 AND rating = 3),
      '4', (SELECT COUNT(review_id) FROM reviews WHERE review_id = $1 AND rating = 4),
      '5', (SELECT COUNT(review_id) FROM reviews WHERE review_id = $1 AND rating = 5)
    )),
    'recommended',
    (SELECT JSON_BUILD_OBJECT(
      'false', (SELECT COUNT(review_id) FROM reviews WHERE review_id = $1 AND recommend = 'f'),
      'true', (SELECT COUNT(review_id) FROM reviews WHERE review_id = $1 AND recommend = 't')
    )),
    'characteristics', (SELECT JSON_AGG(ROW_TO_JSON(average))
    FROM (SELECT id, name, (SELECT AVG(value) FROM characteristics_review WHERE characteristic_id = characteristics.id) FROM characteristics WHERE product_id = $1 ) average)
  ) meta`, [product_id], (err, result) => {
    if (err) {
      return next(err);
    }
    console.log('Meta Data Request Finished');
    res.send(result.rows[0].meta);
    return result;
  })
})

app.get('/reviews', (req, res, next) => {
  var product_id = req.query.product_id;
  console.log('Review request received for product #', product_id);
  var page = req.query.page || 0;
  var count = req.query.count || 5;
  db.query(`SELECT JSON_BUILD_OBJECT(
    'results', (SELECT JSON_AGG(ROW_TO_JSON(reviews)) FROM (SELECT review_id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness,
      (SELECT JSON_AGG(ROW_TO_JSON(photos)) photos FROM (SELECT url FROM photos WHERE review_id = reviews.review_id) photos)
      FROM reviews WHERE product_id = $1 AND reported = 'f' LIMIT $2 OFFSET $3) reviews)
      ) object`, [product_id, count, page], (err, result) => {
        if (err) {
          return next(err);
        }
        var object = {
          product_id: product_id,
          page: (page-1)*count,
          count: count,
          results: result.rows[0].object.results
        }
        console.log('Review Data Request Finished');
        res.send(object);
        return result;
      }
    )
})

app.put('/reviews/:review_id/helpful', (req,res,next) => {
  db.query(`UPDATE reviews SET helpfulness = helpfulness + 1 WHERE review_id = $1`, [req.params.review_id], (err, result) => {
    if (err) {
      return next(err);
    }
    res.end;
  });
});

app.put('/reviews/:review_id/report', (req,res,next) => {
  db.query(`UPDATE reviews SET reported = 't' WHERE review_id = $1`, [req.params.review_id], (err, result) => {
    if (err) {
      return next(err);
    }
    res.end;
  })
})

app.listen(PORT, () => {
  console.log(`The SDC is running on: http://localhost:${PORT}.`);
});

//Reviews


/*
//Main Get
SELECT JSON_BUILD_OBJECT(
  'results', (SELECT JSON_AGG(ROW_TO_JSON(reviews))
  FROM (SELECT review_id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness,
    (SELECT JSON_AGG(ROW_TO_JSON(photos)) photos FROM (SELECT url FROM photos WHERE review_id = 5) photos)
    FROM reviews WHERE product_id = $1) reviews)
    ) object

//Meta Get
Rating

SELECT JSON_BUILD_OBJECT(
  'ratings', (SELECT JSON_BUILD_OBJECT(
    '1', (SELECT COUNT(review_id) FROM reviews WHERE review_id = $1 AND rating = 1),
    '2', (SELECT COUNT(review_id) FROM reviews WHERE review_id = $1 AND rating = 2),
    '3', (SELECT COUNT(review_id) FROM reviews WHERE review_id = $1 AND rating = 3),
    '4', (SELECT COUNT(review_id) FROM reviews WHERE review_id = $1 AND rating = 4),
    '5', (SELECT COUNT(review_id) FROM reviews WHERE review_id = $1 AND rating = 5)
  )),
  'recommended', (SELECT JSON_BUILD_OBJECT(
    'false', (SELECT COUNT(review_id) FROM reviews WHERE review_id = $1 AND recommend = f),
    'true', (SELECT COUNT(review_id) FROM reviews WHERE review_id = $1 AND recommend = t),
  )),
  'characteristics', (SELECT JSON_AGG(ROW_TO_JSON(meta)) FROM (SELECT id, name FROM characteristics WHERE product_id = $1, (SELECT AVG(value) FROM characteristics_review WHERE characteristic_id = characteristics.id)) meta)
)


*/
