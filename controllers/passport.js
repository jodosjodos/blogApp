  import express from "express";
  import passport from "passport";
  import { Strategy as GoogleStrategy } from "passport-google-oauth20";
  import * as dotenv from "dotenv";

  const router = express.Router();

  dotenv.config();

  // Configure Passport.js to use the Google OAuth2 strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      function (accessToken, refreshToken, profile, done) {
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //   return cb(err, user);
        // });
        // const user = {
        //   username: profile.displayName,
        //   email: profile.email,
        //   password: profile.passport,
        // };
        // user.save

        // letter being used
        done(null, profile);
      }
    )
  );

  // Configure Passport.js to serialize and deserialize user information
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  export default passport