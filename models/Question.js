const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    imageurl: {
      type: String,
    },
    channel_category: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    answer: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Answer",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", QuestionSchema);
