import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env.js';

export function createToken(user) {
  return jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function sanitizeUser(user) {
  const safeUser = user.toObject();
  delete safeUser.password;
  delete safeUser.__v;
  return safeUser;
}

export function createUserSessions(req, res, next, safeUser, options = { message: "User Logged in Successfully!", redirect: null }) {
  return req.session.regenerate(async (err) => {
    if (err) return next(err);

    req.session.userId = safeUser._id;

    req.session.save((err) => {
      if (err) return next(err);

      if (options.redirect) {
        return res.redirect(options.redirect);
      }

      return res.status(201).json({
        success: true,
        message: options.message,
        user: safeUser,
      });
    });
  });
}

export function getUserId(req) {
  if (req.session && req.session.userId) {
    return req.session.userId;
  }

  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded.id;
  }

  return null;
}

