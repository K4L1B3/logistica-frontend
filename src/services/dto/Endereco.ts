// src/services/dto/Endereco.ts
import { Cliente } from './Cliente';
import { Fornecedor } from './Fornecedor';

export interface Endereco {
  id?: string;
  cep: string;
  rua: string;
  cidade: string;
  estado: string;
  bairro: string;
  numero: number;
  complemento?: string;
  cliente?: Cliente;
  fornecedor?: Fornecedor;
}
