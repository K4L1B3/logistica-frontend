import axios from 'axios';

const API_URL = 'http://localhost:8080/api/products';

// Interface para os produtos
export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}

// Função para buscar todos os produtos
export const getAllProducts = async () => {
  return axios.get<Product[]>(API_URL).then(response => response.data);
};

// Função para criar um novo produto
export const createProduct = async (productData: Omit<Product, 'id'>) => {
  return axios.post(API_URL, productData).then(response => response.data);
};

// Função para atualizar um produto existente
export const updateProduct = async (id: number, productData: Omit<Product, 'id'>) => {
  return axios.put(`${API_URL}/${id}`, productData).then(response => response.data);
};

// Função para deletar um produto
export const deleteProduct = async (id: number) => {
  return axios.delete(`${API_URL}/${id}`).then(response => response.data);
};
