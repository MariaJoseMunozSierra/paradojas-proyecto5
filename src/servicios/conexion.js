import axios from "axios";

const conexion = axios.create({
  baseURL: "https://paradojas-backend.onrender.com/api",
});

conexion.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }
  return config;
});

export default conexion;