require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const createRouter = require("./routers/createRoute");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const article = require("./Schema/Article");

const mongo_uri = process.env.mongo_key;
const unsplash_uri = process.env.unsplash_key;

const connection_paramters = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(mongo_uri, connection_paramters).then(() => {
  console.log("connection with the database is established.");
});

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/static")));
app.set("views", __dirname + "/views");

app.get("/", (request, response) => {
  response.render("Home");
});

app.get("/view/:uid", async (request, response) => {
  const uuid = request.params.uid;
  const specificArticle = await article.findOne({ hashed: uuid });
  if (!specificArticle) {
    response.send("There is no such Article.");
  } else {
    response.render("View", (obj = specificArticle));
  }
});

app.use("/create", createRouter);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
