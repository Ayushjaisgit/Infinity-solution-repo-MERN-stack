import axios from 'axios';

export const API_BASE_URL = 'http://localhost:5001/api/auth'; // Replace with your API base URL

export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users`, userData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteUser = async (userId) => {
  try {
    await axios.delete(`${API_BASE_URL}/users/${userId}`);
  } catch (error) {
    console.error(error);
  }
};

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Define more functions for other APIs as needed
