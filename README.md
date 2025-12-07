
## 🌙 MoodHub

## Your Personal Productivity & Mood Companion

MoodHub is a comprehensive productivity and mood-tracking web application built with modern web technologies. It combines task management, mood tracking, and AI-powered personal assistance in one clean, intuitive dashboard.

## 📌 Overview

MoodHub is a productivity and mood-tracking web app built using Node.js, Express, EJS, and MongoDB, combined with a Groq-powered AI chatbot (LLaMA 3.3-70B) that gives ultra-fast personalized responses.

It lets users manage:
- 📒 **Notes** - Create, edit, delete notes
- ✅ **To-dos** - Task management with priorities
- ⭐ **Favourites** - Save favorite books, movies, anime, games, food, music
- 👤 **Profile** - Personal profile management
- 😊 **Mood Tracking** - Track your daily mood
- 🤖 **AI Chatbot** - Get personalized recommendations and motivation

All inside one clean dashboard UI.

## 🚀 Features

### 🔐 User Authentication
- Secure signup/login system
- JWT + Cookies for session management
- Password hashing with bcrypt
- Protected routes for user privacy

### 📒 Notes Management
- Create, edit, and delete notes
- Clean and simple note-taking interface
- Organized note listing

### ⭐ Favourites System
- Save favorites across multiple categories:
  - Books
  - Movies
  - Anime
  - Games
  - Food
  - Music
- Add posters via upload or URL
- Add ratings and personal notes
- Category-based organization

### 📝 To-Do Manager
- Create and manage tasks
- Mark tasks as completed
- Priority-based task organization
- Progress tracking

### 🤖 AI Chatbot (MoodBuddy)
- Powered by Groq + LLaMA-3.3 70B Turbo
- Ultra-fast inference and responses
- Understands your favorites, notes, and todos
- Personalized recommendations
- Motivational and supportive replies

### 😊 Mood Tracker
- Select your current mood for each session
- Visual mood representation
- Session-based mood storage

### 👤 Profile Management
- View and edit profile information
- Update name, email, and avatar
- View statistics for todos, notes, and favorites

## 🧠 Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Authentication**: JWT
- **Session Management**: express-session
- **Security**: bcrypt for password hashing

### AI / Chatbot
- **API**: Groq API
- **Model**: LLaMA 3.3 – 70B Versatile
- **SDK**: groq-sdk (Node.js)

### Frontend
- **Templating**: EJS
- **Markup**: HTML5
- **Styling**: CSS3
- **Scripting**: Vanilla JavaScript

### Database
- **Database**: MongoDB
- **ORM**: Mongoose

### File Uploads
- **Middleware**: Multer
- **Cloud Storage**: Cloudinary

### Validation
- **Library**: express-validator

### Deployment
- **Platform**: Render

## 🌐 Live Demo
**https://moodhub-app-1.onrender.com/**

## 🖼️ Screenshots

### 🏠 Dashboard
![Dashboard](https://raw.githubusercontent.com/sk1a345/moodhub-app/refs/heads/main/Screenshot%202025-12-07%20154718.png)  

### ⭐ Favourites
![Favourites Page](https://raw.githubusercontent.com/sk1a345/moodhub-app/refs/heads/main/Screenshot%202025-12-07%20154946.png)  

### 🤖 Chatbot
![Chatbot Page](https://raw.githubusercontent.com/sk1a345/moodhub-app/refs/heads/main/Screenshot%202025-12-07%20155022.png)  



## ⚙️ Installation
```
### 1️⃣ Clone the Repository
bash
git clone https://github.com/your-username/MoodHub.git
cd MoodHub
2️⃣ Install Dependencies
bash
npm install
3️⃣ Environment Configuration
Create a .env file in the root directory with the following variables:

env
PORT=5000
MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
COOKIE_NAME=your_cookie_name

SESSION_SECRET=your_session_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

GROQ_API_KEY=your_groq_api_key
4️⃣ Start the Server
bash
npm start
5️⃣ Open in Browser
Navigate to http://localhost:5000
```
📁 Project Structure
```
MoodHub/
│
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   ├── todoController.js
│   ├── notesController.js
│   ├── favouriteController.js
│   ├── chatbotController.js
│   ├── moodTrackController.js
│   ├── profileController.js
│
├── routes/
│   ├── authRouter.js
│   ├── userRouter.js
│   ├── todoRouter.js
│   ├── notesRouter.js
│   ├── favouriteRouter.js
│   ├── chatbotRouter.js
│   ├── moodTrackRouter.js
│   ├── profileRouter.js
│
├── models/
│   ├── user.js
│   ├── todo.js
│   ├── notes.js
│   ├── favouriteItem.js
│
├── public/
│   ├── css/
│   │   ├── style.css
│   │   └── dashboard.css
│   ├── js/
│   │   ├── main.js
│   │   └── chatbot.js
│   ├── images/
│   │   ├── avatars/
│   │   └── uploads/
│
├── views/
│   ├── partials/
│   │   ├── header.ejs
│   │   ├── footer.ejs
│   │   └── navbar.ejs
│   ├── profile/
│   │   └── profile.ejs
│   ├── favourites/
│   │   └── favourites.ejs
│   ├── todos/
│   │   └── todos.ejs
│   ├── notes/
│   │   └── notes.ejs
│   ├── chatbot/
│   │   └── chatbot.ejs
│   ├── home.ejs
│   ├── dashboard.ejs
│   ├── login.ejs
│   ├── signup.ejs
│   ├── mood.ejs
│   └── 404.ejs
│
├── config/
│   ├── db.js
│   └── cloudinary.js
│
├── middleware/
│   ├── auth.js
│   └── upload.js
│
├── app.js
├── package.json
├── .env.example
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/logout` - User logout

### User Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `GET /api/user/stats` - Get user statistics

### Todos
- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

### Notes
- `GET /api/notes` - Get all notes
- `POST /api/notes` - Create a new note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note

### Favourites
- `GET /api/favourites` - Get all favorites
- `POST /api/favourites` - Add a new favorite
- `DELETE /api/favourites/:id` - Remove a favorite
- `GET /api/favourites/:category` - Get favorites by category

### Chatbot
- `POST /api/chatbot/message` - Send message to AI chatbot

### Mood Tracking
- `POST /api/mood/track` - Track current mood

## 👤 **Creator**
**Sneha Kohale**  
*Lead Developer & Designer*

## 🙌 **Special Thanks**
- **🤖 Groq** - Powering our AI assistant
- **📊 MongoDB** - Storing your memories and tasks  
- **🖼️ Cloudinary** - Hosting your favorite images
- **💙 Our Users** - Your feedback drives me forward

---

<div align="center">

### ✨ Crafted with passion & dedication By Sneha Kohale ✨
*Because your mood matters*


</div>
