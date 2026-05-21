import React from 'react';
import ProductCard from './ProductCard';
import { useProducts } from '../context/ProductContext';

const Offers = () => {
  const { products } = useProducts();
  
  // Simulating offers by taking the first two products and applying a discount
  const offerProducts = products.slice(0, 2).map(p => ({
    ...p,
    originalPrice: p.price,
    price: p.price * 0.85, // 15% discount
  }));

  return (
    <section id="ofertas" style={styles.section}>
      <div className="container">
        <h2 style={styles.heading}>Ofertas Exclusivas</h2>
        <div style={styles.grid}>
          {offerProducts.map(product => (
            <div key={product.id} style={styles.offerWrapper}>
              <div style={styles.badge}>-15% OFF</div>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    padding: '5rem 0',
    backgroundColor: 'var(--color-bg-secondary)',
  },
  heading: {
    fontSize: '2.5rem',
    color: 'var(--color-accent)',
    textAlign: 'center',
    marginBottom: '3rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '2rem',
    justifyContent: 'center',
  },
  offerWrapper: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    backgroundColor: '#e74c3c',
    color: '#fff',
    padding: '0.4rem 0.8rem',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    zIndex: 10,
    borderRadius: '4px',
    letterSpacing: '1px',
  }
};

export default Offers;
