'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { Zap, Battery, TrendingUp, AlertTriangle, RefreshCw } from 'lucide-react'
import { API_URL } from '@/lib/api'

const TARGET      = 7100
const POLL_MS     = 10_000   // refresh every 10 s

interface Props {
  onGoalReached: (amount: number) => void
}

export function JusticeTracker({ onGoalReached }: Props) {
  const [amount,     setAmount]     = useState(0)
  const [lastSynced, setLastSynced] = useState<Date | null>(null)
  const [syncing,    setSyncing]    = useState(false)
  const prevAmount = useRef(0)

  const pct       = Math.min((amount / TARGET) * 100, 100)
  const remaining = Math.max(TARGET - amount, 0)

  const fetchCampaign = useCallback(async () => {
    setSyncing(true)
    try {
      const res  = await fetch(`${API_URL}/api/campaign`, { cache: 'no-store' })
      const data = await res.json()
      if (typeof data.current_amount === 'number') {
        const n = data.current_amount
        if (n !== prevAmount.current) {
          prevAmount.current = n
          setAmount(n)
          if (n >= TARGET) onGoalReached(n)
        }
        setLastSynced(new Date())
      }
    } catch (err) {
      console.error('[JusticeTracker]', err)
    } finally {
      setSyncing(false)
    }
  }, [onGoalReached])

  // Initial fetch + polling
  useEffect(() => {
    fetchCampaign()
    const id = setInterval(fetchCampaign, POLL_MS)
    return () => clearInterval(id)
  }, [fetchCampaign])

  // Human-readable "X s ago"
  const [ago, setAgo] = useState('')
  useEffect(() => {
    const tick = () => {
      if (!lastSynced) return
      const s = Math.round((Date.now() - lastSynced.getTime()) / 1000)
      setAgo(s < 5 ? 'just now' : `${s}s ago`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [lastSynced])

  return (
    <section
      id="tracker"
      className="py-28 px-4 bg-protest-bg-card relative overflow-hidden"
    >
      {/* Background lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, #FF1F1F 0, #FF1F1F 1px, transparent 1px, transparent 44px)',
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono text-protest-gold border border-protest-gold/30 bg-protest-gold/5 px-4 py-2 rounded-full mb-6 uppercase tracking-[0.18em]">
            <Zap className="w-3 h-3" />
            Community Justice Progress
          </div>
          <h2 className="font-display text-6xl md:text-8xl text-protest-text leading-none mb-4">
            CHARGING TO{' '}
            <span className="text-protest-gold">JUSTICE</span>
          </h2>
          <p className="font-mono text-protest-muted text-sm max-w-lg mx-auto leading-relaxed">
            // When this battery hits 100%, the site comes down.
            <br />
            // Every rupee is a vote against corporate indifference.
          </p>
        </motion.div>

        {/* ── Battery ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          {/* Body + terminal nub */}
          <div className="flex items-center gap-2">
            <div
              className="relative flex-1 h-24 rounded-2xl overflow-hidden border border-protest-border bg-protest-bg-el"
              style={{
                boxShadow:
                  pct > 0
                    ? '0 0 30px rgba(255,31,31,0.2), 0 0 70px rgba(255,31,31,0.08)'
                    : 'none',
              }}
            >
              {/* Fill */}
              <motion.div
                className="absolute top-0 left-0 h-full"
                style={{ background: 'linear-gradient(90deg, #FF1F1F 0%, #C41414 100%)' }}
                animate={{ width: `${pct}%` }}
                initial={{ width: 0 }}
                transition={{ duration: 1.8, ease: 'easeOut' }}
              />

              {/* Grid stripe */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(90deg, rgba(0,0,0,0.06) 0, rgba(0,0,0,0.06) 1px, transparent 1px, transparent 28px)',
                }}
              />

              {/* Centre label */}
              <div className="absolute inset-0 flex items-center justify-center gap-3">
                <span
                  className="font-display text-4xl text-white relative z-10"
                  style={{ textShadow: '0 2px 12px rgba(0,0,0,0.85)' }}
                >
                  {pct.toFixed(1)}% JUSTIFIED
                </span>
              </div>
            </div>

            {/* Nub */}
            <div className="w-5 h-14 rounded-r-xl border-2 border-protest-border bg-protest-bg-el flex items-center justify-center">
              {syncing && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <RefreshCw className="w-2.5 h-2.5 text-protest-gold" />
                </motion.div>
              )}
            </div>
          </div>

          {/* Amount row */}
          <div className="flex justify-between items-end mt-4 px-1">
            <div>
              <span className="font-display text-4xl text-protest-red">
                ₹{amount.toLocaleString('en-IN')}
              </span>
              <span className="font-mono text-protest-muted text-sm ml-2">raised</span>
            </div>
            <div className="flex items-center gap-4">
              {lastSynced && (
                <span className="font-mono text-protest-muted/50 text-xs hidden sm:block">
                  synced {ago}
                </span>
              )}
              <div className="text-right">
                <span className="font-mono text-protest-muted text-sm">Target: </span>
                <span className="font-display text-3xl text-protest-gold">
                  ₹{TARGET.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          {/* Segmented bar */}
          <div className="mt-4 relative h-1.5 bg-protest-bg-el rounded-full overflow-hidden">
            <motion.div
              className="absolute h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #FF1F1F, #F5C518)' }}
              animate={{ width: `${pct}%` }}
              initial={{ width: 0 }}
              transition={{ duration: 2, ease: 'easeOut' }}
            />
            {[25, 50, 75].map((m) => (
              <div
                key={m}
                className="absolute top-0 h-full w-px bg-protest-border/80"
                style={{ left: `${m}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-1.5 font-mono text-[10px] text-protest-muted">
            {[0, 25, 50, 75, 100].map((m) => (
              <span key={m}>₹{(TARGET * m) / 100}</span>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              label: 'Amount Raised',
              value: `₹${amount.toLocaleString('en-IN')}`,
              icon: TrendingUp,
              col: 'text-protest-red',
            },
            {
              label: 'Justice Remaining',
              value: `₹${remaining.toLocaleString('en-IN')}`,
              icon: Battery,
              col: 'text-protest-gold',
            },
            {
              label: "Soundcore's Offer",
              value: '₹1,065  (15%)',
              icon: AlertTriangle,
              col: 'text-protest-muted',
            },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-protest-bg-el border border-protest-border rounded-xl p-5 hover:border-protest-border/60 transition-colors"
            >
              <s.icon className={`w-5 h-5 mb-3 ${s.col}`} />
              <div className={`font-display text-2xl mb-1 ${s.col}`}>{s.value}</div>
              <div className="font-mono text-xs text-protest-muted uppercase tracking-wider">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
