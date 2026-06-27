import axios from 'axios'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL + '/api',
  headers: { 'Content-Type': 'application/json' },
})

// Adjunta el token Sanctum en cada request si existe
http.interceptors.request.use(config => {
  const token = localStorage.getItem('admin_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// ── Auth ─────────────────────────────────────────────
export const login  = (data) => http.post('/auth/login',  data).then(r => r.data)
export const logout = ()     => http.post('/auth/logout').then(r => r.data)
export const me     = ()     => http.get('/auth/me').then(r => r.data)

// ── Productos ────────────────────────────────────────
export const getProductos = (params = {}) =>
  http.get('/productos', { params }).then(r => r.data)

export const getProducto = (id) =>
  http.get(`/productos/${id}`).then(r => r.data)

export const crearProducto = (data) => {
  const form = buildProductoForm(data)
  return http.post('/productos', form, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data)
}

export const actualizarProducto = (id, data) => {
  const form = buildProductoForm(data)
  form.append('_method', 'PUT')
  return http.post(`/productos/${id}`, form, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data)
}

export const eliminarProducto = (id) =>
  http.delete(`/productos/${id}`).then(r => r.data)

export const toggleActivoProducto = (id, activo) =>
  http.put(`/productos/${id}`, { activo }).then(r => r.data)

function buildProductoForm(data) {
  const form = new FormData()
  const campos = ['marca', 'nombre', 'descripcion', 'ficha_tecnica', 'precio', 'precio_original', 'porcentaje_descuento', 'stock']
  campos.forEach(k => { if (data[k] !== undefined && data[k] !== '') form.append(k, data[k]) })
  // FormData convierte boolean a string "true"/"false" — Laravel solo acepta 1/0
  form.append('activo', data.activo ? 1 : 0)
  if (data.imagenes?.length) {
    data.imagenes.forEach(img => form.append('imagenes[]', img))
  }
  if (data.imagenes_eliminar?.length) {
    data.imagenes_eliminar.forEach(id => form.append('imagenes_eliminar[]', id))
  }
  return form
}

// ── Usuarios (admin) ─────────────────────────────────
export const getUsuarios      = ()        => http.get('/users').then(r => r.data)
export const getUsuario       = (id)      => http.get(`/users/${id}`).then(r => r.data)
export const crearUsuario     = (data)    => http.post('/users', data).then(r => r.data)
export const actualizarUsuario = (id, data) => http.put(`/users/${id}`, data).then(r => r.data)
export const eliminarUsuario  = (id)      => http.delete(`/users/${id}`).then(r => r.data)

// ── Contacto ─────────────────────────────────────────
export const enviarContacto = (data) =>
  http.post('/contactos', data).then(r => r.data)

// ── Solicitud venta (con fotos) ───────────────────────
export const enviarSolicitudVenta = (data) => {
  const form = new FormData()
  form.append('nombre',      data.nombre)
  form.append('email',       data.email)
  form.append('telefono',    data.telefono)
  form.append('descripcion', data.descripcion)
  if (data.fotos?.length) {
    data.fotos.forEach(foto => form.append('fotos[]', foto))
  }
  return http.post('/solicitudes-venta', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then(r => r.data)
}

// ── Pedidos ───────────────────────────────────────────
export const crearPedido = (data) =>
  http.post('/pedidos', data).then(r => r.data)
