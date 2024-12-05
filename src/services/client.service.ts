import api from './api';
import { Cliente } from './dto/Cliente';

const API_URL = '/cliente';

export const getAllClients = async (): Promise<Cliente[]> => {
  try {
    const response = await api.get<Cliente[]>(`${API_URL}/get`);
    console.log("DADOS DO CLIENTE", response.data)
    
    // Validação: garante que o retorno seja um array
    if (!Array.isArray(response.data)) {
      throw new Error('Dados retornados pela API não são um array.');
    }

    return response.data;
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    throw error; // Propaga o erro para ser tratado na page, se necessário
  }
};

export const createClient = async (clientData: Cliente): Promise<Cliente> => {
  try {
    const response = await api.post(`${API_URL}/add`, clientData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    throw error;
  }
};

export const updateClient = async (id: string, clientData: Cliente): Promise<Cliente> => {
  try {
    const response = await api.put(`${API_URL}/update/${id}`, clientData);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    throw error;
  }
};

export const deleteClient = async (id: string): Promise<void> => {
  try {
    await api.delete(`${API_URL}/delete/${id}`);
  } catch (error) {
    console.error('Erro ao deletar cliente:', error);
    throw error;
  }
};
