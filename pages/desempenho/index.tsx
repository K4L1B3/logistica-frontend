import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LatLngExpression } from 'leaflet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Building2,
  Menu,
  Download,
  Calendar,
  User,
  Package,
  TrendingUp,
  DollarSign,
  Percent,
  BarChart2,
  RefreshCcw,
  ThumbsUp,
  Clock,
  MapPin,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface NeighborhoodDeliveryData {
  name: string;
  lat: number;
  lng: number;
  deliveries: number;
}

// Importa o MapContainer de forma dinâmica para que ele seja renderizado apenas no lado do cliente
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const CircleMarker = dynamic(
  () => import('react-leaflet').then((mod) => mod.CircleMarker),
  { ssr: false }
);
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), {
  ssr: false,
});

// Dados de exemplo (mantenha os dados existentes e adicione os novos)
const timeProcessingData = [
  { name: 'Jan', value: 3.2 },
  { name: 'Fev', value: 3.5 },
  { name: 'Mar', value: 3.1 },
  { name: 'Abr', value: 3.3 },
  { name: 'Mai', value: 3.0 },
  { name: 'Jun', value: 2.9 },
];

const deliveryRateData = [
  { name: 'Dentro do Prazo', value: 85 },
  { name: 'Fora do Prazo', value: 15 },
];

const costPerDeliveryData = [
  { name: 'Transporte', value: 60 },
  { name: 'Embalagem', value: 25 },
  { name: 'Mão de Obra', value: 15 },
];

const inventoryTurnoverData = [
  { name: 'Produto A', value: 12 },
  { name: 'Produto B', value: 8 },
  { name: 'Produto C', value: 15 },
  { name: 'Produto D', value: 10 },
];

const profitData = [
  { name: 'Jan', value: 50000 },
  { name: 'Fev', value: 55000 },
  { name: 'Mar', value: 48000 },
  { name: 'Abr', value: 52000 },
  { name: 'Mai', value: 58000 },
  { name: 'Jun', value: 62000 },
];

const costPerUnitData = [
  { name: 'Jan', value: 12.5 },
  { name: 'Fev', value: 12.2 },
  { name: 'Mar', value: 12.8 },
  { name: 'Abr', value: 12.3 },
  { name: 'Mai', value: 11.9 },
  { name: 'Jun', value: 11.7 },
];

const returnRateData = [
  { name: 'Jan', value: 2.1 },
  { name: 'Fev', value: 1.9 },
  { name: 'Mar', value: 2.3 },
  { name: 'Abr', value: 2.0 },
  { name: 'Mai', value: 1.8 },
  { name: 'Jun', value: 1.7 },
];

const customerSatisfactionData = [
  { name: 'Promotores', value: 70 },
  { name: 'Neutros', value: 20 },
  { name: 'Detratores', value: 10 },
];

const supportResponseTimeData = [
  { name: 'Jan', value: 45 },
  { name: 'Fev', value: 42 },
  { name: 'Mar', value: 48 },
  { name: 'Abr', value: 40 },
  { name: 'Mai', value: 38 },
  { name: 'Jun', value: 35 },
];

const orderVolumeData = [
  { name: 'Semana 1', value: 1200 },
  { name: 'Semana 2', value: 1300 },
  { name: 'Semana 3', value: 1100 },
  { name: 'Semana 4', value: 1400 },
];

const neighborhoodDeliveryData: NeighborhoodDeliveryData[] = [
  { name: 'Centro', lat: -23.55052, lng: -46.633309, deliveries: 500 },
  { name: 'Pinheiros', lat: -23.566369, lng: -46.691164, deliveries: 350 },
  { name: 'Vila Madalena', lat: -23.55633, lng: -46.687031, deliveries: 280 },
  { name: 'Moema', lat: -23.59341, lng: -46.662479, deliveries: 420 },
];

