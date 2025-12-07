
module.exports.trackMood = (req,res,next) =>{

  res.render('mood',{
    currentPage: "mood",
    pageTitle: "Mood-track",
    sessionMood : req.session.mood || "You have not selected your mood now",
  })
}

module.exports.postTrackMood = (req,res,next) =>{
  req.session.mood = req.body.mood;
  res.redirect("/mood");
}