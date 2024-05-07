const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  hashed: String,
  name: String,
  title: String,
  keyword: String,
  points: Number,
  paragraph: String,
  photos: Array,
});

module.exports = mongoose.model("Article", articleSchema);
