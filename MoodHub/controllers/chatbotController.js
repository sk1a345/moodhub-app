// controllers/chatbotController.js
const Groq = require("groq-sdk");
const Todo = require("../models/todo");
const Notes = require("../models/notes");
const FavouriteItem = require("../models/FavouriteItem");
const User = require("../models/user");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

module.exports.handleChat = async (req, res) => {
  try {
    const userId = req.userId;
    const userMessage = req.body.message;

    // Fetch user data
    const user = await User.findById(userId).lean();
    const userName = user?.name || "Friend";

    const todos = await Todo.find({ user: userId }).lean();
    const notes = await Notes.find({ user: userId }).lean();
    const favs = await FavouriteItem.find({ user: userId }).lean();

    // Fetch mood from session
    const mood = req.session.mood || "not set";

    // Summaries
    const todoSummary = todos
      .map(
        (t) => `• ${t.title} (priority: ${t.priority}, done: ${t.completed})`
      )
      .join("\n");

    const notesSummary = notes
      .map((n) => `• ${n.title}: ${n.description.slice(0, 60)}...`)
      .join("\n");

    const favSummary = favs
      .map((f) => `• ${f.category}: ${f.title} (rating: ${f.rating})`)
      .join("\n");

    // Context for AI
    const context = `

--- USER NAME ---
${userName}

--- USER MOOD ---
Current mood: ${mood}

--- USER TODOS ---
${todoSummary}

--- USER NOTES ---
${notesSummary}

--- USER FAVORITES ---
${favSummary}
    `;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `
You are MoodBuddy, a friendly personal assistant inside MoodHub.

The user's name is: ${userName}
Their current mood is: ${mood}

### How to use the user's mood
• Use the mood ONLY when it naturally fits the conversation.
• Do NOT mention the mood in every response.
• If the user does not ask about feelings or emotional topics, ignore the mood.
• Keep references to mood subtle, short, and not repetitive.

### Name usage
• You ARE allowed to call the user by name in every message.
• Keep tone warm, casual, and supportive.

### Using user data (todos, notes, favourites)
• You can use todos, notes, and favourites freely to give suggestions.
• BUT only when relevant to the user’s question.
• Avoid repeating the full list unless the user asks for it.

### Restrictions
• Never mention where you got this information.
• No psychological or medical advice.
• No diagnosing feelings.

Here is the user's context:
${context}
`,
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    const aiReply = completion.choices[0].message.content;
    res.json({ reply: aiReply });
  } catch (err) {
    console.error("Chat Error:", err);
    res.status(500).json({ reply: "Sorry… I had trouble thinking just now." });
  }
};

module.exports.getChat = (req, res) => {
  return res.render("chatbot", {
    currentPage: "chatbot",
    pageTitle: "chatbot",
  });
};
