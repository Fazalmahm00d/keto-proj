import axios from "axios";

const api = axios.create({
  baseURL: "https://ketodalia.onrender.com", // Replace with your backend URL
  withCredentials: true, // To send cookies with requests
});

export default api;
