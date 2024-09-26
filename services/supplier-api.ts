import axios from 'axios';

interface Supplier {
  id?: number;
  name: string;
  contact: string;
  serviceType: string;
  status: 'Ativo' | 'Inativo';
}

const API_URL = 'http://localhost:8080/api/suppliers'; // Substitua pela sua URL da API

export const getAllSuppliers = async () => {
  const response = await axios.get<Supplier[]>(API_URL);
  return response.data;
};

export const createSupplier = async (supplierData: Supplier) => {
  const response = await axios.post<Supplier>(API_URL, supplierData);
  return response.data;
};

export const updateSupplier = async (id: number, supplierData: Supplier) => {
  const response = await axios.put<Supplier>(`${API_URL}/${id}`, supplierData);
  return response.data;
};

export const deleteSupplier = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
