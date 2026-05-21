import React from 'react';

const SellWatch = () => {
  return (
    <section id="vender" style={styles.section}>
      <div className="container">
        <div style={styles.content}>
          <h2 style={styles.heading}>Vende tu Reloj</h2>
          <p style={styles.description}>
            Compramos relojes de alta gama. Completa el formulario a continuación con los detalles 
            de tu reloj y nos pondremos en contacto contigo a la brevedad con una tasación.
          </p>
          <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Nombre completo</label>
              <input type="text" style={styles.input} placeholder="Ej. Juan Pérez" required />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Correo electrónico</label>
              <input type="email" style={styles.input} placeholder="tu@email.com" required />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Teléfono</label>
              <input type="tel" style={styles.input} placeholder="+56 9 1234 5678" required />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Descripción del Reloj</label>
              <textarea 
                style={styles.textarea} 
                placeholder="Marca, modelo, año de compra, estado general, si incluye caja y papeles..." 
                rows="5"
                required
              ></textarea>
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%' }}>Enviar Solicitud</button>
          </form>
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    padding: '6rem 0',
    backgroundColor: 'var(--color-bg-primary)',
  },
  content: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  heading: {
    fontSize: '2.5rem',
    color: 'var(--color-accent)',
    textAlign: 'center',
    marginBottom: '1rem',
  },
  description: {
    textAlign: 'center',
    color: 'var(--color-text-secondary)',
    marginBottom: '3rem',
    lineHeight: '1.6',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    backgroundColor: 'var(--color-bg-secondary)',
    padding: '2rem',
    borderRadius: '8px',
    border: '1px solid var(--color-border)',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    color: 'var(--color-text-primary)',
    fontSize: '0.9rem',
    fontWeight: '500',
  },
  input: {
    padding: '0.8rem',
    backgroundColor: 'var(--color-bg-primary)',
    border: '1px solid var(--color-border)',
    color: 'var(--color-text-primary)',
    borderRadius: '4px',
    fontSize: '1rem',
    fontFamily: 'inherit',
  },
  textarea: {
    padding: '0.8rem',
    backgroundColor: 'var(--color-bg-primary)',
    border: '1px solid var(--color-border)',
    color: 'var(--color-text-primary)',
    borderRadius: '4px',
    fontSize: '1rem',
    fontFamily: 'inherit',
    resize: 'vertical',
  }
};

export default SellWatch;
