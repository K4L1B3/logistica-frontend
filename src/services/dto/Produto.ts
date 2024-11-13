// src/services/dto/Produto.ts
import { Fornecedor } from './Fornecedor';

export interface Produto {
  id?: string;
  nome: string;
  preco: number;
  quantidadeDisponivel: number;
  descricao: string;
  fornecedor: Fornecedor;
}
