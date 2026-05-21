import React from 'react';

const AboutUs = () => {
  return (
    <section id="nosotros" style={styles.section}>
      <div className="container">
        <div style={styles.content}>
          <div style={styles.textContent}>
            <h2 style={styles.heading}>Quiénes Somos</h2>
            <p style={styles.paragraph}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p style={styles.paragraph}>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div style={styles.imagePlaceholder}>
            {/* Si en un futuro quieres agregar una foto del equipo o tienda */}
            <span style={styles.placeholderText}>LUXE Heritage</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    padding: '6rem 0',
    backgroundColor: 'var(--color-bg-secondary)',
  },
  content: {
    display: 'flex',
    gap: '4rem',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  textContent: {
    flex: '1 1 400px',
  },
  heading: {
    fontSize: '2.5rem',
    color: 'var(--color-accent)',
    marginBottom: '2rem',
  },
  paragraph: {
    color: 'var(--color-text-secondary)',
    lineHeight: '1.8',
    marginBottom: '1.5rem',
    fontSize: '1.1rem',
  },
  imagePlaceholder: {
    flex: '1 1 400px',
    height: '400px',
    backgroundColor: 'var(--color-bg-primary)',
    border: '1px solid var(--color-border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
  },
  placeholderText: {
    fontFamily: 'var(--font-serif)',
    fontSize: '2rem',
    color: 'var(--color-border)',
    letterSpacing: '5px',
  }
};

export default AboutUs;
