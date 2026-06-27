import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { login } from '../../services/api'

export default function AdminLogin() {
  const { loginSuccess } = useAuth()
  const navigate = useNavigate()
  const [form,    setForm]    = useState({ email: '', password: '' })
  const [error,   setError]   = useState(null)
  const [loading, setLoading] = useState(false)
  const [showPwd, setShowPwd] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const data = await login(form)
      loginSuccess(data.token, data.user)
      navigate('/admin')
    } catch (err) {
      setError(err.response?.data?.message ?? 'Error de conexión.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    backgroundColor: '#1a1a1a',
    border: '1px solid #2a2a2a',
    color: '#f5f5f5',
    fontFamily: "'Inter', sans-serif",
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#0d0d0d' }}>
      <div className="w-full max-w-[380px]">

        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <img src="/logo.png" alt="Logo" style={{ height: 60, filter: 'invert(1)', mixBlendMode: 'screen', marginBottom: 16 }} />
          <h1 className="text-2xl text-center" style={{ fontFamily: "'Playfair Display', serif", color: '#c5a059' }}>
            Panel Admin
          </h1>
          <p className="text-sm mt-1" style={{ color: '#555', fontFamily: "'Inter', sans-serif" }}>
            Tienda Relojes — Acceso restringido
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium" style={{ color: '#a3a3a3', fontFamily: "'Inter', sans-serif" }}>
              Correo electrónico
            </label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              placeholder="admin@tiendarelojes.cl"
              required
              className="px-3 py-3 rounded text-sm outline-none transition-colors duration-200 focus:border-[#c5a059]"
              style={inputStyle}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium" style={{ color: '#a3a3a3', fontFamily: "'Inter', sans-serif" }}>
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPwd ? 'text' : 'password'}
                value={form.password}
                onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                placeholder="••••••••"
                required
                className="w-full px-3 py-3 rounded text-sm outline-none transition-colors duration-200 focus:border-[#c5a059] pr-10"
                style={inputStyle}
              />
              <button
                type="button"
                onClick={() => setShowPwd(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ color: '#555' }}
              >
                {showPwd ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-sm text-center py-2 px-3 rounded" style={{ color: '#e74c3c', backgroundColor: 'rgba(231,76,60,0.1)', border: '1px solid rgba(231,76,60,0.3)' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 text-sm font-semibold uppercase tracking-[1px] rounded transition-colors duration-200 disabled:opacity-60 mt-1"
            style={{ backgroundColor: '#c5a059', color: '#0a0a0a', fontFamily: "'Inter', sans-serif" }}
          >
            {loading ? 'Ingresando…' : 'Ingresar'}
          </button>
        </form>

        <p className="text-center mt-8 text-xs" style={{ color: '#333', fontFamily: "'Inter', sans-serif" }}>
          <a href="/" className="hover:text-[#c5a059] transition-colors duration-200" style={{ color: '#444' }}>
            ← Volver a la tienda
          </a>
        </p>
      </div>
    </div>
  )
}
