const router = require("express").Router();
const Comment = require("../models/Comment");
const Answer = require("../models/Answer");
// comments question
router.post("/comment", async (req, res) => {
  try {
    const answer = await Answer.findById(req.body.answer);
    if (answer) {
      // console.log(answer);
      const comment = await Comment.create(req.body);
      answer.comment.push(comment);
      answer.save();
    }
    return res.status(200).json({ done: "comment added" });
  } catch (error) {
    res.status(500).json("error");
  }
});

module.exports = router;
