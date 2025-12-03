import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';
import User from '../models/user.model.js';

const authorize = async (req, res, next) => {
  try {
    if (req.headers.authorization?.startsWith('Bearer ')) {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(decoded.userId);
      if (!user) throw new Error('User not found');
      req.user = user;
      return next();
    }

    if (req.session?.userId) {
      const user = await User.findById(req.session.userId);
      if (!user) throw new Error('User not found');
      req.user = user;
      return next();
    }

    return res.status(401).json({ message: 'Unauthorized' });
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized', error: err.message });
  }
};

export default authorize;
