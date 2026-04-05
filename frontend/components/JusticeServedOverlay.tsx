'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Zap } from 'lucide-react'

const DOTS = Array.from({ length: 30 }, (_, i) => ({
  left: `${4 + ((i * 3.3) % 92)}%`,
  top: `${4 + ((i * 7.1) % 92)}%`,
  size: 2 + (i % 4),
  color: i % 2 === 0 ? '#F5C518' : '#FF1F1F',
  duration: 3 + (i % 3),
  delay: i * 0.1,
}))

export function JusticeServedOverlay({ amount }: { amount: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ background: 'rgba(6,6,8,0.96)', backdropFilter: 'blur(8px)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(245,197,24,0.18) 0%, transparent 65%)' }}
      />

      {DOTS.map((d, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{ left: d.left, top: d.top, width: d.size, height: d.size, backgroundColor: d.color, opacity: 0.4 }}
          animate={{ y: [-14, 14, -14], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: d.duration, repeat: Infinity, delay: d.delay, ease: 'easeInOut' }}
        />
      ))}

      <div className="relative z-10 text-center max-w-2xl px-4 mx-auto">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 120 }}
          className="mb-8"
        >
          <CheckCircle2 className="w-24 h-24 text-protest-gold mx-auto" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-protest-gold border border-protest-gold/30 bg-protest-gold/10 px-4 py-2 rounded-full mb-6 uppercase tracking-widest">
            <Zap className="w-3 h-3" />
            Case Closed
          </div>

          <h1 className="font-display text-8xl md:text-[10rem] leading-none text-protest-gold mb-4">
            JUSTICE
            <br />
            SERVED
          </h1>

          <p className="font-mono text-protest-text text-xl mb-2">
            ₹{amount.toLocaleString('en-IN')} raised by the community.
          </p>
          <p className="font-mono text-protest-muted text-sm mb-10 max-w-md mx-auto leading-relaxed">
            The community has spoken. This site will be taken offline within 24 hours.
            <br />
            Thank you for standing against corporate indifference.
          </p>

          <div className="inline-block bg-protest-gold/10 border border-protest-gold/20 rounded-2xl px-8 py-5">
            <p className="font-mono text-protest-gold text-sm italic leading-relaxed">
              "When brands fail their customers, customers find their own justice."
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
