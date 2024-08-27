import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Building2, Menu, ChevronLeft, ChevronRight } from 'lucide-react';

interface IStatusColors {
  Ativo: string;
  Inativo: string;
}

type Status = "Ativo" | "Inativo";

interface Supplier {
  id: number;
  name: string;
  contact: string;
  serviceType: string;
  status: Status;
}

const suppliers: Supplier[] = [
  { id: 1, name: "Fornecedor A", contact: "contato@fornecedora.com", serviceType: "Matéria-prima", status: "Ativo" },
  { id: 2, name: "Fornecedor B", contact: "(22) 2345-6789", serviceType: "Logística", status: "Ativo" },
  { id: 3, name: "Fornecedor C", contact: "contato@fornecedorc.com", serviceType: "Embalagens", status: "Inativo" },
  { id: 4, name: "Fornecedor D", contact: "(44) 4567-8901", serviceType: "Matéria-prima", status: "Ativo" },
  { id: 5, name: "Fornecedor E", contact: "contato@fornecedore.com", serviceType: "Logística", status: "Ativo" },
];

const products = ['Sal', 'Açúcar', 'Café', 'Arroz', 'Feijão', 'Óleo'];

const statusColors: Record<Status, string> = {
  Ativo: "bg-green-100 text-green-800",
  Inativo: "bg-red-100 text-red-800",
};

export default function Fornecedores() {
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center space-x-4">
            <Building2 className="h-8 w-8 text-gray-700" />
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <a
                    href="/pedidos"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Pedidos
                  </a>
                </li>
                <li>
                  <a
                    href="/clientes"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Clientes
                  </a>
                </li>
                <li>
                  <a
                    href="/produtos"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Produtos
                  </a>
                </li>
                <li>
                  <a
                    href="/fornecedores"
                    className="font-semibold text-gray-600 hover:text-gray-900"
                  >
                    Fornecedores
                  </a>
                </li>
                <li>
                  <a
                    href="/desempenho"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Desempenho Logístico
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-300 text-xs font-bold text-gray-700">
                ADMIN
              </div>
            </div>
            <Menu className="h-6 w-6 cursor-pointer text-gray-600" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h1 className="mb-6 text-2xl font-bold text-gray-800">
            Gerenciamento de Fornecedores
          </h1>

          <div className="mb-6 flex space-x-4">
            <Dialog
              open={isSupplierModalOpen}
              onOpenChange={setIsSupplierModalOpen}
            >
              <DialogTrigger asChild>
                <Button className="bg-green-500 text-white hover:bg-green-600">
                  Criar
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Cadastro de Fornecedor</DialogTitle>
                </DialogHeader>
                <form className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Nome da Empresa
                    </Label>
                    <Input id="name" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="contact" className="text-right">
                      Contato
                    </Label>
                    <Input id="contact" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="serviceType" className="text-right">
                      Tipo de Serviço
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Selecione o tipo de serviço" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="materia-prima">
                          Matéria-prima
                        </SelectItem>
                        <SelectItem value="logistica">Logística</SelectItem>
                        <SelectItem value="embalagens">Embalagens</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="product" className="text-right">
                      Produto Fornecido
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Selecione o produto" />
                      </SelectTrigger>
                      <SelectContent>
                        {products.map((product) => (
                          <SelectItem
                            key={product}
                            value={product.toLowerCase()}
                          >
                            {product}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                      Status
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ativo">Ativo</SelectItem>
                        <SelectItem value="inativo">Inativo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </form>
                <div className="flex justify-end">
                  <Button onClick={() => setIsSupplierModalOpen(false)}>
                    Salvar
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button className="bg-red-500 text-white hover:bg-red-600">
              Excluir
            </Button>
            <Button className="bg-blue-500 text-white hover:bg-blue-600">
              Editar
            </Button>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox />
                  </TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Nome da Empresa</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Tipo de Serviço Fornecido</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {suppliers.map((supplier) => (
                  <TableRow key={supplier.id}>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>{supplier.id}</TableCell>
                    <TableCell className="font-medium">
                      {supplier.name}
                    </TableCell>
                    <TableCell>{supplier.contact}</TableCell>
                    <TableCell>{supplier.serviceType}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          statusColors[supplier.status as keyof IStatusColors]
                        }
                      >
                        {supplier.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Anterior
            </Button>
            <div className="flex items-center space-x-2">
              {[1, 2, 3].map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? 'default' : 'outline'}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === 3}
            >
              Próximo <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
