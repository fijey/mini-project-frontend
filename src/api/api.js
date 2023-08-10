// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Ganti dengan URL base API server Anda
  timeout: 10000, // Waktu timeout untuk permintaan
});

export default api;
