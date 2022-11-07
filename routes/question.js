const router = require("express").Router();
const Question = require("../models/Question");

router.post("/question", async (req, res) => {
  try {
    const question = await Question.create({
      content: req.body.content,
      user: req.body.user,
    });
    question.save();
    res
      .status(200)
      .json({ status: "success", massage: "question is posted", question });
  } catch (error) {
    res.status(500).json({ massege: error });
  }
});

module.exports = router;
