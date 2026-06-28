import { useFetch } from '../../hooks/useFetch'
import { getProductos } from '../../services/api'
import ProductCard from './ProductCard'

export default function ProductGrid() {
  const { data: productos, loading, error } = useFetch(getProductos)

  return (
    <section id="coleccion" className="py-20" style={{ backgroundColor: '#0a0a0a' }}>
      <div className="max-w-[1200px] mx-auto px-8">
        <h2
          className="text-[2.5rem] text-center mb-12"
          style={{ fontFamily: "'Playfair Display', serif", color: '#c5a059' }}
        >
          Colección Destacada
        </h2>

        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
              style={{ borderColor: '#c5a059', borderTopColor: 'transparent' }} />
          </div>
        )}

        {error && (
          <p className="text-center py-10 text-sm" style={{ color: '#e74c3c' }}>
            {error}
          </p>
        )}

        {!loading && !error && productos?.length === 0 && (
          <p className="text-center py-10 text-sm" style={{ color: '#a3a3a3' }}>
            No hay productos disponibles por el momento.
          </p>
        )}

        {!loading && !error && productos?.length > 0 && (
          <div className="grid gap-8" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))' }}>
            {productos.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
