import { useFetch } from '../../hooks/useFetch'
import { getProductos } from '../../services/api'
import { Link } from 'react-router-dom'
import { formatPrice } from '../../data/products'

function StatCard({ label, value, color }) {
  return (
    <div className="rounded-lg p-6 border" style={{ backgroundColor: '#1a1a1a', borderColor: '#2a2a2a' }}>
      <p className="text-[0.75rem] uppercase tracking-[2px] mb-2" style={{ color: '#555', fontFamily: "'Inter', sans-serif" }}>{label}</p>
      <p className="text-[2.2rem] font-light" style={{ fontFamily: "'Playfair Display', serif", color: color ?? '#f5f5f5' }}>
        {value ?? '—'}
      </p>
    </div>
  )
}

export default function Dashboard() {
  const { data: productos, loading } = useFetch(getProductos)

  const total    = productos?.length ?? 0
  const activos  = productos?.filter(p => p.activo).length ?? 0
  const enOferta = productos?.filter(p => p.porcentaje_descuento > 0).length ?? 0
  const sinStock = productos?.filter(p => p.stock === 0).length ?? 0

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-[1.8rem]" style={{ fontFamily: "'Playfair Display', serif", color: '#c5a059' }}>
          Dashboard
        </h1>
        <p className="text-sm mt-1" style={{ color: '#555', fontFamily: "'Inter', sans-serif" }}>
          Resumen general de la tienda
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard label="Total productos" value={loading ? '…' : total} />
        <StatCard label="Activos"         value={loading ? '…' : activos}  color="#27ae60" />
        <StatCard label="En oferta"       value={loading ? '…' : enOferta} color="#c5a059" />
        <StatCard label="Sin stock"       value={loading ? '…' : sinStock}  color="#e74c3c" />
      </div>

      {/* Últimos productos */}
      <div className="rounded-lg border overflow-hidden" style={{ borderColor: '#2a2a2a' }}>
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ backgroundColor: '#1a1a1a', borderColor: '#2a2a2a' }}>
          <h2 className="text-base font-medium" style={{ fontFamily: "'Playfair Display', serif", color: '#f5f5f5' }}>
            Últimos productos
          </h2>
          <Link to="/admin/productos"
            className="text-xs transition-colors duration-200 hover:text-white"
            style={{ color: '#c5a059', fontFamily: "'Inter', sans-serif" }}>
            Ver todos →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm" style={{ backgroundColor: '#111' }}>
            <thead>
              <tr className="border-b" style={{ borderColor: '#2a2a2a' }}>
                {['Producto', 'Marca', 'Precio', 'Stock', 'Estado'].map(h => (
                  <th key={h} className="text-left px-6 py-3 text-[0.7rem] uppercase tracking-[1.5px]"
                    style={{ color: '#555', fontFamily: "'Inter', sans-serif" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-sm" style={{ color: '#555' }}>Cargando…</td></tr>
              ) : productos?.slice(0, 8).map(p => (
                <tr key={p.id} className="border-b transition-colors duration-150 hover:bg-white/[0.02]"
                  style={{ borderColor: '#1a1a1a' }}>
                  <td className="px-6 py-4" style={{ color: '#f5f5f5', fontFamily: "'Inter', sans-serif" }}>
                    {p.nombre}
                  </td>
                  <td className="px-6 py-4" style={{ color: '#a3a3a3', fontFamily: "'Inter', sans-serif" }}>
                    {p.marca}
                  </td>
                  <td className="px-6 py-4 font-medium" style={{ color: '#c5a059', fontFamily: "'Inter', sans-serif" }}>
                    {formatPrice(p.precio)}
                  </td>
                  <td className="px-6 py-4" style={{ color: p.stock === 0 ? '#e74c3c' : '#a3a3a3', fontFamily: "'Inter', sans-serif" }}>
                    {p.stock}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs px-2 py-1 rounded"
                      style={{
                        backgroundColor: p.activo ? 'rgba(39,174,96,0.15)' : 'rgba(255,255,255,0.05)',
                        color: p.activo ? '#27ae60' : '#555',
                        fontFamily: "'Inter', sans-serif",
                      }}>
                      {p.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
