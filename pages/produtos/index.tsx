import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, Menu, Upload } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Sal',
    stock: 50,
    price: 55,
    image: '/placeholder.svg?height=100&width=100',
  },
  {
    id: 2,
    name: 'Açúcar',
    stock: 75,
    price: 60,
    image: '/placeholder.svg?height=100&width=100',
  },
  {
    id: 3,
    name: 'Café',
    stock: 100,
    price: 80,
    image: '/placeholder.svg?height=100&width=100',
  },
  {
    id: 4,
    name: 'Arroz',
    stock: 120,
    price: 70,
    image: '/placeholder.svg?height=100&width=100',
  },
  {
    id: 5,
    name: 'Feijão',
    stock: 90,
    price: 65,
    image: '/placeholder.svg?height=100&width=100',
  },
  {
    id: 6,
    name: 'Óleo',
    stock: 80,
    price: 75,
    image: '/placeholder.svg?height=100&width=100',
  },
];

export default function Produtos() {
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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
                    className="font-semibold text-gray-600 hover:text-gray-900"
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
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">Produtos</h1>
            <Dialog
              open={isProductModalOpen}
              onOpenChange={setIsProductModalOpen}
            >
              <DialogTrigger asChild>
                <Button className="bg-black text-white hover:bg-gray-800">
                  Novo produto
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[800px]">
                <DialogHeader>
                  <DialogTitle>Cadastro de Produto</DialogTitle>
                </DialogHeader>
                <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome-produto">Nome do produto</Label>
                      <Input id="nome-produto" placeholder="Nome do produto" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="descricao-produto">Descrição</Label>
                      <Textarea
                        id="descricao-produto"
                        placeholder="Descrição do produto"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="preco-produto">Preço</Label>
                      <Input id="preco-produto" placeholder="0.00" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="estoque-produto">Estoque</Label>
                      <Input id="estoque-produto" placeholder="0" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Label>Imagem do produto</Label>
                    <div
                      className="cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-4 text-center"
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                    >
                      {selectedImage ? (
                        <img
                          src={selectedImage}
                          alt="Preview"
                          className="mx-auto h-auto max-w-full"
                        />
                      ) : (
                        <div className="flex h-48 flex-col items-center justify-center">
                          <Upload className="h-12 w-12 text-gray-400" />
                          <p className="mt-2 text-sm text-gray-500">
                            Clique ou arraste uma imagem para fazer upload
                          </p>
                        </div>
                      )}
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <Button onClick={() => setIsProductModalOpen(false)}>
                    Criar
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Card key={product.id}>
                <CardContent className="p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="mb-4 h-48 w-full rounded-md object-cover"
                  />
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-600">Estoque: {product.stock}</p>
                  <p className="mt-2 text-lg font-bold">${product.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <Button variant="outline">Ver todos</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
