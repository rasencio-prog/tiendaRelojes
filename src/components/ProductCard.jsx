import React from 'react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div style={styles.card} className="animate-fade-in">
      <div style={styles.imageContainer}>
        <img src={product.image} alt={product.name} style={styles.image} />
      </div>
      <div style={styles.content}>
        <span style={styles.brand}>{product.brand}</span>
        <h3 style={styles.title}>{product.name}</h3>
        <p style={styles.description}>{product.description}</p>
        <div style={styles.footer}>
          <span style={styles.price}>${product.price.toLocaleString('es-CL')}</span>
          <button style={styles.btn} onClick={() => addToCart(product)}>
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: 'var(--color-bg-secondary)',
    border: '1px solid var(--color-border)',
    borderRadius: '4px',
    overflow: 'hidden',
    transition: 'transform var(--transition-fast)',
    display: 'flex',
    flexDirection: 'column',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: '1/1',
    backgroundColor: '#000',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease',
  },
  content: {
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  brand: {
    color: 'var(--color-text-secondary)',
    fontSize: '0.8rem',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    marginBottom: '0.5rem',
  },
  title: {
    fontSize: '1.2rem',
    color: 'var(--color-text-primary)',
    marginBottom: '1rem',
  },
  description: {
    fontSize: '0.9rem',
    color: 'var(--color-text-secondary)',
    lineHeight: '1.5',
    marginBottom: '1.5rem',
    flexGrow: 1,
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  price: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: 'var(--color-accent)',
  },
  btn: {
    backgroundColor: 'transparent',
    border: '1px solid var(--color-accent)',
    color: 'var(--color-accent)',
    padding: '0.5rem 1rem',
    fontSize: '0.9rem',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    transition: 'all var(--transition-fast)',
  }
};

export default ProductCard;
