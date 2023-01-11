const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const db = require("./config/mongoose");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const questionRoute = require("./routes/question");
const answerRoute = require("./routes/answer");
const commentRoute = require("./routes/comment");
const passport = require("passport");
const session = require("express-session");
const passportGoogle = require("./config/googleOauth");
const cors = require("cors");
app.use(
  session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
dotenv.config();

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/post", questionRoute);
app.use("/api/post", answerRoute);
app.use("/api/post", commentRoute);

app.listen(port, function (err) {
  if (err) {
    console.log(`error in running the server: ${err}`);
  }
  console.log(`Server is listening on ${port}`);
});
