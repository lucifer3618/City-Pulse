import axios from "axios";
import { OPENWEATHER_API_KEY } from "../../config/env.js";

const openWeatherClient = axios.create({
  baseURL: "https://api.openweathermap.org/data",
  params: {
    appid: OPENWEATHER_API_KEY,
    units: "metric",
  },
});

export default openWeatherClient;
