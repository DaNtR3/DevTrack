import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = {
  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default api;