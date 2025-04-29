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

export const orderService = {
  createOrder: async (orderData) => {
    const instance = createAxiosInstance();
    const response = await instance.post('/orders', orderData);
    return response.data;
  },

  getOrders: async () => {
    const instance = createAxiosInstance();
    const response = await instance.get('/orders');
    return response.data;
  },

  getOrderById: async (id) => {
    const instance = createAxiosInstance();
    const response = await instance.get(`/orders/${id}`);
    return response.data;
  },

  updateOrderStatus: async (id, status) => {
    const instance = createAxiosInstance();
    const response = await instance.put(`/orders/${id}/status`, { status });
    return response.data;
  }
}; 