import axios from "axios";
import { GEMINI_API_KEY } from '../../config/env.js';

const geminiClient = axios.create({
  baseURL: "https://generativelanguage.googleapis.com/v1beta/models",
  params: {
    key: GEMINI_API_KEY,
  },
  headers: {
    'Content-Type': 'application/json',
  }
});

export default geminiClient;