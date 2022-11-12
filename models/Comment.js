const mongoose = require("mongoose");

const CommentsSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    answer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Answer",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentsSchema);
