import { useFetch } from '../../hooks/useFetch'
import { getProductos } from '../../services/api'
import { formatPrice } from '../../data/products'
import ProductCard from './ProductCard'

export default function OffersSection() {
  const { data: ofertas, loading, error } = useFetch(
    () => getProductos({ con_descuento: 1 })
  )

  if (loading) return null
  if (error || !ofertas?.length) return null

  const totalSavings = ofertas.reduce((sum, p) => {
    const saving = (p.precio_original ?? p.precio) - p.precio
    return sum + saving
  }, 0)

  return (
    <section id="ofertas" className="py-20" style={{ backgroundColor: '#1a1a1a' }}>
      <div className="max-w-[1200px] mx-auto px-8">

        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="h-px w-16 block" style={{ backgroundColor: '#c5a059', opacity: 0.5 }} />
            <span className="text-xs font-semibold uppercase tracking-[3px]"
              style={{ color: '#c5a059', fontFamily: "'Inter', sans-serif" }}>
              Tiempo limitado
            </span>
            <span className="h-px w-16 block" style={{ backgroundColor: '#c5a059', opacity: 0.5 }} />
          </div>

          <h2 className="text-[2.5rem] mb-3"
            style={{ fontFamily: "'Playfair Display', serif", color: '#c5a059' }}>
            Ofertas Exclusivas
          </h2>

          <p className="text-sm" style={{ color: '#a3a3a3', fontFamily: "'Inter', sans-serif" }}>
            {ofertas.length} {ofertas.length === 1 ? 'pieza seleccionada' : 'piezas seleccionadas'} con descuento
            &nbsp;·&nbsp; Ahorra hasta{' '}
            <span style={{ color: '#c5a059' }}>{formatPrice(totalSavings)}</span>
          </p>
        </div>

        <div className="grid gap-8" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {ofertas.map(product => (
            <div key={product.id} className="relative">
              <div className="absolute top-0 left-0 z-20 pointer-events-none overflow-hidden"
                style={{ width: 80, height: 80 }}>
                <div className="absolute text-[10px] font-bold text-center leading-none py-1"
                  style={{
                    backgroundColor: '#e74c3c', color: '#fff',
                    width: 100, top: 20, left: -20,
                    transform: 'rotate(-45deg)', letterSpacing: '0.5px',
                  }}>
                  -{product.porcentaje_descuento}% OFF
                </div>
              </div>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
