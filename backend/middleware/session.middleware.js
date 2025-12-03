import session from 'express-session';
import MongoStore from 'connect-mongo';
import { DB_URI, MONGO_SECRET, NODE_ENV } from '../config/env.js';

const sessionMiddleware = session({
  secret: MONGO_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: DB_URI,
    ttl: 60 * 60 * 24 * 14,
    autoRemove: 'native',
  }),
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 1000 * 60 * 60 * 24 * 14,
    sameSite: "lax",
  },
});

export default sessionMiddleware;