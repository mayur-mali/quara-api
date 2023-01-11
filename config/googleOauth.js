const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("../models/User");
const crypto = require("crypto");
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "1041970914867-8io4g6se6g02o9uj15hrttc8t9bck9tv.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "/api/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      // const user = {
      //   username: profile.displayName,
      //   profilePicture: profile.photos[0],
      //   googleId: profile.id
      // }
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return done(err, user);
      // });
      User.findOne({ email: profile.emails[0].value }).exec(function (
        err,
        user
      ) {
        if (err) {
          console.log("error in google strategy-passport", err);
          return;
        }
        console.log(accessToken, refreshToken);
        console.log(profile);

        if (user) {
          // if found, set this user as req.user
          return done(null, user);
        } else {
          // if not found, create the user and set it as req.user
          User.create(
            {
              username: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString("hex"),
              profilePicture: profile.photos[0].value,
            },
            function (err, user) {
              if (err) {
                console.log(
                  "error in creating user google strategy-passport",
                  err
                );
                return;
              }

              return done(null, user);
            }
          );
        }
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
