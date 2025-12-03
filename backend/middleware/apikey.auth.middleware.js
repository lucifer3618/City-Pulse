import { APP_API_KEY } from '../config/env.js';

export const apiKeyAuth = (req, res, next) => {
  const apiKey = req.headers['x-api-key'] || req.query.api_key;

  const validApiKey = APP_API_KEY;

  if (apiKey === validApiKey) {
    return next();
  }

  return res.status(401).json({
    success: false,
    message: "Invalid or missing API key"
  });
};