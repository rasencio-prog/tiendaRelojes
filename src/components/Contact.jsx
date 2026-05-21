import React from 'react';

const Contact = () => {
  return (
    <section id="contacto" style={styles.section}>
      <div className="container">
        <h2 style={styles.heading}>Contacto y Ubicación</h2>
        <div style={styles.content}>
          <div style={styles.formContainer}>
            <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
              <h3 style={styles.subheading}>Envíanos un mensaje</h3>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Nombre</label>
                <input type="text" style={styles.input} required />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Correo electrónico</label>
                <input type="email" style={styles.input} required />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Mensaje</label>
                <textarea style={styles.textarea} rows="4" required></textarea>
              </div>
              <button type="submit" className="btn-primary">Enviar Mensaje</button>
            </form>
          </div>
          
          <div style={styles.infoContainer}>
            <h3 style={styles.subheading}>Nuestra Tienda</h3>
            <p style={styles.infoText}><strong>Dirección:</strong> Av. Vitacura 2808, Las Condes, Santiago, Chile</p>
            <p style={styles.infoText}><strong>Teléfono:</strong> +56 9 1234 5678</p>
            <p style={styles.infoText}><strong>Email:</strong> contacto@rolejeria.cl</p>
            <p style={styles.infoText}><strong>Horario:</strong> Lunes a Viernes de 10:00 a 19:00 hrs.</p>
            
            <div style={styles.mapPlaceholder}>
              <iframe 
                src="https://www.google.com/maps?q=Vitacura+2808,+Las+Condes,+Santiago,+Chile&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa de ubicación"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    padding: '6rem 0',
    backgroundColor: 'var(--color-bg-primary)',
    borderTop: '1px solid var(--color-border)',
  },
  heading: {
    fontSize: '2.5rem',
    color: 'var(--color-accent)',
    textAlign: 'center',
    marginBottom: '4rem',
  },
  content: {
    display: 'flex',
    gap: '4rem',
    flexWrap: 'wrap',
  },
  formContainer: {
    flex: '1 1 400px',
  },
  infoContainer: {
    flex: '1 1 400px',
  },
  subheading: {
    fontSize: '1.5rem',
    color: 'var(--color-text-primary)',
    marginBottom: '1.5rem',
    fontFamily: 'var(--font-serif)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    color: 'var(--color-text-secondary)',
    fontSize: '0.9rem',
  },
  input: {
    padding: '0.8rem',
    backgroundColor: 'var(--color-bg-secondary)',
    border: '1px solid var(--color-border)',
    color: 'var(--color-text-primary)',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  textarea: {
    padding: '0.8rem',
    backgroundColor: 'var(--color-bg-secondary)',
    border: '1px solid var(--color-border)',
    color: 'var(--color-text-primary)',
    borderRadius: '4px',
    fontSize: '1rem',
    resize: 'vertical',
  },
  infoText: {
    color: 'var(--color-text-secondary)',
    marginBottom: '1rem',
    fontSize: '1rem',
    lineHeight: '1.5',
  },
  mapPlaceholder: {
    marginTop: '2rem',
    height: '250px',
    backgroundColor: 'var(--color-bg-secondary)',
    border: '1px solid var(--color-border)',
    borderRadius: '4px',
    overflow: 'hidden',
  }
};

export default Contact;
