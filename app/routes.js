const express = require('express');
const requireDir = require('require-dir');

const routes = express.Router();

const authMiddleware = require('./middlewares/auth');

const controllers = requireDir('./controllers');

console.log(controllers);

/**
 * Auth
 */
routes.post('/signin', controllers.authController.signin);
routes.post('/signup', controllers.authController.signup);

/**
 * Auth middleware
 */
routes.use(authMiddleware);

routes.get('/tweets', (req, res) => {
  console.log(req.userId);

  res.send('OK');
});

module.exports = routes;
