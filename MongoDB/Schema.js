const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  review_id: {
    type: Number,
    unique: true
  },
  product_id: Number,
  rating: Number,
  date: String,
  body: String,
  recommend: Boolean,
  reported: Boolean,
  reviewer_name: String,
  reviewer_email: String,
  response: null,
  helpfulness: Number
});

const photosSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  review_id: Number,
  url: String
})