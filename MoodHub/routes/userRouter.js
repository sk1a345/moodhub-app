const express = require('express');
const {protectUser} = require('../middleware/authMiddleware');
const userRouter = express.Router();
const userController = require('../controllers/userController');

userRouter.get('/',userController.getHome);

userRouter.get('/dashboard', protectUser,userController.getUserDashboard);

userRouter.get('/favourites',protectUser,userController.getFavourites);


module.exports = userRouter;