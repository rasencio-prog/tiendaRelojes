import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const NAV = [
  {
    to: '/admin',
    end: true,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zm0 9.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zm9.75-9.75A2.25 2.25 0 0115.75 3.75H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zm0 9.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
    label: 'Dashboard',
  },
  {
    to: '/admin/productos',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: 'Productos',
  },
  {
    to: '/admin/productos/nuevo',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    ),
    label: 'Agregar Producto',
  },
  {
    to: '/admin/usuarios',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    label: 'Usuarios',
  },
]

export default function AdminLayout() {
  const { user, logoutUser } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = async () => {
    await logoutUser()
    navigate('/admin/login')
  }

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded text-sm font-medium transition-all duration-200 ${
      isActive
        ? 'text-[#0a0a0a] font-semibold'
        : 'hover:bg-white/5'
    }`

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? { backgroundColor: '#c5a059', color: '#0a0a0a' }
      : { color: '#a3a3a3' }

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#0d0d0d' }}>

      {/* Overlay móvil */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 lg:hidden"
          style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-40 flex flex-col w-[240px] border-r transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ backgroundColor: '#111', borderColor: '#2a2a2a' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b" style={{ borderColor: '#2a2a2a' }}>
          <img src="/logo.png" alt="Logo" style={{ height: 36, filter: 'invert(1)', mixBlendMode: 'screen' }} />
          <div>
            <p className="text-xs font-bold uppercase tracking-[2px]" style={{ color: '#c5a059', fontFamily: "'Inter', sans-serif" }}>
              Admin
            </p>
            <p className="text-[0.7rem]" style={{ color: '#555', fontFamily: "'Inter', sans-serif" }}>
              Panel de gestión
            </p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-grow px-3 py-4 flex flex-col gap-1">
          {NAV.map(({ to, end, icon, label }) => (
            <NavLink key={to} to={to} end={end} className={navLinkClass} style={navLinkStyle}>
              {icon}
              {label}
            </NavLink>
          ))}

          <div className="my-3 border-t" style={{ borderColor: '#2a2a2a' }} />

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 rounded text-sm transition-colors duration-200 hover:bg-white/5"
            style={{ color: '#555', fontFamily: "'Inter', sans-serif" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            Ver tienda
          </a>
        </nav>

        {/* Footer sidebar */}
        <div className="px-4 py-4 border-t" style={{ borderColor: '#2a2a2a' }}>
          <p className="text-xs mb-1 truncate" style={{ color: '#f5f5f5', fontFamily: "'Inter', sans-serif" }}>{user?.name}</p>
          <p className="text-[0.7rem] mb-3 truncate" style={{ color: '#555', fontFamily: "'Inter', sans-serif" }}>{user?.email}</p>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs transition-colors duration-200 hover:text-red-400"
            style={{ color: '#888', fontFamily: "'Inter', sans-serif" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col lg:ml-[240px]">

        {/* Topbar */}
        <header className="sticky top-0 z-20 flex items-center gap-4 px-6 py-4 border-b" style={{ backgroundColor: '#111', borderColor: '#2a2a2a' }}>
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden"
            style={{ color: '#a3a3a3' }}
            aria-label="Abrir menú"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <span className="text-sm" style={{ color: '#555', fontFamily: "'Inter', sans-serif" }}>
            Tienda Relojes — Panel Admin
          </span>
        </header>

        {/* Página actual */}
        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
