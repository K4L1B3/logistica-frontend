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

interface Cliente {
  id?: string;
  nome: string;
  telefone: string;
  email: string;
  cnpj: string;
}

export function ClientesComponent() {
  const [customers, setCustomers] = useState<Cliente[]>([
    { id: '1', nome: 'Empresa A', telefone: '(11) 1234-5678', email: 'contato@empresaa.com', cnpj: '12.345.678/0001-90' },
    { id: '2', nome: 'Empresa B', telefone: '(21) 9876-5432', email: 'contato@empresab.com', cnpj: '98.765.432/0001-10' },
  ])

  const [editingCustomer, setEditingCustomer] = useState<Cliente | null>(null)
  const [newCustomer, setNewCustomer] = useState<Cliente>({
    nome: '',
    telefone: '',
    email: '',
    cnpj: '',
  })

  const handleAddCustomer = () => {
    const customerToAdd = {
      ...newCustomer,
      id: Date.now().toString(),
    }
    setCustomers([...customers, customerToAdd])
    setNewCustomer({
      nome: '',
      telefone: '',
      email: '',
      cnpj: '',
    })
  }

  const handleEditCustomer = (customer: Cliente) => {
    setEditingCustomer(customer)
  }

  const handleSaveCustomer = () => {
    if (editingCustomer) {
      setCustomers(customers.map(c => c.id === editingCustomer.id ? editingCustomer : c))
      setEditingCustomer(null)
    }
  }

  const handleRemoveCustomer = (id: string) => {
    setCustomers(customers.filter(c => c.id !== id))
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusCircle size={16} />
              Adicionar Cliente
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Cliente</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nome" className="text-right">
                  Nome
                </Label>
                <Input
                  id="nome"
                  value={newCustomer.nome}
                  onChange={(e) => setNewCustomer({ ...newCustomer, nome: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="telefone" className="text-right">
                  Telefone
                </Label>
                <Input
                  id="telefone"
                  value={newCustomer.telefone}
                  onChange={(e) => setNewCustomer({ ...newCustomer, telefone: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cnpj" className="text-right">
                  CNPJ
                </Label>
                <Input
                  id="cnpj"
                  value={newCustomer.cnpj}
                  onChange={(e) => setNewCustomer({ ...newCustomer, cnpj: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogTrigger asChild>
              <Button onClick={handleAddCustomer}>Adicionar Cliente</Button>
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
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  {editingCustomer?.id === customer.id ? (
                    <Input
                      value={editingCustomer.nome}
                      onChange={(e) => setEditingCustomer({ ...editingCustomer, nome: e.target.value })}
                    />
                  ) : (
                    customer.nome
                  )}
                </TableCell>
                <TableCell>
                  {editingCustomer?.id === customer.id ? (
                    <Input
                      value={editingCustomer.telefone}
                      onChange={(e) => setEditingCustomer({ ...editingCustomer, telefone: e.target.value })}
                    />
                  ) : (
                    customer.telefone
                  )}
                </TableCell>
                <TableCell>
                  {editingCustomer?.id === customer.id ? (
                    <Input
                      value={editingCustomer.email}
                      onChange={(e) => setEditingCustomer({ ...editingCustomer, email: e.target.value })}
                    />
                  ) : (
                    customer.email
                  )}
                </TableCell>
                <TableCell>
                  {editingCustomer?.id === customer.id ? (
                    <Input
                      value={editingCustomer.cnpj}
                      onChange={(e) => setEditingCustomer({ ...editingCustomer, cnpj: e.target.value })}
                    />
                  ) : (
                    customer.cnpj
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {editingCustomer?.id === customer.id ? (
                    <Button onClick={handleSaveCustomer} variant="outline" size="sm">
                      Salvar
                    </Button>
                  ) : (
                    <div className="flex justify-end gap-2">
                      <Button onClick={() => handleEditCustomer(customer)} variant="outline" size="icon">
                        <Pencil size={16} />
                      </Button>
                      <Button onClick={() => handleRemoveCustomer(customer.id!)} variant="outline" size="icon">
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