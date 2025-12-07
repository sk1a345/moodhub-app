const express = require("express");
const profileRouter = express.Router();
const profileController = require("../controllers/profileController");
const {protectUser} = require("../middleware/authMiddleware");

profileRouter.get("/", protectUser, profileController.getProfile);

profileRouter.get("/edit-profile",protectUser,profileController.getEdit);

profileRouter.post("/edit-profile",protectUser, profileController.postEdit);

module.exports = profileRouter;