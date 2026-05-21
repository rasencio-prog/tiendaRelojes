import React from 'react';
import { useCart } from '../context/CartContext';

const WHATSAPP_NUMBER = "56912345678"; // Dummy phone number

const CartDrawer = () => {
  const { isCartOpen, toggleCart, cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    let message = "Hola, me gustaría concretar la compra de los siguientes relojes:\n\n";
    
    cartItems.forEach(item => {
      message += `- ${item.quantity}x ${item.name} ($${item.price.toLocaleString('es-CL')})\n`;
    });

    message += `\n*Total Estimado:* $${cartTotal.toLocaleString('es-CL')}\n\n`;
    message += "Quedo atento(a) para coordinar el pago y envío.";

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (!isCartOpen) return null;

  return (
    <>
      <div style={styles.overlay} onClick={toggleCart}></div>
      <div style={styles.drawer} className="animate-fade-in">
        <div style={styles.header}>
          <h2>Tu Carro</h2>
          <button style={styles.closeBtn} onClick={toggleCart}>✕</button>
        </div>
        
        <div style={styles.itemsContainer}>
          {cartItems.length === 0 ? (
            <p style={styles.emptyText}>Tu carro está vacío.</p>
          ) : (
            cartItems.map(item => (
              <div key={item.id} style={styles.cartItem}>
                <img src={item.image} alt={item.name} style={styles.itemImage} />
                <div style={styles.itemDetails}>
                  <h4>{item.name}</h4>
                  <p style={styles.itemPrice}>${item.price.toLocaleString('es-CL')}</p>
                  <div style={styles.qtyControls}>
                    <button onClick={() => updateQuantity(item.id, -1)} style={styles.qtyBtn}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} style={styles.qtyBtn}>+</button>
                  </div>
                </div>
                <button style={styles.removeBtn} onClick={() => removeFromCart(item.id)}>🗑</button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div style={styles.footer}>
            <div style={styles.totalRow}>
              <span>Total:</span>
              <span style={styles.totalPrice}>${cartTotal.toLocaleString('es-CL')}</span>
            </div>
            <button style={styles.checkoutBtn} onClick={handleCheckout}>
              Checkout via WhatsApp
            </button>
          </div>
        )}
      </div>
    </>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    backdropFilter: 'blur(3px)',
    zIndex: 1000,
  },
  drawer: {
    position: 'fixed',
    top: 0, right: 0, bottom: 0,
    width: '100%',
    maxWidth: '450px',
    backgroundColor: 'var(--color-bg-secondary)',
    borderLeft: '1px solid var(--color-border)',
    zIndex: 1001,
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '-5px 0 30px rgba(0,0,0,0.5)',
  },
  header: {
    padding: '1.5rem',
    borderBottom: '1px solid var(--color-border)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: 'var(--font-serif)',
    color: 'var(--color-accent)',
  },
  closeBtn: {
    fontSize: '1.5rem',
    color: 'var(--color-text-secondary)',
  },
  itemsContainer: {
    flexGrow: 1,
    overflowY: 'auto',
    padding: '1.5rem',
  },
  emptyText: {
    textAlign: 'center',
    color: 'var(--color-text-secondary)',
    marginTop: '2rem',
  },
  cartItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1.5rem',
    paddingBottom: '1.5rem',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
  },
  itemImage: {
    width: '70px',
    height: '70px',
    objectFit: 'cover',
    borderRadius: '4px',
    marginRight: '1rem',
  },
  itemDetails: {
    flexGrow: 1,
  },
  itemPrice: {
    color: 'var(--color-accent)',
    fontWeight: '600',
    margin: '0.3rem 0',
  },
  qtyControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  qtyBtn: {
    width: '24px',
    height: '24px',
    backgroundColor: 'transparent',
    border: '1px solid var(--color-text-secondary)',
    color: 'var(--color-text-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
  },
  removeBtn: {
    fontSize: '1.2rem',
    color: 'var(--color-text-secondary)',
    marginLeft: '1rem',
  },
  footer: {
    padding: '1.5rem',
    borderTop: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-bg-primary)',
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
    fontSize: '1.2rem',
    fontFamily: 'var(--font-serif)',
  },
  totalPrice: {
    color: 'var(--color-accent)',
    fontWeight: '700',
  },
  checkoutBtn: {
    width: '100%',
    backgroundColor: '#25D366', // WhatsApp Green, or use Accent for more consistency
    color: '#fff',
    padding: '1rem',
    fontSize: '1rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    borderRadius: '4px',
    transition: 'background-color var(--transition-fast)',
  }
};

export default CartDrawer;
