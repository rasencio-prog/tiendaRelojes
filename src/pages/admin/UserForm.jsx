import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getUsuario, crearUsuario, actualizarUsuario } from '../../services/api'

const EMPTY = { name: '', email: '', password: '', password_confirmation: '' }

const EyeOpen = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const EyeOff = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
  </svg>
)

export default function UserForm() {
  const { id }   = useParams()
  const navigate = useNavigate()
  const isEdit   = !!id

  const [form,     setForm]     = useState(EMPTY)
  const [errors,   setErrors]   = useState({})
  const [loading,  setLoading]  = useState(isEdit)
  const [saving,   setSaving]   = useState(false)
  const [apiError, setApiError] = useState(null)
  const [showPwd,  setShowPwd]  = useState(false)
  const [showCfm,  setShowCfm]  = useState(false)

  useEffect(() => {
    if (!isEdit) return
    getUsuario(id)
      .then(u => setForm({ name: u.name, email: u.email, password: '', password_confirmation: '' }))
      .catch(() => setApiError('No se pudo cargar el usuario.'))
      .finally(() => setLoading(false))
  }, [id, isEdit])

  const validate = () => {
    const e = {}
    if (!form.name.trim())  e.name  = 'El nombre es requerido.'
    if (!form.email.trim()) e.email = 'El correo es requerido.'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Ingresa un correo válido.'
    if (!isEdit || form.password) {
      if (!isEdit && !form.password)                      e.password = 'La contraseña es requerida.'
      else if (form.password && form.password.length < 6) e.password = 'Mínimo 6 caracteres.'
      if (form.password !== form.password_confirmation)   e.password_confirmation = 'Las contraseñas no coinciden.'
    }
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSaving(true)
    setApiError(null)
    const payload = { name: form.name, email: form.email }
    if (form.password) {
      payload.password              = form.password
      payload.password_confirmation = form.password_confirmation
    }
    try {
      if (isEdit) {
        await actualizarUsuario(id, payload)
      } else {
        await crearUsuario({ ...payload, password_confirmation: form.password_confirmation })
      }
      navigate('/admin/usuarios')
    } catch (err) {
      const validation = err.response?.data?.errors
      if (validation) {
        const mapped = {}
        Object.entries(validation).forEach(([k, v]) => { mapped[k] = v[0] })
        setErrors(mapped)
      }
      setApiError(err.response?.data?.message ?? 'Error al guardar el usuario.')
    } finally {
      setSaving(false)
    }
  }

  const iBase = { backgroundColor: '#0d0d0d', color: '#f5f5f5', fontFamily: "'Inter', sans-serif" }
  const iCls  = 'w-full px-3 py-3 rounded text-sm outline-none transition-colors duration-200 focus:border-[#c5a059] pr-10'
  const pwdMatch = form.password && form.password_confirmation && form.password === form.password_confirmation

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-10 h-10 rounded-full border-2 animate-spin"
          style={{ borderColor: '#c5a059', borderTopColor: 'transparent' }} />
      </div>
    )
  }

  return (
    <div className="max-w-[560px]">
      <div className="mb-8">
        <h1 className="text-[1.8rem]" style={{ fontFamily: "'Playfair Display', serif", color: '#c5a059' }}>
          {isEdit ? 'Editar usuario' : 'Nuevo usuario'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="rounded-lg border p-6 mb-6 flex flex-col gap-5"
          style={{ backgroundColor: '#1a1a1a', borderColor: '#2a2a2a' }}>
          <h2 className="text-base font-medium border-b pb-3"
            style={{ fontFamily: "'Playfair Display', serif", color: '#f5f5f5', borderColor: '#2a2a2a' }}>
            Datos del usuario
          </h2>

          {/* Nombre */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium" style={{ color: '#a3a3a3', fontFamily: "'Inter', sans-serif" }}>
              Nombre *
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nombre completo"
              className="w-full px-3 py-3 rounded text-sm outline-none transition-colors duration-200 focus:border-[#c5a059]"
              style={{ ...iBase, border: `1px solid ${errors.name ? '#e74c3c' : '#2a2a2a'}` }}
            />
            {errors.name && <span className="text-xs" style={{ color: '#e74c3c' }}>{errors.name}</span>}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium" style={{ color: '#a3a3a3', fontFamily: "'Inter', sans-serif" }}>
              Correo electrónico *
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="usuario@tiendarelojes.cl"
              className="w-full px-3 py-3 rounded text-sm outline-none transition-colors duration-200 focus:border-[#c5a059]"
              style={{ ...iBase, border: `1px solid ${errors.email ? '#e74c3c' : '#2a2a2a'}` }}
            />
            {errors.email && <span className="text-xs" style={{ color: '#e74c3c' }}>{errors.email}</span>}
          </div>

          <div className="border-t pt-4" style={{ borderColor: '#2a2a2a' }}>
            <p className="text-xs mb-4" style={{ color: '#555', fontFamily: "'Inter', sans-serif" }}>
              {isEdit
                ? 'Deja los campos de contraseña vacíos si no deseas cambiarla.'
                : 'La contraseña debe tener al menos 6 caracteres.'}
            </p>

            {/* Contraseña */}
            <div className="flex flex-col gap-1.5 mb-5">
              <label className="text-sm font-medium" style={{ color: '#a3a3a3', fontFamily: "'Inter', sans-serif" }}>
                Contraseña{!isEdit && ' *'}
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPwd ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange}
                  placeholder={isEdit ? 'Dejar vacío para no cambiar' : '••••••••'}
                  className={iCls}
                  style={{ ...iBase, border: `1px solid ${errors.password ? '#e74c3c' : '#2a2a2a'}` }}
                />
                <button type="button" onClick={() => setShowPwd(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: '#555' }}>
                  {showPwd ? <EyeOff /> : <EyeOpen />}
                </button>
              </div>
              {errors.password && <span className="text-xs" style={{ color: '#e74c3c' }}>{errors.password}</span>}
            </div>

            {/* Confirmar contraseña */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium" style={{ color: '#a3a3a3', fontFamily: "'Inter', sans-serif" }}>
                Confirmar contraseña{!isEdit && ' *'}
              </label>
              <div className="relative">
                <input
                  name="password_confirmation"
                  type={showCfm ? 'text' : 'password'}
                  value={form.password_confirmation}
                  onChange={handleChange}
                  placeholder={isEdit ? 'Dejar vacío para no cambiar' : '••••••••'}
                  className={iCls}
                  style={{ ...iBase, border: `1px solid ${errors.password_confirmation ? '#e74c3c' : '#2a2a2a'}` }}
                />
                <button type="button" onClick={() => setShowCfm(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: '#555' }}>
                  {showCfm ? <EyeOff /> : <EyeOpen />}
                </button>
              </div>
              {errors.password_confirmation && (
                <span className="text-xs" style={{ color: '#e74c3c' }}>{errors.password_confirmation}</span>
              )}
            </div>

            {/* Indicador de coincidencia */}
            {form.password && form.password_confirmation && (
              <div className="flex items-center gap-2 text-xs mt-3"
                style={{ color: pwdMatch ? '#27ae60' : '#e74c3c', fontFamily: "'Inter', sans-serif" }}>
                {pwdMatch ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Las contraseñas coinciden
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Las contraseñas no coinciden
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {apiError && (
          <p className="text-sm mb-4 text-center" style={{ color: '#e74c3c' }}>{apiError}</p>
        )}

        <div className="flex items-center gap-4">
          <button type="submit" disabled={saving}
            className="px-6 py-3 rounded text-sm font-semibold uppercase tracking-[1px] transition-colors duration-200 disabled:opacity-60"
            style={{ backgroundColor: '#c5a059', color: '#0a0a0a', fontFamily: "'Inter', sans-serif" }}>
            {saving ? 'Guardando…' : isEdit ? 'Guardar cambios' : 'Crear usuario'}
          </button>
          <button type="button" onClick={() => navigate('/admin/usuarios')}
            className="px-6 py-3 rounded text-sm transition-colors duration-200"
            style={{ backgroundColor: '#2a2a2a', color: '#a3a3a3', fontFamily: "'Inter', sans-serif" }}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
