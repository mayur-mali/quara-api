const router = require("express").Router();
const Answer = require("../models/Answer");
const Question = require("../models/Question");

router.post("/answer", async (req, res) => {
  try {
    const question = await Question.findById(req.body.question);

    if (question) {
      const answer = await Answer.create({
        content: req.body.content,
        question: req.body.question,
        user: req.body.userid,
      });
      question.answer.push(answer);
      question.save();
    }
    res.status(200).json({ massage: "answer added" });
  } catch (error) {
    res.status(500).json({ massage: error });
  }
});

module.exports = router;
