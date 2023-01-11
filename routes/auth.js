const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");
const home = "http://localhost:3000/";
// GOOGLE LOGIN

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: home,
    failureRedirect: "http://localhost:3000/login",
  })
);

//REGISTER USER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });
    const user = await newUser.save();
    return res.status(200).json({ massege: "user created", user });
  } catch (err) {
    return res.status(500).json({ massege: "user not created", err });
  }
});

// LOG IN

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send("user not found");
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).json("wrong password");
    }
    return res.status(200).json({ massege: "user log in", user });
  } catch (err) {
    res.status(500).json({ massege: "some issue with login " });
  }
});

module.exports = router;
