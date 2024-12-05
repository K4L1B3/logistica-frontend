// src/pages/PedidosPage.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { Pencil, Trash2, Check, X } from 'lucide-react'
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
import {
  getAllPedidos,
  createPedido,
  updatePedidoStatus,
  deletePedido
} from '@/services/pedido.service';
import { getAllClients } from '@/services/client.service';
import { getAllProdutos } from '@/services/produto.service';
import { Pedido as PedidoDTO, StatusPedido } from '@/services/dto/Pedido'
import { Cliente } from '@/services/dto/Cliente'
import { Produto } from '@/services/dto/Produto'

interface PedidoInput {
  clienteId: string;
  produtoId: string;
  qtd: number;
}

export function PedidosPage() {
  const [pedidos, setPedidos] = useState<PedidoDTO[]>([])
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [produtos, setProdutos] = useState<Produto[]>([])

  const [newPedido, setNewPedido] = useState<PedidoInput>({
    clienteId: '',
    produtoId: '',
    qtd: 0,
  })
  const [editingPedido, setEditingPedido] = useState<PedidoDTO | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pedidosData, clientesData, produtosData] = await Promise.all([
          getAllPedidos(),
          getAllClients(),
          getAllProdutos(),
        ])
        setPedidos(pedidosData)
        setClientes(clientesData)
        setProdutos(produtosData)
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
      }
    }

    fetchData()
  }, [])

  const handleAddPedido = async () => {
    try {
      if (!newPedido.clienteId || !newPedido.produtoId) {
        alert('Por favor, selecione um cliente e um produto.')
        return
      }

      const pedidoPayload: PedidoInput = {
        clienteId: newPedido.clienteId,
        produtoId: newPedido.produtoId,
        qtd: newPedido.qtd,
      }

      const createdPedido = await createPedido(pedidoPayload)
      setPedidos([...pedidos, createdPedido])
      setNewPedido({ clienteId: '', produtoId: '', qtd: 0 })
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (error) {
      console.error('Erro ao adicionar pedido:', error)
    }
  }

  const handleEditPedido = (pedido: PedidoDTO) => {
    setEditingPedido({ ...pedido })
  }

  const handleSavePedido = async () => {
    if (editingPedido) {
      try {
        // Determinar a rota correta com base no status
        let updateRoute = `/pedido/update/status/${editingPedido.id}`
        if (
          editingPedido.statusPedido === StatusPedido.PROCESSO_DEVOLUCAO ||
          editingPedido.statusPedido === StatusPedido.PEDIDO_DEVOLVIDO ||
          editingPedido.statusPedido === StatusPedido.PEDIDO_CANCELADO
        ) {
          updateRoute = `/pedido/update/status/devolucao/${editingPedido.id}`
        }

        await updatePedidoStatus(editingPedido.id, editingPedido.statusPedido, updateRoute)
        setPedidos(pedidos.map(p => p.id === editingPedido.id ? editingPedido : p))
        setEditingPedido(null)
      } catch (error) {
        console.error('Erro ao atualizar pedido:', error)
      }
    }
  }

  const handleCancelEdit = () => {
    setEditingPedido(null)
  }

  const handleRemovePedido = async (id: number) => {
    try {
      await deletePedido(id)
      setPedidos(pedidos.filter(p => p.id !== id))
    } catch (error) {
      console.error('Erro ao remover pedido:', error)
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
            value={newPedido.clienteId}
            onValueChange={(value) => {
              setNewPedido({ ...newPedido, clienteId: value })
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione um cliente" />
            </SelectTrigger>
            <SelectContent>
              {clientes.map((cliente) => (
                <SelectItem key={cliente.id} value={cliente.id}>
                  {cliente.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={newPedido.produtoId}
            onValueChange={(value) => {
              setNewPedido({ ...newPedido, produtoId: value })
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione um produto" />
            </SelectTrigger>
            <SelectContent>
              {produtos.map((produto) => (
                <SelectItem key={produto.id} value={produto.id}>
                  {produto.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <Input
            type="number"
            placeholder="Quantidade"
            value={newPedido.qtd}
            onChange={(e) => setNewPedido({ ...newPedido, qtd: parseInt(e.target.value) })}
            min={1}
          />
        </div>

        {/* 
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
          {newPedido.notaFiscal && <span>{newPedido.notaFiscal}</span>}
        </div>
        */}

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
              {/* <TableHead>Nota Fiscal</TableHead> */}
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pedidos.map((pedido) => {
              const cliente = pedido.cliente
              const produto = pedido.produto

              return (
                <TableRow key={pedido.id}>
                  <TableCell>
                    {editingPedido?.id === pedido.id ? (
                      <Select
                        value={editingPedido.cliente.id}
                        onValueChange={(value) => {
                          const selectedCliente = clientes.find(c => c.id === value)
                          if (selectedCliente) {
                            setEditingPedido({ ...editingPedido, cliente: selectedCliente })
                          }
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um cliente" />
                        </SelectTrigger>
                        <SelectContent>
                          {clientes.map((cliente) => (
                            <SelectItem key={cliente.id} value={cliente.id}>
                              {cliente.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      cliente ? cliente.nome : 'Cliente não encontrado'
                    )}
                  </TableCell>
                  <TableCell>
                    {editingPedido?.id === pedido.id ? (
                      <Select
                        value={editingPedido.produto.id}
                        onValueChange={(value) => {
                          const selectedProduto = produtos.find(p => p.id === value)
                          if (selectedProduto) {
                            setEditingPedido({ ...editingPedido, produto: selectedProduto })
                          }
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um produto" />
                        </SelectTrigger>
                        <SelectContent>
                          {produtos.map((produto) => (
                            <SelectItem key={produto.id} value={produto.id}>
                              {produto.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      produto ? produto.nome : 'Produto não encontrado'
                    )}
                  </TableCell>
                  <TableCell>
                    {pedido.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </TableCell>
                  <TableCell>
                    {editingPedido?.id === pedido.id ? (
                      <Input
                        type="number"
                        value={editingPedido.qtd}
                        onChange={(e) => setEditingPedido({ ...editingPedido, qtd: parseInt(e.target.value) })}
                        min={1}
                      />
                    ) : (
                      pedido.qtd
                    )}
                  </TableCell>
                  <TableCell>
                    {editingPedido?.id === pedido.id ? (
                      <Select
                        value={editingPedido.statusPedido}
                        onValueChange={(value) => setEditingPedido({ ...editingPedido, statusPedido: value as StatusPedido })}
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
                  {/* 
                  <TableCell>{pedido.notaFiscal ? pedido.notaFiscal : 'Não enviada'}</TableCell>
                  */}
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
                          onClick={() => handleRemovePedido(pedido.id)}
                          variant="outline"
                          size="icon"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
