const User = require("../models/user");
const todo = require("../models/todo");
const favouriteItem = require("../models/FavouriteItem");
const notes = require("../models/notes");


module.exports.getProfile = async (req,res,next)=>{
  try{
    const userId = req.userId;
    if(!userId) return res.redirect("/dashboard");
    const user = await User.findById(userId);
    if(!user) return res.redirect("/dashboard");
    const name = user.name;
    const username = user.username;
    const email = user.email;
    const [favCount, todoCount, notesCount] = await Promise.all([
      favouriteItem.countDocuments({
        user: userId
      }),
      todo.countDocuments({user: userId}),
      notes.countDocuments({user: userId}),
    ]);
    return res.render("profile",{
    currentPage: "profile",
    pageTitle: "profile-page",
    name,
    username,
    email,
    favCount,
    todoCount,
    notesCount
  });

  }catch (err){
    console.log(err);
    return res.status(500).send("Internal server error");
  }
  
}

module.exports.getEdit = async(req,res,next)=>{
  try{
    const userId = req.userId;
    const user = await User.findById(userId);
    res.render("editProfile",{
      pageTitle: "Edit Profile",
      currentPage: "profile",
      name: user.name,
      email: user.email,
      username: user.username
    });

  }catch(err){
    console.log("Error while Feching the page");
    res.status(500).send("Internal Server Error");
  }
}

module.exports.postEdit = async(req,res,next)=>{
  const {name, username, email} = req.body;
  try{
    await User.findByIdAndUpdate(req.userId,{
      name,
      username,
      email
    });
    res.redirect("/profile");
  }catch(err){
    console.log(err);
    res.redirect("/edit");
  }
}