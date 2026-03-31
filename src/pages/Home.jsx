import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import Header from '../components/Header';

// Gallery order: Chulapa → Chulapo → Churro → Castañuela (deepest, end of tunnel).
// zIndex mirrors 3D depth so closer cards win in flat 2D stacking contexts.
const CAT_POSITIONS = [
  { xVw:  24, yVh: -7, z: -760,  zIndex: 30 },  // Chulapa
  { xVw: -21, yVh:  9, z: -1200, zIndex: 20 },  // Chulapo
  { xVw:  13, yVh:  0, z: -1640, zIndex: 10 },  // Churro
  { xVw:   0, yVh:  0, z: -2000, zIndex:  5 },  // Castañuela — end of tunnel
];

function CatCard({ cat, position }) {
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
        transformStyle: 'preserve-3d',
        width: CARD_W,
      }}
      whileHover={{ scale: 1.06 }}
      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
    >
      <div className="w-full flex flex-col items-center justify-center">
        <Link
          to={`/cat/${cat.id}`}
          style={{
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
              style={{ width: '100%', display: 'block', aspectRatio: '3 / 4', objectFit: 'cover' }}
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

  // Camera walks through 4 cats; Castañuela sits deepest at z: -2000.
  const cameraZ = useTransform(scrollYProgress, [0, 1], [0, 1900]);

  // Title and hint fade early so the guardian can claim the stage.
  const titleOpacity   = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const titleY         = useTransform(scrollYProgress, [0, 0.08], [0, -36]);
  const hintOpacity    = useTransform(scrollYProgress, [0, 0.04], [1, 0]);
  const counterOpacity = useTransform(scrollYProgress, [0.06, 0.14], [0, 1]);

  // Guardian Cat (Churro) — cinematic peek-a-boo intro, non-clickable.
  // Anchored to the bottom edge; sinks below the viewport as the user scrolls.
  const guardianY       = useTransform(scrollYProgress, [0, 0.15], ['0vh', '120vh']);
  const guardianOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // Gallery: Chulapa, Chulapo, Churro first — Castañuela last at the tunnel's end.
  const galleryCats = [...cats.slice(1), cats[0]];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55 }}
    >
      {/* 600vh gives comfortable room for the guardian exit + full 3D walk */}
      <div ref={containerRef} style={{ height: '600vh' }}>

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
          {/* Header — zIndex: 40, empty zones pass through (pointerEvents: none on nav) */}
          <Header
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              zIndex: 40,
            }}
          />

          {/* Hero title — zIndex: 30 (behind guardian), fades at [0, 0.08] */}
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

          {/* Scroll hint — zIndex: 30, fades first at [0, 0.04] */}
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

          {/* Edition counter — fades IN once guardian is gone */}
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

          {/* ── Guardian Cat (Churro) — peek-a-boo cinematic intro ──
              Anchored to the bottom edge, full width.
              Desktop  (lg): h-[40vh] → only eyes/top-of-head visible (peek-a-boo).
              Mobile/tablet : h-[60vh] → head + shoulders visible.
              object-position: top ensures the head is always the visible portion.
              pointerEvents: none — never intercepts gallery clicks.
              y animation sinks it below the viewport on scroll [0, 0.15].           */}
          {/*
            Mobile/tablet  (<lg): h-[60vh], w-full, object-cover object-top
                                   → head + shoulders fill the container from the top.
            Desktop        ( lg): h-[40vh], w-[45vw], -mt-[12vh]
                                   → narrower image (864px tall on 900px screen) pushed
                                     up 12vh so the visible 40vh window lands on the
                                     eye/forehead area — peek-a-boo effect.
          */}
          <div
            className="absolute bottom-0 left-0 right-0 overflow-hidden h-[60vh] lg:h-[40vh] lg:flex lg:flex-col lg:items-center"
            style={{ zIndex: 35, pointerEvents: 'none' }}
          >
            <motion.div
              className="h-full lg:h-auto"
              style={{ y: guardianY, opacity: guardianOpacity }}
            >
              <img
                src={cats[3].image}
                alt={cats[3].name}
                className="w-full h-full object-cover object-top guardian-img"
                style={{ filter: `drop-shadow(0 -24px 64px ${cats[3].color}50)` }}
              />
            </motion.div>
          </div>

          {/* Radial vignette — softens edges, behind guardian */}
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
              top: '100px',
              left: 0,
              right: 0,
              bottom: 0,
              perspective: '1000px',
              perspectiveOrigin: '50% 46%',
              zIndex: 10,
            }}
          >
            {/* Scene: z: cameraZ drives the camera walk forward */}
            <motion.div
              style={{
                position: 'absolute',
                inset: 0,
                transformStyle: 'preserve-3d',
                z: cameraZ,
              }}
            >
              {galleryCats.map((cat, i) => (
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
