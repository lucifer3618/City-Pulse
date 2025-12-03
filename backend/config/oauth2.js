import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import passport from 'passport';
var GoogleStrategy = require('passport-google-oauth20').Strategy;

import User from "../models/user.model.js";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "./env.js";

// Configure strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5500/api/v1/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        return done(null, profile);
      } catch (err) {
        console.error("Google OAuth error:", err);
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
