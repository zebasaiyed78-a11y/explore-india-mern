import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' }
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('explore_india_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const api = {
  health: () => apiClient.get('/health'),
  getItems: (params = {}) => apiClient.get('/items', { params }),
  getItem: (id) => apiClient.get(`/items/${id}`),
  createItem: (data) => apiClient.post('/items', data),
  updateItem: (id, data) => apiClient.put(`/items/${id}`, data),
  deleteItem: (id) => apiClient.delete(`/items/${id}`),
  getItineraries: () => apiClient.get('/itineraries'),
  register: (data) => apiClient.post('/auth/register', data),
  login: (data) => apiClient.post('/auth/login', data),
  me: () => apiClient.get('/me'),
  toggleFavorite: (slug) => apiClient.post(`/favorites/${slug}`),
  savePlan: (data) => apiClient.post('/plans', data),
  getPlans: () => apiClient.get('/plans'),
  sendInquiry: (data) => apiClient.post('/inquiries', data)
};

export const getErrorMessage = (error, fallback = 'Something went wrong.') =>
  error?.response?.data?.error || error?.message || fallback;

export default apiClient;
