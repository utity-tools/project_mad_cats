import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import Header from '../components/Header';

// Each cat's position in the 3D tunnel (xVw = vw offset from center, yVh = vh offset, z = depth in px)
// zIndex mirrors 3D depth in 2D stacking: closest card must win over overlapping siblings.
const CAT_POSITIONS = [
  { xVw: -27, yVh:  2, z: -320,  zIndex: 40 },
  { xVw:  24, yVh: -7, z: -760,  zIndex: 30 },
  { xVw: -21, yVh:  9, z: -1200, zIndex: 20 },
  { xVw:  13, yVh:  0, z: -1640, zIndex: 10 },
];

function CatCard({ cat, position }) {
  // Card width as a shared value so the Link and motion.div agree on the same size.
  const CARD_W = 'clamp(140px, 18vw, 240px)';

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: `calc(50% + ${position.xVw}vw)`,
        top: `calc(50% + ${position.yVh}vh)`,
        x: '-50%',
        y: '-50%',
        z: position.z,
        zIndex: position.zIndex,
        // preserve-3d kept for depth rendering; width hard-capped so the
        // layout box never bleeds into neighbouring cards' hit areas.
        transformStyle: 'preserve-3d',
        width: CARD_W,
      }}
      whileHover={{ scale: 1.06 }}
      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
    >
      {/* Wrapper constrains all children to the card's actual visual footprint. */}
      <div className="w-full flex flex-col items-center justify-center">
        <Link
          to={`/cat/${cat.id}`}
          style={{
            // Explicit width prevents the <a> from expanding beyond the card.
            width: CARD_W,
            display: 'block',
            textDecoration: 'none',
            color: 'inherit',
            cursor: 'pointer',
          }}
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
        </Link>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const { cats } = useAppContext();
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
          <Header
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              zIndex: 40,
            }}
          />

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
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
