import { useState } from 'react'
import { Link } from 'react-router-dom'
import { formatPrice } from '../../data/products'

const PLACEHOLDER = '/watch_submariner.png'

export default function ProductCard({ product, hideDescripcion = false }) {
  const [imgIndex, setImgIndex] = useState(0)

  const {
    marca,
    nombre,
    descripcion,
    precio,
    precio_original,
    porcentaje_descuento,
    stock,
    imagenes = [],
  } = product

  const images      = imagenes.length ? imagenes.map(i => i.url_imagen) : [PLACEHOLDER]
  const hasMultiple = images.length > 1
  const lowStock    = stock === 1

  const prev = (e) => { e.stopPropagation(); setImgIndex(i => (i - 1 + images.length) % images.length) }
  const next = (e) => { e.stopPropagation(); setImgIndex(i => (i + 1) % images.length) }

  return (
    <div
      className="flex flex-col rounded-[4px] overflow-hidden border transition-transform duration-200 hover:-translate-y-[5px]"
      style={{ backgroundColor: '#1a1a1a', borderColor: '#333' }}
    >
      {/* Imagen / Carousel */}
      <div className="relative w-full aspect-square bg-black overflow-hidden group">
        <img
          src={images[imgIndex]}
          alt={nombre}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {hasMultiple && (
          <>
            <button onClick={prev} aria-label="Imagen anterior"
              className="absolute left-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-lg z-10 transition-colors duration-200 cursor-pointer"
              style={{ background: 'rgba(0,0,0,0.55)', color: '#c5a059', border: '1px solid rgba(197,160,89,0.4)' }}>
              ‹
            </button>
            <button onClick={next} aria-label="Imagen siguiente"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-lg z-10 transition-colors duration-200 cursor-pointer"
              style={{ background: 'rgba(0,0,0,0.55)', color: '#c5a059', border: '1px solid rgba(197,160,89,0.4)' }}>
              ›
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {images.map((_, i) => (
                <button key={i} onClick={e => { e.stopPropagation(); setImgIndex(i) }}
                  aria-label={`Imagen ${i + 1}`}
                  className="w-1.5 h-1.5 rounded-full transition-colors duration-200"
                  style={{ backgroundColor: i === imgIndex ? '#c5a059' : 'rgba(255,255,255,0.4)' }} />
              ))}
            </div>
          </>
        )}

        {porcentaje_descuento > 0 && (
          <span className="absolute top-2.5 left-2.5 px-2 py-1 text-xs font-bold rounded z-10"
            style={{ backgroundColor: '#e74c3c', color: '#fff', letterSpacing: '1px' }}>
            -{porcentaje_descuento}% OFF
          </span>
        )}

        {lowStock && (
          <span className="absolute top-2.5 right-2.5 px-2 py-1 text-xs font-semibold rounded z-10"
            style={{ backgroundColor: 'rgba(243,156,18,0.9)', color: '#fff' }}>
            Última unidad
          </span>
        )}
      </div>

      {/* Contenido */}
      <div className="flex flex-col flex-grow p-6">
        <p className="text-[0.8rem] font-semibold uppercase tracking-[2px] mb-1.5"
          style={{ color: '#a3a3a3', fontFamily: "'Inter', sans-serif" }}>
          {marca}
        </p>
        <h3 className="text-[1.15rem] mb-3"
          style={{ fontFamily: "'Playfair Display', serif", color: '#f5f5f5' }}>
          {nombre}
        </h3>
        {!hideDescripcion && (
          <p className="text-[0.9rem] leading-relaxed flex-grow mb-6"
            style={{ color: '#a3a3a3', fontFamily: "'Inter', sans-serif" }}>
            {descripcion}
          </p>
        )}

        <div className="flex flex-col mt-auto gap-4">
          <div className="flex flex-col">
            {precio_original && (
              <span className="text-[0.85rem] line-through mb-0.5" style={{ color: '#666' }}>
                {formatPrice(precio_original)}
              </span>
            )}
            <span className="text-[1.2rem] font-semibold" style={{ color: '#c5a059' }}>
              {formatPrice(precio)}
            </span>
          </div>

          <Link
            to={`/producto/${product.id}`}
            className="text-[0.85rem] font-semibold uppercase px-4 py-2 rounded border transition-all duration-200 text-center"
            style={{ color: '#c5a059', borderColor: '#c5a059', letterSpacing: '1px' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#c5a059'; e.currentTarget.style.color = '#0a0a0a' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#c5a059' }}
          >
            Detalle
          </Link>
        </div>
      </div>
    </div>
  )
}
