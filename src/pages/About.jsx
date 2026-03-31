import { motion } from 'framer-motion';
import Header from '../components/Header';
import { useAppContext } from '../context/AppContext';

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] } },
};

const MANIFESTO = [
  {
    tag: '001',
    text: 'Somos cuatro. Somos la esquina donde el barrio deja de ser barrio y empieza a ser leyenda.',
  },
  {
    tag: '002',
    text: 'Nacimos del asfalto de Madrid, del olor a churros a las seis de la mañana, del palo seco de una castañuela y del orgullo de quien sabe que no tiene nada que demostrar.',
  },
  {
    tag: '003',
    text: 'Cada pieza es única. Cada gato lleva encima la historia de un barrio que no pide permiso para existir.',
  },
];

export default function About() {
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

      {/* Hero statement */}
      <section
        style={{
          maxWidth: '760px',
          margin: '0 auto',
          padding: 'clamp(48px, 8vh, 100px) 32px 0',
          textAlign: 'center',
        }}
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: 'clamp(9px, 1vw, 11px)',
              letterSpacing: '0.38em',
              textTransform: 'uppercase',
              color: '#FF6B35',
              marginBottom: '24px',
            }}
          >
            Madrid · 2024 · Edición limitada
          </motion.p>

          <motion.h1
            variants={fadeUp}
            style={{
              fontSize: 'clamp(48px, 8vw, 100px)',
              fontWeight: 900,
              letterSpacing: '-0.045em',
              color: '#f0ede8',
              lineHeight: 0.9,
              marginBottom: '48px',
            }}
          >
            Mad<br />
            <span style={{ color: '#FF6B35' }}>Cats</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            style={{
              fontSize: 'clamp(16px, 2vw, 22px)',
              lineHeight: 1.6,
              color: '#7a7a7a',
              fontWeight: 300,
              maxWidth: '560px',
              margin: '0 auto',
            }}
          >
            Una colección de cuatro personajes imposibles que sólo podían nacer
            en Madrid. Gatos sin dueño. Arte sin disculpas.
          </motion.p>
        </motion.div>
      </section>

      {/* Horizontal rule */}
      <div
        style={{
          maxWidth: '760px',
          margin: '64px auto 0',
          padding: '0 32px',
          height: '1px',
          background: 'linear-gradient(to right, transparent, #ffffff12, transparent)',
        }}
      />

      {/* Manifesto blocks */}
      <section
        style={{
          maxWidth: '680px',
          margin: '0 auto',
          padding: 'clamp(48px, 8vh, 80px) 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '40px',
        }}
      >
        {MANIFESTO.map((item, i) => (
          <motion.div
            key={item.tag}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.08 }}
            style={{ display: 'grid', gridTemplateColumns: '48px 1fr', gap: '20px', alignItems: 'start' }}
          >
            <span
              style={{
                fontSize: '10px',
                letterSpacing: '0.2em',
                color: '#FF6B3540',
                paddingTop: '5px',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {item.tag}
            </span>
            <p
              style={{
                fontSize: 'clamp(15px, 1.6vw, 19px)',
                lineHeight: 1.65,
                color: '#c0bdb8',
                fontWeight: 400,
              }}
            >
              {item.text}
            </p>
          </motion.div>
        ))}
      </section>

      {/* Cat strip */}
      <section style={{ padding: 'clamp(40px, 6vh, 80px) 0' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 0,
            maxWidth: '900px',
            margin: '0 auto',
            padding: '0 32px',
          }}
        >
          {cats.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              style={{ textAlign: 'center', padding: '0 12px' }}
            >
              <div
                style={{
                  position: 'relative',
                  marginBottom: '14px',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  border: `1px solid ${cat.color}20`,
                }}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  style={{
                    width: '100%',
                    display: 'block',
                    aspectRatio: '3 / 4',
                    objectFit: 'cover',
                    filter: 'saturate(0.85)',
                  }}
                />
                {/* Hover glow overlay */}
                <motion.div
                  whileHover={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(to top, ${cat.color}30, transparent)`,
                  }}
                />
              </div>
              <p
                style={{
                  fontSize: '9px',
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  color: cat.color,
                  opacity: 0.7,
                  marginBottom: '3px',
                }}
              >
                {cat.title}
              </p>
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#f0ede8',
                  letterSpacing: '-0.01em',
                }}
              >
                {cat.name}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Closing statement */}
      <section
        style={{
          maxWidth: '680px',
          margin: '0 auto',
          padding: 'clamp(40px, 6vh, 72px) 32px clamp(60px, 10vh, 120px)',
          textAlign: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p
            style={{
              fontSize: 'clamp(22px, 3vw, 36px)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: '#f0ede8',
              lineHeight: 1.3,
              marginBottom: '24px',
            }}
          >
            50 unidades. Sin reimpresión.
            <br />
            <span style={{ color: '#ffffff30' }}>Sin segunda oportunidad.</span>
          </p>
          <p
            style={{
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#ffffff20',
            }}
          >
            Mad Cats · Madrid · 2024
          </p>
        </motion.div>
      </section>
    </motion.div>
  );
}