const topNeighborhoodsData = [
  {
    name: 'Centro',
    deliveries: 500,
    revenue: 125000,
    profit: 37500,
    topProducts: ['Pizza', 'Hambúrguer', 'Sushi', 'Salada', 'Sobremesa'],
  },
  {
    name: 'Pinheiros',
    deliveries: 450,
    revenue: 112500,
    profit: 33750,
    topProducts: ['Sushi', 'Poke', 'Açaí', 'Tapioca', 'Smoothie'],
  },
  {
    name: 'Vila Madalena',
    deliveries: 400,
    revenue: 100000,
    profit: 30000,
    topProducts: [
      'Cerveja Artesanal',
      'Petiscos',
      'Hambúrguer',
      'Pizza',
      'Drinks',
    ],
  },
  {
    name: 'Moema',
    deliveries: 350,
    revenue: 87500,
    profit: 26250,
    topProducts: [
      'Comida Japonesa',
      'Salada',
      'Frango Grelhado',
      'Peixe',
      'Sobremesa Light',
    ],
  },
  {
    name: 'Itaim Bibi',
    deliveries: 300,
    revenue: 75000,
    profit: 22500,
    topProducts: [
      'Comida Árabe',
      'Sushi',
      'Salada',
      'Sanduíche Natural',
      'Café Especial',
    ],
  },
  {
    name: 'Jardins',
    deliveries: 280,
    revenue: 70000,
    profit: 21000,
    topProducts: [
      'Comida Francesa',
      'Vinho',
      'Queijos',
      'Pães Artesanais',
      'Patisserie',
    ],
  },
  {
    name: 'Consolação',
    deliveries: 250,
    revenue: 62500,
    profit: 18750,
    topProducts: [
      'Café',
      'Pão na Chapa',
      'Coxinha',
      'Misto Quente',
      'Suco Natural',
    ],
  },
  {
    name: 'Bela Vista',
    deliveries: 220,
    revenue: 55000,
    profit: 16500,
    topProducts: ['Pizza', 'Lasanha', 'Nhoque', 'Risoto', 'Tiramisu'],
  },
  {
    name: 'Santana',
    deliveries: 200,
    revenue: 50000,
    profit: 15000,
    topProducts: ['Yakisoba', 'Temaki', 'Hot Roll', 'Gyoza', 'Tempurá'],
  },
  {
    name: 'Tatuapé',
    deliveries: 180,
    revenue: 45000,
    profit: 13500,
    topProducts: [
      'Churrasco',
      'Feijoada',
      'Virado à Paulista',
      'Pastel',
      'Caldo de Cana',
    ],
  },
];

const topCustomersData = [
  { name: 'Cliente A', orders: 150 },
  { name: 'Cliente B', orders: 120 },
  { name: 'Cliente C', orders: 100 },
  { name: 'Cliente D', orders: 90 },
  { name: 'Cliente E', orders: 80 },
];

const topBusinessTypesData = [
  { name: 'Restaurantes', orders: 500 },
  { name: 'Bares', orders: 300 },
  { name: 'Hospitais', orders: 200 },
  { name: 'Academias', orders: 150 },
  { name: 'Escritórios', orders: 100 },
];

