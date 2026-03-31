import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const FIELDS = [
  { name: 'name',  label: 'Nombre', type: 'text',  placeholder: 'Tu nombre' },
  { name: 'email', label: 'Email',  type: 'email', placeholder: 'tu@email.com' },
];

const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  background: '#111',
  border: '1px solid #ffffff12',
  borderRadius: '3px',
  color: '#f0ede8',
  fontSize: '14px',
  fontFamily: 'inherit',
};

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ minHeight: '100vh', background: '#080808', display: 'flex', flexDirection: 'column' }}
    >
      {/* Nav */}
      <nav
        style={{
          padding: '22px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontSize: '12px',
            fontWeight: 800,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#FF6B35',
          }}
        >
          Mad Cats
        </span>
        <Link
          to="/"
          style={{
            fontSize: '11px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#ffffff45',
            textDecoration: 'none',
          }}
        >
          ← Galería
        </Link>
      </nav>

      {/* Form area */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 24px',
        }}
      >
        <div style={{ width: '100%', maxWidth: '460px' }}>
          <motion.div
            initial={{ y: 28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h1
              style={{
                fontSize: 'clamp(36px, 5vw, 58px)',
                fontWeight: 900,
                letterSpacing: '-0.04em',
                color: '#f0ede8',
                lineHeight: 0.92,
                marginBottom: '10px',
              }}
            >
              Contacto
            </h1>
            <p
              style={{
                fontSize: '13px',
                color: '#ffffff40',
                letterSpacing: '0.04em',
                marginBottom: '40px',
              }}
            >
              ¿Interesado en una pieza? Escríbenos.
            </p>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  padding: '32px',
                  border: '1px solid #FF6B3540',
                  borderRadius: '4px',
                  textAlign: 'center',
                  background: '#FF6B3508',
                }}
              >
                <p
                  style={{
                    color: '#FF6B35',
                    letterSpacing: '0.1em',
                    fontSize: '13px',
                    lineHeight: 1.7,
                  }}
                >
                  ¡Mensaje recibido!
                  <br />
                  <span style={{ color: '#ffffff40', fontSize: '12px' }}>
                    Te contactaremos pronto.
                  </span>
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
              >
                {FIELDS.map((field) => (
                  <div key={field.name}>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '9px',
                        letterSpacing: '0.25em',
                        textTransform: 'uppercase',
                        color: '#ffffff38',
                        marginBottom: '8px',
                      }}
                    >
                      {field.label}
                    </label>
                    <input
                      name={field.name}
                      type={field.type}
                      value={form[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      required
                      style={inputStyle}
                    />
                  </div>
                ))}

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '9px',
                      letterSpacing: '0.25em',
                      textTransform: 'uppercase',
                      color: '#ffffff38',
                      marginBottom: '8px',
                    }}
                  >
                    Mensaje
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="¿Qué pieza te interesa? ¿Tienes alguna pregunta?"
                    required
                    rows={5}
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{
                    backgroundColor: '#FF6B35',
                    color: '#080808',
                    borderColor: '#FF6B35',
                  }}
                  transition={{ duration: 0.18 }}
                  style={{
                    padding: '13px 30px',
                    border: '1px solid #FF6B3555',
                    background: 'transparent',
                    color: '#FF6B35',
                    fontSize: '11px',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    borderRadius: '2px',
                    marginTop: '8px',
                    alignSelf: 'flex-start',
                  }}
                >
                  Enviar mensaje →
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      {/* Footer hint */}
      <div style={{ padding: '24px 32px', textAlign: 'center' }}>
        <p style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#ffffff18' }}>
          Mad Cats · Colección 2024 · Madrid
        </p>
      </div>
    </motion.div>
  );
}
