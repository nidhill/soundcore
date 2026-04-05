'use client'

import { motion } from 'framer-motion'
import { Camera, AlertTriangle, Heart, Mail } from 'lucide-react'

/* ── Real crack photo (q30-crack.png) with red glow ──────────────────── */
function HeadphoneCracked() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-lg">
      {/* Real close-up crack photo — save to public/q30-crack.png */}
      <img
        src="/q30-crack.png"
        alt="Soundcore Life Q30 — cracked headband, close-up"
        className="w-full h-full object-cover"
        style={{ filter: 'drop-shadow(0 0 20px rgba(255,31,31,0.4)) brightness(0.92) contrast(1.1)' }}
        onError={(e) => {
          // Fallback to marketing shot if crack photo not yet saved
          ;(e.currentTarget as HTMLImageElement).src = '/q30.png'
          ;(e.currentTarget as HTMLImageElement).style.objectFit = 'contain'
        }}
      />
      {/* Red vignette overlay to add drama */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 40% 70%, rgba(255,31,31,0.18) 0%, transparent 65%)' }}
      />
    </div>
  )
}

function SpeakerBoom2() {
  return (
    <svg viewBox="0 0 200 165" fill="none" className="w-full h-full">
      <rect x="45" y="24" width="110" height="118" rx="20" fill="#101018" stroke="#252530" strokeWidth="1.5" />
      <circle cx="100" cy="75" r="34" fill="#0A0A10" stroke="#1C1C28" strokeWidth="1.5" />
      <circle cx="100" cy="75" r="20" fill="#141420" stroke="#10B981" strokeWidth="1.2" strokeOpacity="0.4" />
      <circle cx="100" cy="75" r="7"  fill="#10B981" fillOpacity="0.5" />
      <circle cx="100" cy="75" r="3"  fill="#10B981" />
      <circle cx="100" cy="75" r="44" stroke="#10B981" strokeWidth="0.7" fill="none" strokeOpacity="0.15" />
      <circle cx="100" cy="75" r="55" stroke="#10B981" strokeWidth="0.4" fill="none" strokeOpacity="0.08" />
      <path d="M 140 52 Q 158 75 140 98" stroke="#10B981" strokeWidth="1.8" fill="none" strokeOpacity="0.45" strokeLinecap="round" />
      <path d="M 149 42 Q 172 75 149 108" stroke="#10B981" strokeWidth="1.2" fill="none" strokeOpacity="0.25" strokeLinecap="round" />
      {/* Handle knob bottom */}
      <rect x="80" y="128" width="40" height="10" rx="5" fill="#141420" stroke="#252530" strokeWidth="1" />
    </svg>
  )
}

function EmailOffer() {
  return (
    <svg viewBox="0 0 200 165" fill="none" className="w-full h-full">
      <rect x="22" y="35" width="156" height="105" rx="12" fill="#101018" stroke="#252530" strokeWidth="1.5" />
      <path d="M 22 52 L 100 90 L 178 52" stroke="#F5C518" strokeWidth="1.5" fill="none" strokeOpacity="0.6" strokeLinejoin="round" />
      {/* "Email content" lines */}
      <rect x="42" y="100" width="70" height="6"  rx="3" fill="#1C1C28" />
      <rect x="42" y="112" width="50" height="6"  rx="3" fill="#1C1C28" />
      {/* Big 10% text */}
      <text x="52" y="88" fill="#F5C518" fontFamily="monospace" fontSize="22" fontWeight="bold" fillOpacity="0.85">10%</text>
      {/* Gold seal stamp */}
      <circle cx="158" cy="43" r="20" fill="#3A2800" stroke="#F5C518" strokeWidth="1.5" />
      <text x="149" y="48" fill="#F5C518" fontFamily="monospace" fontSize="16">✓</text>
      {/* Sarcastic text */}
      <text x="34"  y="130" fill="#70707A" fontFamily="monospace" fontSize="7">OFFER ENCLOSED</text>
    </svg>
  )
}

