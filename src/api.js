import axios from 'axios';

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

export const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

export async function fetchMenu() {
  const { data } = await api.get('/menu');
  return data.data;
}

export async function createOrder(payload) {
  const { data } = await api.post('/orders', payload);
  return data.data;
}

export async function fetchOrders() {
  const { data } = await api.get('/orders');
  return data.data;
}
