const app = require('express')();
const mongoose = require('mongoose');
const requireDir = require('require-dir');

const dbConfig = require('./config/database');

mongoose.connect(dbConfig.url, { useNewUrlParser: true });
requireDir(dbConfig.modelsPath);

const User = mongoose.model('User');
User.create({
  name: 'Hugo',
  username: 'hbg',
  email: 'hugo@gmail.com',
  password: '1234',
}, () => {
  console.log('OK');
});

app.listen(3000, () => {
  console.log('Yo, app listening on port 3000!');
});