/* ── Gallery data ──────────────────────────────────────────────────────── */
const exhibits = [
  {
    id: 'A',
    title: 'THE FRACTURED CROWN',
    subtitle: 'Soundcore Life Q30',
    caption:
      'Normal wear. No drops. No misuse. Just a headband that decided structural integrity was optional.',
    tag: 'DEFECTIVE',
    tagBg: 'bg-protest-red',
    tagText: 'text-white',
    icon: AlertTriangle,
    iconColor: '#FF1F1F',
    gradFrom: 'from-[#3D0808]',
    gradTo: 'to-protest-bg-el',
    Render: HeadphoneCracked,
  },
  {
    id: 'B',
    title: 'THE LOYAL COMPANION',
    subtitle: 'Soundcore Boom 2',
    caption:
      'Years of thumping, travel, and daily use. Not a single crack. Funny how some products actually work.',
    tag: 'LOYAL',
    tagBg: 'bg-emerald-900',
    tagText: 'text-emerald-300',
    icon: Heart,
    iconColor: '#10B981',
    gradFrom: 'from-emerald-950',
    gradTo: 'to-protest-bg-el',
    Render: SpeakerBoom2,
  },
  {
    id: 'C',
    title: 'THE GENEROUS OFFER',
    subtitle: 'Customer Support Email',
    caption:
      '"Without an invoice we can only offer 10% off your next purchase." — A sentence that should embarrass someone.',
    tag: '10% INSULT',
    tagBg: 'bg-protest-gold-dark',
    tagText: 'text-protest-gold',
    icon: Mail,
    iconColor: '#F5C518',
    gradFrom: 'from-protest-gold-dark',
    gradTo: 'to-protest-bg-el',
    Render: EmailOffer,
  },
]

/* ── Component ─────────────────────────────────────────────────────────── */
export function EvidenceGallery() {
  return (
    <section id="evidence" className="py-28 px-4 bg-protest-bg-card relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono text-protest-muted border border-protest-border px-4 py-2 rounded-full mb-6 uppercase tracking-[0.18em]">
            <Camera className="w-3 h-3" />
            Evidence Gallery
          </div>
          <h2 className="font-display text-6xl md:text-8xl text-protest-text leading-none mb-4">
            EXHIBIT <span className="text-protest-red">FILES</span>
          </h2>
          <p className="font-mono text-protest-muted text-sm">
            // Documented evidence of what loyalty gets you.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {exhibits.map((ex, i) => (
            <motion.div
              key={ex.id}
              initial={{ opacity: 0, y: 44, rotate: i % 2 === 0 ? -2 : 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.14, type: 'spring', stiffness: 80 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group border border-protest-border bg-protest-bg-el rounded-2xl overflow-hidden cursor-default select-none"
            >
              {/* Image area */}
              <div
                className={`relative h-56 bg-gradient-to-b ${ex.gradFrom} ${ex.gradTo} flex items-center justify-center p-6`}
              >
                <div className="absolute top-3 left-3 font-mono text-[10px] text-protest-muted bg-protest-bg px-2 py-1 rounded">
                  EXHIBIT {ex.id}
                </div>
                <div
                  className={`absolute top-3 right-3 ${ex.tagBg} ${ex.tagText} text-[10px] font-mono px-2.5 py-1 rounded-full uppercase tracking-wider`}
                >
                  {ex.tag}
                </div>

                <div className="w-40 h-36">
                  <ex.Render />
                </div>
              </div>

              {/* Caption */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-1">
                  <ex.icon className="w-4 h-4 flex-shrink-0" style={{ color: ex.iconColor }} />
                  <h3 className="font-display text-xl text-protest-text">{ex.title}</h3>
                </div>
                <div className="font-mono text-[10px] text-protest-muted mb-3 uppercase tracking-wider">
                  {ex.subtitle}
                </div>
                <p className="font-mono text-xs text-protest-dim leading-relaxed italic">
                  "{ex.caption}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
