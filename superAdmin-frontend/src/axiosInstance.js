import axios from "axios";

const labUniteBaseApi = process.env.NEXT_PUBLIC_API_URL;
console.log("API BASE:", labUniteBaseApi);

const axiosInstance = axios.create({
  baseURL: labUniteBaseApi,
  headers: { "Content-Type": "application/json" },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token safely (no hooks)
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("LabAdminStrongToken") ||
          localStorage.getItem("SuperAdminStrongToken")
        : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
