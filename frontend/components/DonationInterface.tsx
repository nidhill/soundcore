'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Zap, IndianRupee, Loader2, AlertCircle, CheckCircle2, Mail, X, MessageSquare } from 'lucide-react'
import { load } from '@cashfreepayments/cashfree-js'
import { API_URL } from '@/lib/api'

/* ── Types ──────────────────────────────────────────────────────────────── */
interface Supporter {
  display_name: string
  amount:       number
  note:         string | null
  processed_at: string
}

/* ── Amount presets ─────────────────────────────────────────────────────── */
const PRESETS = [
  { label: '₹100',  value: 100  },
  { label: '₹250',  value: 250  },
  { label: '₹500',  value: 500  },
  { label: '₹1065', value: 1065, note: 'Cover their 15%' },
  { label: '₹1000', value: 1000 },
  { label: 'Custom', value: 0   },
]

/* ── Time helper ────────────────────────────────────────────────────────── */
function timeAgo(iso: string): string {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
  if (diff < 60)   return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

/* ── Success Modal ──────────────────────────────────────────────────────── */
function SuccessModal({ name, amount, email, onClose }: {
  name: string; amount: number; email: string; onClose: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: 'rgba(6,6,8,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        onClick={e => e.stopPropagation()}
        className="bg-protest-bg-el border border-protest-border rounded-2xl p-8 max-w-md w-full text-center relative overflow-hidden"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(16,185,129,0.12) 0%, transparent 65%)' }}
        />
        <button onClick={onClose} className="absolute top-4 right-4 text-protest-muted hover:text-protest-text transition-colors">
          <X className="w-4 h-4" />
        </button>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 18 }}
          className="w-16 h-16 rounded-full bg-emerald-900/40 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle2 className="w-8 h-8 text-emerald-400" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <h3 className="font-display text-4xl text-protest-text mb-2 tracking-wider">PAYMENT VERIFIED</h3>
          <div className="font-display text-3xl text-emerald-400 mb-5">
            ₹{amount.toLocaleString('en-IN')}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <p className="font-sans text-protest-dim text-sm leading-relaxed mb-5">
            Thank you, <span className="text-protest-text font-semibold">{name}</span>.
            Your support speaks louder than Soundcore's 15% insult ever could.
          </p>
          <div className="flex items-center justify-center gap-2 bg-protest-bg border border-protest-border rounded-xl px-4 py-3 mb-6">
            <Mail className="w-4 h-4 text-protest-gold flex-shrink-0" />
            <p className="font-mono text-xs text-protest-muted text-left">
              Receipt sent to <span className="text-protest-text">{email}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-full bg-emerald-700/20 hover:bg-emerald-700/30 border border-emerald-500/30 text-emerald-300 font-display text-xl tracking-widest py-3 rounded-xl transition-all"
          >
            CLOSE
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

/* ── Supporter Card ─────────────────────────────────────────────────────── */
function SupporterCard({ s, index }: { s: Supporter; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex items-start gap-3 bg-protest-bg/60 border border-protest-border/50 rounded-xl p-3.5"
    >
      <div className="w-8 h-8 rounded-full bg-emerald-900/40 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
        <span className="font-display text-xs text-emerald-400">
          {s.display_name.charAt(0).toUpperCase()}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-0.5">
          <span className="font-mono text-xs text-protest-text font-bold truncate">{s.display_name}</span>
          <span className="font-display text-sm text-protest-gold flex-shrink-0">
            ₹{s.amount.toLocaleString('en-IN')}
          </span>
        </div>
        {s.note && (
          <p className="font-mono text-[10px] text-protest-dim leading-snug mb-0.5 italic">
            "{s.note}"
          </p>
        )}
        <span className="font-mono text-[10px] text-protest-muted/50">{timeAgo(s.processed_at)}</span>
      </div>
    </motion.div>
  )
}

