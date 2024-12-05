'use client'

import { useEffect, useState } from 'react'
import { PlusCircle, Pencil, Trash2, Check, X } from 'lucide-react'
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
import { getAllProdutos, createProduto, updateProduto, deleteProduto } from '@/services/produto.service'
import { getAllSuppliers } from '@/services/fornecedor.service'

interface Fornecedor {
  id?: string;
  nome: string;
  telefone: string;
  email: string;
  cnpj: string;
  tipoServico: string;
}

export interface Produto {
  id?: string;
  nome: string;
  preco: number;
  quantidadeDisponivel: number;
  descricao: string;
  fornecedorId?: Fornecedor["id"]; // Enviado ao backend
  fornecedor?: Fornecedor; // Retornado pelo backend
}

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([])
  const [newProduto, setNewProduto] = useState<Produto>({
    nome: '',
    preco: 0,
    quantidadeDisponivel: 0,
    descricao: '',
    fornecedorId: '',
  });

  const [editingProduto, setEditingProduto] = useState<Produto | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const produtosData = await getAllProdutos()
        const fornecedoresData = await getAllSuppliers()
        setProdutos(produtosData)
        setFornecedores(fornecedoresData)
      } catch (error) {
        console.error('Erro ao buscar dados:', error)
      }
    }

    fetchData()
  }, [])

  const handleAddProduto = async () => {
    try {
      const produtoToAdd = await createProduto(newProduto)
      setProdutos([...produtos, produtoToAdd])
      setNewProduto({
        nome: '',
        preco: 0,
        quantidadeDisponivel: 0,
        descricao: '',
        fornecedorId: '',
      })
    } catch (error) {
      console.error('Erro ao adicionar produto:', error)
    }
  }

  const handleEditProduto = (produto: Produto) => {
    setEditingProduto(produto) // Preenche os campos do produto em edição
  }

  const handleSaveProduto = async () => {
    if (editingProduto) {
      if (editingProduto.id) {
        try {
          const response = await updateProduto(editingProduto.id, editingProduto) // Atualiza no banco
          setProdutos(prevProdutos =>
            prevProdutos.map(p => p.id === editingProduto.id ? editingProduto : p) // Atualiza localmente
          )
          setEditingProduto(null) // Limpa o estado de edição
        } catch (error) {
          console.error('Erro ao salvar produto:', error)
        }
      } else {
        console.error('Erro: Produto sem ID')
      }
    } else {
      console.error('Erro: Nenhum produto em edição')
    }
  }


  const handleCancelEdit = () => {
    setEditingProduto(null)
  }

  const handleRemoveProduto = async (id: string) => {
    try {
      await deleteProduto(id)
      setProdutos(produtos.filter(p => p.id !== id))
    } catch (error) {
      console.error('Erro ao remover produto:', error)
    }
  }

  return (
    <div className="mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Gerenciamento de Produtos</h1>

      <div className="grid gap-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Nome do Produto"
            value={newProduto.nome}
            onChange={(e) => setNewProduto({ ...newProduto, nome: e.target.value })}
          />
          <Input
            type="number"
            placeholder="R$0.00"
            value={newProduto.preco}
            onChange={(e) => setNewProduto({ ...newProduto, preco: parseFloat(e.target.value) })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            type="number"
            placeholder="QTD:000"
            value={newProduto.quantidadeDisponivel}
            onChange={(e) => setNewProduto({ ...newProduto, quantidadeDisponivel: parseInt(e.target.value) })}
          />
          <Input
            placeholder="Descrição"
            value={newProduto.descricao}
            onChange={(e) => setNewProduto({ ...newProduto, descricao: e.target.value })}
          />
        </div>

        <Select
          onValueChange={(value) => {
            const fornecedor = fornecedores.find(f => f.id === value)
            if (fornecedor) {
              setNewProduto({ ...newProduto, fornecedor })
            }
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione um fornecedor" />
          </SelectTrigger>
          <SelectContent>
            {fornecedores.map((fornecedor) => (
              <SelectItem key={fornecedor.id} value={fornecedor.id!}>
                {fornecedor.nome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className='flex justify-end'>
          <Button
            onClick={handleAddProduto}
            className="w-1/6 bg-black hover:bg-black/90 text-white"
          >
            Adicionar Produto
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Fornecedor</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {produtos.map((produto) => (
              <TableRow key={produto.id}>
                <TableCell>
                  {editingProduto?.id === produto.id ? (
                    <Input
                      value={editingProduto!.nome}
                      onChange={(e) => setEditingProduto({ ...editingProduto!, nome: e.target.value })}
                    />
                  ) : (
                    produto.nome
                  )}
                </TableCell>
                <TableCell>
                  {editingProduto?.id === produto.id ? (
                    <Input
                      type="number"
                      value={editingProduto!.preco}
                      onChange={(e) => setEditingProduto({ ...editingProduto!, preco: parseFloat(e.target.value) })}
                    />
                  ) : (
                    `R$ ${produto.preco.toFixed(2)}`
                  )}
                </TableCell>
                <TableCell>
                  {editingProduto?.id === produto.id ? (
                    <Input
                      type="number"
                      value={editingProduto!.quantidadeDisponivel}
                      onChange={(e) => setEditingProduto({ ...editingProduto!, quantidadeDisponivel: parseInt(e.target.value) })}
                    />
                  ) : (
                    produto.quantidadeDisponivel
                  )}
                </TableCell>
                <TableCell>
                  {editingProduto?.id === produto.id ? (
                    <Input
                      value={editingProduto!.descricao}
                      onChange={(e) => setEditingProduto({ ...editingProduto!, descricao: e.target.value })}
                    />
                  ) : (
                    produto.descricao
                  )}
                </TableCell>
                <TableCell>
                  {editingProduto?.id === produto.id ? (
                    <Select
                      value={editingProduto!.fornecedor.id}
                      onValueChange={(value) => {
                        const fornecedor = fornecedores.find(f => f.id === value)
                        if (fornecedor) {
                          setEditingProduto({ ...editingProduto!, fornecedor })
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um fornecedor" />
                      </SelectTrigger>
                      <SelectContent>
                        {fornecedores.map((fornecedor) => (
                          <SelectItem key={fornecedor.id} value={fornecedor.id!}>
                            {fornecedor.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    produto.fornecedor.nome
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {editingProduto?.id === produto.id ? (
                    <div className="flex justify-end gap-2">
                      <Button onClick={handleSaveProduto} variant="outline" size="icon">
                        <Check size={16} />
                      </Button>
                      <Button onClick={handleCancelEdit} variant="outline" size="icon">
                        <X size={16} />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex justify-end gap-2">
                      <Button onClick={() => handleEditProduto(produto)} variant="outline" size="icon">
                        <Pencil size={16} />
                      </Button>
                      <Button
                        onClick={() => handleRemoveProduto(produto.id!)}
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
