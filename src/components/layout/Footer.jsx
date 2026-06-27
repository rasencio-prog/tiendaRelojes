import { Link } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Inicio',          to: '/' },
  { label: 'Colección',       to: '/coleccion' },
  { label: 'Ofertas',         to: '/ofertas' },
  { label: 'Vende tu Reloj',  to: '/vender' },
  { label: 'Quiénes Somos',   to: '/nosotros' },
  { label: 'Contacto',        to: '/contacto' },
]

const SOCIAL = {
  whatsapp:  'https://wa.me/56922567361',
  instagram: 'https://instagram.com/',
  tiktok:    'https://tiktok.com/',
}

const CONTACT = {
  email: 'ventas@tiendarelojes.cl',
  phone: '+56 9 2256 7361',
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ backgroundColor: '#0b1828', color: '#f5f5f5' }}>

      {/* Barra de anuncio */}
      <div className="border-b" style={{ borderColor: '#1e3050' }}>
        <div className="max-w-[1200px] mx-auto px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
            Novedades todos los días en nuestro Canal de WhatsApp
          </p>
          <div className="flex items-center gap-3">
            <a href={SOCIAL.whatsapp} target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-white/40 flex items-center justify-center hover:bg-white/10 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
            <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-white/40 flex items-center justify-center hover:bg-white/10 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href={SOCIAL.tiktok} target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-white/40 flex items-center justify-center hover:bg-white/10 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.95a8.16 8.16 0 004.77 1.52V7.02a4.85 4.85 0 01-1-.33z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Cuerpo principal */}
      <div className="max-w-[1200px] mx-auto px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_1fr_1fr] gap-12">

          {/* Logo */}
          <div className="flex items-start">
            <Link to="/">
              <img
                src="/logo.png"
                alt="Tienda Relojes"
                className="h-24 w-auto object-contain"
                style={{ filter: 'invert(1)', mixBlendMode: 'screen' }}
              />
            </Link>
          </div>

          {/* Menú */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[3px] mb-5"
              style={{ fontFamily: "'Inter', sans-serif" }}>
              MENÚ
            </h4>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map(({ label, to }) => (
                <li key={to} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#f5f5f5' }} />
                  <Link
                    to={to}
                    className="text-sm transition-colors duration-200 hover:text-white"
                    style={{ color: 'rgba(255,255,255,0.65)', fontFamily: "'Inter', sans-serif" }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[3px] mb-5"
              style={{ fontFamily: "'Inter', sans-serif" }}>
              CONTACTO
            </h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-sm transition-colors duration-200 hover:text-white"
                  style={{ color: 'rgba(255,255,255,0.65)', fontFamily: "'Inter', sans-serif" }}
                >
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.65)', fontFamily: "'Inter', sans-serif" }}>
                  {CONTACT.phone}
                </span>
              </li>
            </ul>
          </div>

          {/* Pago Seguro */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[3px] mb-5"
              style={{ fontFamily: "'Inter', sans-serif" }}>
              PAGO SEGURO
            </h4>
            <div className="flex flex-col gap-4">
              {/* Mercado Pago */}
              <div className="inline-flex items-center bg-white rounded-xl px-4 py-2.5 gap-2 w-fit">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 flex-shrink-0" viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="22" fill="#009EE3"/>
                  <path fill="#fff" d="M14 24a10 10 0 0120 0"/>
                  <path fill="#fff" d="M24 30a6 6 0 100-12 6 6 0 000 12z"/>
                </svg>
                <div className="leading-tight">
                  <span className="block font-bold text-sm" style={{ color: '#009EE3' }}>mercado</span>
                  <span className="block font-bold text-sm" style={{ color: '#009EE3' }}>pago</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Línea inferior */}
      <div className="border-t" style={{ borderColor: '#1e3050' }}>
        <div className="max-w-[1200px] mx-auto px-8 py-5 text-center">
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: "'Inter', sans-serif" }}>
            © {year} Tienda Relojes. Todos los derechos reservados.
          </p>
        </div>
      </div>

    </footer>
  )
}
