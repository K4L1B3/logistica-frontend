// src/routes/AppRoutes.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Clientes from '../pages/clientes/index';
import Pedidos from '../pages/pedidos/index';
import Produtos from '../pages/produtos/index';
import { ReactNode } from 'react';

interface AppRoutesProps {
  children?: ReactNode; // Adiciona a tipagem para aceitar children como uma propriedade opcional
}

const AppRoutes = ({ children }: AppRoutesProps) => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Clientes />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/produtos" element={<Produtos />} />
      </Routes>
      {children} {/* Renderiza children aqui, se existir */}
    </Router>
  );
};

export default AppRoutes;
