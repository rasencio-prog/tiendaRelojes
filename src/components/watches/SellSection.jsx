import { useState, useRef } from 'react'
import { enviarSolicitudVenta } from '../../services/api'

const BENEFITS = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Tasación gratuita',
    desc: 'Evaluamos tu reloj sin costo ni compromiso.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
    title: 'Pago inmediato',
    desc: 'Transferencia al momento de acordar la venta.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    title: 'Proceso seguro',
    desc: 'Transacción transparente y confidencial.',
  },
]

const EMPTY = { nombre: '', email: '', telefono: '', descripcion: '' }
const MAX_FILES = 5
const MAX_MB    = 5

export default function SellSection() {
  const [form, setForm]           = useState(EMPTY)
  const [errors, setErrors]       = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [photos, setPhotos]       = useState([])
  const [dragOver, setDragOver]   = useState(false)
  const [sending, setSending]     = useState(false)
  const [apiError, setApiError]   = useState(null)
  const fileInputRef              = useRef(null)

  const validate = () => {
    const e = {}
    if (!form.nombre.trim())      e.nombre      = 'El nombre es requerido.'
    if (!form.email.trim())       e.email       = 'El correo es requerido.'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Ingresa un correo válido.'
    if (!form.telefono.trim())    e.telefono    = 'El teléfono es requerido.'
    if (!form.descripcion.trim()) e.descripcion = 'Describe tu reloj para poder tasarlo.'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  const addFiles = (files) => {
    const valid = Array.from(files).filter(f => {
      if (!f.type.startsWith('image/')) return false
      if (f.size > MAX_MB * 1024 * 1024) return false
      return true
    })
    setPhotos(prev => {
      const remaining = MAX_FILES - prev.length
      const toAdd = valid.slice(0, remaining).map(file => ({
        file,
        preview: URL.createObjectURL(file),
      }))
      return [...prev, ...toAdd]
    })
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const removePhoto = (index) => {
    setPhotos(prev => {
      URL.revokeObjectURL(prev[index].preview)
      return prev.filter((_, i) => i !== index)
    })
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    addFiles(e.dataTransfer.files)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length) { setErrors(e2); return }
    setSending(true)
    setApiError(null)
    try {
      await enviarSolicitudVenta({ ...form, fotos: photos.map(p => p.file) })
      photos.forEach(p => URL.revokeObjectURL(p.preview))
      setSubmitted(true)
      setForm(EMPTY)
      setErrors({})
      setPhotos([])
    } catch (err) {
      setApiError(err.response?.data?.message ?? 'No se pudo enviar la solicitud. Intenta más tarde.')
    } finally {
      setSending(false)
    }
  }

  const inputBase = {
    backgroundColor: '#0a0a0a',
    border: '1px solid #333',
    color: '#f5f5f5',
    fontFamily: "'Inter', sans-serif",
  }

  const fieldClass = 'w-full px-3 py-3 rounded text-sm outline-none transition-colors duration-200 focus:border-[#c5a059]'

  return (
    <section id="vender" className="py-20" style={{ backgroundColor: '#0a0a0a' }}>
      <div className="max-w-[1200px] mx-auto px-8">

        {/* Encabezado */}
        <div className="text-center mb-12">
          <h2
            className="text-[2.5rem] mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color: '#c5a059' }}
          >
            Vende tu Reloj
          </h2>
          <p
            className="text-base leading-relaxed max-w-xl mx-auto"
            style={{ color: '#a3a3a3', fontFamily: "'Inter', sans-serif" }}
          >
            Compramos relojes de alta gama. Completa el formulario con los detalles
            de tu reloj y te contactaremos con una tasación personalizada.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">

          {/* Beneficios */}
          <div className="w-full lg:w-72 flex-shrink-0 flex flex-col gap-6">
            {BENEFITS.map(({ icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-0.5" style={{ color: '#c5a059' }}>
                  {icon}
                </div>
                <div>
                  <p
                    className="text-sm font-semibold mb-1"
                    style={{ color: '#f5f5f5', fontFamily: "'Inter', sans-serif" }}
                  >
                    {title}
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: '#a3a3a3', fontFamily: "'Inter', sans-serif" }}
                  >
                    {desc}
                  </p>
                </div>
              </div>
            ))}

            {/* Separador */}
            <div className="h-px mt-2" style={{ backgroundColor: '#333' }} />

            <p
              className="text-xs leading-relaxed italic"
              style={{ color: '#666', fontFamily: "'Inter', sans-serif" }}
            >
              También puedes contactarnos directamente por WhatsApp para una respuesta inmediata.
            </p>
          </div>

          {/* Formulario */}
          <div className="flex-grow">
            {submitted ? (
              <div
                className="flex flex-col items-center justify-center gap-4 p-10 rounded-lg border text-center"
                style={{ backgroundColor: 'rgba(37,211,102,0.06)', borderColor: '#25D366' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" style={{ color: '#25D366' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p
                  className="text-lg font-semibold"
                  style={{ color: '#25D366', fontFamily: "'Playfair Display', serif" }}
                >
                  ¡Solicitud enviada!
                </p>
                <p className="text-sm" style={{ color: '#a3a3a3', fontFamily: "'Inter', sans-serif" }}>
                  Nos pondremos en contacto contigo en las próximas 24 horas con la tasación de tu reloj.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-sm underline underline-offset-2 transition-colors duration-200 hover:text-white"
                  style={{ color: '#c5a059', fontFamily: "'Inter', sans-serif" }}
                >
                  Enviar otra solicitud
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-5 p-8 rounded-lg border"
                style={{ backgroundColor: '#1a1a1a', borderColor: '#333' }}
              >
                {/* Nombre */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="vender-nombre"
                    className="text-sm font-medium"
                    style={{ color: '#f5f5f5', fontFamily: "'Inter', sans-serif" }}
                  >
                    Nombre completo
                  </label>
                  <input
                    id="vender-nombre"
                    type="text"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    placeholder="Ej. Juan Pérez"
                    className={fieldClass}
                    style={{ ...inputBase, borderColor: errors.nombre ? '#e74c3c' : '#333' }}
                  />
                  {errors.nombre && (
                    <span className="text-xs" style={{ color: '#e74c3c', fontFamily: "'Inter', sans-serif" }}>
                      {errors.nombre}
                    </span>
                  )}
                </div>

                {/* Email + Teléfono en fila */}
                <div className="flex flex-col sm:flex-row gap-5">
                  <div className="flex flex-col gap-1.5 flex-1">
                    <label
                      htmlFor="vender-email"
                      className="text-sm font-medium"
                      style={{ color: '#f5f5f5', fontFamily: "'Inter', sans-serif" }}
                    >
                      Correo electrónico
                    </label>
                    <input
                      id="vender-email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="tu@email.com"
                      className={fieldClass}
                      style={{ ...inputBase, borderColor: errors.email ? '#e74c3c' : '#333' }}
                    />
                    {errors.email && (
                      <span className="text-xs" style={{ color: '#e74c3c', fontFamily: "'Inter', sans-serif" }}>
                        {errors.email}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1.5 flex-1">
                    <label
                      htmlFor="vender-telefono"
                      className="text-sm font-medium"
                      style={{ color: '#f5f5f5', fontFamily: "'Inter', sans-serif" }}
                    >
                      Teléfono
                    </label>
                    <input
                      id="vender-telefono"
                      type="tel"
                      name="telefono"
                      value={form.telefono}
                      onChange={handleChange}
                      placeholder="+56 9 1234 5678"
                      className={fieldClass}
                      style={{ ...inputBase, borderColor: errors.telefono ? '#e74c3c' : '#333' }}
                    />
                    {errors.telefono && (
                      <span className="text-xs" style={{ color: '#e74c3c', fontFamily: "'Inter', sans-serif" }}>
                        {errors.telefono}
                      </span>
                    )}
                  </div>
                </div>

                {/* Descripción */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="vender-descripcion"
                    className="text-sm font-medium"
                    style={{ color: '#f5f5f5', fontFamily: "'Inter', sans-serif" }}
                  >
                    Descripción del reloj
                  </label>
                  <textarea
                    id="vender-descripcion"
                    name="descripcion"
                    value={form.descripcion}
                    onChange={handleChange}
                    placeholder="Marca, modelo, año, estado, si incluye caja y papeles…"
                    rows={5}
                    className={`${fieldClass} resize-y`}
                    style={{ ...inputBase, borderColor: errors.descripcion ? '#e74c3c' : '#333' }}
                  />
                  {errors.descripcion && (
                    <span className="text-xs" style={{ color: '#e74c3c', fontFamily: "'Inter', sans-serif" }}>
                      {errors.descripcion}
                    </span>
                  )}
                </div>

                {/* Fotos */}
                <div className="flex flex-col gap-2">
                  <label
                    className="text-sm font-medium"
                    style={{ color: '#f5f5f5', fontFamily: "'Inter', sans-serif" }}
                  >
                    Fotos del reloj{' '}
                    <span className="font-normal" style={{ color: '#a3a3a3' }}>
                      (opcional · máx. {MAX_FILES} imágenes · {MAX_MB} MB c/u)
                    </span>
                  </label>

                  {/* Zona drag & drop */}
                  {photos.length < MAX_FILES && (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={handleDrop}
                      className="flex flex-col items-center justify-center gap-2 py-8 rounded border-2 border-dashed cursor-pointer transition-colors duration-200"
                      style={{
                        borderColor: dragOver ? '#c5a059' : '#444',
                        backgroundColor: dragOver ? 'rgba(197,160,89,0.06)' : 'rgba(255,255,255,0.02)',
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" style={{ color: dragOver ? '#c5a059' : '#555' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                      </svg>
                      <p className="text-sm" style={{ color: '#a3a3a3', fontFamily: "'Inter', sans-serif" }}>
                        Arrastra imágenes aquí o{' '}
                        <span style={{ color: '#c5a059' }}>haz clic para seleccionar</span>
                      </p>
                      <p className="text-xs" style={{ color: '#555', fontFamily: "'Inter', sans-serif" }}>
                        JPG, PNG, WEBP · {photos.length}/{MAX_FILES} subidas
                      </p>
                    </div>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => addFiles(e.target.files)}
                  />

                  {/* Miniaturas */}
                  {photos.length > 0 && (
                    <div className="grid grid-cols-5 gap-2 mt-1">
                      {photos.map((p, i) => (
                        <div key={i} className="relative aspect-square rounded overflow-hidden group"
                          style={{ border: '1px solid #333' }}>
                          <img
                            src={p.preview}
                            alt={`Foto ${i + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removePhoto(i)}
                            aria-label={`Eliminar foto ${i + 1}`}
                            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            style={{ backgroundColor: 'rgba(0,0,0,0.65)' }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" style={{ color: '#e74c3c' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                      {/* Slot para añadir más si no llegó al máximo */}
                      {photos.length < MAX_FILES && (
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="aspect-square rounded flex items-center justify-center border-2 border-dashed transition-colors duration-200 hover:border-[#c5a059]"
                          style={{ borderColor: '#444' }}
                          aria-label="Agregar más fotos"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" style={{ color: '#555' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {apiError && (
                  <p className="text-xs text-center" style={{ color: '#e74c3c' }}>{apiError}</p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-3.5 text-sm font-semibold uppercase tracking-[1px] rounded transition-colors duration-200 mt-1 disabled:opacity-60"
                  style={{ backgroundColor: '#c5a059', color: '#0a0a0a', fontFamily: "'Inter', sans-serif" }}
                  onMouseEnter={e => { if (!sending) e.currentTarget.style.backgroundColor = '#dfb668' }}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#c5a059')}
                >
                  {sending ? 'Enviando…' : 'Enviar Solicitud'}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
