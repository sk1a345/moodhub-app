const Notes = require("../models/notes");

// Show all notes of the user:
module.exports.getNotes = async (req, res, next) =>{
  const notes = await Notes.find({
    user: req.userId
  });
  res.render("notes",{
    pageTitle: "Notes",
    currentPage: "notes",
    notes
  });
};


// Adding the new note:
module.exports.addNotes = async (req,res,next) =>{
  const {title, description } = req.body;
  await Notes.create({
    user: req.userId,
    title,
    description
  });
  res.redirect("/notes");
}

module.exports.deleteNote = async(req,res,next)=>{
  const { id } = req.params;
  await Notes.deleteOne({
    _id : id,
    user : req.userId
  });
  res.redirect("/notes");
}