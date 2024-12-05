// src/services/dto/Pedido.ts
import { Cliente } from './Cliente';
import { Produto } from './Produto';

export enum StatusPedido {
  PEDIDO_REALIZADO = 'PEDIDO_REALIZADO',
  PEDIDO_CONFIRMADO = 'PEDIDO_CONFIRMADO',
  NOTA_GERADA = 'NOTA_GERADA',
  PEDIDO_RECEBIDO = 'PEDIDO_RECEBIDO',
  ENVIADO_TRANSPORTADORA = 'ENVIADO_TRANSPORTADORA',
  RECEBIDO_TRANSPORTADORA = 'RECEBIDO_TRANSPORTADORA',
  MERCADORIA_TRANSITO = 'MERCADORIA_TRANSITO',
  PEDIDO_ENTREGUE = 'PEDIDO_ENTREGUE',
  PROCESSO_DEVOLUCAO = 'PROCESSO_DEVOLUCAO',
  PEDIDO_DEVOLVIDO = 'PEDIDO_DEVOLVIDO',
  PEDIDO_CANCELADO = 'PEDIDO_CANCELADO',
  PROBLEMA_ENTREGA = 'PROBLEMA_ENTREGA'
}

export interface Pedido {
  id?: number;
  cliente?: Cliente;
  produto?: Produto;
  notaFiscal?: string;
  valor: number;
  qtd: number;
  statusPedido: StatusPedido;
}

// src/services/dto/PedidoInput.ts
export interface PedidoInput {
  clienteId: string;
  produtoId: string;
  qtd: number;
}
