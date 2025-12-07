const express = require("express");
const notesRouter = express.Router();

const {protectUser} = require("../middleware/authMiddleware");

const notesController = require("../controllers/notesController");

// Show the notes:
notesRouter.get("/",protectUser,notesController.getNotes);

// Add the notes:
notesRouter.post("/add",protectUser,notesController.addNotes);

// Deleting the notes:
notesRouter.post("/:id/delete",protectUser, notesController.deleteNote);


module.exports = notesRouter;