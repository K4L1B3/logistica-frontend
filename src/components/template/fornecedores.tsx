'use client'

import { useEffect, useState } from 'react'
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
import { createSupplier, deleteSupplier, getAllSuppliers, updateSupplier } from '@/services/fornecedor.service'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Fornecedor {
  id?: string;
  nome: string;
  telefone: string;
  email: string;
  cnpj: string;
  tipoServico: string;
}

export function FornecedoresComponent() {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([])
  const [editingFornecedor, setEditingFornecedor] = useState<Fornecedor | null>(null)
  const [newFornecedor, setNewFornecedor] = useState<Fornecedor>({
    nome: '',
    telefone: '',
    email: '',
    cnpj: '',
    tipoServico: '',
  })

  useEffect(() => {

    const fetchSuppliers = async () => {
      try {
        const suppliersData = await getAllSuppliers();
        setFornecedores(suppliersData);

      } catch (error) {
        console.error(error, 'erro ao buscar clientes');
      }

    }

    fetchSuppliers();
  }, [])

  const handleAddFornecedor = async () => {
    const fornecedorToAdd = {
      ...newFornecedor,
    }

    try {
      const response = await createSupplier(fornecedorToAdd);
      console.log('Cliente criado RESPONSE: ', response);
      setFornecedores([...fornecedores, response])

    } catch (error) {
      console.error(error, 'erro ao adicionar fornecedor');
    }

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

  const handleSaveFornecedor = async () => {
    if (editingFornecedor) {
      if (editingFornecedor.id && editingFornecedor) {
        try {
          const response = await updateSupplier(editingFornecedor.id!, editingFornecedor);
          setFornecedores(prevFornecedores => (
            prevFornecedores.map(c => c.id === editingFornecedor.id ? editingFornecedor : c)
          )
          )
          setEditingFornecedor(null);
        } catch (error) {
          console.error(error, 'erro ao salvar/criar fornecedor');
        }
      }
    } else {
      console.error('ERRO: O fornecedor está vazio');
    }

  }

  const handleRemoveFornecedor = async (id: string) => {
    await deleteSupplier(id);
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
                <Select
                  value={newFornecedor.tipoServico}
                  onValueChange={(value) => setNewFornecedor({ ...newFornecedor, tipoServico: value })}
                >
                  <SelectTrigger className="w-full col-span-3">
                    <SelectValue placeholder="Selecione o tipo de serviço" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Selecione</SelectLabel>
                      <SelectItem value="TRANSPORTE">TRANSPORTE</SelectItem>
                      <SelectItem value="ARMAZENAMENTO">ARMAZENAMENTO</SelectItem>
                      <SelectItem value="SUPRIMENTOS">SUPRIMENTOS</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
                      value={editingFornecedor!.nome}
                      onChange={(e) => setEditingFornecedor({ ...editingFornecedor!, nome: e.target.value })}
                    />
                  ) : (
                    fornecedor.nome
                  )}
                </TableCell>
                <TableCell>
                  {editingFornecedor?.id === fornecedor.id ? (
                    <Input
                      value={editingFornecedor!.telefone}
                      onChange={(e) => setEditingFornecedor({ ...editingFornecedor!, telefone: e.target.value })}
                    />
                  ) : (
                    fornecedor.telefone
                  )}
                </TableCell>
                <TableCell>
                  {editingFornecedor?.id === fornecedor.id ? (
                    <Input
                      value={editingFornecedor!.email}
                      onChange={(e) => setEditingFornecedor({ ...editingFornecedor!, email: e.target.value })}
                    />
                  ) : (
                    fornecedor.email
                  )}
                </TableCell>
                <TableCell>
                  {editingFornecedor?.id === fornecedor.id ? (
                    <Input
                      value={editingFornecedor!.cnpj}
                      onChange={(e) => setEditingFornecedor({ ...editingFornecedor!, cnpj: e.target.value })}
                    />
                  ) : (
                    fornecedor.cnpj
                  )}
                </TableCell>
                <TableCell>
                  {editingFornecedor?.id === fornecedor.id ? (
                    <Select
                      value={editingFornecedor!.tipoServico}
                      onValueChange={(value) =>
                        setEditingFornecedor({ ...editingFornecedor!, tipoServico: value })
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione o tipo de serviço" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Selecione</SelectLabel>
                          <SelectItem value="TRANSPORTE">TRANSPORTE</SelectItem>
                          <SelectItem value="ARMAZENAMENTO">ARMAZENAMENTO</SelectItem>
                          <SelectItem value="SUPRIMENTOS">SUPRIMENTOS</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
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