import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = {
  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials, {
        withCredentials: true, // Include cookies in the login request
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  verifyToken: async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/verify`, {
        withCredentials: true, // Include cookies in the request
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  createUser: async (userdata) => {
    try {
      const response = await axios.post(`${API_URL}/user/create`, userdata);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  resetUserPassword: async (userdata) => {
    try {
      const response = await axios.post(`${API_URL}/user/reset-password`, userdata);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

};

export default api;