/* ── Component ──────────────────────────────────────────────────────────── */
export function DonationInterface() {
  /* ── Form state ───────────────────────────────────────────── */
  const [selectedPreset, setSelectedPreset] = useState(1065)
  const [customAmount,   setCustomAmount]   = useState('')
  const [isCustom,       setIsCustom]       = useState(false)
  const [name,           setName]           = useState('')
  const [email,          setEmail]          = useState('')
  const [phone,          setPhone]          = useState('')
  const [note,           setNote]           = useState('')

  /* ── Flow state ───────────────────────────────────────────── */
  const [loading,      setLoading]      = useState(false)
  const [verifying,    setVerifying]    = useState(false)
  const [error,        setError]        = useState('')
  const [showSuccess,  setShowSuccess]  = useState(false)
  const [successData,  setSuccessData]  = useState({ name: '', email: '', amount: 0 })

  /* ── Supporters feed ──────────────────────────────────────── */
  const [supporters, setSupporters] = useState<Supporter[]>([])

  const fetchSupporters = useCallback(async () => {
    try {
      const r = await fetch(`${API_URL}/api/supporters`)
      if (r.ok) setSupporters(await r.json())
    } catch { /* silent */ }
  }, [])

  useEffect(() => { fetchSupporters() }, [fetchSupporters])

  const finalAmount = isCustom ? (parseFloat(customAmount) || 0) : selectedPreset

  const handlePay = async () => {
    setError('')
    if (finalAmount < 1)                        { setError('Enter a valid amount.'); return }
    if (!name.trim())                           { setError('Please enter your name.'); return }
    if (!email.trim())                          { setError('Please enter your email.'); return }
    if (!/^\d{10}$/.test(phone.trim()))         { setError('Enter a valid 10-digit mobile number.'); return }

    setLoading(true)
    try {
      const res  = await fetch(`${API_URL}/api/donate`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ amount: finalAmount, name, email, phone }),
      })
      const data = await res.json() as { payment_session_id?: string; order_id?: string; error?: string }
      if (!res.ok || !data.payment_session_id) {
        setError(data.error || 'Could not initiate payment.')
        return
      }

      const orderId  = data.order_id!
      const cashfree = await load({ mode: 'production' })

      // Ignore client-side result — UPI/Net Banking return { redirect: true }
      // before the payment is actually completed. Server is the source of truth.
      await cashfree.checkout({
        paymentSessionId: data.payment_session_id,
        redirectTarget:   '_modal',
      })

      setLoading(false)
      setVerifying(true)

      // Wait 2s for Cashfree to process the payment on their end
      await new Promise(r => setTimeout(r, 2000))

      // Retry up to 3 times with 2s gap (handles slow UPI processing)
      let verifyData: { success?: boolean; error?: string } = {}
      for (let attempt = 1; attempt <= 3; attempt++) {
        const verifyRes = await fetch(`${API_URL}/api/verify-payment`, {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({ order_id: orderId, name, email, amount: finalAmount, note: note.trim() || null }),
        })
        verifyData = await verifyRes.json() as { success?: boolean; error?: string }
        if (verifyData.success) break
        if (attempt < 3) await new Promise(r => setTimeout(r, 2000))
      }

      if (!verifyData.success) {
        setError(verifyData.error || 'Payment incomplete or verification failed. No funds were deducted.')
        return
      }

      setSuccessData({ name: name.trim(), email: email.trim(), amount: finalAmount })
      setShowSuccess(true)
      fetchSupporters()
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
      setVerifying(false)
    }
  }

  const isBusy = loading || verifying

  return (
    <>
      <AnimatePresence>
        {showSuccess && (
          <SuccessModal
            name={successData.name}
            email={successData.email}
            amount={successData.amount}
            onClose={() => setShowSuccess(false)}
          />
        )}
      </AnimatePresence>

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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

            {/* ── Left: Form ─────────────────────────────────────── */}
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
                          if (p.value === 0) { setIsCustom(true) }
                          else { setIsCustom(false); setSelectedPreset(p.value) }
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
                <AnimatePresence>
                  {isCustom && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 overflow-hidden"
                    >
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-protest-muted">₹</span>
                        <input
                          type="number" min="1" value={customAmount}
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
                  type="text" value={name} onChange={e => setName(e.target.value)}
                  placeholder="Full Name" maxLength={100}
                  className="w-full bg-protest-bg border border-protest-border rounded-xl px-4 py-3 font-sans text-protest-text text-sm focus:outline-none focus:border-protest-gold transition-colors placeholder:text-protest-muted/40"
                />
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full bg-protest-bg border border-protest-border rounded-xl px-4 py-3 font-sans text-protest-text text-sm focus:outline-none focus:border-protest-gold transition-colors placeholder:text-protest-muted/40"
                />
                <input
                  type="tel" value={phone}
                  onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="10-digit Mobile Number"
                  className="w-full bg-protest-bg border border-protest-border rounded-xl px-4 py-3 font-sans text-protest-text text-sm focus:outline-none focus:border-protest-gold transition-colors placeholder:text-protest-muted/40"
                />
              </div>

              {/* Optional note */}
              <div>
                <label className="font-mono text-[10px] text-protest-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <MessageSquare className="w-3 h-3" />
                  Leave a Note
                  <span className="text-protest-muted/40 normal-case tracking-normal">— optional</span>
                </label>
                <textarea
                  value={note}
                  onChange={e => setNote(e.target.value.slice(0, 140))}
                  placeholder="Say something to Soundcore, or to fellow supporters..."
                  rows={3}
                  className="w-full bg-protest-bg border border-protest-border rounded-xl px-4 py-3 font-mono text-protest-text text-sm focus:outline-none focus:border-protest-gold transition-colors placeholder:text-protest-muted/40 resize-none leading-relaxed"
                />
                <p className="font-mono text-[10px] text-protest-muted/40 text-right mt-1">
                  {note.length}/140
                </p>
              </div>

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-start gap-2 bg-protest-red/5 border border-protest-red/20 rounded-xl px-4 py-3"
                  >
                    <AlertCircle className="w-4 h-4 text-protest-red flex-shrink-0 mt-0.5" />
                    <p className="font-mono text-xs text-protest-red">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Pay button */}
              <button
                onClick={handlePay}
                disabled={isBusy || finalAmount < 1}
                className="w-full flex items-center justify-center gap-2 bg-protest-gold hover:bg-yellow-400 text-black font-display text-2xl tracking-widest py-4 rounded-xl transition-all duration-200 hover:shadow-[0_0_30px_rgba(245,197,24,0.4)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading   && <><Loader2 className="w-5 h-5 animate-spin" /> OPENING CHECKOUT...</>}
                {verifying && <><Loader2 className="w-5 h-5 animate-spin" /> VERIFYING PAYMENT...</>}
                {!isBusy   && <><IndianRupee className="w-5 h-5" /> CONTRIBUTE ₹{finalAmount > 0 ? finalAmount.toLocaleString('en-IN') : '—'}</>}
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

            {/* ── Right: Live Supporters ──────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <div className="bg-protest-bg-el border border-protest-border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-5">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-emerald-400"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="font-mono text-xs text-protest-muted uppercase tracking-wider">
                    Supporters
                  </span>
                  {supporters.length > 0 && (
                    <span className="ml-auto font-mono text-[10px] text-protest-muted/50">
                      {supporters.length} total
                    </span>
                  )}
                </div>

                {supporters.length === 0 ? (
                  <div className="text-center py-10">
                    <Heart className="w-8 h-8 text-protest-border mx-auto mb-3" />
                    <p className="font-mono text-xs text-protest-muted/50">
                      Be the first to contribute.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-[520px] overflow-y-auto pr-1 scrollbar-thin">
                    <AnimatePresence initial={false}>
                      {supporters.map((s, i) => (
                        <SupporterCard key={`${s.display_name}-${s.processed_at}`} s={s} index={i} />
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  )
}
