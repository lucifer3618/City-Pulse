import axios from "axios";
import { GEO_API_KEY } from '../../config/env.js';

const geoDBClient = axios.create({
  baseURL: "https://wft-geo-db.p.rapidapi.com/v1/geo",
  headers: {
    "X-RapidAPI-Key": GEO_API_KEY,
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com"
  },
});

export default geoDBClient;