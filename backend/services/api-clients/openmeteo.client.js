import axios from "axios";

const openmeteoClient = axios.create({
  baseURL: "https://air-quality-api.open-meteo.com/v1",
});

export default openmeteoClient;
