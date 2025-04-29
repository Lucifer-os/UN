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

export const productService = {
  getAll: async () => {
    const instance = createAxiosInstance();
    const response = await instance.get('/products');
    return response.data;
  },

  getById: async (id) => {
    const instance = createAxiosInstance();
    const response = await instance.get(`/products/${id}`);
    return response.data;
  },

  create: async (productData) => {
    const instance = createAxiosInstance();
    const response = await instance.post('/products', productData);
    return response.data;
  },

  update: async (id, productData) => {
    const instance = createAxiosInstance();
    const response = await instance.put(`/products/${id}`, productData);
    return response.data;
  },

  delete: async (id) => {
    const instance = createAxiosInstance();
    const response = await instance.delete(`/products/${id}`);
    return response.data;
  },

  addRating: async (id, ratingData) => {
    const instance = createAxiosInstance();
    const response = await instance.post(`/products/${id}/ratings`, ratingData);
    return response.data;
  }
}; 