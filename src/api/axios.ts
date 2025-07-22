import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api", 
});

// Interceptor para incluir o token automaticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de resposta para lidar com 401 e fazer refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Evita loop infinito
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("refreshToken")
    ) {
      originalRequest._retry = true;
      try {
        const res = await axios.post("http://localhost:8000/api/auth/token/refresh/", {
          refresh: localStorage.getItem("refreshToken"),
        });

        const newAccess = res.data.access;
        localStorage.setItem("authToken", newAccess);
        api.defaults.headers.common["Authorization"] = `Bearer ${newAccess}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccess}`;

        return api(originalRequest); // Reenvia a requisição original com novo token
      } catch (refreshError) {
        console.error("Refresh token expirado");
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/"; // Redireciona para login
      }
    }

    return Promise.reject(error);
  }
);

export default api;
