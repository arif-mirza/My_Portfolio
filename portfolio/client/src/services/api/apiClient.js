import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "/api";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

// ── Request Interceptor: attach JWT token ─────────────────────
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("portfolio_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response Interceptor: handle 401 globally ─────────────────
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("portfolio_token");
      localStorage.removeItem("portfolio_user");
      // Only redirect if we're on an admin page
      if (window.location.pathname.startsWith("/admin")) {
        window.location.href = "/admin";
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
