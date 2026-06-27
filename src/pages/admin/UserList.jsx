import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
import { getUsuarios, eliminarUsuario } from '../../services/api'
import { useAuth } from '../../context/AuthContext'

const PER_PAGE     = 10
const EMPTY_FILTER = { nombre: '', email: '' }

const COLS = [
  { key: 'name',       label: 'Nombre' },
  { key: 'email',      label: 'Email'  },
  { key: 'created_at', label: 'Creado' },
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

export default function UserList() {
  const { user: me } = useAuth()
  const { data: usuarios, loading, error } = useFetch(getUsuarios)
  const [lista,   setLista]   = useState(null)
  const [confirm, setConfirm] = useState(null)
  const [sortKey, setSortKey] = useState('created_at')
  const [sortDir, setSortDir] = useState('desc')
  const [page,    setPage]    = useState(1)
  const [filters, setFilters] = useState(EMPTY_FILTER)

  const items      = lista ?? usuarios ?? []
  const hasFilters = Object.values(filters).some(v => v !== '')

  const handleSort = (key) => {
    setSortKey(key)
    setSortDir(d => sortKey === key ? (d === 'asc' ? 'desc' : 'asc') : 'asc')
    setPage(1)
  }

  const handleFilter = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({ ...prev, [name]: value }))
    setPage(1)
  }

  const clearFilters = () => { setFilters(EMPTY_FILTER); setPage(1) }

  const filtered = useMemo(() => items.filter(u => {
    if (filters.nombre && !u.name.toLowerCase().includes(filters.nombre.toLowerCase()))   return false
    if (filters.email  && !u.email.toLowerCase().includes(filters.email.toLowerCase()))   return false
    return true
  }), [items, filters])

  const sorted = useMemo(() => [...filtered].sort((a, b) => {
    let va = a[sortKey] ?? ''
    let vb = b[sortKey] ?? ''
    if (sortKey === 'created_at') { va = new Date(va); vb = new Date(vb) }
    if (va < vb) return sortDir === 'asc' ? -1 :  1
    if (va > vb) return sortDir === 'asc' ?  1 : -1
    return 0
  }), [filtered, sortKey, sortDir])

  const totalPages = Math.max(1, Math.ceil(sorted.length / PER_PAGE))
  const paginated  = sorted.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const handleEliminar = async (id) => {
    setConfirm(null)
    const next = items.filter(u => u.id !== id)
    setLista(next)
    const newTotal = Math.max(1, Math.ceil(next.length / PER_PAGE))
    if (page > newTotal) setPage(newTotal)
    try {
      await eliminarUsuario(id)
    } catch (_) {
      setLista(items)
    }
  }

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
            Usuarios
          </h1>
          <p className="text-sm mt-1" style={{ color: '#555', fontFamily: "'Inter', sans-serif" }}>
            {items.length} {items.length === 1 ? 'usuario' : 'usuarios'} registrados
          </p>
        </div>
        <Link
          to="/admin/usuarios/nuevo"
          className="flex items-center gap-2 px-4 py-2.5 rounded text-sm font-semibold transition-colors duration-200"
          style={{ backgroundColor: '#c5a059', color: '#0a0a0a', fontFamily: "'Inter', sans-serif" }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#dfb668')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#c5a059')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Agregar usuario
        </Link>
      </div>

      {error && <p className="text-sm mb-6 text-center" style={{ color: '#e74c3c' }}>{error}</p>}

      {/* Filtros */}
      <div className="rounded-lg border p-4 mb-4 flex flex-wrap gap-3 items-end" style={{ backgroundColor: '#1a1a1a', borderColor: '#2a2a2a' }}>
        <div className="flex flex-col gap-1 flex-1 min-w-[160px]">
          <label className="text-[0.7rem] uppercase tracking-[1.5px]" style={{ color: '#555', fontFamily: "'Inter', sans-serif" }}>
            Nombre
          </label>
          <input name="nombre" value={filters.nombre} onChange={handleFilter}
            placeholder="Buscar por nombre…"
            className="px-3 py-2 rounded text-sm outline-none transition-colors duration-200 focus:border-[#c5a059]"
            style={{ backgroundColor: '#0d0d0d', border: '1px solid #2a2a2a', color: '#f5f5f5', fontFamily: "'Inter', sans-serif" }} />
        </div>
        <div className="flex flex-col gap-1 flex-1 min-w-[200px]">
          <label className="text-[0.7rem] uppercase tracking-[1.5px]" style={{ color: '#555', fontFamily: "'Inter', sans-serif" }}>
            Email
          </label>
          <input name="email" value={filters.email} onChange={handleFilter}
            placeholder="Buscar por email…"
            className="px-3 py-2 rounded text-sm outline-none transition-colors duration-200 focus:border-[#c5a059]"
            style={{ backgroundColor: '#0d0d0d', border: '1px solid #2a2a2a', color: '#f5f5f5', fontFamily: "'Inter', sans-serif" }} />
        </div>
        {hasFilters && (
          <>
            <button onClick={clearFilters}
              className="px-4 py-2 rounded text-xs font-semibold transition-colors duration-200 self-end"
              style={{ backgroundColor: '#2a2a2a', color: '#a3a3a3', border: '1px solid #333', fontFamily: "'Inter', sans-serif" }}>
              Limpiar
            </button>
            <p className="text-xs self-end pb-2" style={{ color: '#555', fontFamily: "'Inter', sans-serif" }}>
              {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
            </p>
          </>
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
                    {COLS.map(col => (
                      <th key={col.key}
                        className="text-left px-4 py-3 text-[0.7rem] uppercase tracking-[1.5px] whitespace-nowrap cursor-pointer select-none hover:text-white transition-colors duration-150"
                        style={{ ...thStyle, color: sortKey === col.key ? '#c5a059' : '#555' }}
                        onClick={() => handleSort(col.key)}>
                        {col.label}
                        <SortIcon active={sortKey === col.key} dir={sortDir} />
                      </th>
                    ))}
                    <th className="text-left px-4 py-3 text-[0.7rem] uppercase tracking-[1.5px]" style={thStyle}>
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-sm" style={{ color: '#555' }}>
                        No hay usuarios. <Link to="/admin/usuarios/nuevo" style={{ color: '#c5a059' }}>Agrega el primero</Link>.
                      </td>
                    </tr>
                  )}
                  {paginated.map(u => (
                    <tr key={u.id}
                      className="border-b transition-colors duration-150 hover:bg-white/[0.02]"
                      style={{ borderColor: '#1a1a1a' }}>

                      {/* Nombre */}
                      <td className="px-4 py-3 font-medium" style={{ color: '#f5f5f5', fontFamily: "'Inter', sans-serif" }}>
                        <div className="flex items-center gap-2">
                          {u.name}
                          {u.id === me?.id && (
                            <span className="text-[0.65rem] px-1.5 py-0.5 rounded"
                              style={{ backgroundColor: 'rgba(197,160,89,0.15)', color: '#c5a059', border: '1px solid rgba(197,160,89,0.3)' }}>
                              Tú
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-4 py-3" style={{ color: '#a3a3a3', fontFamily: "'Inter', sans-serif" }}>
                        {u.email}
                      </td>

                      {/* Fecha */}
                      <td className="px-4 py-3 whitespace-nowrap" style={{ color: '#555', fontFamily: "'Inter', sans-serif", fontSize: '0.78rem' }}>
                        {fmtDate(u.created_at)}
                      </td>

                      {/* Acciones */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Link to={`/admin/usuarios/${u.id}`}
                            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors duration-200 hover:bg-white/10"
                            style={{ color: '#f5f5f5', border: '1px solid #444', backgroundColor: 'transparent', fontFamily: "'Inter', sans-serif" }}>
                            ✏️ Editar
                          </Link>
                          <button
                            onClick={() => setConfirm(u.id)}
                            disabled={u.id === me?.id}
                            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                            style={{ color: '#e74c3c', border: '1px solid #e74c3c', backgroundColor: 'transparent', fontFamily: "'Inter', sans-serif" }}
                            title={u.id === me?.id ? 'No puedes eliminar tu propio usuario' : 'Eliminar'}>
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
                Mostrando {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, sorted.length)} de {sorted.length} usuarios
              </p>
              <div className="flex items-center gap-1">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                  className="w-8 h-8 rounded flex items-center justify-center text-sm transition-colors duration-150 disabled:opacity-30"
                  style={{ color: '#a3a3a3', border: '1px solid #2a2a2a', backgroundColor: 'transparent' }}>‹</button>
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
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                  className="w-8 h-8 rounded flex items-center justify-center text-sm transition-colors duration-150 disabled:opacity-30"
                  style={{ color: '#a3a3a3', border: '1px solid #2a2a2a', backgroundColor: 'transparent' }}>›</button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Modal confirmación */}
      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}>
          <div className="rounded-lg p-8 max-w-sm w-full border" style={{ backgroundColor: '#1a1a1a', borderColor: '#2a2a2a' }}>
            <h3 className="text-lg mb-2" style={{ fontFamily: "'Playfair Display', serif", color: '#f5f5f5' }}>
              ¿Eliminar usuario?
            </h3>
            <p className="text-sm mb-6" style={{ color: '#a3a3a3', fontFamily: "'Inter', sans-serif" }}>
              El usuario perderá acceso al panel inmediatamente.
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
