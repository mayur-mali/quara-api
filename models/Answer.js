const mongoose = require("mongoose");

const AnswerSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Answer", AnswerSchema);
