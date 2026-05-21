import React from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/products';

const ProductList = () => {
  return (
    <section id="coleccion" style={styles.section}>
      <div className="container">
        <h2 style={styles.heading}>Colección Destacada</h2>
        <div style={styles.grid}>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    padding: '5rem 0',
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
  }
};

export default ProductList;
