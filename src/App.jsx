import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'

// Páginas públicas
import Home             from './pages/Home'
import Coleccion        from './pages/Coleccion'
import Ofertas          from './pages/Ofertas'
import Vender           from './pages/Vender'
import Nosotros         from './pages/Nosotros'
import Contacto         from './pages/Contacto'
import ProductoDetalle  from './pages/ProductoDetalle'

// Admin
import AdminLayout  from './components/admin/AdminLayout'
import RequireAuth  from './components/admin/RequireAuth'
import AdminLogin   from './pages/admin/Login'
import Dashboard    from './pages/admin/Dashboard'
import ProductoList from './pages/admin/ProductoList'
import ProductoForm from './pages/admin/ProductoForm'
import UserList     from './pages/admin/UserList'
import UserForm     from './pages/admin/UserForm'

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
      <BrowserRouter>
        <Routes>
          {/* Tienda pública */}
          <Route path="/"           element={<Home />} />
          <Route path="/coleccion"       element={<Coleccion />} />
          <Route path="/ofertas"         element={<Ofertas />} />
          <Route path="/vender"          element={<Vender />} />
          <Route path="/nosotros"        element={<Nosotros />} />
          <Route path="/contacto"        element={<Contacto />} />
          <Route path="/producto/:id"    element={<ProductoDetalle />} />

          {/* Admin — login */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin — panel protegido */}
          <Route path="/admin" element={
            <RequireAuth>
              <AdminLayout />
            </RequireAuth>
          }>
            <Route index                   element={<Dashboard />} />
            <Route path="productos"        element={<ProductoList />} />
            <Route path="productos/nuevo"  element={<ProductoForm />} />
            <Route path="productos/:id"    element={<ProductoForm />} />
            <Route path="usuarios"         element={<UserList />} />
            <Route path="usuarios/nuevo"   element={<UserForm />} />
            <Route path="usuarios/:id"     element={<UserForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}
