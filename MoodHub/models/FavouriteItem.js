const mongoose = require("mongoose");

const favouriteItemSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "books",
        "movies",
        "music",
        "anime",
        "games",
        "food",
        "sports",
        "dramas",
        "cartoons"
      ]
    },

    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 1
    },

    description: {
      type: String,
      trim: true,
      default: ""
    },

    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },

    // THE FIELD YOU MISSED!!!
    posterUrl: {
      type: String,
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.models.favouriteItem || mongoose.model("FavouriteItem", favouriteItemSchema);
