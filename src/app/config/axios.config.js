import axios from 'axios';

const token = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : null;

axios.interceptors.request.use(
  request => request,
  error => Promise.reject(error)
);

axios.interceptors.response.use(
  response => response,
  error => {
    const status = error.response?.status || 500;
    if (status === 401) localStorage.setItem('token', 'expired');
    return Promise.reject(error);
  }
);
