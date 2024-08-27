import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Building2,
  Menu,
  ArrowUpDown,
  Filter,
  FileText,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

type OrderStatus = 'Entregue' | 'A caminho' | 'Separação' | 'Devolução';

interface Order {
  id: number;
  trackingCode: string;
  company: string;
  date: string;
  shipping: string;
  quantity: number;
  status: OrderStatus;
}

const orders: Order[] = [
  {
    id: 1,
    trackingCode: 'BR123456789',
    company: 'Empresa A',
    date: '2023-05-15',
    shipping: 'Expresso',
    quantity: 5,
    status: 'Entregue',
  },
  {
    id: 2,
    trackingCode: 'BR987654321',
    company: 'Empresa B',
    date: '2023-05-16',
    shipping: 'Normal',
    quantity: 3,
    status: 'A caminho',
  },
  {
    id: 3,
    trackingCode: 'BR456789123',
    company: 'Empresa C',
    date: '2023-05-17',
    shipping: 'Econômico',
    quantity: 2,
    status: 'Separação',
  },
  {
    id: 4,
    trackingCode: 'BR789123456',
    company: 'Empresa D',
    date: '2023-05-18',
    shipping: 'Expresso',
    quantity: 1,
    status: 'Devolução',
  },
  {
    id: 5,
    trackingCode: 'BR321654987',
    company: 'Empresa E',
    date: '2023-05-19',
    shipping: 'Normal',
    quantity: 4,
    status: 'Entregue',
  },
];

const statusColors: Record<OrderStatus, string> = {
  Entregue: 'bg-green-100 text-green-800',
  'A caminho': 'bg-blue-100 text-blue-800',
  Separação: 'bg-yellow-100 text-yellow-800',
  Devolução: 'bg-red-100 text-red-800',
};

export default function Pedidos() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('asc');

  const sortedOrders = [...orders].sort((a, b) => {
    return sortOrder === 'asc'
      ? new Date(a.date).getTime() - new Date(b.date).getTime()
      : new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
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
                    className="font-semibold text-gray-600 hover:text-gray-900"
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
            Gerenciamento de Pedidos
          </h1>

          <div className="mb-6 flex items-center justify-between">
            <div className="space-x-4">
              <Button className="bg-black text-white hover:bg-gray-800">
                <Filter className="mr-2 h-4 w-4" /> Filtros
              </Button>
              <Button className="bg-black text-white hover:bg-gray-800">
                Novo pedido
              </Button>
            </div>
            <Button className="bg-blue-500 text-white hover:bg-blue-600">
              <FileText className="mr-2 h-4 w-4" /> Gerar relatório
            </Button>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código de rastreio</TableHead>
                  <TableHead>Empresa</TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={toggleSortOrder}
                  >
                    Data
                    <ArrowUpDown className="ml-2 inline h-4 w-4" />
                  </TableHead>
                  <TableHead>Envio</TableHead>
                  <TableHead>Quantidade</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.trackingCode}</TableCell>
                    <TableCell>{order.company}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.shipping}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          statusColors[
                            order.status as keyof typeof statusColors
                          ]
                        }
                      >
                        {order.status}
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
