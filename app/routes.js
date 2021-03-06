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

/**
 * Users
 */
routes.get('/users/myself', controllers.userController.myself);
routes.put('/users', controllers.userController.update);
routes.get('/feed', controllers.userController.feed);

/**
 * Follows
 */
routes.post('/follow/:id', controllers.followController.create);
routes.delete('/unfollow/:id', controllers.followController.destroy);


/**
 * Tweets
 */
routes.post('/tweets', controllers.tweetController.create);
routes.delete('/tweets/:id', controllers.tweetController.destroy);

/**
 * Likes
 */
routes.post('/like/:id', controllers.likeController.toggle);

routes.get('/tweets', (req, res) => {
  console.log(req.userId);

  res.send('OK');
});

module.exports = routes;
