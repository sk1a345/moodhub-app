const express = require('express')

const authRouter = express.Router();

const authController = require('../controllers/authController');

authRouter.get('/login',authController.getLogin);

authRouter.get('/signup',authController.getSignup);

authRouter.post('/signup',authController.postSignup);

authRouter.post('/login',authController.postLogin);

authRouter.get('/logout',authController.logout);
module.exports = authRouter;
