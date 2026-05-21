import React from 'react';
import heroBg from '../assets/watch_submariner.png'; // Using one of our images as a background

const Hero = () => {
  return (
    <section style={styles.hero}>
      <div style={styles.overlay}></div>
      <div style={styles.content}>
        <h1 style={styles.title}>El Tiempo es un Lujo</h1>
        <p style={styles.subtitle}>Descubre nuestra colección exclusiva de relojes de alta gama.</p>
      </div>
    </section>
  );
};

const styles = {
  hero: {
    position: 'relative',
    height: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    background: 'var(--color-bg-secondary)',
    overflow: 'hidden',
  },
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'radial-gradient(circle, rgba(26,26,26,0) 0%, rgba(10,10,10,0.8) 100%)',
    zIndex: 1,
  },
  content: {
    position: 'relative',
    zIndex: 2,
    maxWidth: '800px',
    padding: '0 2rem',
  },
  title: {
    fontSize: '4rem',
    color: 'var(--color-accent)',
    marginBottom: '1rem',
    textShadow: '0 4px 10px rgba(0,0,0,0.5)',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: 'var(--color-text-secondary)',
    marginBottom: '2rem',
    lineHeight: '1.6',
  },
  btn: {
    backgroundColor: 'var(--color-accent)',
    color: 'var(--color-bg-primary)',
    padding: '1rem 2.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    transition: 'background-color var(--transition-fast)',
    boxShadow: '0 4px 15px rgba(197, 160, 89, 0.2)',
  }
};

export default Hero;
