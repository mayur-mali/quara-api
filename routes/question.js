const router = require("express").Router();
const Question = require("../models/Question");

// post question
router.post("/question", async (req, res) => {
  try {
    const question = await Question.create(req.body);
    question.save();
    res.status(200).json({ status: "success", massage: "question is posted" });
  } catch (error) {
    res.status(500).json({ massege: error });
  }
});

// get all questions
router.get("/all", async (req, res) => {
  Question.find({})
    .populate("user")
    .populate({
      path: "answer",
      populate: {
        path: "user",
        path: "comment",
      },
    })
    .exec(function (err, quesions) {
      if (err) {
        return res.status(400).json(err);
      }
      return res.status(200).json(quesions);
    });
});

module.exports = router;
