const express = require('express');
const requireDir = require('require-dir');

const routes = express.Router();

const controllers = requireDir('./controllers');

console.log(controllers);

/**
 * Auth
 */
routes.post('/signup', controllers.authController.signup);

module.exports = routes;
