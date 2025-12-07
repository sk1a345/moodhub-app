const express = require("express");
const moodRouter = express.Router();
const {protectUser} =require("../middleware/authMiddleware");
const moodTrackController = require("../controllers/moodTrackController");

moodRouter.get('/', protectUser, moodTrackController.trackMood);
moodRouter.post('/',protectUser,moodTrackController.postTrackMood);

module.exports = moodRouter;