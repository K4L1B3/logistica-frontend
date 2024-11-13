// src/routes/index.tsx
import { Routes, Route } from 'react-router-dom'
import App from '../App'
import Home from '../pages/home'
// import Fornecedores from '@/pages/fornecedores'
// import Produtos from '@/pages/produtos'



const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        {/* <Route path="fornecedores" element={<Fornecedores />} /> */}
        {/* <Route path="produtos" element={<Produtos />} /> */}
        {/* Adicione mais rotas aqui conforme necessário */}
      </Route>
    </Routes>
  )
}

export default Router
