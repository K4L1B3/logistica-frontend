// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // colocar process.env quando for pro next
  withCredentials: true, 
});

export default api;
