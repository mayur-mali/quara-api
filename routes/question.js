const router = require("express").Router();
const Question = require("../models/Question");
const Answer = require("../models/Answer");

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
      populate: [
        { path: "user" },
        {
          path: "comment",
          populate: {
            path: "user",
          },
        },
      ],
    })
    .exec(function (err, quesions) {
      if (err) {
        return res.status(400).json(err);
      }
      return res.status(200).json(quesions);
    });
});

// delete post

router.delete("/:id", (req, res) => {
  const question = Question.findById(req.params.id);
  if (question.user === req.body.user) {
    console.log(question);
    res.redirect("back");
  }
  // if (question.user.id === req.body.userid) {
  //   question.remove();
  //   Answer.deleteMany({ question: req.body.userid }, (err) => {
  //     return res.status(400).json(err);
  //   });
  //   return res.status(200).json("post deleted");
  // } else {
  //   return res
  //     .status(400)
  //     .json("you don't have permission to delete this post");
  // }
});

module.exports = router;
