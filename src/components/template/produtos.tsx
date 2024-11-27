'use client'

import { useState } from 'react'
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

interface Fornecedor {
  id?: string;
  nome: string;
  telefone: string;
  email: string;
  cnpj: string;
}

interface Produto {
  id?: string;
  nome: string;
  preco: number;
  quantidadeDisponivel: number;
  descricao: string;
  fornecedor: Fornecedor;
}

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [fornecedores] = useState<Fornecedor[]>([
    { id: '1', nome: 'Fornecedor A', telefone: '(11) 1234-5678', email: 'contato@fornecedora.com', cnpj: '12.345.678/0001-90' },
    { id: '2', nome: 'Fornecedor B', telefone: '(21) 9876-5432', email: 'contato@fornecedorb.com', cnpj: '98.765.432/0001-10' },
  ])

  const [newProduto, setNewProduto] = useState<Produto>({
    nome: '',
    preco: 0,
    quantidadeDisponivel: 0,
    descricao: '',
    fornecedor: {} as Fornecedor,
  })

  const [editingProduto, setEditingProduto] = useState<Produto | null>(null)

  const handleAddProduto = () => {
    const produtoToAdd = {
      ...newProduto,
      id: Date.now().toString(),
    }
    setProdutos([...produtos, produtoToAdd])
    setNewProduto({
      nome: '',
      preco: 0,
      quantidadeDisponivel: 0,
      descricao: '',
      fornecedor: {} as Fornecedor,
    })
  }

  const handleEditProduto = (produto: Produto) => {
    setEditingProduto({ ...produto })
  }

  const handleSaveProduto = () => {
    if (editingProduto) {
      setProdutos(produtos.map(p => p.id === editingProduto.id ? editingProduto : p))
      setEditingProduto(null)
    }
  }

  const handleCancelEdit = () => {
    setEditingProduto(null)
  }

  const handleRemoveProduto = (id: string) => {
    setProdutos(produtos.filter(p => p.id !== id))
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
            placeholder="0"
            value={newProduto.preco}
            onChange={(e) => setNewProduto({ ...newProduto, preco: parseFloat(e.target.value) })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            type="number"
            placeholder="0"
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