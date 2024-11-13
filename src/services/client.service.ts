// src/services/clientService.ts
import api from './api';
import { Cliente } from './dto/Cliente';

const API_URL = '/cliente';

export const getAllClients = async (): Promise<Cliente[]> => {
  const response = await api.get<Cliente[]>(`${API_URL}/get`);
  return response.data;
};

export const createClient = async (clientData: Cliente): Promise<Cliente> => {
  const response = await api.post(`${API_URL}/add`, clientData);
  return response.data;
};

export const updateClient = async (id: string, clientData: Cliente): Promise<Cliente> => {
  const response = await api.put(`${API_URL}/update/${id}`, clientData);
  return response.data;
};

export const deleteClient = async (id: string): Promise<void> => {
  await api.delete(`${API_URL}/delete/${id}`);
};
