require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const createRouter = require('./routers/createRoute');
const bodyParser = require('body-parser');
const article = require('./Schema/Article');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/static')));
app.set('views', __dirname + '/views');

app.get('/', (request, response) => {
  response.render('Home');
});

app.get('/view/:uid', async (request, response) => {
  const uuid = request.params.uid;
  const specificArticle = await article.findOne({ hashed: uuid });
  if (!specificArticle) {
    response.send('There is no such Article.');
  } else {
    response.render('View', (obj = specificArticle));
  }
});

app.use('/create', createRouter);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
