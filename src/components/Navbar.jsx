import React from 'react';
import { useCart } from '../context/CartContext';
import logoImg from '../assets/logo.png';

const Navbar = () => {
  const { cartCount, toggleCart } = useCart();

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <div style={styles.logo}>
          <img src={logoImg} alt="Rolejeria" style={styles.logoImage} />
        </div>
        <div style={styles.menu}>
          <a href="#coleccion" style={styles.navLink}>Ver Colección</a>
          <a href="#ofertas" style={styles.navLink}>Ofertas</a>
          <a href="#vender" style={styles.navLink}>Vende tu reloj</a>
          <a href="#nosotros" style={styles.navLink}>Quiénes somos</a>
          <a href="#contacto" style={styles.navLink}>Contacto</a>
        </div>
        <div style={styles.actions}>
          <button style={styles.cartBtn} onClick={toggleCart}>
            <span style={styles.cartIcon}>🛒</span>
            {cartCount > 0 && <span style={styles.badge}>{cartCount}</span>}
          </button>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: 'rgba(10, 10, 10, 0.9)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid var(--color-border)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    padding: '1rem 0',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
  },
  logoImage: {
    height: '60px',
    objectFit: 'contain',
    filter: 'invert(1) drop-shadow(0 0 5px rgba(255,255,255,0.2))',
  },
  menu: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
  },
  navLink: {
    color: 'var(--color-text-primary)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontSize: '0.9rem',
    fontWeight: '600',
    transition: 'color var(--transition-fast)',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
  },
  cartBtn: {
    position: 'relative',
    fontSize: '1.5rem',
    color: 'var(--color-text-primary)',
    display: 'flex',
    alignItems: 'center',
  },
  cartIcon: {
    filter: 'grayscale(1) brightness(2)',
  },
  badge: {
    position: 'absolute',
    top: '-5px',
    right: '-10px',
    backgroundColor: 'var(--color-accent)',
    color: 'var(--color-bg-primary)',
    fontSize: '0.75rem',
    fontWeight: '600',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
};

export default Navbar;
