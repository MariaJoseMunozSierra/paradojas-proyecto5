import axios from "axios";

const conexion = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Antes de cada petición si hay token guardado se agrega al header
conexion.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }
  return config;
});

export default conexion;