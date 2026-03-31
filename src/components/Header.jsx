import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const linkStyle = {
  fontSize: '11px',
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: '#ffffff45',
  textDecoration: 'none',
};

/**
 * Shared navigation header.
 *
 * Props:
 *  - onBack  {Function}  If provided, renders a "← Galería" back button on the left.
 *  - style   {Object}    Extra styles for positioning (position, zIndex, background, etc.).
 */
export default function Header({ onBack, style: extraStyle }) {
  return (
    <nav
      style={{
        padding: '20px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        // The nav bounding box spans the full width; make the empty zones
        // transparent to pointer events so underlying 3D cards stay clickable.
        pointerEvents: 'none',
        ...extraStyle,
      }}
    >
      {/* Left side: back button OR logo */}
      {onBack ? (
        <motion.button
          onClick={onBack}
          whileHover={{ color: '#f0ede8' }}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'inherit',
            pointerEvents: 'auto',
            ...linkStyle,
          }}
        >
          ← Galería
        </motion.button>
      ) : (
        <Link to="/" style={{ display: 'flex', alignItems: 'center', pointerEvents: 'auto' }}>
          <img
            src="/assets/logo_mc.png"
            alt="Mad Cats"
            style={{ height: 'clamp(26px, 3.2vh, 36px)', display: 'block' }}
          />
        </Link>
      )}

      {/* Right side: nav links + logo when back button is shown */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '28px', pointerEvents: 'auto' }}>
        {onBack && (
          <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="/assets/logo_mc.png"
              alt="Mad Cats"
              style={{ height: 'clamp(24px, 3vh, 32px)', display: 'block' }}
            />
          </Link>
        )}
        <Link to="/cats" style={linkStyle}>
          Gatos
        </Link>
        <Link to="/about" style={linkStyle}>
          About
        </Link>
        <Link to="/contact" style={linkStyle}>
          Contacto
        </Link>
      </div>
    </nav>
  );
}
