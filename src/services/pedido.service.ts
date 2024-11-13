// src/services/pedidoService.ts
import api from './api';
import { Pedido } from './dto/Pedido';

const API_URL = '/pedido';

export const getAllPedidos = async (): Promise<Pedido[]> => {
  const response = await api.get<Pedido[]>(`${API_URL}/get`);
  return response.data;
};

export const createPedido = async (pedidoData: Pedido, clienteId: string, produtoId: string): Promise<Pedido> => {
  const response = await api.post(`${API_URL}/add/${clienteId}/${produtoId}`, pedidoData);
  return response.data;
};

export const updatePedidoStatus = async (id: number, status: string): Promise<void> => {
  await api.put(`${API_URL}/update/status/${id}`, { statusPedido: status });
};

export const deletePedido = async (id: number): Promise<void> => {
  await api.delete(`${API_URL}/delete/${id}`);
};
