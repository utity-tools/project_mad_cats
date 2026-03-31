import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import Header from '../components/Header';

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCatById } = useAppContext();
  const cat = getCatById(id);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  if (!cat) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <p style={{ color: '#FF6B35', letterSpacing: '0.1em' }}>Gato no encontrado.</p>
        <Link
          to="/"
          style={{ fontSize: '12px', color: '#ffffff40', letterSpacing: '0.2em', textDecoration: 'none' }}
        >
          ← Volver a la galería
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ minHeight: '100vh', background: '#080808' }}
    >
      {/* Nav */}
      <Header
        onBack={handleBack}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 50,
          background: 'linear-gradient(to bottom, #080808e0, transparent)',
        }}
      />

      {/* Content grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          minHeight: '100vh',
        }}
      >
        {/* Image panel */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '100px 40px 60px',
            position: 'relative',
          }}
        >
          {/* Glow behind image */}
          <div
            style={{
              position: 'absolute',
              width: '60%',
              height: '60%',
              borderRadius: '50%',
              background: cat.color,
              opacity: 0.06,
              filter: 'blur(80px)',
            }}
          />
          <img
            src={cat.image}
            alt={cat.name}
            style={{
              maxHeight: '72vh',
              maxWidth: '100%',
              objectFit: 'contain',
              filter: `drop-shadow(0 0 48px ${cat.color}30)`,
              position: 'relative',
              zIndex: 1,
            }}
          />
        </motion.div>

        {/* Info panel */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '100px 48px 60px 36px',
            borderLeft: `1px solid ${cat.color}18`,
          }}
        >
          <p
            style={{
              fontSize: '10px',
              letterSpacing: '0.38em',
              textTransform: 'uppercase',
              color: cat.color,
              marginBottom: '18px',
            }}
          >
            {cat.title}
          </p>

          <h1
            style={{
              fontSize: 'clamp(44px, 5.5vw, 76px)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              color: '#f0ede8',
              lineHeight: 0.92,
              marginBottom: '32px',
            }}
          >
            {cat.name}
          </h1>

          <p
            style={{
              fontSize: 'clamp(14px, 1.1vw, 16px)',
              lineHeight: 1.75,
              color: '#8a8a8a',
              maxWidth: '380px',
              marginBottom: '48px',
            }}
          >
            {cat.description}
          </p>

          {/* Metadata row */}
          <div style={{ display: 'flex', gap: '36px', marginBottom: '48px' }}>
            {[
              { label: 'Edición', value: cat.edition },
              { label: 'Año', value: cat.year },
            ].map(({ label, value }) => (
              <div key={label}>
                <p
                  style={{
                    fontSize: '9px',
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color: '#ffffff28',
                    marginBottom: '6px',
                  }}
                >
                  {label}
                </p>
                <p style={{ fontSize: '17px', fontWeight: 600, color: '#f0ede8' }}>{value}</p>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div
            style={{
              width: '40px',
              height: '1px',
              background: `${cat.color}50`,
              marginBottom: '40px',
            }}
          />

          {/* CTA */}
          <motion.button
            whileHover={{ backgroundColor: cat.color, color: '#080808', borderColor: cat.color }}
            transition={{ duration: 0.18 }}
            style={{
              padding: '13px 30px',
              border: `1px solid ${cat.color}60`,
              background: 'transparent',
              color: cat.color,
              fontSize: '11px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              fontFamily: 'inherit',
              width: 'fit-content',
              borderRadius: '2px',
            }}
          >
            Adquirir pieza →
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
