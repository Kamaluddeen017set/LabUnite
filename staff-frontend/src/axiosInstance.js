import axios from 'axios';

const labUniteBaseApi = process.env.NEXT_PUBLIC_API_URL;
console.log('API BASE:', labUniteBaseApi);

const axiosInstance = axios.create({
  baseURL: labUniteBaseApi,
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('userToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default axiosInstance;
