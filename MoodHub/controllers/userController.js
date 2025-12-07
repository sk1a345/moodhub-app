const FavouriteItem = require("../models/FavouriteItem");
const User = require("../models/user");
const Todo = require("../models/todo");
const Notes = require("../models/notes");

// ============================
// GET HOME (WITH DASHBOARD)
// ============================
module.exports.getHome = async (req, res, next) => {
  try {
    const userId = req.userId;

    // If user not logged in → show home
    if (!res.locals.isLoggedIn || !userId) {
      return res.render("home", {
        pageTitle: "Home-page",
        currentPage: "home",
      });
    }

    // Fetch user
    const user = await User.findById(userId);

    // If user doesn't exist anymore → show home
    if (!user) {
      return res.render("home", {
        pageTitle: "Home-page",
        currentPage: "home",
      });
    }

    const username = user.username;

    // Parallel counts (faster)
    const [favCount, todoCount, notesCount] = await Promise.all([
      FavouriteItem.countDocuments({ user: userId }),
      Todo.countDocuments({ user: userId }),
      Notes.countDocuments({ user: userId }),
    ]);

    return res.render("dashboard", {
      pageTitle: "dashboard",
      currentPage: "dashboard",
      username,
      favCount,
      todoCount,
      notesCount,
    });

  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

// ============================
// GET USER DASHBOARD DIRECT
// ============================
module.exports.getUserDashboard = async (req, res, next) => {
  try {
    const userId = req.userId;

    if (!userId) return res.redirect("/login");

    const user = await User.findById(userId);
    if (!user) return res.redirect("/login");

    const username = user.username;

    const [favCount, todoCount, notesCount] = await Promise.all([
      FavouriteItem.countDocuments({ user: userId }),
      Todo.countDocuments({ user: userId }),
      Notes.countDocuments({ user: userId }),
    ]);

    return res.render("dashboard", {
      pageTitle: "moodHub-dashboard",
      currentPage: "dashboard",
      username,
      favCount,
      todoCount,
      notesCount,
    });

  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

// ============================
// GET FAVOURITES PAGE
// ============================
module.exports.getFavourites = async (req, res, next) => {
  try {
    const userId = req.userId;

    const counts = {
      books: await FavouriteItem.countDocuments({ user: userId, category: "books" }),
      anime: await FavouriteItem.countDocuments({ user: userId, category: "anime" }),
      movies: await FavouriteItem.countDocuments({ user: userId, category: "movies" }),
      games: await FavouriteItem.countDocuments({ user: userId, category: "games" }),
      music: await FavouriteItem.countDocuments({ user: userId, category: "music" }),
      food: await FavouriteItem.countDocuments({ user: userId, category: "food" }),
    };

    return res.render("favourites/favourite_dash", {
      pageTitle: "favourites",
      currentPage: "favourites",
      counts,
    });

  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};


