import axios from 'axios';
const labUniteBaseApi = process.env.NEXT_PUBLIC_API_URL;
const axiosInstance = axios.create({
  baseURL: labUniteBaseApi,
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('patientToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default axiosInstance;
