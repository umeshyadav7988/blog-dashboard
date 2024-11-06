// api.ts
import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchPost = async (id: number) => {
  const response = await axios.get(`${API_BASE_URL}/posts/${id}`);
  return response.data;
};

export const fetchUser = async (userId: number) => {
  const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
  return response.data;
};

export const fetchComments = async (postId: number) => {
  const response = await axios.get(`${API_BASE_URL}/posts/${postId}/comments`);
  return response.data;
};
