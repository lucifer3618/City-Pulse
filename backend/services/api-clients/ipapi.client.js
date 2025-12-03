import axios from "axios";

const ipAPIClient = axios.create({
  baseURL: "http://ip-api.com",
});

export default ipAPIClient;



