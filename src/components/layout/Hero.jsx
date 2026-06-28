export default function Hero() {
  return (
    <section
      className="relative flex items-center justify-center text-center overflow-hidden"
      style={{
        height: '80vh',
        backgroundImage:
          'linear-gradient(rgba(10,10,10,0.55), rgba(10,10,10,0.92)), url(/watch_submariner.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay radial */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle, rgba(26,26,26,0) 0%, rgba(10,10,10,0.8) 100%)',
        }}
      />

      {/* Contenido */}
      <div className="relative z-10 max-w-[800px] px-8 animate-fade-in">
        <h1
          className="text-[4rem] leading-tight mb-4"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: '#c5a059',
            textShadow: '0 4px 10px rgba(0,0,0,0.5)',
          }}
        >
          El Tiempo es un Lujo
        </h1>

        <p
          className="text-[1.2rem] leading-relaxed mb-8"
          style={{ color: '#a3a3a3', fontFamily: "'Inter', sans-serif" }}
        >
          Descubre nuestra colección exclusiva de relojes de alta gama.<br />
          Cada pieza, una obra maestra.
        </p>

        <a
          href="/coleccion"
          className="inline-block px-8 py-3 text-sm font-semibold uppercase tracking-[1px] rounded transition-colors duration-200"
          style={{
            backgroundColor: '#c5a059',
            color: '#0a0a0a',
            fontFamily: "'Inter', sans-serif",
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#dfb668')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#c5a059')}
        >
          Ver Colección
        </a>
      </div>
    </section>
  )
}
