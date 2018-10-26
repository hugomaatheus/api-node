const app = require('express')();
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const bodyParser = require('body-parser');

const dbConfig = require('./config/database');

mongoose.connect(dbConfig.url, { useNewUrlParser: true });
requireDir(dbConfig.modelsPath);

app.use(bodyParser.json());

app.use('/api', require('./app/routes'));

app.listen(3000, () => {
  console.log('Yo, app listening on port 3000!');
});
