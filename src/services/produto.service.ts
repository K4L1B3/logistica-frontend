// src/services/api/produtoService.ts
import api from './api';
import { Produto } from './dto/Produto';

const API_URL = '/produto';

export const getAllProdutos = async (): Promise<Produto[]> => {
  const response = await api.get<Produto[]>(`${API_URL}/get`);
  return response.data;
};

export const createProduto = async (produtoData: Produto): Promise<Produto> => {
  const response = await api.post(`${API_URL}/add`, produtoData);
  return response.data;
};

export const updateProduto = async (id: string, produtoData: Produto): Promise<Produto> => {
  const response = await api.put(`${API_URL}/update/${id}`, produtoData);
  return response.data;
};

export const deleteProduto = async (id: string): Promise<void> => {
  await api.delete(`${API_URL}/delete/${id}`);
};
