require('dotenv').config();
const path = require('path');

// External modules
const express = require('express');
const cookieParser = require('cookie-parser');

// Database connection
const connectDb = require('./config/db');
connectDb();

// Routers
const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');
const favouriteRouter = require('./routes/favouriteRouter');
const todoRouter = require('./routes/todoRouter');
const notesRouter = require("./routes/notesRouter");
const chatRouter = require("./routes/chatbotRouter");
const profileRouter = require("./routes/profileRouter");
const moodRouter = require("./routes/moodTrackRouter");

// App initialization
const app = express();
// Let Express trust Render’s reverse proxy
app.set("trust proxy", 1);
// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Session for the mood:
const session = require("express-session");
// Session for Mood
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
    }
  })
);
// Current use session availabel in the EJS

// Routes
app.use((req,res,next)=>{
  res.locals.isLoggedIn = !!req.cookies[process.env.COOKIE_NAME],
  res.locals.session = req.session
  next();
})

app.use('/', userRouter);
app.use('/', authRouter);
app.use('/favourites',favouriteRouter);
app.use('/todo',todoRouter);
app.use('/notes',notesRouter);
app.use('/chat',chatRouter);
app.use("/profile",profileRouter);
app.use("/mood",moodRouter);

// 404 handler
app.use((req, res) => {
  const isLoggedIn = !!req.cookies[process.env.COOKIE_NAME];
  res.status(404).render('404',{
    pageTitle: "404 Not Found",
    isLoggedIn
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
