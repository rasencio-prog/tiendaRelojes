import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
import { getProductos, eliminarProducto, toggleActivoProducto } from '../../services/api'
import { formatPrice } from '../../data/products'

const PLACEHOLDER  = '/watch_submariner.png'
const PER_PAGE     = 10
const EMPTY_FILTER = { nombre: '', marca: '', precioMin: '', precioMax: '' }

// Columnas ordenables: key del objeto producto + label
const COLS = [
  { key: 'nombre',     label: 'Nombre'  },
  { key: 'marca',      label: 'Marca'   },
  { key: 'precio',     label: 'Precio'  },
  { key: 'created_at', label: 'Ingreso' },
  { key: 'activo',     label: 'Estado'  },
]

function SortIcon({ active, dir }) {
  return (
    <span className="inline-flex flex-col ml-1" style={{ lineHeight: 0, verticalAlign: 'middle' }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 5" width="8" height="5"
        style={{ opacity: active && dir === 'asc' ? 1 : 0.25, display: 'block' }}>
        <path d="M4 0L8 5H0z" fill="currentColor" />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 5" width="8" height="5"
        style={{ opacity: active && dir === 'desc' ? 1 : 0.25, display: 'block', marginTop: 2 }}>
        <path d="M4 5L0 0H8z" fill="currentColor" />
      </svg>
    </span>
  )
}

export default function ProductoList() {
  const { data: productos, loading, error } = useFetch(getProductos)
  const [lista,   setLista]   = useState(null)
  const [confirm, setConfirm] = useState(null)
  const [sortKey, setSortKey] = useState('created_at')
  const [sortDir, setSortDir] = useState('desc')
  const [page,    setPage]    = useState(1)
  const [filters, setFilters] = useState(EMPTY_FILTER)

  const hasFilters = Object.values(filters).some(v => v !== '')

  const items = lista ?? productos ?? []

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
    setPage(1)
  }

  const handleFilter = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({ ...prev, [name]: value }))
    setPage(1)
  }

  const clearFilters = () => { setFilters(EMPTY_FILTER); setPage(1) }

  const filtered = useMemo(() => {
    return items.filter(p => {
      if (filters.nombre   && !p.nombre.toLowerCase().includes(filters.nombre.toLowerCase()))   return false
      if (filters.marca    && !p.marca.toLowerCase().includes(filters.marca.toLowerCase()))     return false
      if (filters.precioMin && Number(p.precio) < Number(filters.precioMin))                   return false
      if (filters.precioMax && Number(p.precio) > Number(filters.precioMax))                   return false
      return true
    })
  }, [items, filters])

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      let va = a[sortKey] ?? ''
      let vb = b[sortKey] ?? ''
      if (sortKey === 'precio') { va = Number(va); vb = Number(vb) }
      if (sortKey === 'activo') { va = va ? 1 : 0; vb = vb ? 1 : 0 }
      if (sortKey === 'created_at') { va = new Date(va); vb = new Date(vb) }
      if (va < vb) return sortDir === 'asc' ? -1 :  1
      if (va > vb) return sortDir === 'asc' ?  1 : -1
      return 0
    })
  }, [filtered, sortKey, sortDir])

  const totalPages = Math.max(1, Math.ceil(sorted.length / PER_PAGE))
  const paginated  = sorted.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const handleToggle = async (producto) => {
    const nuevo = { ...producto, activo: !producto.activo }
    setLista(items.map(p => p.id === producto.id ? nuevo : p))
    try {
      await toggleActivoProducto(producto.id, !producto.activo)
    } catch (_) {
      setLista(items)
    }
  }

  const handleEliminar = async (id) => {
    setConfirm(null)
    const next = items.filter(p => p.id !== id)
    setLista(next)
    const newTotal = Math.max(1, Math.ceil(next.length / PER_PAGE))
    if (page > newTotal) setPage(newTotal)
    try {
      await eliminarProducto(id)
    } catch (_) {
      setLista(items)
    }
  }

  const getImg = (p) => p.imagenes?.length ? p.imagenes[0].url_imagen : PLACEHOLDER

  const fmtDate = (d) => d
    ? new Date(d).toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' })
    : '—'

  const thStyle = { color: '#555', fontFamily: "'Inter', sans-serif" }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[1.8rem]" style={{ fontFamily: "'Playfair Display', serif", color: '#c5a059' }}>
            Productos
          </h1>
          <p className="text-sm mt-1" style={{ color: '#555', fontFamily: "'Inter', sans-serif" }}>
            {items.length} {items.length === 1 ? 'producto' : 'productos'} en catálogo
          </p>
        </div>
        <Link
          to="/admin/productos/nuevo"
          className="flex items-center gap-2 px-4 py-2.5 rounded text-sm font-semibold transition-colors duration-200"
          style={{ backgroundColor: '#c5a059', color: '#0a0a0a', fontFamily: "'Inter', sans-serif" }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#dfb668')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#c5a059')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Agregar producto
        </Link>
      </div>

      {error && <p className="text-sm mb-6 text-center" style={{ color: '#e74c3c' }}>{error}</p>}

      {/* Filtros */}
      <div className="rounded-lg border p-4 mb-4 flex flex-wrap gap-3 items-end" style={{ backgroundColor: '#1a1a1a', borderColor: '#2a2a2a' }}>
        {/* Nombre */}
        <div className="flex flex-col gap-1 flex-1 min-w-[160px]">
          <label className="text-[0.7rem] uppercase tracking-[1.5px]" style={{ color: '#555', fontFamily: "'Inter', sans-serif" }}>
            Nombre
          </label>
          <input
            name="nombre" value={filters.nombre} onChange={handleFilter}
            placeholder="Buscar por nombre…"
            className="px-3 py-2 rounded text-sm outline-none transition-colors duration-200 focus:border-[#c5a059]"
            style={{ backgroundColor: '#0d0d0d', border: '1px solid #2a2a2a', color: '#f5f5f5', fontFamily: "'Inter', sans-serif" }}
          />
        </div>

        {/* Marca */}
        <div className="flex flex-col gap-1 flex-1 min-w-[140px]">
          <label className="text-[0.7rem] uppercase tracking-[1.5px]" style={{ color: '#555', fontFamily: "'Inter', sans-serif" }}>
            Marca
          </label>
          <input
            name="marca" value={filters.marca} onChange={handleFilter}
            placeholder="Buscar por marca…"
            className="px-3 py-2 rounded text-sm outline-none transition-colors duration-200 focus:border-[#c5a059]"
            style={{ backgroundColor: '#0d0d0d', border: '1px solid #2a2a2a', color: '#f5f5f5', fontFamily: "'Inter', sans-serif" }}
          />
        </div>

        {/* Precio mín */}
        <div className="flex flex-col gap-1 w-[130px]">
          <label className="text-[0.7rem] uppercase tracking-[1.5px]" style={{ color: '#555', fontFamily: "'Inter', sans-serif" }}>
            Precio mín
          </label>
          <input
            name="precioMin" type="number" min="0" value={filters.precioMin} onChange={handleFilter}
            placeholder="0"
            className="px-3 py-2 rounded text-sm outline-none transition-colors duration-200 focus:border-[#c5a059]"
            style={{ backgroundColor: '#0d0d0d', border: '1px solid #2a2a2a', color: '#f5f5f5', fontFamily: "'Inter', sans-serif" }}
          />
        </div>

        {/* Precio máx */}
        <div className="flex flex-col gap-1 w-[130px]">
          <label className="text-[0.7rem] uppercase tracking-[1.5px]" style={{ color: '#555', fontFamily: "'Inter', sans-serif" }}>
            Precio máx
          </label>
          <input
            name="precioMax" type="number" min="0" value={filters.precioMax} onChange={handleFilter}
            placeholder="∞"
            className="px-3 py-2 rounded text-sm outline-none transition-colors duration-200 focus:border-[#c5a059]"
            style={{ backgroundColor: '#0d0d0d', border: '1px solid #2a2a2a', color: '#f5f5f5', fontFamily: "'Inter', sans-serif" }}
          />
        </div>

        {/* Limpiar */}
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="px-4 py-2 rounded text-xs font-semibold transition-colors duration-200 self-end"
            style={{ backgroundColor: '#2a2a2a', color: '#a3a3a3', border: '1px solid #333', fontFamily: "'Inter', sans-serif" }}
          >
            Limpiar
          </button>
        )}

        {/* Resultado count cuando hay filtros */}
        {hasFilters && (
          <p className="text-xs self-end pb-2" style={{ color: '#555', fontFamily: "'Inter', sans-serif" }}>
            {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 rounded-full border-2 animate-spin"
            style={{ borderColor: '#c5a059', borderTopColor: 'transparent' }} />
        </div>
      ) : (
        <>
          <div className="rounded-lg border overflow-hidden" style={{ borderColor: '#2a2a2a' }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm" style={{ backgroundColor: '#111' }}>
                <thead>
                  <tr className="border-b" style={{ borderColor: '#2a2a2a' }}>

                    {/* Imagen — no ordenable */}
                    <th className="px-4 py-3" style={thStyle} />

                    {/* Columnas ordenables */}
                    {COLS.map(col => (
                      <th key={col.key}
                        className="text-left px-4 py-3 text-[0.7rem] uppercase tracking-[1.5px] whitespace-nowrap cursor-pointer select-none hover:text-white transition-colors duration-150"
                        style={{ ...thStyle, color: sortKey === col.key ? '#c5a059' : '#555' }}
                        onClick={() => handleSort(col.key)}
                      >
                        {col.label}
                        <SortIcon active={sortKey === col.key} dir={sortDir} />
                      </th>
                    ))}

                    {/* Dto. y Stock — no ordenables */}
                    <th className="text-left px-4 py-3 text-[0.7rem] uppercase tracking-[1.5px]" style={thStyle}>Dto.</th>
                    <th className="text-left px-4 py-3 text-[0.7rem] uppercase tracking-[1.5px]" style={thStyle}>Stock</th>
                    <th className="text-left px-4 py-3 text-[0.7rem] uppercase tracking-[1.5px]" style={thStyle}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.length === 0 && (
                    <tr>
                      <td colSpan={10} className="px-6 py-12 text-center text-sm" style={{ color: '#555' }}>
                        No hay productos. <Link to="/admin/productos/nuevo" style={{ color: '#c5a059' }}>Agrega el primero</Link>.
                      </td>
                    </tr>
                  )}
                  {paginated.map(p => (
                    <tr key={p.id}
                      className="border-b transition-colors duration-150 hover:bg-white/[0.02]"
                      style={{ borderColor: '#1a1a1a' }}>

                      {/* Imagen */}
                      <td className="px-4 py-3">
                        <img src={getImg(p)} alt={p.nombre}
                          className="w-12 h-12 object-cover rounded"
                          style={{ border: '1px solid #2a2a2a' }} />
                      </td>

                      {/* Nombre */}
                      <td className="px-4 py-3 font-medium max-w-[180px]" style={{ color: '#f5f5f5', fontFamily: "'Inter', sans-serif" }}>
                        <span className="block truncate">{p.nombre}</span>
                      </td>

                      {/* Marca */}
                      <td className="px-4 py-3 whitespace-nowrap" style={{ color: '#a3a3a3', fontFamily: "'Inter', sans-serif" }}>
                        {p.marca}
                      </td>

                      {/* Precio */}
                      <td className="px-4 py-3 whitespace-nowrap font-medium" style={{ color: '#c5a059', fontFamily: "'Inter', sans-serif" }}>
                        {formatPrice(p.precio)}
                      </td>

                      {/* Fecha ingreso */}
                      <td className="px-4 py-3 whitespace-nowrap" style={{ color: '#555', fontFamily: "'Inter', sans-serif", fontSize: '0.78rem' }}>
                        {fmtDate(p.created_at)}
                      </td>

                      {/* Estado — badge */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-xs font-semibold px-3 py-1 rounded-full"
                          style={{
                            color: p.activo ? '#27ae60' : '#555',
                            border: `1px solid ${p.activo ? '#27ae60' : '#444'}`,
                            backgroundColor: 'transparent',
                            fontFamily: "'Inter', sans-serif",
                          }}>
                          {p.activo ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>

                      {/* Descuento */}
                      <td className="px-4 py-3">
                        {p.porcentaje_descuento > 0 ? (
                          <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: 'rgba(231,76,60,0.15)', color: '#e74c3c' }}>
                            -{p.porcentaje_descuento}%
                          </span>
                        ) : (
                          <span style={{ color: '#333' }}>—</span>
                        )}
                      </td>

                      {/* Stock */}
                      <td className="px-4 py-3" style={{ color: p.stock === 0 ? '#e74c3c' : '#a3a3a3', fontFamily: "'Inter', sans-serif" }}>
                        {p.stock}
                      </td>

                      {/* Acciones */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button onClick={() => handleToggle(p)}
                            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors duration-200"
                            style={{ color: '#27ae60', border: '1px solid #27ae60', backgroundColor: 'transparent', fontFamily: "'Inter', sans-serif" }}>
                            <span style={{ fontSize: 10 }}>{p.activo ? '🔴' : '🟢'}</span>
                            {p.activo ? 'Desact.' : 'Activar'}
                          </button>
                          <Link to={`/admin/productos/${p.id}`}
                            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors duration-200 hover:bg-white/10"
                            style={{ color: '#f5f5f5', border: '1px solid #444', backgroundColor: 'transparent', fontFamily: "'Inter', sans-serif" }}>
                            ✏️ Editar
                          </Link>
                          <button onClick={() => setConfirm(p.id)}
                            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors duration-200"
                            style={{ color: '#e74c3c', border: '1px solid #e74c3c', backgroundColor: 'transparent', fontFamily: "'Inter', sans-serif" }}>
                            🗑️ Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Paginación */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4 px-1">
              <p className="text-xs" style={{ color: '#555', fontFamily: "'Inter', sans-serif" }}>
                Mostrando {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, sorted.length)} de {sorted.length} productos
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="w-8 h-8 rounded flex items-center justify-center text-sm transition-colors duration-150 disabled:opacity-30"
                  style={{ color: '#a3a3a3', border: '1px solid #2a2a2a', backgroundColor: 'transparent' }}
                >
                  ‹
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                  <button key={n} onClick={() => setPage(n)}
                    className="w-8 h-8 rounded flex items-center justify-center text-xs font-medium transition-colors duration-150"
                    style={{
                      backgroundColor: n === page ? '#c5a059' : 'transparent',
                      color: n === page ? '#0a0a0a' : '#a3a3a3',
                      border: `1px solid ${n === page ? '#c5a059' : '#2a2a2a'}`,
                      fontFamily: "'Inter', sans-serif",
                    }}>
                    {n}
                  </button>
                ))}

                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="w-8 h-8 rounded flex items-center justify-center text-sm transition-colors duration-150 disabled:opacity-30"
                  style={{ color: '#a3a3a3', border: '1px solid #2a2a2a', backgroundColor: 'transparent' }}
                >
                  ›
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Modal confirmación eliminación */}
      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}>
          <div className="rounded-lg p-8 max-w-sm w-full border" style={{ backgroundColor: '#1a1a1a', borderColor: '#2a2a2a' }}>
            <h3 className="text-lg mb-2" style={{ fontFamily: "'Playfair Display', serif", color: '#f5f5f5' }}>
              ¿Eliminar producto?
            </h3>
            <p className="text-sm mb-6" style={{ color: '#a3a3a3', fontFamily: "'Inter', sans-serif" }}>
              Esta acción no se puede deshacer. Se eliminarán también todas las imágenes asociadas.
            </p>
            <div className="flex gap-3">
              <button onClick={() => handleEliminar(confirm)}
                className="flex-1 py-2.5 rounded text-sm font-semibold transition-colors duration-200"
                style={{ backgroundColor: '#e74c3c', color: '#fff', fontFamily: "'Inter', sans-serif" }}>
                Sí, eliminar
              </button>
              <button onClick={() => setConfirm(null)}
                className="flex-1 py-2.5 rounded text-sm transition-colors duration-200"
                style={{ backgroundColor: '#2a2a2a', color: '#a3a3a3', fontFamily: "'Inter', sans-serif" }}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
