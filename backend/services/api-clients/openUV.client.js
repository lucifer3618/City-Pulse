import axios from "axios";
import { OPENUV_API_KEY } from "../../config/env.js";

const openUVClient = axios.create({
  baseURL: "https://api.openuv.io/api/v1",
  headers: {
    "x-access-token": OPENUV_API_KEY
  }
});

export default openUVClient;