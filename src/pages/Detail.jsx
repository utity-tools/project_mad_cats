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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', flexDirection: 'column', gap: '16px' }}>
        <p style={{ color: '#FF6B35', letterSpacing: '0.1em' }}>Gato no encontrado.</p>
        <Link to="/" style={{ fontSize: '12px', color: '#ffffff40', letterSpacing: '0.2em', textDecoration: 'none' }}>
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
      <Header
        onBack={handleBack}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 50,
          background: 'linear-gradient(to bottom, #080808e0, transparent)',
        }}
      />

      {/* Contenedor Padre: columna en móvil, fila en desktop */}
      <div className="flex flex-col lg:flex-row" style={{ minHeight: '100vh', paddingTop: '80px' }}>

        {/* Bloque Imagen — primero en el DOM */}
        <div className="w-full lg:w-1/2 flex justify-center mb-8 lg:mb-0" style={{ padding: '40px 32px 0' }}>
          <img
            src={cat.image}
            alt={cat.name}
            style={{
              width: '100%',
              maxWidth: '320px',
              height: 'auto',
              objectFit: 'contain',
              filter: `drop-shadow(0 0 48px ${cat.color}30)`,
            }}
          />
        </div>

        {/* Bloque Texto — debajo en móvil, derecha en desktop */}
        <div className="w-full lg:w-1/2 text-center lg:text-left px-4 lg:px-12 flex flex-col items-center lg:items-start justify-center" style={{ paddingBottom: '60px' }}>

          <p style={{ fontSize: '10px', letterSpacing: '0.38em', textTransform: 'uppercase', color: cat.color, marginBottom: '18px' }}>
            {cat.title}
          </p>

          <h1 style={{ fontSize: 'clamp(44px, 5.5vw, 76px)', fontWeight: 900, letterSpacing: '-0.04em', color: '#f0ede8', lineHeight: 0.92, marginBottom: '32px' }}>
            {cat.name}
          </h1>

          <p style={{ fontSize: 'clamp(14px, 1.1vw, 16px)', lineHeight: 1.75, color: '#8a8a8a', maxWidth: '380px', marginBottom: '48px' }}>
            {cat.description}
          </p>

          {/* Specs */}
          <div className="flex justify-center lg:justify-start gap-12 w-full" style={{ marginBottom: '48px' }}>
            {[{ label: 'Edición', value: cat.edition }, { label: 'Año', value: cat.year }].map(({ label, value }) => (
              <div key={label} className="flex flex-col items-center lg:items-start">
                <p style={{ fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#ffffff28', marginBottom: '6px' }}>
                  {label}
                </p>
                <p style={{ fontSize: '17px', fontWeight: 600, color: '#f0ede8' }}>{value}</p>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="mx-auto lg:mx-0" style={{ width: '40px', height: '1px', background: `${cat.color}50`, marginBottom: '40px' }} />

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

        </div>
      </div>
    </motion.div>
  );
}