export default function DesempenhoLogistico() {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [isClient, setIsClient] = useState(false);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  useEffect(() => {
    // Definir que o código está rodando no lado do cliente
    setIsClient(true);
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
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Fornecedores
                  </a>
                </li>
                <li>
                  <a
                    href="/desempenho-logistico"
                    className="font-semibold text-gray-600 hover:text-gray-900"
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
        <h1 className="mb-6 text-2xl font-bold text-gray-800">
          Relatório de Desempenho Logístico
        </h1>

        <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
            <div>
              <Label htmlFor="start-date">Data de Início</Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={handleDateChange}
              />
            </div>
            <div>
              <Label htmlFor="end-date">Data de Fim</Label>
              <Input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="client">Cliente</Label>
              <Select>
                <SelectTrigger id="client">
                  <SelectValue placeholder="Selecione o cliente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="cliente-a">Cliente A</SelectItem>
                  <SelectItem value="cliente-b">Cliente B</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="supplier">Fornecedor</Label>
              <Select>
                <SelectTrigger id="supplier">
                  <SelectValue placeholder="Selecione o fornecedor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="fornecedor-a">Fornecedor A</SelectItem>
                  <SelectItem value="fornecedor-b">Fornecedor B</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="product-type">Tipo de Produto</Label>
              <Select>
                <SelectTrigger id="product-type">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="tipo-a">Tipo A</SelectItem>
                  <SelectItem value="tipo-b">Tipo B</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button className="w-full md:w-auto">Aplicar Filtros</Button>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Faturado
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 1,234,567</div>
              <p className="text-xs text-muted-foreground">
                +15.3% em relação ao período anterior
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Lucro Líquido
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 345,678</div>
              <p className="text-xs text-muted-foreground">
                +8.7% em relação ao período anterior
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Margem de Lucro
              </CardTitle>
              <Percent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28%</div>
              <p className="text-xs text-muted-foreground">
                -1.2% em relação ao período anterior
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Custo por Unidade
              </CardTitle>
              <BarChart2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 12.50</div>
              <p className="text-xs text-muted-foreground">
                -3.5% em relação ao período anterior
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Lucro Líquido ao Longo do Tempo</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={profitData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#8884d8"
                    fill="#8884d8"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Custo por Unidade ao Longo do Tempo</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={costPerUnitData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Taxa de Devoluções</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={returnRateData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Satisfação do Cliente (NPS)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    dataKey="value"
                    data={customerSatisfactionData}
                    fill="#8884d8"
                    label
                  />
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>
                Tempo Médio de Resposta do Suporte (minutos)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={supportResponseTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#ff7300" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Volume de Pedidos Processados</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={orderVolumeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Top 10 Bairros com Mais Entregas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome do Bairro</TableHead>
                    <TableHead>Quantidade de Entregas</TableHead>
                    <TableHead>Valor Faturado (R$)</TableHead>
                    <TableHead>Valor Lucrado (R$)</TableHead>
                    <TableHead>Produto 1</TableHead>
                    <TableHead>Produto 2</TableHead>
                    <TableHead>Produto 3</TableHead>
                    <TableHead>Produto 4</TableHead>
                    <TableHead>Produto 5</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topNeighborhoodsData.map((neighborhood) => (
                    <TableRow key={neighborhood.name}>
                      <TableCell>{neighborhood.name}</TableCell>
                      <TableCell>{neighborhood.deliveries}</TableCell>
                      <TableCell>
                        {neighborhood.revenue.toLocaleString('pt-BR')}
                      </TableCell>
                      <TableCell>
                        {neighborhood.profit.toLocaleString('pt-BR')}
                      </TableCell>
                      {neighborhood.topProducts.map((product, index) => (
                        <TableCell key={index}>{product}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {isClient && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Mapa de Bairros com Mais Entregas</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ height: '400px' }}>
                <MapContainer
                  center={[-23.55052, -46.633309] as LatLngExpression}
                  zoom={11}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {neighborhoodDeliveryData.map((neighborhood) => (
                    <CircleMarker
                      key={neighborhood.name}
                      center={
                        [neighborhood.lat, neighborhood.lng] as LatLngExpression
                      }
                      radius={Math.sqrt(neighborhood.deliveries) / 2}
                      fillColor="#ff7800"
                      color="#000"
                      weight={1}
                      opacity={1}
                      fillOpacity={0.8}
                    >
                      <Popup>
                        {neighborhood.name}: {neighborhood.deliveries} entregas
                      </Popup>
                    </CircleMarker>
                  ))}
                </MapContainer>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Top 5 Clientes por Número de Pedidos</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topCustomersData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="orders" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>
                Top 5 Tipos de Negócio por Número de Pedidos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topBusinessTypesData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="orders" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8 flex items-center justify-between">
          <Button className="bg-blue-500 text-white hover:bg-blue-600">
            <Download className="mr-2 h-4 w-4" /> Exportar Relatório
          </Button>
          <Select>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="atual">Período Atual</SelectItem>
              <SelectItem value="anterior">Período Anterior</SelectItem>
              <SelectItem value="ano-passado">
                Mesmo Período Ano Passado
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Histórico de Relatórios</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center justify-between">
                <span>Relatório Mensal - Maio 2023</span>
                <Button variant="outline" size="sm">
                  Visualizar
                </Button>
              </li>
              <li className="flex items-center justify-between">
                <span>Relatório Trimestral - Q1 2023</span>
                <Button variant="outline" size="sm">
                  Visualizar
                </Button>
              </li>
              <li className="flex items-center justify-between">
                <span>Relatório Anual - 2022</span>
                <Button variant="outline" size="sm">
                  Visualizar
                </Button>
              </li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
