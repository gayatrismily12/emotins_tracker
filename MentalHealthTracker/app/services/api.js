// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.79.8.7:5000', // Your Node.js backend URL
});

export default api;