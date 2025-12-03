import axios from "axios";
import { GEOAPIFY_API_KEY } from '../../config/env.js';

const geoapifyClient = axios.create({
  baseURL: "https://api.geoapify.com",
  params: {
    apiKey: GEOAPIFY_API_KEY,
  }
});

export default geoapifyClient;