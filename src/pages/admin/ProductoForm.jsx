import { useState, useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getProducto, crearProducto, actualizarProducto } from '../../services/api'

const EMPTY = {
  marca: '', nombre: '', descripcion: '', ficha_tecnica: '',
  precio: '', precio_original: '', porcentaje_descuento: 0,
  stock: 0, activo: true,
}

const MAX_FILES = 5
const MAX_MB    = 5

export default function ProductoForm() {
  const { id }     = useParams()
  const navigate   = useNavigate()
  const isEdit     = !!id
  const fileRef    = useRef(null)

  const [form,              setForm]              = useState(EMPTY)
  const [errors,            setErrors]            = useState({})
  const [loading,           setLoading]           = useState(isEdit)
  const [saving,            setSaving]            = useState(false)
  const [apiError,          setApiError]          = useState(null)
  const [newPhotos,         setNewPhotos]         = useState([])   // { file, preview }
  const [existingImages,    setExistingImages]    = useState([])   // { id, url }
  const [imagesToDelete,    setImagesToDelete]    = useState([])   // ids
  const [dragOver,          setDragOver]          = useState(false)

  useEffect(() => {
    if (!isEdit) return
    getProducto(id)
      .then(p => {
        setForm({
          marca:                p.marca,
          nombre:               p.nombre,
          descripcion:          p.descripcion,
          ficha_tecnica:        p.ficha_tecnica ?? '',
          precio:               p.precio,
          precio_original:      p.precio_original ?? '',
          porcentaje_descuento: p.porcentaje_descuento,
          stock:                p.stock,
          activo:               p.activo,
        })
        setExistingImages((p.imagenes ?? []).map(i => ({ id: i.id, url: i.url_imagen })))
      })
      .catch(() => setApiError('No se pudo cargar el producto.'))
      .finally(() => setLoading(false))
  }, [id, isEdit])

  // ── Fotos nuevas ───────────────────────────────────
  const addFiles = (files) => {
    const totalActual = existingImages.filter(i => !imagesToDelete.includes(i.id)).length + newPhotos.length
    const available   = MAX_FILES - totalActual
    if (available <= 0) return

    const valid = Array.from(files)
      .filter(f => f.type.startsWith('image/') && f.size <= MAX_MB * 1024 * 1024)
      .slice(0, available)
      .map(file => ({ file, preview: URL.createObjectURL(file) }))

    setNewPhotos(prev => [...prev, ...valid])
    if (fileRef.current) fileRef.current.value = ''
  }

  const removeNewPhoto = (idx) => {
    setNewPhotos(prev => {
      URL.revokeObjectURL(prev[idx].preview)
      return prev.filter((_, i) => i !== idx)
    })
  }

  const toggleDeleteExisting = (imgId) => {
    setImagesToDelete(prev =>
      prev.includes(imgId) ? prev.filter(i => i !== imgId) : [...prev, imgId]
    )
  }

  // ── Validación ─────────────────────────────────────
  const validate = () => {
    const e = {}
    if (!form.marca.trim())       e.marca       = 'Requerido.'
    if (!form.nombre.trim())      e.nombre      = 'Requerido.'
    if (!form.descripcion.trim()) e.descripcion = 'Requerido.'
    if (!form.precio)             e.precio      = 'Requerido.'
    else if (isNaN(form.precio) || Number(form.precio) <= 0) e.precio = 'Debe ser un número positivo.'
    return e
  }

  // ── Submit ─────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setSaving(true)
    setApiError(null)

    const payload = {
      ...form,
      imagenes:          newPhotos.map(p => p.file),
      imagenes_eliminar: imagesToDelete,
    }

    try {
      if (isEdit) {
        await actualizarProducto(id, payload)
      } else {
        await crearProducto(payload)
      }
      navigate('/admin/productos')
    } catch (err) {
      const msg = err.response?.data?.message ?? 'Error al guardar el producto.'
      const validationErrors = err.response?.data?.errors
      if (validationErrors) {
        const mapped = {}
        Object.entries(validationErrors).forEach(([k, v]) => { mapped[k] = v[0] })
        setErrors(mapped)
      }
      setApiError(msg)
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  // ── Estilos compartidos ────────────────────────────
  const inputBase = { backgroundColor: '#0d0d0d', border: '1px solid #2a2a2a', color: '#f5f5f5', fontFamily: "'Inter', sans-serif" }
  const inputCls  = 'w-full px-3 py-3 rounded text-sm outline-none transition-colors duration-200 focus:border-[#c5a059]'
  const labelCls  = 'text-sm font-medium mb-1.5 block'
  const fieldCls  = 'flex flex-col'
  const errCls    = 'text-xs mt-1'

  const totalImgs = existingImages.filter(i => !imagesToDelete.includes(i.id)).length + newPhotos.length

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-10 h-10 rounded-full border-2 animate-spin"
          style={{ borderColor: '#c5a059', borderTopColor: 'transparent' }} />
      </div>
    )
  }

  return (
    <div className="max-w-[760px]">
      <div className="mb-8">
        <h1 className="text-[1.8rem]" style={{ fontFamily: "'Playfair Display', serif", color: '#c5a059' }}>
          {isEdit ? 'Editar producto' : 'Nuevo producto'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="rounded-lg border p-6 mb-6 flex flex-col gap-6" style={{ backgroundColor: '#1a1a1a', borderColor: '#2a2a2a' }}>
          <h2 className="text-base font-medium border-b pb-3" style={{ fontFamily: "'Playfair Display', serif", color: '#f5f5f5', borderColor: '#2a2a2a' }}>
            Información general
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Marca */}
            <div className={fieldCls}>
              <label className={labelCls} style={{ color: '#a3a3a3' }}>Marca *</label>
              <input name="marca" value={form.marca} onChange={handleChange}
                placeholder="Ej: Rolex, Patek Philippe…"
                className={inputCls} style={{ ...inputBase, borderColor: errors.marca ? '#e74c3c' : '#2a2a2a' }} />
              {errors.marca && <span className={errCls} style={{ color: '#e74c3c' }}>{errors.marca}</span>}
            </div>

            {/* Nombre */}
            <div className={fieldCls}>
              <label className={labelCls} style={{ color: '#a3a3a3' }}>Nombre *</label>
              <input name="nombre" value={form.nombre} onChange={handleChange}
                placeholder="Ej: Submariner Date"
                className={inputCls} style={{ ...inputBase, borderColor: errors.nombre ? '#e74c3c' : '#2a2a2a' }} />
              {errors.nombre && <span className={errCls} style={{ color: '#e74c3c' }}>{errors.nombre}</span>}
            </div>

            {/* Precio */}
            <div className={fieldCls}>
              <label className={labelCls} style={{ color: '#a3a3a3' }}>Precio CLP *</label>
              <input name="precio" type="number" min="0" step="1000" value={form.precio} onChange={handleChange}
                placeholder="Ej: 8500000"
                className={inputCls} style={{ ...inputBase, borderColor: errors.precio ? '#e74c3c' : '#2a2a2a' }} />
              {errors.precio && <span className={errCls} style={{ color: '#e74c3c' }}>{errors.precio}</span>}
            </div>

            {/* Precio original */}
            <div className={fieldCls}>
              <label className={labelCls} style={{ color: '#a3a3a3' }}>Precio original (antes del descuento)</label>
              <input name="precio_original" type="number" min="0" step="1000" value={form.precio_original} onChange={handleChange}
                placeholder="Dejar vacío si no hay descuento"
                className={inputCls} style={{ ...inputBase, borderColor: '#2a2a2a' }} />
            </div>

            {/* Descuento */}
            <div className={fieldCls}>
              <label className={labelCls} style={{ color: '#a3a3a3' }}>Descuento %</label>
              <input name="porcentaje_descuento" type="number" min="0" max="100" value={form.porcentaje_descuento} onChange={handleChange}
                className={inputCls} style={{ ...inputBase, borderColor: '#2a2a2a' }} />
            </div>

            {/* Stock */}
            <div className={fieldCls}>
              <label className={labelCls} style={{ color: '#a3a3a3' }}>Stock</label>
              <input name="stock" type="number" min="0" value={form.stock} onChange={handleChange}
                className={inputCls} style={{ ...inputBase, borderColor: '#2a2a2a' }} />
            </div>
          </div>

          {/* Descripción */}
          <div className={fieldCls}>
            <label className={labelCls} style={{ color: '#a3a3a3' }}>Descripción *</label>
            <textarea name="descripcion" value={form.descripcion} onChange={handleChange}
              rows={4} placeholder="Describe el reloj: materiales, calibre, historia…"
              className={`${inputCls} resize-y`}
              style={{ ...inputBase, borderColor: errors.descripcion ? '#e74c3c' : '#2a2a2a' }} />
            {errors.descripcion && <span className={errCls} style={{ color: '#e74c3c' }}>{errors.descripcion}</span>}
          </div>

          {/* Ficha Técnica */}
          <div className={fieldCls}>
            <label className={labelCls} style={{ color: '#a3a3a3' }}>Ficha Técnica</label>
            <textarea name="ficha_tecnica" value={form.ficha_tecnica} onChange={handleChange}
              rows={5} placeholder="Ej: Calibre: 3235 · Diámetro: 41mm · Material caja: Oystersteel…"
              className={`${inputCls} resize-y`}
              style={{ ...inputBase, borderColor: '#2a2a2a' }} />
          </div>

          {/* Activo */}
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input type="checkbox" name="activo" checked={form.activo} onChange={handleChange}
              className="w-4 h-4 accent-[#c5a059]" />
            <span className="text-sm" style={{ color: '#a3a3a3', fontFamily: "'Inter', sans-serif" }}>
              Visible en la tienda (activo)
            </span>
          </label>
        </div>

        {/* Imágenes existentes (solo en edición) */}
        {isEdit && existingImages.length > 0 && (
          <div className="rounded-lg border p-6 mb-6" style={{ backgroundColor: '#1a1a1a', borderColor: '#2a2a2a' }}>
            <h2 className="text-base font-medium border-b pb-3 mb-5" style={{ fontFamily: "'Playfair Display', serif", color: '#f5f5f5', borderColor: '#2a2a2a' }}>
              Imágenes actuales
            </h2>
            <p className="text-xs mb-4" style={{ color: '#555', fontFamily: "'Inter', sans-serif" }}>
              Haz clic en una imagen para marcarla para eliminación.
            </p>
            <div className="flex flex-wrap gap-3">
              {existingImages.map(img => {
                const marked = imagesToDelete.includes(img.id)
                return (
                  <div key={img.id} className="relative cursor-pointer" onClick={() => toggleDeleteExisting(img.id)}>
                    <img src={img.url} alt="" className="w-24 h-24 object-cover rounded"
                      style={{ border: `2px solid ${marked ? '#e74c3c' : '#2a2a2a'}`, opacity: marked ? 0.4 : 1 }} />
                    {marked && (
                      <div className="absolute inset-0 flex items-center justify-center rounded" style={{ backgroundColor: 'rgba(231,76,60,0.3)' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="#e74c3c" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Subir imágenes nuevas */}
        <div className="rounded-lg border p-6 mb-6" style={{ backgroundColor: '#1a1a1a', borderColor: '#2a2a2a' }}>
          <h2 className="text-base font-medium border-b pb-3 mb-5" style={{ fontFamily: "'Playfair Display', serif", color: '#f5f5f5', borderColor: '#2a2a2a' }}>
            {isEdit ? 'Agregar imágenes' : 'Imágenes'}
          </h2>
          <p className="text-xs mb-4" style={{ color: '#555', fontFamily: "'Inter', sans-serif" }}>
            Máximo {MAX_FILES} imágenes en total · Formatos: JPG, PNG, WebP · Máx {MAX_MB}MB c/u
            {totalImgs > 0 && <span style={{ color: '#c5a059' }}> ({totalImgs}/{MAX_FILES} usadas)</span>}
          </p>

          {/* Drop zone */}
          {totalImgs < MAX_FILES && (
            <div
              onDragOver={e => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={e => { e.preventDefault(); setDragOver(false); addFiles(e.dataTransfer.files) }}
              onClick={() => fileRef.current?.click()}
              className="flex flex-col items-center justify-center gap-3 py-10 rounded-lg border-2 border-dashed cursor-pointer transition-colors duration-200 mb-4"
              style={{ borderColor: dragOver ? '#c5a059' : '#2a2a2a', backgroundColor: dragOver ? 'rgba(197,160,89,0.05)' : 'transparent' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}
                style={{ color: dragOver ? '#c5a059' : '#333' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              <p className="text-sm" style={{ color: '#555', fontFamily: "'Inter', sans-serif" }}>
                Arrastra imágenes aquí o <span style={{ color: '#c5a059' }}>haz clic para seleccionar</span>
              </p>
              <input ref={fileRef} type="file" multiple accept="image/*" className="hidden"
                onChange={e => addFiles(e.target.files)} />
            </div>
          )}

          {/* Preview nuevas */}
          {newPhotos.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {newPhotos.map((p, idx) => (
                <div key={idx} className="relative group">
                  <img src={p.preview} alt="" className="w-24 h-24 object-cover rounded"
                    style={{ border: '2px solid #2a2a2a' }} />
                  <button type="button" onClick={() => removeNewPhoto(idx)}
                    className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ backgroundColor: '#e74c3c', color: '#fff' }}>
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Acciones */}
        {apiError && (
          <p className="text-sm mb-4 text-center" style={{ color: '#e74c3c' }}>{apiError}</p>
        )}
        <div className="flex items-center gap-4">
          <button type="submit" disabled={saving}
            className="px-6 py-3 rounded text-sm font-semibold uppercase tracking-[1px] transition-colors duration-200 disabled:opacity-60"
            style={{ backgroundColor: '#c5a059', color: '#0a0a0a', fontFamily: "'Inter', sans-serif" }}>
            {saving ? 'Guardando…' : isEdit ? 'Guardar cambios' : 'Crear producto'}
          </button>
          <button type="button" onClick={() => navigate('/admin/productos')}
            className="px-6 py-3 rounded text-sm transition-colors duration-200"
            style={{ backgroundColor: '#2a2a2a', color: '#a3a3a3', fontFamily: "'Inter', sans-serif" }}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
