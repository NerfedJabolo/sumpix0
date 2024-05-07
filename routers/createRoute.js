require("dotenv").config();
const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const article = require("../Schema/Article");
const crypto = require("crypto");
const summarise = require("../summarize");

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

router.get("/", (request, response) => {
  response.render("Create");
});

router.post("/", async (request, response) => {
  const { name, title, keyword, points, paragraph } = request.body;
  const hash = crypto.randomUUID();
  const keywordSplitted = keyword.split(" ");
  const images = [];
  for (let i = 0; i < keywordSplitted.length; ++i) {
    images.push(
      `https://source.unsplash.com/random/700x500/?${keywordSplitted[i]}`
    );
  }

  let summarised = summarise(paragraph, parseInt(points));

  const newArticle = new article({
    hashed: hash,
    name: name,
    title: title,
    keyword: keyword,
    points: points,
    paragraph: summarised,
    photos: images,
  });
  await newArticle.save();
  response.redirect(`/view/${hash}`);
});

module.exports = router;
