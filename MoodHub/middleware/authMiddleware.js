const jwt = require('jsonwebtoken');
const User = require('../models/user');

const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_NAME = process.env.COOKIE_NAME || "jwt";

module.exports.protectUser = async (req, res,next) =>{
  const token = req.cookies[COOKIE_NAME];
  if(!token){
    res.locals.user = null;
    res.locals.isLoggedIn = false;
    return res.redirect('/login'); //user is not loggesd inn
  }
  try{
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    res.locals.isLoggedIn=true;
    const user = await User.findById(decoded.userId).lean();
    if(!user){
      res.locals.isLoggedIn = false;
      return res.redirect('/login');
    }
    req.user = user;
    res.locals.isLoggedIn = true;
    res.locals.user= user;//this makes the user available in the ejs
    next();//go to the next means allowing the access
  }catch(err){
    console.log("JWT VERIFICATION ERROR: ",err);
    return res.redirect('/login');
  }
}