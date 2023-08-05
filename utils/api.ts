// utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

export const getUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

export const getUserPhotos = async (userId:number) => {
  const response = await api.get(`/photos?albumId=${userId}`);
  return response.data[0].url; // Assuming the first photo is the user's image
};
