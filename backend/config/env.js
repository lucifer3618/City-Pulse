import { config } from "dotenv";

config({path: `.env.${process.env.NODE_ENV || 'development'}.local`})

export const {
  PORT,
  NODE_ENV,
  DB_URI,
  JWT_SECRET, JWT_EXPIRES_IN,
  ARCJET_ENV, ARCJET_KEY,
  QSTASH_URL, QSTASH_TOKEN,
  GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET,
  MONGO_SECRET,
  FRONTEND_BASE_URL,
  APP_API_KEY,
  GEMINI_API_KEY,
  GEO_API_KEY,
  GEOAPIFY_API_KEY,
  OPENWEATHER_API_KEY,
  OPENUV_API_KEY
} = process.env;