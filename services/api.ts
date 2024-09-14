import axios from 'axios';

const API_URL = 'http://localhost:8080/api/clients'; 

interface IClient {
  id?: number;
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  telefone: string;
  email: string;
  tipoServico: string;
  endereco: string;
  cep: string;
  complemento: string;
  estado: string;
  bairro: string;
  numero: string;
  cidade: string;
}

// Obter todos os clientes
export const getAllClients = async () => {
  return axios.get<IClient[]>(API_URL).then(response => response.data);
};

// Criar um novo cliente
export const createClient = async (clientData: IClient) => {
  return axios.post(API_URL, clientData).then(response => response.data);
};

// Atualizar um cliente existente
export const updateClient = async (id: number, clientData: IClient) => {
  return axios.put(`${API_URL}/${id}`, clientData).then(response => response.data);
};

// Deletar um cliente
export const deleteClient = async (id: number) => {
  return axios.delete(`${API_URL}/${id}`).then(response => response.data);
};
