const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_NAME = process.env.COOKIE_NAME || "jwt";
const COOKIE_EXPIRES_DAYS = Number(process.env.COOKIE_EXPIRES_DAYS) || 7;
const JWT_EXPIRE = process.env.JWT_EXPIRE || "3d";

module.exports.getLogin = (req, res, next) => {
  res.render("login",{
    pageTitle:'Login-page',
    currentPage: "login"
  })
}
  
module.exports.getSignup = (req,res,next) =>{
  res.render("signup",{
    pageTitle: "Sign-up",
    currentPage: "singup"
  })
}
// handelling the postSignup request:
module.exports.postSignup = async (req,res,next)=>{
  try{
    const {name, username, email,password} = req.body;

    // Light Server-side validations:
    if(!name || !username || !email || !password){
      return res.status(404).send("All fields are required");
    }

    // check existing user by email:
    const existingUser = await User.findOne({email});
    if(existingUser){
      return res.status(400).send("Email is already registered");
    }

    // Create user in db
    const user = new User({
      name : name.trim(),
      username: username.trim(),
      email : email.trim().toLowerCase(),
      password: password,
    });
    await user.save();
    // After singup go to the login page
    return res.redirect('/login');
  }catch(err) {
    console.log("Signup error: ",err);
    return res.status(500).send("Internal server error");
  }
};

// Handelling the postlogin request
module.exports.postLogin = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Email and Password are required");
    }

    email = email.trim().toLowerCase();

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Invalid email or password");
    }

    // Compare passwords
    const isCorrect = await user.comparePassword(password); //method defined in the usermodel

    if (!isCorrect) {
      return res.status(400).send("Invalid email or password");
    }

    // Create token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRE,
    });

    // Cookie settings
    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      maxAge: COOKIE_EXPIRES_DAYS * 24 * 60 * 60 * 1000,
      sameSite: "lax",
      // secure: true   // enable on HTTPS
    });

    return res.redirect('/dashboard');

  } catch (err) {
    console.log("Login Error:", err);
    return res.status(500).send("Internal Server Error");
  }
};

// Logout feature 

module.exports.logout = (req,res,next) =>{
  res.clearCookie(process.env.COOKIE_NAME || "jwt",{
    httpOnly: true,
    sameSite: "lax"
  });
  req.session.destroy();
  return res.redirect('/');
}