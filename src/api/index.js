import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://blognest-apis-production.up.railway.app/api/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Authentication failed — redirecting to login.');

      localStorage.removeItem('token');
      localStorage.removeItem('userId');

      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);
