import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5500',
  withCredentials: true
});

apiClient.defaults.headers.common['x-api-key'] = import.meta.env.VITE_APP_API_KEY;

export default apiClient;