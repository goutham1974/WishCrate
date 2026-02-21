import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors — clear token and redirect to login on 401/403
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

// Product APIs
export const productAPI = {
  getAll: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  search: (keyword, params) => api.get('/products/search', { params: { keyword, ...params } }),
  getByCategory: (categoryId, params) => api.get(`/products/category/${categoryId}`, { params }),
  getFeatured: () => api.get('/products/featured'),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
};

// Category APIs
export const categoryAPI = {
  getAll: () => api.get('/categories'),
  getById: (id) => api.get(`/categories/${id}`),
};

// Cart APIs
export const cartAPI = {
  get: () => api.get('/cart'),
  add: (productId, quantity) => api.post('/cart/add', null, { params: { productId, quantity } }),
  update: (cartItemId, quantity) => api.put(`/cart/update/${cartItemId}`, null, { params: { quantity } }),
  remove: (cartItemId) => api.delete(`/cart/remove/${cartItemId}`),
  clear: () => api.delete('/cart/clear'),
};

// Address APIs
export const addressAPI = {
  getAll: () => api.get('/addresses'),
  save: (data) => api.post('/addresses', data),
  delete: (id) => api.delete(`/addresses/${id}`),
};

// Order APIs
export const orderAPI = {
  create: (shippingAddress, paymentMethod) =>
    api.post('/orders/create', { shippingAddress, paymentMethod }),
  getAll: (params) => api.get('/orders', { params }),
  getById: (orderId) => api.get(`/orders/${orderId}`),
  cancel: (orderId) => api.put(`/orders/${orderId}/cancel`),
  updateStatus: (orderId, status) => api.put(`/orders/${orderId}/status`, null, { params: { status } }),
};

// Admin APIs
export const adminAPI = {
  getStats: () => api.get('/admin/stats'),
};

export default api;
