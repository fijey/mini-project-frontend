// api.js
import axios from 'axios';

const token = localStorage.getItem('token');
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', 
  // baseURL: 'https://oo-backend.visualkreatif.com/api', 
  timeout: 10000, 
  headers: {
    'Authorization': `Bearer ${token}`, // Contoh penambahan header Authorization
    'Content-Type': 'multipart/form-data', 
  }
});

export default api;
