const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

// const router = express.Router();

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get('/reviews', (req, res, next) => {
  console.log(req.query);
  var product_id = req.query.product_id;
  var page = req.query.page || 0;
  var count = req.query.count || 5;
  console.log(product_id, page, count);
  db.query(`SELECT JSON_BUILD_OBJECT(
    'product_id', (SELECT product_id FROM reviews WHERE product_id = $1  LIMIT 1),
    'results', (SELECT JSON_AGG(ROW_TO_JSON(reviews)) FROM (SELECT review_id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness,
      (SELECT JSON_AGG(ROW_TO_JSON(photos)) photos FROM (SELECT url FROM photos WHERE review_id = 5) photos)
      FROM reviews WHERE product_id = $1 LIMIT $2 OFFSET $3) reviews)
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
        res.send(object);
        return result;
      }
    )
})

app.listen(PORT, () => {
  console.log(`The SDC is running on: http://localhost:${PORT}.`);
});

//Reviews
/*

**************************************************************
SELECT JSON_BUILD_OBJECT(
  'product_id', (SELECT product_id FROM reviews WHERE product_id = $1  LIMIT 1),
  'results', (SELECT JSON_AGG(ROW_TO_JSON(reviews)) FROM (SELECT review_id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness,
    (SELECT JSON_AGG(ROW_TO_JSON(photos)) photos FROM (SELECT url FROM photos WHERE review_id = 5) photos)
    FROM reviews WHERE product_id = $1) reviews)
    ) object
*/
