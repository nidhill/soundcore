'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Zap, IndianRupee, Loader2, AlertCircle } from 'lucide-react'
import { load } from '@cashfreepayments/cashfree-js'
import { API_URL } from '@/lib/api'

/* ── Amount presets ─────────────────────────────────────────────────────── */
const PRESETS = [
  { label: '₹100',  value: 100  },
  { label: '₹250',  value: 250  },
  { label: '₹500',  value: 500  },
  { label: '₹1065', value: 1065, note: "Cover their 15%" },
  { label: '₹1000', value: 1000 },
  { label: 'Custom', value: 0   },
]


export function DonationInterface() {
  /* ── Form state ───────────────────────────────────────────── */
  const [selectedPreset, setSelectedPreset] = useState(1065)
  const [customAmount,   setCustomAmount]   = useState('')
  const [isCustom,       setIsCustom]       = useState(false)
  const [name,           setName]           = useState('')
  const [email,          setEmail]          = useState('')
  const [phone,          setPhone]          = useState('')
  const [loading,        setLoading]        = useState(false)
  const [error,          setError]          = useState('')

  const finalAmount = isCustom ? (parseFloat(customAmount) || 0) : selectedPreset

  const handlePay = async () => {
    setError('')
    if (finalAmount < 1) { setError('Enter a valid amount.'); return }
    if (!name.trim())    { setError('Please enter your name.'); return }
    if (!email.trim())   { setError('Please enter your email.'); return }
    if (!/^\d{10}$/.test(phone.trim())) { setError('Enter a valid 10-digit mobile number.'); return }

    setLoading(true)
    try {
      /* Step 1 — create order on server */
      const res  = await fetch(`${API_URL}/api/donate`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ amount: finalAmount, name, email, phone }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Could not initiate payment.'); return }

      /* Step 2 — load Cashfree SDK and open checkout */
      const cashfree = await load({ mode: 'production' })
      cashfree.checkout({
        paymentSessionId: data.payment_session_id,
        redirectTarget:   '_modal',
      })
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="donate" className="py-28 px-4 bg-protest-bg-card relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono text-protest-gold border border-protest-gold/30 bg-protest-gold/5 px-4 py-2 rounded-full mb-6 uppercase tracking-[0.18em]">
            <Heart className="w-3 h-3" />
            Community Support
          </div>
          <h2 className="font-display text-6xl md:text-8xl text-protest-text leading-none mb-4">
            FUND THE <span className="text-protest-gold">JUSTICE</span>
          </h2>
          <p className="font-mono text-protest-muted text-sm max-w-xl mx-auto leading-relaxed">
            // Help recover ₹7,100 — the cost Soundcore refused to cover for their own defect.
            <br />
            // Goal met → site goes offline. Simple accountability.
          </p>
        </motion.div>

        <div className="max-w-xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-protest-bg-el border border-protest-border rounded-2xl p-6 sm:p-8 space-y-6"
          >
            <div>
              <h3 className="font-display text-3xl text-protest-text mb-1">
                CONTRIBUTE <span className="text-protest-gold">NOW</span>
              </h3>
              <p className="font-mono text-xs text-protest-muted">
                Secure payment via Cashfree · UPI, Cards, Net Banking
              </p>
            </div>

            {/* Amount presets */}
            <div>
              <label className="font-mono text-[10px] text-protest-muted uppercase tracking-wider mb-2 block">
                Choose Amount
              </label>
              <div className="grid grid-cols-3 gap-2">
                {PRESETS.map((p) => {
                  const active = p.value === 0
                    ? isCustom
                    : !isCustom && selectedPreset === p.value
                  return (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => {
                        if (p.value === 0) {
                          setIsCustom(true)
                        } else {
                          setIsCustom(false)
                          setSelectedPreset(p.value)
                        }
                      }}
                      className={`relative rounded-xl py-3 px-2 text-center transition-all border ${
                        active
                          ? 'bg-protest-gold/10 border-protest-gold text-protest-gold'
                          : 'bg-protest-bg border-protest-border text-protest-muted hover:border-protest-gold/40 hover:text-protest-text'
                      }`}
                    >
                      <span className="font-display text-lg block">{p.label}</span>
                      {p.note && (
                        <span className="font-mono text-[9px] text-protest-gold/70 block leading-tight mt-0.5">
                          {p.note}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Custom amount input */}
              <AnimatePresence>
                {isCustom && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 overflow-hidden"
                  >
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-protest-muted">
                        ₹
                      </span>
                      <input
                        type="number"
                        min="1"
                        value={customAmount}
                        onChange={e => setCustomAmount(e.target.value)}
                        placeholder="Enter amount"
                        className="w-full bg-protest-bg border border-protest-border rounded-xl pl-8 pr-4 py-3 font-mono text-protest-text text-sm focus:outline-none focus:border-protest-gold transition-colors placeholder:text-protest-muted/40"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Donor details */}
            <div className="space-y-3">
              <label className="font-mono text-[10px] text-protest-muted uppercase tracking-wider block">
                Your Details
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Full Name"
                maxLength={100}
                className="w-full bg-protest-bg border border-protest-border rounded-xl px-4 py-3 font-sans text-protest-text text-sm focus:outline-none focus:border-protest-gold transition-colors placeholder:text-protest-muted/40"
              />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full bg-protest-bg border border-protest-border rounded-xl px-4 py-3 font-sans text-protest-text text-sm focus:outline-none focus:border-protest-gold transition-colors placeholder:text-protest-muted/40"
              />
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="10-digit Mobile Number"
                className="w-full bg-protest-bg border border-protest-border rounded-xl px-4 py-3 font-sans text-protest-text text-sm focus:outline-none focus:border-protest-gold transition-colors placeholder:text-protest-muted/40"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-2 bg-protest-red/5 border border-protest-red/20 rounded-xl px-4 py-3">
                <AlertCircle className="w-4 h-4 text-protest-red flex-shrink-0 mt-0.5" />
                <p className="font-mono text-xs text-protest-red">{error}</p>
              </div>
            )}

            {/* Pay button */}
            <button
              onClick={handlePay}
              disabled={loading || finalAmount < 1}
              className="w-full flex items-center justify-center gap-2 bg-protest-gold hover:bg-yellow-400 text-black font-display text-2xl tracking-widest py-4 rounded-xl transition-all duration-200 hover:shadow-[0_0_30px_rgba(245,197,24,0.4)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> OPENING CHECKOUT...</>
              ) : (
                <>
                  <IndianRupee className="w-5 h-5" />
                  CONTRIBUTE ₹{finalAmount > 0 ? finalAmount.toLocaleString('en-IN') : '—'}
                </>
              )}
            </button>

            <p className="font-mono text-[10px] text-protest-muted text-center leading-relaxed">
              Secured by Cashfree Payments · UPI · Debit/Credit Cards · Net Banking
            </p>

            {/* What happens at ₹7,100 */}
            <div className="bg-protest-red-dark/40 border border-protest-red/20 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-protest-red" />
                <span className="font-mono text-xs text-protest-red uppercase tracking-wider">What happens at ₹7,100?</span>
              </div>
              <ul className="font-mono text-xs text-protest-muted space-y-1 leading-relaxed">
                <li>→ Community goal met: site goes offline within 24h</li>
                <li>→ Soundcore resolves directly: site goes offline immediately</li>
                <li>→ Neither happens: site stays up. Indefinitely.</li>
                <li className="text-protest-muted/50 pt-1">// The choice was always theirs.</li>
              </ul>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
