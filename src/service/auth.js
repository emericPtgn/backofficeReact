// services/auth.js
import axios from 'axios';

export const login = async (username, password) => {
  const response = await axios.post('/api/login_check', { username, password });
  const { token } = response.data;
  localStorage.setItem('token', token);
  setAuthHeader(token);
};

export const logout = () => {
  localStorage.removeItem('token');
  removeAuthHeader();
};

export const setAuthHeader = (token) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const removeAuthHeader = () => {
  delete axios.defaults.headers.common['Authorization'];
};

// Vérifiez le token au chargement de l'application
export const checkAuth = () => {
  const token = localStorage.getItem('token');
  if (token) {
    setAuthHeader(token);
    return true;
  }
  return false;
};