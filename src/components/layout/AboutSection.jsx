import imagenQuienesSomos from '../../assets/ImagenQuienesSomos.jpeg'

const STATS = [
  { value: '+15',  label: 'Años de experiencia' },
  { value: '+500', label: 'Relojes vendidos' },
  { value: '100%', label: 'Autenticidad garantizada' },
  { value: '4',    label: 'Marcas de lujo' },
]

const PARAGRAPHS = [
  'Tienda Relojes nace impulsada por la pasión por la relojería clásica y contemporánea. Nos especializamos en la compra, venta y consignación de relojes cuidadosamente seleccionados, ofreciendo piezas de marcas reconocidas y modelos únicos para coleccionistas y entusiastas.',
  'Nuestro compromiso es entregar confianza, transparencia y una atención personalizada, ayudando a cada cliente a encontrar el reloj ideal o a vender su pieza con total seguridad.',
  'Más que vender relojes, compartimos la historia, la ingeniería y la pasión que hacen de cada pieza algo extraordinario.',
]

export default function AboutSection() {
  return (
    <section id="nosotros" className="py-24" style={{ backgroundColor: '#1a1a1a' }}>
      <div className="max-w-[1200px] mx-auto px-8">

        {/* Contenido principal: texto + imagen */}
        <div className="flex flex-col lg:flex-row gap-16 items-center mb-20">

          {/* Texto */}
          <div className="flex-1">
            {/* Etiqueta */}
            <p
              className="text-xs font-semibold uppercase tracking-[3px] mb-4"
              style={{ color: '#c5a059', fontFamily: "'Inter', sans-serif" }}
            >
              Nuestra historia
            </p>

            <h2
              className="text-[2.5rem] leading-tight mb-8"
              style={{ fontFamily: "'Playfair Display', serif", color: '#f5f5f5' }}
            >
              Quiénes <span style={{ color: '#c5a059' }}>Somos</span>
            </h2>

            <div className="flex flex-col gap-5">
              {PARAGRAPHS.map((text, i) => (
                <p
                  key={i}
                  className="text-[1.05rem] leading-[1.8]"
                  style={{ color: '#a3a3a3', fontFamily: "'Inter', sans-serif" }}
                >
                  {text}
                </p>
              ))}

              <p
                className="text-base italic mt-2"
                style={{
                  color: '#c5a059',
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: 'italic',
                }}
              >
                "Tienda Relojes — Colección y pasión por la relojería."
              </p>
            </div>
          </div>

          {/* Imagen */}
          <div
            className="w-full lg:w-[588px] flex-shrink-0 rounded overflow-hidden relative"
          >
            <img
              src={imagenQuienesSomos}
              alt="Reloj de lujo Tienda Relojes"
              className="w-full h-auto block"
              style={{ filter: 'brightness(0.85)' }}
            />
            {/* Overlay degradado inferior */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to top, rgba(10,10,10,0.7) 0%, transparent 60%)',
              }}
            />
            {/* Texto sobre imagen */}
            <div className="absolute bottom-6 left-6 right-6">
              <p
                className="text-lg"
                style={{ fontFamily: "'Playfair Display', serif", color: '#c5a059' }}
              >
                Excelencia en cada detalle
              </p>
              <p
                className="text-xs mt-1 tracking-widest uppercase"
                style={{ color: 'rgba(255,255,255,0.5)', fontFamily: "'Inter', sans-serif" }}
              >
                Desde 2010
              </p>
            </div>
          </div>

        </div>

        {/* Stats */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-px"
          style={{ backgroundColor: '#333' }}
        >
          {STATS.map(({ value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center py-10 text-center"
              style={{ backgroundColor: '#1a1a1a' }}
            >
              <span
                className="text-[2.5rem] font-light mb-2"
                style={{ fontFamily: "'Playfair Display', serif", color: '#c5a059' }}
              >
                {value}
              </span>
              <span
                className="text-xs uppercase tracking-[2px]"
                style={{ color: '#a3a3a3', fontFamily: "'Inter', sans-serif" }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
