'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'

const links = [
  { href: '#emails', label: 'Emails' },
  { href: '#tracker', label: 'Justice' },
  { href: '#calculator', label: 'Calculator' },
  { href: '#evidence', label: 'Evidence' },
  { href: '#community', label: 'Community' },
  { href: '#donate', label: 'Support' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <motion.nav
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-[background,border,padding] duration-300 ${
        scrolled
          ? 'bg-protest-bg/90 backdrop-blur-md border-b border-protest-border py-3'
          : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-protest-red" />
          <span className="font-display text-xl text-protest-text tracking-wider">
            Q30 <span className="text-protest-red">PROTEST</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-xs text-protest-muted hover:text-protest-text transition-colors uppercase tracking-[0.15em]"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#donate"
          className="bg-protest-red/10 border border-protest-red/40 text-protest-red hover:bg-protest-red/20 font-mono text-xs px-4 py-2 rounded-lg transition-colors uppercase tracking-wider"
        >
          Fund Justice
        </a>
      </div>
    </motion.nav>
  )
}
