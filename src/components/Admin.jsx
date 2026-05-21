import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';

const Admin = () => {
  const { addProduct } = useProducts();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: '',
    description: '',
    image: null
  });
  const [preview, setPreview] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Credenciales hardcodeadas para la demo
    if (loginForm.username === 'admin' && loginForm.password === 'reloj123') {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.image) {
      alert("Por favor, sube una imagen del reloj.");
      return;
    }
    
    addProduct({
      name: formData.name,
      brand: formData.brand,
      price: Number(formData.price),
      description: formData.description,
      image: formData.image
    });

    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
    setFormData({ name: '', brand: '', price: '', description: '', image: null });
    setPreview(null);
    e.target.reset();
  };

  if (!isAuthenticated) {
    return (
      <section id="admin" style={styles.section}>
        <div className="container">
          <div style={styles.content}>
            <h2 style={styles.heading}>Acceso Restringido</h2>
            <p style={styles.description}>Ingresa tus credenciales para administrar el catálogo.</p>
            <form style={styles.form} onSubmit={handleLogin}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Usuario</label>
                <input 
                  type="text" 
                  style={styles.input} 
                  required
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Contraseña</label>
                <input 
                  type="password" 
                  style={styles.input} 
                  required
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                />
              </div>
              {loginError && <p style={styles.errorText}>Credenciales incorrectas.</p>}
              <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>Ingresar</button>
            </form>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="admin" style={styles.section}>
      <div className="container">
        <div style={styles.content}>
          <h2 style={styles.heading}>Panel de Administración</h2>
          <p style={styles.description}>Agrega nuevos relojes al catálogo. (Se guardarán temporalmente en tu navegador).</p>
          
          <form style={styles.form} onSubmit={handleSubmit}>
            <div style={styles.row}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Nombre del Reloj</label>
                <input 
                  type="text" 
                  style={styles.input} 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Marca</label>
                <input 
                  type="text" 
                  style={styles.input} 
                  required 
                  value={formData.brand}
                  onChange={(e) => setFormData({...formData, brand: e.target.value})}
                />
              </div>
            </div>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>Precio ($ CLP)</label>
              <input 
                type="number" 
                style={styles.input} 
                required 
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Descripción</label>
              <textarea 
                style={styles.textarea} 
                rows="3" 
                required
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              ></textarea>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Foto del Reloj</label>
              <input 
                type="file" 
                accept="image/*" 
                style={styles.fileInput} 
                onChange={handleImageUpload}
              />
              {preview && (
                <div style={styles.previewContainer}>
                  <img src={preview} alt="Preview" style={styles.previewImage} />
                </div>
              )}
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
              Agregar al Catálogo
            </button>

            {success && (
              <div style={styles.successMessage}>
                ¡Reloj agregado exitosamente al catálogo!
              </div>
            )}
          </form>
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
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    backgroundColor: 'var(--color-bg-primary)',
    padding: '2rem',
    borderRadius: '8px',
    border: '1px solid var(--color-border)',
  },
  row: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    flex: '1 1 200px',
  },
  label: {
    color: 'var(--color-text-primary)',
    fontSize: '0.9rem',
    fontWeight: '500',
  },
  input: {
    padding: '0.8rem',
    backgroundColor: 'var(--color-bg-secondary)',
    border: '1px solid var(--color-border)',
    color: 'var(--color-text-primary)',
    borderRadius: '4px',
    fontSize: '1rem',
    fontFamily: 'inherit',
  },
  textarea: {
    padding: '0.8rem',
    backgroundColor: 'var(--color-bg-secondary)',
    border: '1px solid var(--color-border)',
    color: 'var(--color-text-primary)',
    borderRadius: '4px',
    fontSize: '1rem',
    fontFamily: 'inherit',
    resize: 'vertical',
  },
  fileInput: {
    padding: '0.8rem',
    backgroundColor: 'var(--color-bg-secondary)',
    border: '1px dashed var(--color-border)',
    color: 'var(--color-text-primary)',
    borderRadius: '4px',
    fontSize: '0.9rem',
  },
  previewContainer: {
    marginTop: '1rem',
    width: '100px',
    height: '100px',
    borderRadius: '4px',
    overflow: 'hidden',
    border: '1px solid var(--color-border)',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  successMessage: {
    marginTop: '1rem',
    padding: '1rem',
    backgroundColor: 'rgba(37, 211, 102, 0.1)',
    color: '#25D366',
    border: '1px solid #25D366',
    borderRadius: '4px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: '0.9rem',
    textAlign: 'center',
    marginTop: '0.5rem',
  }
};

export default Admin;
