'use client'

import { useState } from 'react'
import { PlusCircle, Pencil, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

interface Fornecedor {
  id?: string;
  nome: string;
  telefone: string;
  email: string;
  cnpj: string;
  tipoServico: string;
}

export function FornecedoresComponent() {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([
    { id: '1', nome: 'Fornecedor A', telefone: '(11) 1234-5678', email: 'contato@fornecedora.com', cnpj: '12.345.678/0001-90', tipoServico: 'Matéria-prima' },
    { id: '2', nome: 'Fornecedor B', telefone: '(21) 9876-5432', email: 'contato@fornecedorb.com', cnpj: '98.765.432/0001-10', tipoServico: 'Embalagens' },
  ])

  const [editingFornecedor, setEditingFornecedor] = useState<Fornecedor | null>(null)
  const [newFornecedor, setNewFornecedor] = useState<Fornecedor>({
    nome: '',
    telefone: '',
    email: '',
    cnpj: '',
    tipoServico: '',
  })

  const handleAddFornecedor = () => {
    const fornecedorToAdd = {
      ...newFornecedor,
      id: Date.now().toString(),
    }
    setFornecedores([...fornecedores, fornecedorToAdd])
    setNewFornecedor({
      nome: '',
      telefone: '',
      email: '',
      cnpj: '',
      tipoServico: '',
    })
  }

  const handleEditFornecedor = (fornecedor: Fornecedor) => {
    setEditingFornecedor(fornecedor)
  }

  const handleSaveFornecedor = () => {
    if (editingFornecedor) {
      setFornecedores(fornecedores.map(f => f.id === editingFornecedor.id ? editingFornecedor : f))
      setEditingFornecedor(null)
    }
  }

  const handleRemoveFornecedor = (id: string) => {
    setFornecedores(fornecedores.filter(f => f.id !== id))
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Fornecedores</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusCircle size={16} />
              Adicionar Fornecedor
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Fornecedor</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nome" className="text-right">
                  Nome
                </Label>
                <Input
                  id="nome"
                  value={newFornecedor.nome}
                  onChange={(e) => setNewFornecedor({ ...newFornecedor, nome: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="telefone" className="text-right">
                  Telefone
                </Label>
                <Input
                  id="telefone"
                  value={newFornecedor.telefone}
                  onChange={(e) => setNewFornecedor({ ...newFornecedor, telefone: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  value={newFornecedor.email}
                  onChange={(e) => setNewFornecedor({ ...newFornecedor, email: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cnpj" className="text-right">
                  CNPJ
                </Label>
                <Input
                  id="cnpj"
                  value={newFornecedor.cnpj}
                  onChange={(e) => setNewFornecedor({ ...newFornecedor, cnpj: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tipoServico" className="text-right">
                  Tipo de Serviço
                </Label>
                <Input
                  id="tipoServico"
                  value={newFornecedor.tipoServico}
                  onChange={(e) => setNewFornecedor({ ...newFornecedor, tipoServico: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogTrigger asChild>
              <Button onClick={handleAddFornecedor}>Adicionar Fornecedor</Button>
            </DialogTrigger>
          </DialogContent>
        </Dialog>
      </div>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Telefone</TableHead>
              
              <TableHead>Email</TableHead>
              <TableHead>CNPJ</TableHead>
              <TableHead>Tipo de Serviço</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fornecedores.map((fornecedor) => (
              <TableRow key={fornecedor.id}>
                <TableCell>
                  {editingFornecedor?.id === fornecedor.id ? (
                    <Input
                      value={editingFornecedor.nome}
                      onChange={(e) => setEditingFornecedor({ ...editingFornecedor, nome: e.target.value })}
                    />
                  ) : (
                    fornecedor.nome
                  )}
                </TableCell>
                <TableCell>
                  {editingFornecedor?.id === fornecedor.id ? (
                    <Input
                      value={editingFornecedor.telefone}
                      onChange={(e) => setEditingFornecedor({ ...editingFornecedor, telefone: e.target.value })}
                    />
                  ) : (
                    fornecedor.telefone
                  )}
                </TableCell>
                <TableCell>
                  {editingFornecedor?.id === fornecedor.id ? (
                    <Input
                      value={editingFornecedor.email}
                      onChange={(e) => setEditingFornecedor({ ...editingFornecedor, email: e.target.value })}
                    />
                  ) : (
                    fornecedor.email
                  )}
                </TableCell>
                <TableCell>
                  {editingFornecedor?.id === fornecedor.id ? (
                    <Input
                      value={editingFornecedor.cnpj}
                      onChange={(e) => setEditingFornecedor({ ...editingFornecedor, cnpj: e.target.value })}
                    />
                  ) : (
                    fornecedor.cnpj
                  )}
                </TableCell>
                <TableCell>
                  {editingFornecedor?.id === fornecedor.id ? (
                    <Input
                      value={editingFornecedor.tipoServico}
                      onChange={(e) => setEditingFornecedor({ ...editingFornecedor, tipoServico: e.target.value })}
                    />
                  ) : (
                    fornecedor.tipoServico
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {editingFornecedor?.id === fornecedor.id ? (
                    <Button onClick={handleSaveFornecedor} variant="outline" size="sm">
                      Salvar
                    </Button>
                  ) : (
                    <div className="flex justify-end gap-2">
                      <Button onClick={() => handleEditFornecedor(fornecedor)} variant="outline" size="icon">
                        <Pencil size={16} />
                      </Button>
                      <Button onClick={() => handleRemoveFornecedor(fornecedor.id!)} variant="outline" size="icon">
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
    </>
  )
}