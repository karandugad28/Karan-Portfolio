import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const cards = [
  { id: 1, image: '/cards/card-fullstack.jpg', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', label: 'Full-Stack Dev' },
  { id: 2, image: '/cards/card-uidesign.jpg', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', label: 'UI Design' },
  { id: 3, image: '/cards/card-react.jpg', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', label: 'React Apps', hasPlay: true },
  { id: 4, image: '/cards/card-shopify.jpg', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', label: 'Shopify' },
  { id: 5, image: '/cards/card-frontend.jpg', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', label: 'Frontend' },
]

const filterPills = ['Portfolio', 'Web Dev', 'Design', 'Shopify', 'React', 'View All →']

/* Relative position offsets from the active card index */
const SLOT_CONFIGS = [
  { rotate: -15, x: -280, y: 40, scale: 0.82, zIndex: 1 },
  { rotate: -7, x: -140, y: 20, scale: 0.90, zIndex: 2 },
  { rotate: 0, x: 0, y: 0, scale: 1.00, zIndex: 5 },
  { rotate: 7, x: 140, y: 20, scale: 0.90, zIndex: 2 },
  { rotate: 15, x: 280, y: 40, scale: 0.82, zIndex: 1 },
]

function getCardStyle(cardIndex, activeIndex) {
  const slot = cardIndex - activeIndex + 2 // map to 0..4 relative to center(2)
  if (slot < 0 || slot > 4) {
    return { rotate: 0, x: 0, y: 80, scale: 0.5, zIndex: 0, opacity: 0 }
  }
  return { ...SLOT_CONFIGS[slot], opacity: 1 }
}

const textVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  }),
}

const carouselVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.55, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
}

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(2)
  const [activeFilter, setActiveFilter] = useState('Portfolio')

  const handleLeft = () => setActiveIndex((i) => Math.max(0, i - 1))
  const handleRight = () => setActiveIndex((i) => Math.min(cards.length - 1, i + 1))

  return (
    <section
      id="root"
      style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflow: 'hidden',
        paddingTop: '80px',
      }}
    >
      {/* ── Text Block ─────────────────────────────────────────── */}
      <div
        style={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0',
          paddingBottom: '16px',
        }}
      >
        {/* Section label */}
        <motion.span
          className="section-label"
          custom={0}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          style={{ marginBottom: '8px' }}
        >
          PORTFOLIO
        </motion.span>

        {/* Main heading */}
        <motion.h1
          custom={1}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 'clamp(3.2rem, 8vw, 6.5rem)',
            lineHeight: 1.05,
            color: 'var(--ink)',
            margin: '0 0 8px 0',
            fontWeight: 400,
          }}
        >
          Karan Dugad
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          custom={2}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '1.15rem',
            color: 'var(--ink-muted)',
            margin: '0',
            fontWeight: 400,
          }}
        >
          Web Developer &amp; Creative Builder
        </motion.p>
      </div>

      {/* ── Card Carousel ───────────────────────────────────────── */}
      <motion.div
        variants={carouselVariants}
        initial="hidden"
        animate="visible"
        style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        {/* Fan stage */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '420px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {cards.map((card, i) => {
            const cfg = getCardStyle(i, activeIndex)
            const isActive = i === activeIndex
            const cardW = isActive ? 300 : 260
            const cardH = isActive ? 380 : 340

            return (
              <motion.div
                key={card.id}
                onClick={() => setActiveIndex(i)}
                animate={{
                  rotate: cfg.rotate,
                  x: cfg.x,
                  y: cfg.y,
                  scale: cfg.scale,
                  opacity: cfg.opacity,
                  zIndex: cfg.zIndex,
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                style={{
                  position: 'absolute',
                  width: cardW,
                  height: cardH,
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
                  cursor: 'pointer',
                  background: card.image
                    ? `url("${card.image}") center/cover no-repeat`
                    : card.gradient,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '20px',
                  transformOrigin: 'bottom center',
                }}
              >
                {/* Vignette gradient overlay for text readability */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0) 100%)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Label chip */}
                <span
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    display: 'inline-block',
                    background: 'rgba(255,255,255,0.22)',
                    backdropFilter: 'blur(8px)',
                    color: '#fff',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    padding: '6px 14px',
                    borderRadius: '999px',
                    alignSelf: 'flex-start',
                    textTransform: 'uppercase',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                  }}
                >
                  {card.label}
                </span>

                {/* Play icon */}
                {card.hasPlay && (
                  <span
                    style={{
                      position: 'absolute',
                      zIndex: 2,
                      bottom: '20px',
                      right: '20px',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.28)',
                      backdropFilter: 'blur(6px)',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      color: '#fff',
                    }}
                  >
                    ▶
                  </span>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Navigation arrows */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            marginTop: '32px',
            alignItems: 'center',
          }}
        >
          <button
            onClick={handleLeft}
            disabled={activeIndex === 0}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: '1.5px solid rgba(26,26,46,0.15)',
              background: 'white',
              cursor: activeIndex === 0 ? 'not-allowed' : 'pointer',
              opacity: activeIndex === 0 ? 0.4 : 1,
              fontSize: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--ink)',
              transition: 'all 0.2s',
              lineHeight: 1,
            }}
          >
            ←
          </button>

          {/* Dot indicators */}
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            {cards.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                style={{
                  width: i === activeIndex ? '20px' : '7px',
                  height: '7px',
                  borderRadius: '999px',
                  background: i === activeIndex ? 'var(--ink)' : 'rgba(26,26,46,0.2)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.3s',
                }}
              />
            ))}
          </div>

          <button
            onClick={handleRight}
            disabled={activeIndex === cards.length - 1}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: '1.5px solid rgba(26,26,46,0.15)',
              background: 'white',
              cursor: activeIndex === cards.length - 1 ? 'not-allowed' : 'pointer',
              opacity: activeIndex === cards.length - 1 ? 0.4 : 1,
              fontSize: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--ink)',
              transition: 'all 0.2s',
              lineHeight: 1,
            }}
          >
            →
          </button>
        </div>

        {/* Bottom spacing */}
        <div style={{ height: '60px' }} />
      </motion.div>
    </section>
  )
}
