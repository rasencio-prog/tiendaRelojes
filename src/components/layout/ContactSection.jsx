import { useState } from 'react'
import { enviarContacto } from '../../services/api'

const CONTACT_INFO = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    label: 'Teléfono',
    value: '+56 9 0000 0000',
    href: 'tel:+56900000000',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    label: 'Email',
    value: 'contacto@tiendarelojes.cl',
    href: 'mailto:contacto@tiendarelojes.cl',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: 'Horario',
    value: 'Lun – Vie: 10:00 – 19:00 · Sáb: 10:00 – 14:00',
    href: null,
  },
]

const EMPTY = { nombre: '', email: '', mensaje: '' }

export default function ContactSection() {
  const [form, setForm]           = useState(EMPTY)
  const [errors, setErrors]       = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending]     = useState(false)
  const [apiError, setApiError]   = useState(null)

  const validate = () => {
    const e = {}
    if (!form.nombre.trim())  e.nombre  = 'El nombre es requerido.'
    if (!form.email.trim())   e.email   = 'El correo es requerido.'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Ingresa un correo válido.'
    if (!form.mensaje.trim()) e.mensaje = 'El mensaje no puede estar vacío.'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length) { setErrors(e2); return }
    setSending(true)
    setApiError(null)
    try {
      await enviarContacto(form)
      setSubmitted(true)
      setForm(EMPTY)
      setErrors({})
    } catch (err) {
      setApiError(err.response?.data?.message ?? 'No se pudo enviar el mensaje. Intenta más tarde.')
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
    <section
      id="contacto"
      className="py-24 border-t"
      style={{ backgroundColor: '#0a0a0a', borderColor: '#333' }}
    >
      <div className="max-w-[1200px] mx-auto px-8">

        {/* Encabezado */}
        <div className="text-center mb-14">
          <p
            className="text-xs font-semibold uppercase tracking-[3px] mb-4"
            style={{ color: '#c5a059', fontFamily: "'Inter', sans-serif" }}
          >
            Estamos aquí para ayudarte
          </p>
          <h2
            className="text-[2.5rem]"
            style={{ fontFamily: "'Playfair Display', serif", color: '#c5a059' }}
          >
            Contacto y Ubicación
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-14">

          {/* Columna izquierda — Formulario */}
          <div className="flex-1">
            <h3
              className="text-xl mb-6"
              style={{ fontFamily: "'Playfair Display', serif", color: '#f5f5f5' }}
            >
              Envíanos un mensaje
            </h3>

            {submitted ? (
              <div
                className="flex flex-col items-center justify-center gap-4 p-10 rounded-lg border text-center"
                style={{ backgroundColor: 'rgba(37,211,102,0.06)', borderColor: '#25D366' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" style={{ color: '#25D366' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-lg font-semibold" style={{ color: '#25D366', fontFamily: "'Playfair Display', serif" }}>
                  ¡Mensaje enviado!
                </p>
                <p className="text-sm" style={{ color: '#a3a3a3', fontFamily: "'Inter', sans-serif" }}>
                  Te responderemos a la brevedad en el correo indicado.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-sm underline underline-offset-2 transition-colors duration-200 hover:text-white"
                  style={{ color: '#c5a059', fontFamily: "'Inter', sans-serif" }}
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-5"
              >
                {/* Nombre */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contacto-nombre" className="text-sm font-medium" style={{ color: '#f5f5f5', fontFamily: "'Inter', sans-serif" }}>
                    Nombre
                  </label>
                  <input
                    id="contacto-nombre"
                    type="text"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    placeholder="Tu nombre completo"
                    className={fieldClass}
                    style={{ ...inputBase, borderColor: errors.nombre ? '#e74c3c' : '#333' }}
                  />
                  {errors.nombre && <span className="text-xs" style={{ color: '#e74c3c', fontFamily: "'Inter', sans-serif" }}>{errors.nombre}</span>}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contacto-email" className="text-sm font-medium" style={{ color: '#f5f5f5', fontFamily: "'Inter', sans-serif" }}>
                    Correo electrónico
                  </label>
                  <input
                    id="contacto-email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    className={fieldClass}
                    style={{ ...inputBase, borderColor: errors.email ? '#e74c3c' : '#333' }}
                  />
                  {errors.email && <span className="text-xs" style={{ color: '#e74c3c', fontFamily: "'Inter', sans-serif" }}>{errors.email}</span>}
                </div>

                {/* Mensaje */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contacto-mensaje" className="text-sm font-medium" style={{ color: '#f5f5f5', fontFamily: "'Inter', sans-serif" }}>
                    Mensaje
                  </label>
                  <textarea
                    id="contacto-mensaje"
                    name="mensaje"
                    value={form.mensaje}
                    onChange={handleChange}
                    placeholder="¿En qué podemos ayudarte?"
                    rows={5}
                    className={`${fieldClass} resize-y`}
                    style={{ ...inputBase, borderColor: errors.mensaje ? '#e74c3c' : '#333' }}
                  />
                  {errors.mensaje && <span className="text-xs" style={{ color: '#e74c3c', fontFamily: "'Inter', sans-serif" }}>{errors.mensaje}</span>}
                </div>

                {apiError && (
                  <p className="text-xs text-center" style={{ color: '#e74c3c' }}>{apiError}</p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-3.5 text-sm font-semibold uppercase tracking-[1px] rounded transition-colors duration-200 disabled:opacity-60"
                  style={{ backgroundColor: '#c5a059', color: '#0a0a0a', fontFamily: "'Inter', sans-serif" }}
                  onMouseEnter={e => { if (!sending) e.currentTarget.style.backgroundColor = '#dfb668' }}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#c5a059')}
                >
                  {sending ? 'Enviando…' : 'Enviar Mensaje'}
                </button>
              </form>
            )}
          </div>

          {/* Columna derecha — Info + Mapa */}
          <div className="flex-1 flex flex-col gap-8">
            <div>
              <h3
                className="text-xl mb-6"
                style={{ fontFamily: "'Playfair Display', serif", color: '#f5f5f5' }}
              >
                Nuestra Tienda
              </h3>

              <ul className="flex flex-col gap-5">
                {CONTACT_INFO.map(({ icon, label, value, href }) => (
                  <li key={label} className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-0.5" style={{ color: '#c5a059' }}>
                      {icon}
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[1.5px] mb-0.5" style={{ color: '#555', fontFamily: "'Inter', sans-serif" }}>
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          className="text-sm leading-relaxed transition-colors duration-200 hover:text-white"
                          style={{ color: '#a3a3a3', fontFamily: "'Inter', sans-serif" }}
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm leading-relaxed" style={{ color: '#a3a3a3', fontFamily: "'Inter', sans-serif" }}>
                          {value}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
