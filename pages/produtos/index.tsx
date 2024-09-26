import { useEffect, useState, useRef } from 'react';
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
import * as ProductService from '../../services/produtos-apit';

export default function Produtos() {
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [products, setProducts] = useState<ProductService.Product[]>([]);
  const [formProductData, setFormProductData] = useState<Omit<ProductService.Product, 'id'>>({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    image: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [productIdBeingEdited, setProductIdBeingEdited] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Função para buscar os produtos do backend
  const fetchProducts = async () => {
    try {
      const productsData = await ProductService.getAllProducts();
      setProducts(productsData);
    } catch (error) {
      console.error('Erro ao buscar produtos', error);
    }
  };

  // Função para salvar (criar ou atualizar) um produto
  const handleSaveProduct = async () => {
    try {
      if (isEditing && productIdBeingEdited !== null) {
        // Atualizar produto existente
        await ProductService.updateProduct(productIdBeingEdited, formProductData);
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === productIdBeingEdited ? { ...product, ...formProductData } : product
          )
        );
      } else {
        // Criar novo produto
        const newProduct = await ProductService.createProduct(formProductData);
        setProducts((prevProducts) => [...prevProducts, newProduct]);
      }

      // Resetar o formulário e estados
      setFormProductData({
        name: '',
        description: '',
        price: 0,
        stock: 0,
        image: '',
      });
      setIsEditing(false);
      setProductIdBeingEdited(null);
      setIsProductModalOpen(false);
    } catch (error) {
      console.error('Erro ao salvar produto', error);
    }
  };

  // Função para editar um produto
  const handleEditProduct = (product: ProductService.Product) => {
    setFormProductData({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      image: product.image,
    });
    setProductIdBeingEdited(product.id!);
    setIsEditing(true);
    setIsProductModalOpen(true);
  };

  // Função para remover produtos
  const handleRemoveProduct = async (id: number) => {
    try {
      await ProductService.deleteProduct(id);
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    } catch (error) {
      console.error('Erro ao deletar produto', error);
    }
  };

  // Função para upload de imagem
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result as string;
        setSelectedImage(result);
        setFormProductData((prevData) => ({ ...prevData, image: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
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
                  <a href="/produtos" className="font-semibold text-gray-600 hover:text-gray-900">
                    Produtos
                  </a>
                </li>
                <li>
                  <a href="/fornecedores" className="text-gray-600 hover:text-gray-900">
                    Fornecedores
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
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">Produtos</h1>
            <Dialog open={isProductModalOpen} onOpenChange={setIsProductModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-black text-white hover:bg-gray-800">Novo produto</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[800px]">
                <DialogHeader>
                  <DialogTitle>{isEditing ? 'Editar Produto' : 'Cadastro de Produto'}</DialogTitle>
                </DialogHeader>
                <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome-produto">Nome do produto</Label>
                      <Input
                        id="nome-produto"
                        placeholder="Nome do produto"
                        value={formProductData.name}
                        onChange={(e) => setFormProductData({ ...formProductData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="descricao-produto">Descrição</Label>
                      <Textarea
                        id="descricao-produto"
                        placeholder="Descrição do produto"
                        value={formProductData.description}
                        onChange={(e) => setFormProductData({ ...formProductData, description: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="preco-produto">Preço</Label>
                      <Input
                        id="preco-produto"
                        placeholder="0.00"
                        value={formProductData.price}
                        onChange={(e) => setFormProductData({ ...formProductData, price: parseFloat(e.target.value) })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="estoque-produto">Estoque</Label>
                      <Input
                        id="estoque-produto"
                        placeholder="0"
                        value={formProductData.stock}
                        onChange={(e) => setFormProductData({ ...formProductData, stock: parseInt(e.target.value) })}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Label>Imagem do produto</Label>
                    <div
                      className="cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-4 text-center"
                      onClick={() => fileInputRef.current?.click()}
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
                  <Button onClick={handleSaveProduct}>
                    {isEditing ? 'Atualizar' : 'Criar'}
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
                  <Button className="bg-blue-500 text-white hover:bg-blue-600" onClick={() => handleEditProduct(product)}>
                    Editar
                  </Button>
                  <Button className="bg-red-500 text-white hover:bg-red-600 mt-2" onClick={() => handleRemoveProduct(product.id!)}>
                    Excluir
                  </Button>
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
