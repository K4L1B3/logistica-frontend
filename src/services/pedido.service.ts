// src/services/pedidoService.ts
import api from './api';
import { Pedido, StatusPedido } from './dto/Pedido';
import { PedidoInput } from './dto/Pedido'; // Crie esta interface
import { Cliente } from './dto/Cliente';
import { Produto } from './dto/Produto';

const API_URL = '/pedido';

/**
 * Busca todos os pedidos.
 */
export const getAllPedidos = async (): Promise<Pedido[]> => {
  try {
    const response = await api.get<Pedido[]>(`${API_URL}/get`);

    if (!Array.isArray(response.data)) {
      throw new Error('Dados retornados pela API não são um array.');
    }

    return response.data;
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error);
    throw error;
  }
};

/**
 * Cria um novo pedido.
 * @param pedidoPayload Objeto contendo clienteId, produtoId e qtd
 */
export const createPedido = async (pedidoPayload: PedidoInput): Promise<Pedido> => {
  try {
    const response = await api.post<Pedido>(`${API_URL}/add`, pedidoPayload);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    throw error;
  }
};

/**
 * Atualiza o status do pedido.
 * @param id ID do pedido
 * @param status Novo status do pedido
 * @param route Rota específica para a atualização do status (opcional)
 */
export const updatePedidoStatus = async (id: number, status: StatusPedido, route?: string): Promise<void> => {
  try {
    const updateRoute = route ? route : `${API_URL}/update/status/${id}`;
    await api.put(updateRoute, { statusPedido: status });
  } catch (error) {
    console.error('Erro ao atualizar status do pedido:', error);
    throw error;
  }
};

/**
 * Deleta um pedido.
 */
export const deletePedido = async (id: number): Promise<void> => {
  try {
    await api.delete(`${API_URL}/delete/${id}`);
  } catch (error) {
    console.error('Erro ao deletar pedido:', error);
    throw error;
  }
};
