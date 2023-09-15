import axios from 'axios'
import Cookie from 'js-cookie'

const api = axios.create({
  baseURL: 'http://localhost:3001/api/v1',
})

api.interceptors.request.use((config) => {
  const token = Cookie.get("Quizzify.authToken")

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api