import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// api.interceptors.request.use(
//   (config) => {
//     config.headers["Content-Type"] = "application/json";
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

export default api;
