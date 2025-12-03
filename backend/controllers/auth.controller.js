import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import passport from '../config/oauth2.js';

import User from '../models/user.model.js';
import { createToken, createUserSessions, sanitizeUser } from '../utils/auth.utils.js';
import { FRONTEND_BASE_URL } from '../config/env.js';

export const signUp = async (req, res, next) => {

  console.log(req.body);

  // Sign up logic implementation
  const session = await mongoose.startSession();
  // Implement ATOMIC transections
  session.startTransaction();

  try{
    const { name, email, password } = req.body;
    const apiMode = req.query.api === "true";

    const existingUser = await User.findOne({ email });

    // Check if user already existing on the system
    if (existingUser) {
      const error = new Error('User already exists');
      error.statusCode = 409;
      throw error;
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUsers = await User.create([{name, email, password: hashedPassword}], { session });

    const token = createToken(newUsers[0]);

    // Sanetize user before sent
    const safeUser = sanitizeUser(newUsers[0]);

    await session.commitTransaction();
    session.endSession();

    // For frontends, session is created
    if (!apiMode) {
      return createUserSessions(req, res, next, safeUser, "User Created Sucessfully!");
    }

     return res.status(201).json({
       success: true,
       message: 'User successfully created!',
       data: {
         token: token,
         user: safeUser,
       }
     });

  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    session.endSession();
    next(error);
  }
}

export const signIn = async (req, res, next) => {
  if (req.session.userId) {
    return res.status(400).json({ message: "User already logged in." });
  }
  // Sign in logic implementation
  try {
    const { email, password } = req.body;
    const apiMode = req.query.api === "true";

    const user = await User.findOne({email});

    if (!user) {
      const error = new Error('User not found!');
      error.statusCode = 404;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
      const error = new Error('Password not valid!');
      error.statusCode = 401;
      throw error;
    }

    const token = createToken(user);

    // Sanetize user before sent
    const safeUser = sanitizeUser(user)

    // For frontends, session is created
    if (!apiMode) {
      return createUserSessions(req, res, next, safeUser);
    }

    return res.status(200).json({
      success: true,
      message: 'User successfully signed in!',
      token: token,
      user: safeUser,
    });

  } catch (error){
    next(error);
  }
}

export const signOut = async (req, res, next) => {
  const apiMode = req.query.state === "true";

  if (apiMode) {
    // API mode logout (handle JWT if needed)
    return res.status(200).json({ message: "API logged out successfully!" });
  }

  req.session.destroy(err => {
    if (err) {
      console.error("Session destroy error:", err);
      return res.status(500).json({ message: "Could not log out!" });
    }

    res.clearCookie("connect.sid", {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return res.status(200).json({ message: "Logged out successfully!" });
  });
};


// Google Sign In
export const signInWithGoogle = (req, res, next) => {
  const apiMode = req.query.api === "true";
  if (req.session.userId) {
    if (apiMode) {
      return res.status(400).json({ message: "User already logged in." });
    }
    return  res.redirect(`${FRONTEND_BASE_URL}/dashboard`);
  }

  passport.authenticate('google',
    {
      scope: ['email', 'profile'],
      state: apiMode ? "true" : "false",
    })(req, res, next);
}


// Step 2: Handle callback
export const googleCallback = (req, res, next) => {
  passport.authenticate("google", { session: false }, async (err, profileUser) => {
    if (err) return next(err);

    const apiMode = req.query.state === "true";

    try {
      let user = await User.findOne({ email: profileUser.emails[0].value});

      if (!user) {
        user = await User.create({
          email: profileUser.emails[0].value,
          name: profileUser.displayName,
          googleId: profileUser.id,
          profileImage: profileUser.photos[0].value,
        });
      }

      if (err) return next(err);

      const token = createToken(user);

      // Sanetize user before sent
      const safeUser = sanitizeUser(user);

      // For frontends, session is created
      if (!apiMode) {
        return createUserSessions(req, res, next, safeUser, {
          redirect: `${FRONTEND_BASE_URL}/dashboard`,
        });
      }

      return res.status(200).json({
        success: true,
        message: 'User successfully signed in!',
        data: {
          token: token,
          user: safeUser,
        }
      });

    } catch (error) {
      next(error);
    }
  })(req, res, next);
};

export const getMe = async (req, res, next) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const user = await User.findById(req.session.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const safeUser = sanitizeUser(user);

    return res.status(200).json({ user: safeUser });
  } catch (err) {
    next(err);
  }
};