// src/services/fornecedorService.ts
import api from './api';
import { Fornecedor } from './dto/Fornecedor';

const API_URL = '/fornecedor';

export const getAllSuppliers = async (): Promise<Fornecedor[]> => {
  const response = await api.get<Fornecedor[]>(`${API_URL}/get`);
  return response.data;
};

export const createSupplier = async (supplierData: Fornecedor): Promise<Fornecedor> => {
  const response = await api.post(`${API_URL}/add`, supplierData);
  return response.data;
};

export const updateSupplier = async (id: string, supplierData: Fornecedor): Promise<Fornecedor> => {
  const response = await api.put(`${API_URL}/update/${id}`, supplierData);
  return response.data;
};

export const deleteSupplier = async (id: string): Promise<void> => {
  await api.delete(`${API_URL}/delete/${id}`);
};
