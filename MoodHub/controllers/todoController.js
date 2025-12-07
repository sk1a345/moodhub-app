const Todo = require("../models/todo");

// Show all todos (active + completed)
exports.getTodos = async (req, res) => {
  const active = await Todo.find({
    user: req.userId,
    completed: false
  }).sort({ createdAt: -1 });

  const completed = await Todo.find({
    user: req.userId,
    completed: true
  }).sort({ updatedAt: -1 });

  res.render("todo", {
    pageTitle: "To-Do",
    currentPage: "todo",
    active,
    completed
  });
};

// Add a new task
exports.addTodo = async (req, res) => {
  const { title } = req.body;

  await Todo.create({
    user: req.userId,
    title,
    priority: "medium" // default
  });

  res.redirect("/todo");
};

// Mark task as complete
exports.completeTodo = async (req, res) => {
  const { id } = req.params;

  await Todo.updateOne(
    { _id: id, user: req.userId },
    { completed: true }
  );

  res.redirect("/todo");
};

// Delete task
exports.deleteTodo = async (req, res) => {
  const { id } = req.params;

  await Todo.deleteOne({
    _id: id,
    user: req.userId
  });

  res.redirect("/todo");
};
