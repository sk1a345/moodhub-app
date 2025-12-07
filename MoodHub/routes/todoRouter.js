const express = require("express");
const router = express.Router();
const { protectUser } = require("../middleware/authMiddleware");
const todoController = require("../controllers/todoController");

// Show list
router.get("/", protectUser, todoController.getTodos);

// Add
router.post("/add", protectUser, todoController.addTodo);

// Complete
router.post("/:id/complete", protectUser, todoController.completeTodo);

// Delete
router.post("/:id/delete", protectUser, todoController.deleteTodo);

module.exports = router;
