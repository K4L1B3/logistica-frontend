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
import { Building2, Menu, PlusCircle } from 'lucide-react';

interface IClient {
  id: number;
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  telefone: string;
  email: string;
  tipoServico: string;
  endereco: string;
  cep: string;
  complemento: string;
  estado: string;
  bairro: string;
  numero: string;
  cidade: string;
}

export default function Clientes() {
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);

  const [formClientData, setFormClientData] = useState<Omit<IClient, 'id'>>({
    razaoSocial: '',
    nomeFantasia: '',
    cnpj: '',
    telefone: '',
    email: '',
    tipoServico: '',
    endereco: '',
    cep: '',
    complemento: '',
    estado: '',
    bairro: '',
    numero: '',
    cidade: '',
  });

  const [newClient, setNewClient] = useState<IClient[]>([]);

  const [selectedClientIds, setSelectedClientIds] = useState<number[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    console.log('Mudando o campo');
    setFormClientData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormClientData((prevFormData) => ({
      ...prevFormData,
      tipoServico: value,
    }));
  };

  const handleAddClient = () => {
    console.log('Dados do client: ', formClientData);

    const newId = newClient.length + 1;

    setNewClient((prevClients) => [
      ...prevClients,
      { ...formClientData, id: newId },
    ]);

    setFormClientData({
      razaoSocial: '',
      nomeFantasia: '',
      cnpj: '',
      telefone: '',
      email: '',
      tipoServico: '',
      endereco: '',
      cep: '',
      complemento: '',
      estado: '',
      bairro: '',
      numero: '',
      cidade: '',
    });
  };

  const handleSelectClient = (clientId: number, isChecked: boolean) => {
    if (isChecked) {
      setSelectedClientIds((prevIds) => [...prevIds, clientId]);
    } else {
      setSelectedClientIds((prevIds) =>
        prevIds.filter((id) => id !== clientId)
      );
    }
  };

  const handleRemoveClient = () => {
    setNewClient((prevClients) => {
     return  prevClients.filter((client) => !selectedClientIds.includes(client.id))
    });
    setSelectedClientIds([]);
  };

  const handleEditClient = () => {};

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
                    className="font-semibold text-gray-600 hover:text-gray-900"
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
                    className="text-gray-600 hover:text-gray-900"
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
            Gerenciamento de Clientes
          </h1>

          <div className="mb-6 flex space-x-4">
            <Dialog
              open={isClientModalOpen}
              onOpenChange={setIsClientModalOpen}
            >
              <DialogTrigger asChild>
                <Button className="bg-green-500 text-white hover:bg-green-600">
                  Criar
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[800px]">
                <DialogHeader>
                  <DialogTitle>Cadastro Empresarial</DialogTitle>
                </DialogHeader>
                <form className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="razao-social">Razão Social</Label>
                    <Input
                      id="razaoSocial"
                      value={formClientData.razaoSocial}
                      onChange={handleInputChange}
                      placeholder="Razão Social"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nome-fantasia">Nome Fantasia</Label>
                    <Input
                      id="nomeFantasia"
                      value={formClientData.nomeFantasia}
                      onChange={handleInputChange}
                      placeholder="Nome Fantasia"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cnpj">CNPJ</Label>
                    <Input
                      id="cnpj"
                      value={formClientData.cnpj}
                      onChange={handleInputChange}
                      placeholder="00.000.000/0000-00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                      id="telefone"
                      value={formClientData.telefone}
                      onChange={handleInputChange}
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={formClientData.email}
                      type="email"
                      onChange={handleInputChange}
                      placeholder="email@empresa.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tipo-servico">Tipo de Serviço</Label>
                    <Select
                      value={formClientData.tipoServico}
                      onValueChange={handleSelectChange}
                    >
                      <SelectTrigger id="tipoServico">
                        <SelectValue placeholder="Selecione o tipo de serviço" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none" disabled>
                          Escolha o tipo de serviço
                        </SelectItem>
                        <SelectItem value="servico1">Serviço 1</SelectItem>
                        <SelectItem value="servico2">Serviço 2</SelectItem>
                        <SelectItem value="servico3">Serviço 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endereco">Endereço</Label>
                    <Input
                      id="endereco"
                      value={formClientData.endereco}
                      onChange={handleInputChange}
                      placeholder="Endereço"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cep">CEP</Label>
                    <Input
                      id="cep"
                      value={formClientData.cep}
                      onChange={handleInputChange}
                      placeholder="00000-000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="complemento">Complemento</Label>
                    <Input
                      id="complemento"
                      value={formClientData.complemento}
                      onChange={handleInputChange}
                      placeholder="Complemento"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estado">Estado</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="estado"
                        value={formClientData.estado}
                        onChange={handleInputChange}
                        placeholder="Ex: PE"
                      />
                      <Button size="icon" variant="outline">
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bairro">Bairro</Label>
                    <Input
                      id="bairro"
                      value={formClientData.bairro}
                      onChange={handleInputChange}
                      placeholder="Bairro"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="numero">Número</Label>
                    <Input
                      id="numero"
                      value={formClientData.numero}
                      onChange={handleInputChange}
                      placeholder="Número"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cidade">Cidade</Label>
                    <Input
                      id="cidade"
                      value={formClientData.cidade}
                      onChange={handleInputChange}
                      placeholder="Cidade"
                    />
                  </div>
                </form>
                <div className="mt-6 flex justify-end">
                  <Button
                    onClick={() => {
                      setIsClientModalOpen(false);
                      handleAddClient();
                    }}
                  >
                    Salvar
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button className="bg-red-500 text-white hover:bg-red-600"
              onClick={handleRemoveClient}
              disabled={selectedClientIds.length === 0}
              >
              Excluir
            </Button>
            <Button className="bg-blue-500 text-white hover:bg-blue-600"
              disabled={selectedClientIds.length === 0}
            >
              Editar
            </Button>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    Selecione
                  </TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead className="min-w-[200px]">Nome Fantasia</TableHead>
                  <TableHead className="min-w-[200px]">Razão Social</TableHead>
                  <TableHead className="min-w-[200px]">CNPJ</TableHead>
                  <TableHead className="min-w-[200px]">Email</TableHead>
                  <TableHead className="min-w-[200px]">Telefone</TableHead>
                  <TableHead>Serviço Fornecido</TableHead>
                  <TableHead className="min-w-[200px]">Endereço</TableHead>
                  <TableHead>Bairro</TableHead>
                  <TableHead className="min-w-[100px]">Cep</TableHead>
                  <TableHead>Complemento</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Numero</TableHead>
                  <TableHead>Cidade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {newClient.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>
                      <Checkbox onCheckedChange={(isChecked) => handleSelectClient(client.id, isChecked === true)}/>
                    </TableCell>
                    <TableCell>{client.id}</TableCell>
                    <TableCell className="font-medium">
                      {client.nomeFantasia}
                    </TableCell>
                    <TableCell className="font-medium">
                      {client.razaoSocial}
                    </TableCell>
                    <TableCell>{client.cnpj}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>{client.telefone}</TableCell>
                    <TableCell>{client.tipoServico}</TableCell>
                    <TableCell>{client.endereco}</TableCell>
                    <TableCell>{client.bairro}</TableCell>
                    <TableCell>{client.cep}</TableCell>
                    <TableCell>{client.complemento}</TableCell>
                    <TableCell>{client.estado}</TableCell>
                    <TableCell>{client.numero}</TableCell>
                    <TableCell>{client.cidade}</TableCell>
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
