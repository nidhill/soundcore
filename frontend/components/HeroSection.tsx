'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, AlertTriangle, Zap } from 'lucide-react'

/* ── Real Q30 photo with crack overlay ───────────────────────────────── */
function CrackedQ30() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Real product photo */}
      <img
        src="/q30.png"
        alt="Soundcore by Anker Life Q30 cracked headband defect"
        className="w-full h-full object-contain drop-shadow-2xl"
        style={{ filter: 'drop-shadow(0 0 32px rgba(255,31,31,0.25))' }}
      />
      {/* Crack SVG overlay on headband */}
      <svg
        viewBox="0 0 280 230"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        {/* Main fracture line across headband area */}
        <path
          d="M 97 70 L 118 56 L 140 72 L 163 58 L 184 74"
          stroke="#FF1F1F"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 140 72 L 133 92 L 142 105"
          stroke="#FF1F1F"
          strokeWidth="2"
          fill="none"
          strokeOpacity="0.8"
        />
        <path d="M 118 56 L 109 42 L 116 33" stroke="#FF1F1F" strokeWidth="1.3" fill="none" strokeOpacity="0.6" />
        <path d="M 163 58 L 174 44 L 167 35" stroke="#FF1F1F" strokeWidth="1.3" fill="none" strokeOpacity="0.6" />
        <path d="M 97 70 L 84 62 L 78 68"   stroke="#FF1F1F" strokeWidth="0.9" fill="none" strokeOpacity="0.4" />
        <path d="M 184 74 L 198 68 L 205 72" stroke="#FF1F1F" strokeWidth="0.9" fill="none" strokeOpacity="0.4" />
        {/* Impact rings */}
        <circle cx="140" cy="66" r="6"  fill="#FF1F1F" fillOpacity="0.35" />
        <circle cx="140" cy="66" r="13" stroke="#FF1F1F" strokeWidth="1"   fill="none" strokeOpacity="0.22" />
        <circle cx="140" cy="66" r="22" stroke="#FF1F1F" strokeWidth="0.6" fill="none" strokeOpacity="0.12" />
        <circle cx="140" cy="66" r="3"  fill="#FF1F1F" fillOpacity="0.9" />
      </svg>
    </div>
  )
}

/* ── Per-character glitch ─────────────────────────────────────────────── */
function GlitchChar({ char, delay }: { char: string; delay: number }) {
  const [g, setG] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        if (Math.random() < 0.04) {
          setG(true)
          setTimeout(() => setG(false), 80 + Math.random() * 100)
        }
      }, 600)
      return () => clearInterval(iv)
    }, delay)
    return () => clearTimeout(t)
  }, [delay])

  return (
    <span
      className="inline-block transition-transform duration-75"
      style={
        g
          ? {
              textShadow: '4px 0 #FF1F1F, -4px 0 #00FFFF',
              transform: `translate(${(Math.random() - 0.5) * 5}px, ${(Math.random() - 0.5) * 3}px)`,
              filter: 'brightness(1.6)',
            }
          : {}
      }
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  )
}

/* ── Floating particles ───────────────────────────────────────────────── */
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: 4 + ((i * 5.7) % 92),
  y: 4 + ((i * 7.1) % 92),
  size: 2 + (i % 4),
  dur: 3 + (i % 3),
  delay: i * 0.28,
  color:
    i % 3 === 0
      ? 'rgba(255,31,31,0.55)'
      : i % 3 === 1
      ? 'rgba(245,197,24,0.3)'
      : 'rgba(35,35,55,0.9)',
}))

