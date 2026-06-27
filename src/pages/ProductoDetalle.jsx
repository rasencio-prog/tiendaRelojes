import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProducto, getProductos } from '../services/api'
import PublicLayout from '../components/layout/PublicLayout'
import { formatPrice } from '../data/products'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/watches/ProductCard'

const PLACEHOLDER = '/watch_submariner.png'
const WA_NUMBER   = '56900000000'

export default function ProductoDetalle() {
  const { id }       = useParams()
  const navigate     = useNavigate()
  const { addToCart } = useCart()

  const [producto,    setProducto]    = useState(null)
  const [loading,     setLoading]     = useState(true)
  const [error,       setError]       = useState(null)
  const [imgIndex,    setImgIndex]    = useState(0)
  const [relacionados, setRelacionados] = useState([])

  useEffect(() => {
    setLoading(true)
    setImgIndex(0)
    getProducto(id)
      .then(p => {
        setProducto(p)
        return getProductos()
      })
      .then(todos => {
        const otros = todos.filter(p => String(p.id) !== String(id))
        setRelacionados(otros.slice(0, 4))
      })
      .catch(() => setError('No se pudo cargar el producto.'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <PublicLayout>
        <div className="flex justify-center items-center py-40" style={{ backgroundColor: '#0a0a0a' }}>
          <div className="w-10 h-10 rounded-full border-2 animate-spin"
            style={{ borderColor: '#c5a059', borderTopColor: 'transparent' }} />
        </div>
      </PublicLayout>
    )
  }

  if (error || !producto) {
    return (
      <PublicLayout>
        <div className="flex flex-col items-center justify-center py-40 gap-4" style={{ backgroundColor: '#0a0a0a' }}>
          <p className="text-sm" style={{ color: '#e74c3c' }}>{error ?? 'Producto no encontrado.'}</p>
          <button onClick={() => navigate(-1)} className="text-sm underline" style={{ color: '#c5a059' }}>
            Volver
          </button>
        </div>
      </PublicLayout>
    )
  }

  const images     = producto.imagenes?.length ? producto.imagenes.map(i => i.url_imagen) : [PLACEHOLDER]
  const hasMultiple = images.length > 1
  const outOfStock = producto.stock === 0

  const prev = () => setImgIndex(i => (i - 1 + images.length) % images.length)
  const next = () => setImgIndex(i => (i + 1) % images.length)

  return (
    <PublicLayout>
      <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
        <div className="max-w-[1100px] mx-auto px-6 py-10">

          {/* Volver */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm mb-10 transition-colors duration-200 hover:text-white cursor-pointer"
            style={{ color: '#a3a3a3', fontFamily: "'Inter', sans-serif" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Volver
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">

            {/* ── Columna izquierda: Imágenes ── */}
            <div>
              {/* Imagen principal */}
              <div className="relative aspect-square overflow-hidden rounded-lg"
                style={{ backgroundColor: '#111' }}>
                <img
                  src={images[imgIndex]}
                  alt={producto.nombre}
                  className="w-full h-full object-cover transition-opacity duration-300"
                />

                {hasMultiple && (
                  <>
                    <button
                      onClick={prev}
                      aria-label="Imagen anterior"
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-xl transition-colors duration-200 cursor-pointer"
                      style={{ background: 'rgba(0,0,0,0.6)', color: '#c5a059', border: '1px solid rgba(197,160,89,0.4)' }}
                    >
                      ‹
                    </button>
                    <button
                      onClick={next}
                      aria-label="Imagen siguiente"
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-xl transition-colors duration-200 cursor-pointer"
                      style={{ background: 'rgba(0,0,0,0.6)', color: '#c5a059', border: '1px solid rgba(197,160,89,0.4)' }}
                    >
                      ›
                    </button>
                  </>
                )}
              </div>

              {/* Miniaturas */}
              {hasMultiple && (
                <div className="flex gap-3 mt-4 flex-wrap">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setImgIndex(i)}
                      aria-label={`Ver imagen ${i + 1}`}
                      className="w-16 h-16 rounded overflow-hidden flex-shrink-0 transition-all duration-200 cursor-pointer"
                      style={{
                        border: `2px solid ${i === imgIndex ? '#c5a059' : '#2a2a2a'}`,
                        opacity: i === imgIndex ? 1 : 0.55,
                      }}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ── Columna derecha: Información ── */}
            <div className="flex flex-col">
              {/* Marca */}
              <p className="text-xs font-semibold uppercase tracking-[3px] mb-2"
                style={{ color: '#a3a3a3', fontFamily: "'Inter', sans-serif" }}>
                {producto.marca}
              </p>

              {/* Nombre */}
              <h1 className="text-[2rem] leading-tight mb-6"
                style={{ fontFamily: "'Playfair Display', serif", color: '#f5f5f5' }}>
                {producto.nombre}
              </h1>

              {/* Precio */}
              <div className="flex items-baseline gap-3 mb-8">
                <span className="text-[1.6rem] font-semibold" style={{ color: '#c5a059' }}>
                  {formatPrice(producto.precio)}
                </span>
                {producto.precio_original && (
                  <span className="text-base line-through" style={{ color: '#555' }}>
                    {formatPrice(producto.precio_original)}
                  </span>
                )}
                {producto.porcentaje_descuento > 0 && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded"
                    style={{ backgroundColor: '#e74c3c', color: '#fff' }}>
                    -{producto.porcentaje_descuento}% OFF
                  </span>
                )}
              </div>

              {/* Separador */}
              <div className="border-t mb-8" style={{ borderColor: '#222' }} />

              {/* Descripción */}
              <div className="mb-8">
                <h2 className="text-sm font-semibold uppercase tracking-[2px] mb-3"
                  style={{ color: '#c5a059', fontFamily: "'Inter', sans-serif" }}>
                  Descripción
                </h2>
                <div className="rich-content text-[0.95rem] leading-relaxed"
                  style={{ color: '#a3a3a3', fontFamily: "'Inter', sans-serif" }}
                  dangerouslySetInnerHTML={{ __html: producto.descripcion || '' }} />
              </div>

              {/* Ficha Técnica */}
              <div className="mb-10">
                <h2 className="text-sm font-semibold uppercase tracking-[2px] mb-3"
                  style={{ color: '#c5a059', fontFamily: "'Inter', sans-serif" }}>
                  Ficha Técnica
                </h2>
                <div className="rich-content text-[0.9rem] leading-relaxed"
                  style={{ color: '#a3a3a3', fontFamily: "'Inter', sans-serif" }}
                  dangerouslySetInnerHTML={{ __html: producto.ficha_tecnica || '—' }} />
              </div>

              {/* Stock / Acción */}
              <div className="mt-auto flex flex-col gap-3">
                {outOfStock ? (
                  <p className="text-sm font-semibold uppercase tracking-[1px]"
                    style={{ color: '#e74c3c', fontFamily: "'Inter', sans-serif" }}>
                    Sin stock disponible
                  </p>
                ) : (
                  <>
                    <button
                      onClick={() => addToCart(producto)}
                      className="w-full py-4 rounded text-sm font-semibold uppercase tracking-[1px] transition-all duration-200 cursor-pointer"
                      style={{ backgroundColor: '#c5a059', color: '#0a0a0a', fontFamily: "'Inter', sans-serif" }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#b8904a')}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#c5a059')}
                    >
                      Agregar al carrito
                    </button>
                    {producto.stock <= 3 && (
                      <p className="text-xs text-center" style={{ color: '#f39c12', fontFamily: "'Inter', sans-serif" }}>
                        Solo {producto.stock} {producto.stock === 1 ? 'unidad' : 'unidades'} disponibles
                      </p>
                    )}
                  </>
                )}

                {/* Botón WhatsApp */}
                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hola, me interesa el reloj ${producto.marca} ${producto.nombre}. ¿Podrían darme más información?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded text-sm font-semibold uppercase tracking-[1px] flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer"
                  style={{ backgroundColor: '#25D366', color: '#fff', fontFamily: "'Inter', sans-serif" }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1ebd59')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#25D366')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Comprar por WhatsApp
                </a>
              </div>
            </div>

          </div>

          {/* Productos Relacionados */}
          {relacionados.length > 0 && (
            <div className="mt-20">
              <div className="border-t mb-10" style={{ borderColor: '#222' }} />
              <h2 className="text-[1.4rem] mb-8"
                style={{ fontFamily: "'Playfair Display', serif", color: '#f5f5f5' }}>
                Otros productos
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relacionados.map(p => (
                  <ProductCard key={p.id} product={p} hideDescripcion />
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </PublicLayout>
  )
}
