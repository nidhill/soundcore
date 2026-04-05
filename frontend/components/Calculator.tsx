'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator as CalcIcon } from 'lucide-react'

export function Calculator() {
  const [price, setPrice]           = useState('7100')
  const [calculated, setCalculated] = useState(true)
  const [showThankYou, setTY]       = useState(false)

  const num            = parseFloat(price) || 0
  const soundcoreShare = +(num * 0.15).toFixed(2)
  const yourPenalty    = +(num * 0.85).toFixed(2)

  const calc = () => { if (num > 0) setCalculated(true) }
  const thankYou = () => {
    setTY(true)
    setTimeout(() => setTY(false), 3500)
  }

  return (
    <section id="calculator" className="py-28 px-4 relative">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono text-protest-red border border-protest-red/30 bg-protest-red/5 px-4 py-2 rounded-full mb-6 uppercase tracking-[0.18em]">
            <CalcIcon className="w-3 h-3" />
            The 15% Calculator
          </div>
          <h2 className="font-display text-6xl md:text-8xl text-protest-text leading-none mb-4">
            DO THE <span className="text-protest-red">MATH</span>
          </h2>
          <p className="font-sans text-protest-dim text-base max-w-xl mx-auto leading-relaxed">
            Soundcore's resolution applied to the Life Q30 retail price.
            <br />
            <span className="font-mono text-protest-muted text-sm italic">Is this a solution — or a sales pitch?</span>
          </p>
        </motion.div>

        {/* Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-protest-muted text-lg select-none">
                ₹
              </span>
              <input
                type="number"
                min="0"
                value={price}
                onChange={(e) => { setPrice(e.target.value); setCalculated(false) }}
                onKeyDown={(e) => e.key === 'Enter' && calc()}
                placeholder="Enter headphone price"
                className="w-full bg-protest-bg-el border border-protest-border rounded-xl pl-9 pr-4 py-4 font-mono text-protest-text text-base focus:outline-none focus:border-protest-red transition-colors placeholder:text-protest-muted/40"
              />
            </div>
            <button
              onClick={calc}
              className="bg-protest-red hover:bg-protest-red-dim text-white font-display text-xl tracking-widest px-7 py-4 rounded-xl transition-colors active:scale-95 sm:flex-shrink-0"
            >
              CALCULATE
            </button>
          </div>

          {/* Quick presets */}
          <div className="text-center mt-3 flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => { setPrice('7100'); setCalculated(true) }}
              className="font-mono text-xs text-protest-gold border border-protest-gold/30 bg-protest-gold/5 hover:bg-protest-gold/10 px-3 py-1.5 rounded-lg transition-colors"
            >
              Life Q30 — ₹7,100
            </button>
            <button
              onClick={() => { setPrice('3999'); setCalculated(true) }}
              className="font-mono text-xs text-protest-muted border border-protest-border hover:border-protest-muted px-3 py-1.5 rounded-lg transition-colors"
            >
              Try ₹3,999
            </button>
          </div>
        </motion.div>

        {/* Results */}
        <AnimatePresence>
          {calculated && num > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10"
            >
              {/* Soundcore's share */}
              <div className="relative bg-protest-gold-dark border border-protest-gold/30 rounded-2xl p-7 overflow-hidden">
                <div className="absolute top-4 right-4 bg-protest-gold text-black text-[10px] font-mono px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Soundcore Pays
                </div>
                <p className="font-mono text-protest-muted text-xs mb-3">Their "generous" contribution:</p>
                <div className="font-display text-6xl text-protest-gold mb-4">
                  ₹{soundcoreShare.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1 bg-protest-bg-el rounded-full h-2">
                    <motion.div
                      className="h-full rounded-full bg-protest-gold"
                      initial={{ width: 0 }}
                      animate={{ width: '15%' }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                  <span className="font-display text-protest-gold text-lg">15%</span>
                </div>
                <p className="font-mono text-xs text-protest-muted italic leading-relaxed">
                  "For a product that cracked by itself — quite generous, no?"
                </p>
              </div>

              {/* Your penalty */}
              <div className="relative bg-protest-red-dark border border-protest-red/30 rounded-2xl p-7 overflow-hidden">
                <div className="absolute top-4 right-4 bg-protest-red text-white text-[10px] font-mono px-2.5 py-1 rounded-full uppercase tracking-wider">
                  You Pay
                </div>
                <p className="font-mono text-protest-muted text-xs mb-3">Your penalty for loyalty:</p>
                <div className="font-display text-6xl text-protest-red mb-4">
                  ₹{yourPenalty.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1 bg-protest-bg-el rounded-full h-2">
                    <motion.div
                      className="h-full rounded-full bg-protest-red"
                      initial={{ width: 0 }}
                      animate={{ width: '85%' }}
                      transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
                    />
                  </div>
                  <span className="font-display text-protest-red text-lg">85%</span>
                </div>
                <p className="font-mono text-xs text-protest-muted italic leading-relaxed">
                  "For a defect that wasn't your fault. Perfectly reasonable."
                </p>
              </div>
              {/* Verdict row */}
              <div className="md:col-span-2 bg-protest-bg-el border border-protest-border rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="font-sans text-protest-text text-sm font-semibold mb-1">
                    For a <span className="text-protest-red">known manufacturing defect</span>, Soundcore's solution asks you to fund{' '}
                    <span className="text-protest-red font-bold">85%</span> of the replacement.
                  </p>
                  <p className="font-mono text-protest-muted text-xs italic">Is this a solution — or a sales pitch?</p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <div className="w-[3px] h-8 rounded bg-protest-gold" title="Soundcore: 15%" />
                  <div className="w-[17px] h-8 rounded bg-protest-red" title="You: 85%" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Thank You Anker */}
        <AnimatePresence>
          {calculated && num > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center relative"
            >
              <div className="relative inline-block">
                <button
                  onClick={thankYou}
                  className="bg-protest-gold/10 border border-protest-gold/30 hover:bg-protest-gold/20 text-protest-gold font-display text-2xl tracking-widest px-10 py-4 rounded-xl transition-all duration-200 hover:scale-[1.03] active:scale-95"
                >
                  THANK YOU, ANKER! 🙏
                </button>

                <AnimatePresence>
                  {showThankYou && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.85 }}
                      animate={{ opacity: 1, y: -64, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute left-1/2 -translate-x-1/2 top-0 w-max max-w-[90vw] bg-protest-bg-el border border-protest-border px-4 py-3 rounded-2xl font-mono text-xs sm:text-sm text-protest-text shadow-2xl z-10 text-center"
                    >
                      "We appreciate your loyalty! Now please pay 85% for our mistake." 💀
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <p className="font-mono text-xs text-protest-muted mt-4">
                // This button does nothing to fix the crack. Much like the actual offer.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