/* ── Hero ─────────────────────────────────────────────────────────────── */
export function HeroSection() {
  const line1 = 'THE 15%'
  const line2 = 'MASTERPIECE'

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none bg-protest-grid opacity-60" />

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 25%, #060608 78%)' }}
      />

      {/* Red orb TL */}
      <div
        className="absolute -top-24 -left-24 w-[550px] h-[550px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,31,31,0.14) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />

      {/* Gold orb BR */}
      <div
        className="absolute -bottom-24 -right-24 w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(245,197,24,0.09) 0%, transparent 70%)',
          filter: 'blur(55px)',
        }}
      />

      {/* Particles */}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, backgroundColor: p.color }}
          animate={{ y: [-12, 12, -12], opacity: [0.3, 0.9, 0.3] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}

      {/* ── Content ─────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
        {/* Error badge */}
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-protest-red-dark border border-protest-red/40 px-5 py-2 rounded-full">
            <AlertTriangle className="w-3.5 h-3.5 text-protest-red" />
            <span className="font-mono text-xs text-protest-red uppercase tracking-[0.18em]">
              ERROR: Q30_HEADBAND_CRACKED &nbsp;//&nbsp; OFFER_UPGRADED_FROM_10%_TO_15%
            </span>
          </div>
        </motion.div>

        {/* Headphone + Title row */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-14 mb-10">
          {/* SVG */}
          <motion.div
            initial={{ opacity: 0, scale: 0.65, rotate: -12 }}
            animate={{ opacity: 1, scale: 1, rotate: -4 }}
            transition={{ delay: 0.45, type: 'spring', stiffness: 90, damping: 14 }}
            className="relative w-64 h-56 lg:w-96 lg:h-80 flex-shrink-0"
          >
            <CrackedQ30 />
            {/* Pulsing glow */}
            <motion.div
              className="absolute inset-0 pointer-events-none rounded-full"
              animate={{ opacity: [0.2, 0.55, 0.2] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ background: 'radial-gradient(circle, rgba(255,31,31,0.18) 0%, transparent 70%)' }}
            />
          </motion.div>

          {/* Glitch title */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.55 }}
            className="text-center lg:text-left"
          >
            <h1 className="font-display leading-none select-none">
              <div className="text-[4.5rem] sm:text-[6rem] lg:text-[8rem] xl:text-[9.5rem] text-protest-text">
                {line1.split('').map((c, i) => (
                  <GlitchChar key={i} char={c} delay={i * 90} />
                ))}
              </div>
              <div className="text-[3.8rem] sm:text-[5.2rem] lg:text-[7rem] xl:text-[8.5rem] text-protest-red leading-none">
                {line2.split('').map((c, i) => (
                  <GlitchChar key={i} char={c} delay={i * 75 + 650} />
                ))}
              </div>
            </h1>
          </motion.div>
        </div>

        {/* Sub-copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mb-12"
        >
          <p className="font-mono text-protest-muted text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Where brand loyalty meets a{' '}
            <span className="text-protest-muted line-through text-sm mr-1">10%</span>
            <span className="text-protest-gold font-bold border-b border-protest-gold/30">
              15% discount
            </span>{' '}
            on a broken design.
          </p>
          <p className="font-mono text-protest-muted/50 text-xs mt-2">
            — Presented by Muhammad Nidhil, Junior Software Developer &amp; Loyal Soundcore Customer
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#donate"
            className="group inline-flex items-center justify-center gap-2 bg-protest-red hover:bg-protest-red-dim text-white font-display text-2xl tracking-widest px-10 py-4 rounded-xl transition-all duration-200 hover:shadow-[0_0_35px_rgba(255,31,31,0.45)] active:scale-95"
          >
            <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
            SUPPORT JUSTICE
          </a>
          <a
            href="#evidence"
            className="inline-flex items-center justify-center gap-2 border border-protest-border hover:border-protest-gold text-protest-muted hover:text-protest-gold font-display text-2xl tracking-widest px-10 py-4 rounded-xl transition-all duration-200 hover:bg-protest-gold/5 active:scale-95"
          >
            VIEW EVIDENCE
          </a>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="font-mono text-[10px] text-protest-muted uppercase tracking-[0.2em]">scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5 text-protest-muted" />
        </motion.div>
      </motion.div>
    </section>
  )
}
