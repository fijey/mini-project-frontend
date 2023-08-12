// api.js
import axios from 'axios';

const token = localStorage.getItem('token');
const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Ganti dengan URL base API server Anda
  timeout: 10000, // Waktu timeout untuk permintaan
  headers: {
    'Authorization': `Bearer ${token}`, // Contoh penambahan header Authorization
    'Content-Type': 'multipart/form-data', // Contoh penambahan header Content-Type
    // Tambahkan header lain sesuai kebutuhan Anda
  }
});

export default api;
