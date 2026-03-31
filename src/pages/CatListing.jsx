import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import { useAppContext } from '../context/AppContext';

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

function CatCard({ cat }) {
  return (
    <motion.div variants={fadeUp}>
      <Link
        to={`/cat/${cat.id}`}
        style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
      >
        <motion.article
          whileHover={{ y: -6 }}
          transition={{ type: 'spring', stiffness: 320, damping: 24 }}
          style={{
            background: '#0f0f0f',
            border: `1px solid ${cat.color}22`,
            borderRadius: '4px',
            overflow: 'hidden',
            cursor: 'pointer',
          }}
        >
          {/* Image */}
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <img
              src={cat.image}
              alt={cat.name}
              style={{
                width: '100%',
                display: 'block',
                aspectRatio: '3 / 4',
                objectFit: 'cover',
              }}
            />
            {/* Gradient overlay on hover — CSS handles this via the article hover */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(to top, ${cat.color}28 0%, transparent 50%)`,
              }}
            />
          </div>

          {/* Info */}
          <div style={{ padding: '16px 18px 20px' }}>
            <p
              style={{
                fontSize: '9px',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: cat.color,
                opacity: 0.8,
                marginBottom: '5px',
              }}
            >
              {cat.title}
            </p>
            <h2
              style={{
                fontSize: 'clamp(18px, 2vw, 24px)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                color: '#f0ede8',
                marginBottom: '8px',
                lineHeight: 1,
              }}
            >
              {cat.name}
            </h2>
            <p
              style={{
                fontSize: '12px',
                lineHeight: 1.6,
                color: '#ffffff40',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {cat.shortDesc}
            </p>

            {/* Footer row */}
            <div
              style={{
                marginTop: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: `1px solid ${cat.color}15`,
                paddingTop: '12px',
              }}
            >
              <span
                style={{
                  fontSize: '10px',
                  letterSpacing: '0.15em',
                  color: '#ffffff25',
                  textTransform: 'uppercase',
                }}
              >
                {cat.edition}
              </span>
              <span
                style={{
                  fontSize: '10px',
                  letterSpacing: '0.12em',
                  color: cat.color,
                  opacity: 0.7,
                }}
              >
                Ver detalle →
              </span>
            </div>
          </div>
        </motion.article>
      </Link>
    </motion.div>
  );
}

export default function CatListing() {
  const { cats } = useAppContext();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ minHeight: '100vh', background: '#080808' }}
    >
      <Header />

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 32px 100px' }}>

        {/* Page heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ marginBottom: '56px' }}
        >
          <p
            style={{
              fontSize: '10px',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: '#FF6B35',
              marginBottom: '12px',
            }}
          >
            Colección 2024
          </p>
          <h1
            style={{
              fontSize: 'clamp(36px, 5vw, 60px)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              color: '#f0ede8',
              lineHeight: 0.95,
              marginBottom: '16px',
            }}
          >
            Catálogo completo
          </h1>
          <p style={{ fontSize: '14px', color: '#ffffff35', maxWidth: '360px', lineHeight: 1.6 }}>
            {cats.length} piezas — Edición limitada · 50 unidades por pieza
          </p>
        </motion.div>

        {/* Grid — auto-fill: adding cats to the context is the only step needed */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '24px',
          }}
        >
          {cats.map((cat) => (
            <CatCard key={cat.id} cat={cat} />
          ))}
        </motion.div>

      </main>
    </motion.div>
  );
}
