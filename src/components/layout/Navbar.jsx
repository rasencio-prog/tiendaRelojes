import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

const NAV_LINKS = [
  { label: 'Colección',     to: '/coleccion' },
  { label: 'Ofertas',       to: '/ofertas'   },
  { label: 'Vende tu Reloj', to: '/vender'   },
  { label: 'Quiénes Somos', to: '/nosotros'  },
  { label: 'Contacto',      to: '/contacto'  },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { cartCount, openCart } = useCart()

  return (
    <nav
      className="sticky top-0 z-50 border-b border-[#333]"
      style={{ backgroundColor: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(10px)' }}
    >
      <div className="max-w-[1200px] mx-auto px-8 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center shrink-0">
          <img
            src="/logo.png"
            alt="Tienda Relojes"
            className="h-[102px] w-auto object-contain"
            style={{
              filter: 'invert(1)',
              mixBlendMode: 'screen',
            }}
          />
        </Link>

        {/* Links — desktop */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className="text-[0.9rem] font-semibold uppercase tracking-[1px] text-[#f5f5f5] transition-colors duration-200 hover:text-[#c5a059]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-4">
          {/* Carrito */}
          <button
            onClick={openCart}
            aria-label="Abrir carrito"
            className="relative text-[#f5f5f5] hover:text-[#c5a059] transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 w-5 h-5 rounded-full text-[0.7rem] font-bold flex items-center justify-center"
                style={{ backgroundColor: '#c5a059', color: '#0a0a0a' }}>
                {cartCount}
              </span>
            )}
          </button>

          {/* Hamburguesa — mobile */}
          <button
            className="lg:hidden flex flex-col gap-[5px] p-1 text-[#f5f5f5]"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menú"
          >
            <span className={`block w-6 h-0.5 bg-current transition-transform duration-200 ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
            <span className={`block w-6 h-0.5 bg-current transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-current transition-transform duration-200 ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {menuOpen && (
        <div className="lg:hidden border-t border-[#333] px-8 py-4 flex flex-col gap-4"
          style={{ backgroundColor: 'rgba(10,10,10,0.97)' }}>
          {NAV_LINKS.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className="text-[0.9rem] font-semibold uppercase tracking-[1px] text-[#f5f5f5] hover:text-[#c5a059] transition-colors duration-200"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
