import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Building2, Menu, PlusCircle } from "lucide-react"

const clients = [
  { id: 1, name: "Empresa A", email: "contato@empresaa.com", phone: "(11) 1234-5678", service: "Serviço 1" },
  { id: 2, name: "Empresa B", email: "contato@empresab.com", phone: "(22) 2345-6789", service: "Serviço 2" },
  { id: 3, name: "Empresa C", email: "contato@empresac.com", phone: "(33) 3456-7890", service: "Serviço 3" },
  { id: 4, name: "Empresa D", email: "contato@empresad.com", phone: "(44) 4567-8901", service: "Serviço 1" },
  { id: 5, name: "Empresa E", email: "contato@empresae.com", phone: "(55) 5678-9012", service: "Serviço 2" },
]

export default function Clientes() {
  const [isClientModalOpen, setIsClientModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
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
                  <a href="/clientes" className="text-gray-600 hover:text-gray-900 font-semibold">
                    Clientes
                  </a>
                </li>
                <li>
                  <a href="/produtos" className="text-gray-600 hover:text-gray-900">
                    Produtos
                  </a>
                </li>
                <li>
                  <a href="/fornecedores" className="text-gray-600 hover:text-gray-900">
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
            <div className="relative">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs font-bold text-gray-700 cursor-pointer">
                ADMIN
              </div>
            </div>
            <Menu className="h-6 w-6 text-gray-600 cursor-pointer" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Gerenciamento de Clientes</h1>

          <div className="flex space-x-4 mb-6">
            <Dialog open={isClientModalOpen} onOpenChange={setIsClientModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-green-500 hover:bg-green-600 text-white">Criar</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[800px]">
                <DialogHeader>
                  <DialogTitle>Cadastro Empresarial</DialogTitle>
                </DialogHeader>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="razao-social">Razão Social</Label>
                    <Input id="razao-social" placeholder="Razão Social" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nome-fantasia">Nome Fantasia</Label>
                    <Input id="nome-fantasia" placeholder="Nome Fantasia" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cnpj">CNPJ</Label>
                    <Input id="cnpj" placeholder="00.000.000/0000-00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input id="telefone" placeholder="(00) 00000-0000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="email@empresa.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tipo-servico">Tipo de Serviço</Label>
                    <Select>
                      <SelectTrigger id="tipo-servico">
                        <SelectValue placeholder="Selecione o tipo de serviço" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="servico1">Serviço 1</SelectItem>
                        <SelectItem value="servico2">Serviço 2</SelectItem>
                        <SelectItem value="servico3">Serviço 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endereco">Endereço</Label>
                    <Input id="endereco" placeholder="Endereço" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cep">CEP</Label>
                    <Input id="cep" placeholder="00000-000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="complemento">Complemento</Label>
                    <Input id="complemento" placeholder="Complemento" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estado">Estado</Label>
                    <div className="flex items-center space-x-2">
                      <Input id="estado" placeholder="Ex: PE" />
                      <Button size="icon" variant="outline">
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bairro">Bairro</Label>
                    <Input id="bairro" placeholder="Bairro" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="numero">Número</Label>
                    <Input id="numero" placeholder="Número" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cidade">Cidade</Label>
                    <Input id="cidade" placeholder="Cidade" />
                  </div>
                </form>
                <div className="mt-6 flex justify-end">
                  <Button onClick={() => setIsClientModalOpen(false)}>Salvar</Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button className="bg-red-500 hover:bg-red-600 text-white">Excluir</Button>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">Editar</Button>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox />
                  </TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Nome Fantasia</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Serviço Fornecido</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>{client.id}</TableCell>
                    <TableCell className="font-medium">{client.name}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>{client.phone}</TableCell>
                    <TableCell>{client.service}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  )
}
