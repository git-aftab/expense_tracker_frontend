import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "http//localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor - automatically adds token to request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor - Handle errors globally
api.interceptors.response.use(
  (Response) => Response,
  (error) => {
    if (error.response?.status === 401) {
      // Token Expired or invalid
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;