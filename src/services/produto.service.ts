// src/services/api/produtoService.ts
import api from './api';
import { Produto } from './dto/Produto';

const API_URL = '/produto';

export const getAllProdutos = async (): Promise<Produto[]> => {
  
  try {
    const response = await api.get<Produto[]>(`${API_URL}/get`);

  // Validação: garante que o retorno seja um array
  if (!Array.isArray(response.data)) {
    throw new Error('Dados retornados pela API não são um array.');
  }

  return response.data;
} catch (error) {
  console.error('Erro ao buscar produto:', error);
  throw error; 
}
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
