import { useState, useEffect } from 'react'
import { formatPrice } from '../../data/products'
import { useCart } from '../../context/CartContext'
import { crearPedido } from '../../services/api'

const PLACEHOLDER = '/watch_submariner.png'

export default function CartDrawer() {
  const { cart, cartOpen: isOpen, closeCart, increment, decrement, remove, clearCart } = useCart()
  const [sending,    setSending]    = useState(false)
  const [orderDone,  setOrderDone]  = useState(false)
  const [orderError, setOrderError] = useState(null)

  const total      = cart.reduce((sum, item) => sum + Number(item.precio) * item.qty, 0)
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0)

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Reset estado cada vez que se abre el drawer
  useEffect(() => {
    if (isOpen) { setOrderDone(false); setOrderError(null) }
  }, [isOpen])

  const getImage = (item) => {
    const imagenes = item.imagenes ?? []
    return imagenes.length ? imagenes[0].url_imagen : PLACEHOLDER
  }

  const buildWhatsAppMessage = () => {
    const lines = cart.map(item =>
      `• ${item.marca} ${item.nombre} x${item.qty} — ${formatPrice(Number(item.precio) * item.qty)}`
    )
    const text = `Hola, me gustaría comprar los siguientes relojes:\n\n${lines.join('\n')}\n\nTotal: ${formatPrice(total)}`
    return `https://wa.me/56900000000?text=${encodeURIComponent(text)}`
  }

  const handleCheckout = async () => {
    setSending(true)
    setOrderError(null)
    try {
      await crearPedido({
        nombre_cliente: 'Cliente WhatsApp',
        telefono: '56900000000',
        items: cart.map(item => ({ id: item.id, qty: item.qty })),
      })
      setOrderDone(true)
      clearCart()
    } catch (err) {
      setOrderError(err.response?.data?.message ?? 'Error al registrar el pedido.')
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(3px)' }}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 flex flex-col w-full max-w-[450px] border-l shadow-2xl transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ backgroundColor: '#1a1a1a', borderColor: '#333' }}
        role="dialog" aria-modal="true" aria-label="Carrito de compras"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: '#333' }}>
          <h2 className="text-xl" style={{ fontFamily: "'Playfair Display', serif", color: '#c5a059' }}>
            Carrito
            {totalItems > 0 && (
              <span className="ml-2 text-sm font-normal" style={{ color: '#a3a3a3' }}>
                ({totalItems} {totalItems === 1 ? 'artículo' : 'artículos'})
              </span>
            )}
          </h2>
          <button onClick={closeCart} aria-label="Cerrar carrito"
            className="text-2xl leading-none transition-colors duration-200 hover:text-white"
            style={{ color: '#a3a3a3' }}>
            ×
          </button>
        </div>

        {/* Items */}
        <div className="flex-grow overflow-y-auto px-6 py-6">
          {orderDone ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="#25D366" strokeWidth={1.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-lg" style={{ fontFamily: "'Playfair Display', serif", color: '#f5f5f5' }}>
                ¡Pedido registrado!
              </p>
              <p className="text-sm" style={{ color: '#a3a3a3' }}>
                Te contactaremos por WhatsApp para coordinar el pago y entrega.
              </p>
              <button onClick={closeCart}
                className="text-sm underline underline-offset-2 transition-colors duration-200 hover:text-white mt-2"
                style={{ color: '#c5a059' }}>
                Seguir viendo la colección
              </button>
            </div>
          ) : cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              <p style={{ color: '#a3a3a3', fontFamily: "'Inter', sans-serif" }}>Tu carrito está vacío</p>
              <button onClick={closeCart}
                className="text-sm underline underline-offset-2 transition-colors duration-200 hover:text-white"
                style={{ color: '#c5a059' }}>
                Ver colección
              </button>
            </div>
          ) : (
            <ul className="flex flex-col gap-0">
              {cart.map((item, idx) => (
                <li key={item.id}
                  className={`flex items-center gap-4 py-5 ${idx < cart.length - 1 ? 'border-b' : ''}`}
                  style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                  <img src={getImage(item)} alt={item.nombre}
                    className="w-[70px] h-[70px] object-cover rounded flex-shrink-0"
                    style={{ border: '1px solid #333' }} />

                  <div className="flex-grow min-w-0">
                    <p className="text-[0.75rem] uppercase tracking-widest mb-0.5 truncate"
                      style={{ color: '#a3a3a3', fontFamily: "'Inter', sans-serif" }}>
                      {item.marca}
                    </p>
                    <h4 className="text-[1rem] leading-snug mb-1 truncate"
                      style={{ fontFamily: "'Playfair Display', serif", color: '#f5f5f5' }}>
                      {item.nombre}
                    </h4>
                    <p className="text-[0.9rem] font-semibold mb-2" style={{ color: '#c5a059' }}>
                      {formatPrice(Number(item.precio))}
                    </p>

                    <div className="flex items-center gap-2">
                      <button onClick={() => decrement(item.id)} aria-label="Disminuir cantidad"
                        className="w-6 h-6 rounded-full flex items-center justify-center text-sm transition-colors duration-200 hover:border-white hover:text-white"
                        style={{ border: '1px solid #a3a3a3', color: '#f5f5f5', backgroundColor: 'transparent' }}>
                        −
                      </button>
                      <span className="w-5 text-center text-sm" style={{ color: '#f5f5f5' }}>{item.qty}</span>
                      <button onClick={() => increment(item.id)} aria-label="Aumentar cantidad"
                        className="w-6 h-6 rounded-full flex items-center justify-center text-sm transition-colors duration-200 hover:border-white hover:text-white"
                        style={{ border: '1px solid #a3a3a3', color: '#f5f5f5', backgroundColor: 'transparent' }}>
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3 flex-shrink-0">
                    <span className="text-sm font-semibold" style={{ color: '#c5a059' }}>
                      {formatPrice(Number(item.precio) * item.qty)}
                    </span>
                    <button onClick={() => remove(item.id)} aria-label={`Eliminar ${item.nombre}`}
                      className="transition-colors duration-200 hover:text-red-400" style={{ color: '#a3a3a3' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && !orderDone && (
          <div className="px-6 py-5 border-t" style={{ borderColor: '#333', backgroundColor: '#0a0a0a' }}>
            <div className="flex items-center justify-between mb-5">
              <span className="text-lg" style={{ fontFamily: "'Playfair Display', serif", color: '#f5f5f5' }}>
                Total
              </span>
              <span className="text-xl font-bold" style={{ color: '#c5a059', fontFamily: "'Playfair Display', serif" }}>
                {formatPrice(total)}
              </span>
            </div>

            {orderError && (
              <p className="text-xs mb-3 text-center" style={{ color: '#e74c3c' }}>{orderError}</p>
            )}

            <button
              onClick={handleCheckout}
              disabled={sending}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded text-sm font-semibold uppercase tracking-[1px] transition-colors duration-200 disabled:opacity-60"
              style={{ backgroundColor: '#25D366', color: '#fff', fontFamily: "'Inter', sans-serif" }}
              onMouseEnter={e => { if (!sending) e.currentTarget.style.backgroundColor = '#1ebd59' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#25D366' }}
            >
              {sending ? (
                <span className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Pedir por WhatsApp
                </>
              )}
            </button>

            <p className="text-[0.72rem] text-center mt-2" style={{ color: '#555' }}>
              Al confirmar, registramos tu pedido y te contactamos para coordinar el pago.
            </p>
          </div>
        )}
      </div>
    </>
  )
}
