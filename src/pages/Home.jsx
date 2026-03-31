import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

// Each cat's position in the 3D tunnel (xVw = vw offset from center, yVh = vh offset, z = depth in px)
const CAT_POSITIONS = [
  { xVw: -27, yVh:  2, z: -320  },
  { xVw:  24, yVh: -7, z: -760  },
  { xVw: -21, yVh:  9, z: -1200 },
  { xVw:  13, yVh:  0, z: -1640 },
];

function CatCard({ cat, position, onClick }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: `calc(50% + ${position.xVw}vw)`,
        top: `calc(50% + ${position.yVh}vh)`,
        translateX: '-50%',
        translateY: '-50%',
        transformStyle: 'preserve-3d',
        width: 'clamp(140px, 18vw, 240px)',
      }}
    >
      <motion.div
        onClick={onClick}
        style={{
          translateX: '-50%',
          translateY: '-50%',
          translateZ: position.z,
          transformStyle: 'preserve-3d',
          cursor: 'pointer',
          width: 'clamp(140px, 18vw, 240px)',
        }}
        whileHover={{ scale: 1.06 }}
        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
      >
        <div
          style={{
            borderRadius: '3px',
            overflow: 'hidden',
            border: `1px solid ${cat.color}35`,
            boxShadow: `0 4px 24px ${cat.color}18, 0 0 60px ${cat.color}10`,
            background: '#0d0d0d',
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
            }}
          />
        </div>

        <div style={{ marginTop: '10px', textAlign: 'center', paddingBottom: '4px' }}>
          <p
            style={{
              fontSize: 'clamp(8px, 0.85vw, 10px)',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: cat.color,
              opacity: 0.8,
              marginBottom: '3px',
            }}
          >
            {cat.title}
          </p>
          <p
            style={{
              fontSize: 'clamp(13px, 1.5vw, 18px)',
              fontWeight: 700,
              color: '#f0ede8',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
          >
            {cat.name}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function Home() {
  const { cats } = useAppContext();
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Camera moves 1500px forward in Z as user scrolls through 500vh
  const cameraZ = useTransform(scrollYProgress, [0, 1], [0, 1500]);

  const titleOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const titleY      = useTransform(scrollYProgress, [0, 0.08], [0, -36]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.04], [1, 0]);
  const counterOpacity = useTransform(scrollYProgress, [0.06, 0.14], [0, 1]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55 }}
    >
      {/* 500vh scroll container */}
      <div ref={containerRef} style={{ height: '500vh' }}>

        {/* Sticky full-viewport stage */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            background: '#080808',
            overflow: 'hidden',
          }}
        >
          {/* Top nav */}
          <nav
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              padding: '22px 32px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              zIndex: 40,
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
              to="/contact"
              style={{
                fontSize: '11px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#ffffff45',
                textDecoration: 'none',
              }}
            >
              Contacto
            </Link>
          </nav>

          {/* Hero title — fades out on scroll */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 30,
              textAlign: 'center',
              pointerEvents: 'none',
            }}
          >
            <motion.div style={{ opacity: titleOpacity, y: titleY }}>
              <h1
                style={{
                  fontSize: 'clamp(54px, 10vw, 116px)',
                  fontWeight: 900,
                  letterSpacing: '-0.045em',
                  color: '#f0ede8',
                  lineHeight: 0.88,
                }}
              >
                MAD<br />CATS
              </h1>
              <p
                style={{
                  marginTop: '18px',
                  fontSize: 'clamp(9px, 1vw, 12px)',
                  letterSpacing: '0.38em',
                  textTransform: 'uppercase',
                  color: '#FF6B35',
                }}
              >
                Colección 2024 · Scroll para explorar
              </p>
            </motion.div>
          </div>

          {/* Scroll hint arrow */}
          <div
            style={{
              position: 'absolute',
              bottom: '32px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 30,
              textAlign: 'center',
              pointerEvents: 'none',
            }}
          >
            <motion.div style={{ opacity: hintOpacity }}>
              <p
                style={{
                  fontSize: '9px',
                  letterSpacing: '0.32em',
                  textTransform: 'uppercase',
                  color: '#ffffff30',
                  marginBottom: '10px',
                }}
              >
                Scroll
              </p>
              <motion.div
                animate={{ scaleY: [1, 0.25, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                style={{
                  width: '1px',
                  height: '44px',
                  background: 'linear-gradient(to bottom, #FF6B35, transparent)',
                  margin: '0 auto',
                  transformOrigin: 'top',
                }}
              />
            </motion.div>
          </div>

          {/* Edition counter — fades in on scroll */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: '28px',
              left: '32px',
              zIndex: 30,
              opacity: counterOpacity,
              pointerEvents: 'none',
            }}
          >
            <p
              style={{
                fontSize: '10px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#ffffff28',
              }}
            >
              {cats.length} piezas — Edición limitada
            </p>
          </motion.div>

          {/* Radial vignette */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 20,
              background:
                'radial-gradient(ellipse 75% 75% at 50% 50%, transparent 42%, #080808 100%)',
              pointerEvents: 'none',
            }}
          />

          {/* ── 3D Perspective container ── */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              perspective: '1000px',
              perspectiveOrigin: '50% 46%',
              zIndex: 10,
            }}
          >
            {/* Scene: translateZ drives the "camera walk" */}
            <motion.div
              style={{
                position: 'absolute',
                inset: 0,
                transformStyle: 'preserve-3d',
                z: cameraZ,
              }}
            >
              {cats.map((cat, i) => (
                <CatCard
                  key={cat.id}
                  cat={cat}
                  position={CAT_POSITIONS[i]}
                  onClick={() => navigate(`/detail/${cat.id}`)}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
