// src/services/dto/Produto.ts
import { Fornecedor } from './Fornecedor';

export interface Produto {
  id?: string;
  nome: string;
  preco: number;
  quantidadeDisponivel: number;
  descricao: string;
  fornecedorId?: Fornecedor["id"]; // Enviado ao backend
  fornecedor?: Fornecedor; // Retornado pelo backend
}
