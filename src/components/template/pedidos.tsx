'use client'

import { useState, useRef } from 'react'
import { PlusCircle, Pencil, Trash2, FileUp, Check, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface Cliente {
  id?: string;
  nome: string;
}

interface Produto {
  id?: string;
  nome: string;
  preco: number;
}

enum StatusPedido {
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

interface Pedido {
  id?: number;
  cliente?: Cliente;
  produto?: Produto;
  notaFiscal?: File;
  valor: number;
  qtd: number;
  statusPedido: StatusPedido;
}

export function PedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([])
  const [clientes] = useState<Cliente[]>([
    { id: '1', nome: 'Cliente A' },
    { id: '2', nome: 'Cliente B' },
  ])
  const [produtos] = useState<Produto[]>([
    { id: '1', nome: 'Produto A', preco: 100 },
    { id: '2', nome: 'Produto B', preco: 200 },
  ])

  const [newPedido, setNewPedido] = useState<Pedido>({
    valor: 0,
    qtd: 0,
    statusPedido: StatusPedido.PEDIDO_REALIZADO,
  })
  const [editingPedido, setEditingPedido] = useState<Pedido | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleAddPedido = () => {
    const pedidoToAdd = {
      ...newPedido,
      id: Date.now(),
    }
    setPedidos([...pedidos, pedidoToAdd])
    setNewPedido({
      valor: 0,
      qtd: 0,
      statusPedido: StatusPedido.PEDIDO_REALIZADO,
    })
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleEditPedido = (pedido: Pedido) => {
    setEditingPedido({ ...pedido })
  }

  const handleSavePedido = () => {
    if (editingPedido) {
      setPedidos(pedidos.map(p => p.id === editingPedido.id ? editingPedido : p))
      setEditingPedido(null)
    }
  }

  const handleCancelEdit = () => {
    setEditingPedido(null)
  }

  const handleRemovePedido = (id: number) => {
    setPedidos(pedidos.filter(p => p.id !== id))
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setNewPedido({ ...newPedido, notaFiscal: file })
    }
  }

  const getStatusLabel = (status: StatusPedido) => {
    return status.replace(/_/g, ' ').toLowerCase()
      .replace(/\b\w/g, l => l.toUpperCase())
  }

  return (
    <div className="mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Gerenciamento de Pedidos</h1>

      <div className="grid gap-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <Select
            onValueChange={(value) => {
              const cliente = clientes.find(c => c.id === value)
              if (cliente) {
                setNewPedido({ ...newPedido, cliente })
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione um cliente" />
            </SelectTrigger>
            <SelectContent>
              {clientes.map((cliente) => (
                <SelectItem key={cliente.id} value={cliente.id!}>
                  {cliente.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) => {
              const produto = produtos.find(p => p.id === value)
              if (produto) {
                setNewPedido({ ...newPedido, produto, valor: produto.preco })
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione um produto" />
            </SelectTrigger>
            <SelectContent>
              {produtos.map((produto) => (
                <SelectItem key={produto.id} value={produto.id!}>
                  {produto.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            type="number"
            placeholder="0"
            value={newPedido.valor}
            onChange={(e) => setNewPedido({ ...newPedido, valor: parseFloat(e.target.value) })}
          />
          <Input
            type="number"
            placeholder="0"
            value={newPedido.qtd}
            onChange={(e) => setNewPedido({ ...newPedido, qtd: parseInt(e.target.value) })}
          />
        </div>

        <div className="flex items-center gap-4">
          <Label htmlFor="notaFiscal" className="cursor-pointer">
            <div className="flex items-center gap-2 p-2 border rounded-md">
              <FileUp size={16} />
              <span>Upload Nota Fiscal (PDF)</span>
            </div>
          </Label>
          <Input
            id="notaFiscal"
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleFileChange}
            ref={fileInputRef}
          />
          {newPedido.notaFiscal && <span>{newPedido.notaFiscal.name}</span>}
        </div>

        <div className='flex justify-end'>
          <Button
            onClick={handleAddPedido}
            className="w-1/6 bg-black hover:bg-black/90 text-white"
          >
            Adicionar Pedido
          </Button>
        </div>


      </div>

      <div className="bg-white rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Produto</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Nota Fiscal</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pedidos.map((pedido) => (
              <TableRow key={pedido.id}>
                <TableCell>
                  {editingPedido?.id === pedido.id ? (
                    <Select
                      value={editingPedido!.cliente?.id}
                      onValueChange={(value) => {
                        const cliente = clientes.find(c => c.id === value)
                        if (cliente) {
                          setEditingPedido({ ...editingPedido!, cliente })
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um cliente" />
                      </SelectTrigger>
                      <SelectContent>
                        {clientes.map((cliente) => (
                          <SelectItem key={cliente.id} value={cliente.id!}>
                            {cliente.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    pedido.cliente?.nome
                  )}
                </TableCell>
                <TableCell>
                  {editingPedido?.id === pedido.id ? (
                    <Select
                      value={editingPedido!.produto?.id}
                      onValueChange={(value) => {
                        const produto = produtos.find(p => p.id === value)
                        if (produto) {
                          setEditingPedido({ ...editingPedido!, produto, valor: produto.preco })
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um produto" />
                      </SelectTrigger>
                      <SelectContent>
                        {produtos.map((produto) => (
                          <SelectItem key={produto.id} value={produto.id!}>
                            {produto.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    pedido.produto?.nome
                  )}
                </TableCell>
                <TableCell>
                  {editingPedido?.id === pedido.id ? (
                    <Input
                      type="number"
                      value={editingPedido!.valor}
                      onChange={(e) => setEditingPedido({ ...editingPedido!, valor: parseFloat(e.target.value) })}
                    />
                  ) : (
                    `R$ ${pedido.valor.toFixed(2)}`
                  )}
                </TableCell>
                <TableCell>
                  {editingPedido?.id === pedido.id ? (
                    <Input
                      type="number"
                      value={editingPedido!.qtd}
                      onChange={(e) => setEditingPedido({ ...editingPedido!, qtd: parseInt(e.target.value) })}
                    />
                  ) : (
                    pedido.qtd
                  )}
                </TableCell>
                <TableCell>
                  {editingPedido?.id === pedido.id ? (
                    <Select
                      value={editingPedido!.statusPedido}
                      onValueChange={(value) => setEditingPedido({ ...editingPedido!, statusPedido: value as StatusPedido })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um status" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(StatusPedido).map((status) => (
                          <SelectItem key={status} value={status}>
                            {getStatusLabel(status)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    getStatusLabel(pedido.statusPedido)
                  )}
                </TableCell>
                <TableCell>{pedido.notaFiscal ? pedido.notaFiscal.name : 'Não enviada'}</TableCell>
                <TableCell className="text-right">
                  {editingPedido?.id === pedido.id ? (
                    <div className="flex justify-end gap-2">
                      <Button onClick={handleSavePedido} variant="outline" size="icon">
                        <Check size={16} />
                      </Button>
                      <Button onClick={handleCancelEdit} variant="outline" size="icon">
                        <X size={16} />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex justify-end gap-2">
                      <Button onClick={() => handleEditPedido(pedido)} variant="outline" size="icon">
                        <Pencil size={16} />
                      </Button>
                      <Button
                        onClick={() => handleRemovePedido(pedido.id!)}
                        variant="outline"
                        size="icon"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}