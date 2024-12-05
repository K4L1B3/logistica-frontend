'use client'

import { Users, Package, ShoppingCart, Truck } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClientesComponent } from '../components/template/clientes'
import { FornecedoresComponent } from '../components/template/fornecedores'
import { PedidosPage } from '../components/template/pedidos'
import ProdutosPage from '@/components/template/produtos'
// import ProdutosPage, { ProdutosComponent } from '../components/template/produtos'

export default function ManagementPage() {
  return (
    <div className="w-full">
      <Tabs defaultValue="clientes" className="w-full p-7">
        <TabsList className="grid w-full grid-cols-4 mb-8 bg-gray-200">
          <TabsTrigger 
            value="clientes" 
            className="flex items-center gap-2 bg-gray-200"
          >
            <Users size={16} />
            Clientes
          </TabsTrigger>
          <TabsTrigger 
            value="fornecedores" 
            className="flex items-center gap-2 bg-gray-200"
          >
            <Truck size={16} />
            Fornecedores
          </TabsTrigger>
          <TabsTrigger 
            value="produtos" 
            className="flex items-center gap-2 bg-gray-200"
          >
            <Package size={16} />
            Produtos
          </TabsTrigger>
          <TabsTrigger 
            value="pedidos" 
            className="flex items-center gap-2 bg-gray-200"
          >
            <ShoppingCart size={16} />
            Pedidos
          </TabsTrigger>
        </TabsList>
        <TabsContent value="clientes">
          <ClientesComponent />
        </TabsContent>
        <TabsContent value="fornecedores">
          <FornecedoresComponent />
        </TabsContent>
        <TabsContent value="produtos">
          <ProdutosPage/>
        </TabsContent>
        <TabsContent value="pedidos">
          <PedidosPage />
        </TabsContent>
      </Tabs>
    </div>
  )
}