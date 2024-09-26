import { useEffect, useState } from 'react';
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
import * as SupplierService from '../../services/supplier-api';

// Interface do fornecedor
interface Supplier {
  id?: number;
  name: string;
  contact: string;
  serviceType: string;
  status: "Ativo" | "Inativo";
}

const statusColors: Record<"Ativo" | "Inativo", string> = {
  Ativo: "bg-green-100 text-green-800",
  Inativo: "bg-red-100 text-red-800",
};

export default function Fornecedores() {
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [selectedSupplierIds, setSelectedSupplierIds] = useState<number[]>([]);
  const [formSupplierData, setFormSupplierData] = useState<Omit<Supplier, 'id'>>({
    name: '',
    contact: '',
    serviceType: '',
    status: 'Ativo',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [supplierIdBeingEdited, setSupplierIdBeingEdited] = useState<number | null>(null);

  // Função para buscar fornecedores do backend
  const fetchSuppliers = async () => {
    try {
      const suppliersData = await SupplierService.getAllSuppliers();
      setSuppliers(suppliersData);
    } catch (error) {
      console.error('Erro ao buscar fornecedores', error);
    }
  };

  // Função para salvar (criar/atualizar) um fornecedor
  const handleSaveSupplier = async () => {
    try {
      if (isEditing && supplierIdBeingEdited !== null) {
        // Atualiza fornecedor existente
        await SupplierService.updateSupplier(supplierIdBeingEdited, formSupplierData);
        setSuppliers((prevSuppliers) =>
          prevSuppliers.map((supplier) =>
            supplier.id === supplierIdBeingEdited ? { ...supplier, ...formSupplierData } : supplier
          )
        );
      } else {
        // Cria um novo fornecedor
        const newSupplier = await SupplierService.createSupplier(formSupplierData);
        setSuppliers((prevSuppliers) => [...prevSuppliers, newSupplier]);
      }

      // Resetar o formulário e estados
      setFormSupplierData({
        name: '',
        contact: '',
        serviceType: '',
        status: 'Ativo',
      });
      setIsEditing(false);
      setSupplierIdBeingEdited(null);
      setIsSupplierModalOpen(false);
    } catch (error) {
      console.error('Erro ao salvar fornecedor', error);
    }
  };

  // Função para editar fornecedor
  const handleEditSupplier = (supplier: Supplier) => {
    setFormSupplierData({
      name: supplier.name,
      contact: supplier.contact,
      serviceType: supplier.serviceType,
      status: supplier.status,
    });
    setSupplierIdBeingEdited(supplier.id!);
    setIsEditing(true);
    setIsSupplierModalOpen(true);
  };

  // Função para remover fornecedor
  const handleRemoveSuppliers = async () => {
    try {
      await Promise.all(
        selectedSupplierIds.map(async (id) => {
          await SupplierService.deleteSupplier(id);
        })
      );
      setSuppliers((prevSuppliers) =>
        prevSuppliers.filter((supplier) => !selectedSupplierIds.includes(supplier.id!))
      );
      setSelectedSupplierIds([]);
    } catch (error) {
      console.error('Erro ao deletar fornecedores', error);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center space-x-4">
            <Building2 className="h-8 w-8 text-gray-700" />
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <a href="/pedidos" className="text-gray-600 hover:text-gray-900">
                    Pedidos
                  </a>
                </li>
                <li>
                  <a href="/clientes" className="text-gray-600 hover:text-gray-900">
                    Clientes
                  </a>
                </li>
                <li>
                  <a href="/produtos" className="text-gray-600 hover:text-gray-900">
                    Produtos
                  </a>
                </li>
                <li>
                  <a href="/fornecedores" className="font-semibold text-gray-600 hover:text-gray-900">
                    Fornecedores
                  </a>
                </li>
                <li>
                  <a href="/desempenho" className="text-gray-600 hover:text-gray-900">
                    Desempenho Logístico
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Menu className="h-6 w-6 cursor-pointer text-gray-600" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h1 className="mb-6 text-2xl font-bold text-gray-800">Gerenciamento de Fornecedores</h1>

          <div className="mb-6 flex space-x-4">
            <Dialog open={isSupplierModalOpen} onOpenChange={setIsSupplierModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-green-500 text-white hover:bg-green-600">Criar</Button>
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
                    <Input
                      id="name"
                      value={formSupplierData.name}
                      onChange={(e) => setFormSupplierData({ ...formSupplierData, name: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="contact" className="text-right">
                      Contato
                    </Label>
                    <Input
                      id="contact"
                      value={formSupplierData.contact}
                      onChange={(e) => setFormSupplierData({ ...formSupplierData, contact: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="serviceType" className="text-right">
                      Tipo de Serviço
                    </Label>
                    <Select
                      value={formSupplierData.serviceType}
                      onValueChange={(value) => setFormSupplierData({ ...formSupplierData, serviceType: value })}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Selecione o tipo de serviço" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="materia-prima">Matéria-prima</SelectItem>
                        <SelectItem value="logistica">Logística</SelectItem>
                        <SelectItem value="embalagens">Embalagens</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                      Status
                    </Label>
                    <Select
                      value={formSupplierData.status}
                      onValueChange={(value) => setFormSupplierData({ ...formSupplierData, status: value as "Ativo" | "Inativo" })}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ativo">Ativo</SelectItem>
                        <SelectItem value="Inativo">Inativo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </form>
                <div className="flex justify-end">
                  <Button onClick={handleSaveSupplier}>Salvar</Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button className="bg-red-500 text-white hover:bg-red-600" onClick={handleRemoveSuppliers} disabled={selectedSupplierIds.length === 0}>
              Excluir
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
                      <Checkbox
                        onCheckedChange={(checked) =>
                          setSelectedSupplierIds((prev) =>
                            checked ? [...prev, supplier.id!] : prev.filter((id) => id !== supplier.id)
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>{supplier.id}</TableCell>
                    <TableCell className="font-medium">{supplier.name}</TableCell>
                    <TableCell>{supplier.contact}</TableCell>
                    <TableCell>{supplier.serviceType}</TableCell>
                    <TableCell>
                      <Badge className={statusColors[supplier.status]}>{supplier.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button className="bg-blue-500 text-white hover:bg-blue-600" onClick={() => handleEditSupplier(supplier)}>
                        Editar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
}
