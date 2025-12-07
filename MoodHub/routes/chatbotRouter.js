const express = require("express");
const chatRouter = express.Router();

const chatbotController = require("../controllers/chatbotController");

const { protectUser } = require("../middleware/authMiddleware");

chatRouter.get("/",protectUser,chatbotController.getChat);
chatRouter.post("/", protectUser, chatbotController.handleChat);

module.exports = chatRouter;
