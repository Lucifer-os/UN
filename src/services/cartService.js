import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with auth header
const createAxiosInstance = () => {
  const token = localStorage.getItem('token');
  return axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  });
};

export const cartService = {
  getCart: async () => {
    const instance = createAxiosInstance();
    const response = await instance.get('/cart');
    return response.data;
  },

  addToCart: async (productId, quantity) => {
    const instance = createAxiosInstance();
    const response = await instance.post('/cart', { productId, quantity });
    return response.data;
  },

  updateQuantity: async (productId, quantity) => {
    const instance = createAxiosInstance();
    const response = await instance.put(`/cart/${productId}`, { quantity });
    return response.data;
  },

  removeFromCart: async (productId) => {
    const instance = createAxiosInstance();
    const response = await instance.delete(`/cart/${productId}`);
    return response.data;
  },

  clearCart: async () => {
    const instance = createAxiosInstance();
    const response = await instance.delete('/cart');
    return response.data;
  }
}; 