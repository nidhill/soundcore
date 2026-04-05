'use client'

import { motion } from 'framer-motion'
import { Mail, ArrowDown, User, Building2 } from 'lucide-react'

/* ── Thread data ───────────────────────────────────────────────────────── */
const thread = [
  {
    step: '01',
    date: 'Day 1',
    direction: 'sent' as const,
    from: 'Muhammad Nidhil',
    fromRole: 'Junior Software Developer & Loyal Customer',
    to: 'Soundcore Customer Support',
    subject: 'Structural Failure — Soundcore Life Q30 Headband',
    body: 'Reported structural failure on my Life Q30. Mentioned I am a loyal user (I also own a Boom 2) and a software developer. Requested a fair resolution for a documented manufacturing defect.',
    tag: 'INITIAL REPORT',
    tagBg: 'bg-blue-900/40',
    tagText: 'text-blue-400',
    tagBorder: 'border-blue-500/30',
    accentColor: '#3B82F6',
    avatar: 'N',
    avatarBg: 'bg-blue-900/60 border border-blue-700/50',
    avatarText: 'text-blue-300',
    Icon: User,
    highlights: [],
  },
  {
    step: '02',
    date: 'Day 3',
    direction: 'received' as const,
    from: 'Rian',
    fromRole: 'Soundcore Customer Support Representative',
    to: 'Muhammad Nidhil',
    subject: 'Re: Structural Failure — Final Resolution',
    body: 'Since you do not have the invoice, we cannot offer a replacement. However, we can offer a 10% refund toward the purchase of a brand-new replacement of the exact same model (Soundcore Life Q30). The item is temporarily unavailable — please wait until it is back in stock to place the new order through our official AnkerDirect India store on Amazon.',
    tag: 'FINAL OFFER',
    tagBg: 'bg-protest-gold-dark',
    tagText: 'text-protest-gold',
    tagBorder: 'border-protest-gold/30',
    accentColor: '#F5C518',
    avatar: 'S',
    avatarBg: 'bg-protest-gold-dark border border-protest-gold/30',
    avatarText: 'text-protest-gold',
    Icon: Building2,
    highlights: ['10% refund', 'we cannot offer a replacement'],
  },
  {
    step: '03',
    date: 'Day 4',
    direction: 'sent' as const,
    from: 'Muhammad Nidhil',
    fromRole: 'Junior Software Developer & Loyal Customer',
    to: 'Soundcore Customer Support',
    subject: 'Re: Rejecting the Offer — Taking This Public',
    body: 'Rejected the 10% offer as insulting. Stated that asking a customer to pay 90% of the cost for a documented design flaw is poor ethics. Announced that this ordeal will be taken public via social media and a dedicated protest website.',
    tag: 'ESCALATED',
    tagBg: 'bg-protest-red-dark',
    tagText: 'text-protest-red',
    tagBorder: 'border-protest-red/30',
    accentColor: '#FF1F1F',
    avatar: 'N',
    avatarBg: 'bg-protest-red-dark border border-protest-red/30',
    avatarText: 'text-protest-red',
    Icon: User,
    highlights: [],
  },
]

/* ── Highlight renderer ────────────────────────────────────────────────── */
function HighlightedText({
  text,
  highlights,
}: {
  text: string
  highlights: string[]
}) {
  if (!highlights.length) return <>{text}</>

  // Build a regex that matches any of the highlight phrases
  const pattern = new RegExp(`(${highlights.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi')
  const parts = text.split(pattern)

  return (
    <>
      {parts.map((part, i) => {
        const isHighlight = highlights.some(
          (h) => h.toLowerCase() === part.toLowerCase(),
        )
        if (!isHighlight) return <span key={i}>{part}</span>

        const isNegative = part.toLowerCase().includes('cannot')
        return (
          <mark
            key={i}
            className={`rounded px-1 font-bold ${
              isNegative
                ? 'bg-protest-red/20 text-protest-red not-italic'
                : 'bg-protest-gold/20 text-protest-gold not-italic'
            }`}
            style={{ fontStyle: 'inherit' }}
          >
            {part}
          </mark>
        )
      })}
    </>
  )
}

/* ── Component ─────────────────────────────────────────────────────────── */
export function EmailThread() {
  return (
    <section id="emails" className="py-28 px-4 bg-protest-bg-card relative overflow-hidden">
      {/* Subtle diagonal grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 1px, transparent 50%)',
          backgroundSize: '30px 30px',
        }}
      />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono text-protest-red border border-protest-red/30 bg-protest-red/5 px-4 py-2 rounded-full mb-6 uppercase tracking-[0.18em]">
            <Mail className="w-3 h-3" />
            Critical Evidence
          </div>
          <h2 className="font-display text-6xl md:text-8xl text-protest-text leading-none mb-4">
            THE EMAIL <span className="text-protest-red">AUDIT</span>
          </h2>
          <p className="font-sans text-protest-dim text-base max-w-lg mx-auto leading-relaxed">
            Three emails. One structural flaw. A 10% offer that started this page.
          </p>
          <p className="font-mono text-protest-muted/50 text-xs mt-3">
            Summaries based on actual support communications with Soundcore.
          </p>
        </motion.div>

        {/* Thread */}
        <div className="relative">
          {/* Connector line */}
          <div className="absolute left-[1.85rem] top-8 bottom-8 w-px bg-protest-border hidden sm:block" />

          <div className="space-y-0">
            {thread.map((email, i) => (
              <div key={email.step}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="relative"
                >
                  {/* Step dot on line */}
                  <div
                    className="absolute left-0 top-7 w-[3.7rem] hidden sm:flex items-center justify-center"
                  >
                    <div
                      className="w-5 h-5 rounded-full border-2 bg-protest-bg-card flex items-center justify-center z-10"
                      style={{ borderColor: email.accentColor }}
                    >
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: email.accentColor }}
                      />
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    className="sm:ml-16 bg-protest-bg-el rounded-2xl overflow-hidden border border-protest-border"
                    style={{ borderLeftColor: email.accentColor, borderLeftWidth: 3 }}
                  >
                    {/* Card header */}
                    <div className="flex items-start justify-between px-4 sm:px-5 py-4 border-b border-protest-border gap-2">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        {/* Avatar */}
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 font-display text-lg ${email.avatarBg} ${email.avatarText}`}
                        >
                          {email.avatar}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-sans font-semibold text-protest-text text-sm leading-tight">
                              {email.from}
                            </span>
                            <span className="font-mono text-protest-muted text-xs">
                              {email.direction === 'sent' ? '→' : '←'}
                            </span>
                            <span className="font-mono text-protest-muted text-xs leading-tight line-clamp-1">{email.to}</span>
                          </div>
                          <p className="font-mono text-protest-muted text-[10px] mt-0.5 line-clamp-1">
                            {email.fromRole}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                        <span
                          className={`${email.tagBg} ${email.tagText} border ${email.tagBorder} font-mono text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap`}
                        >
                          {email.tag}
                        </span>
                        <span className="font-mono text-[10px] text-protest-muted">
                          {email.date}
                        </span>
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="px-4 sm:px-5 py-3 border-b border-protest-border/50 bg-protest-bg/30">
                      <p className="font-sans text-protest-text text-sm font-medium leading-snug">
                        {email.subject}
                      </p>
                    </div>

                    {/* Body */}
                    <div className="px-4 sm:px-5 py-4 sm:py-5">
                      <p className="font-sans text-protest-dim text-sm leading-relaxed">
                        <HighlightedText text={email.body} highlights={email.highlights} />
                      </p>

                      {/* Special callout for email 2 */}
                      {email.step === '02' && (
                        <div className="mt-4 flex items-start gap-3 bg-protest-gold/5 border border-protest-gold/20 rounded-xl p-4">
                          <div className="w-1 self-stretch rounded-full bg-protest-gold flex-shrink-0" />
                          <div>
                            <p className="font-sans text-protest-gold text-xs font-semibold mb-1 uppercase tracking-wider">
                              Translation
                            </p>
                            <p className="font-mono text-protest-muted text-xs leading-relaxed">
                              "We acknowledge the defect. We know you have no invoice. Our resolution is a coupon that asks you to pay ₹6,390 of the ₹7,100 replacement cost yourself."
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Arrow between emails */}
                {i < thread.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex justify-center sm:justify-start sm:pl-[4.5rem] py-3"
                  >
                    <ArrowDown className="w-4 h-4 text-protest-border" />
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Verdict banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 bg-protest-bg-el border border-protest-red/20 rounded-2xl p-6 text-center"
        >
          <p className="font-sans text-protest-text text-base leading-relaxed mb-2">
            A documented design defect. No invoice because it was a{' '}
            <span className="text-protest-gold font-semibold">gift</span>.
            Resolution offered:{' '}
            <span className="text-protest-red font-semibold">10% off a new purchase.</span>
          </p>
          <p className="font-sans text-protest-muted text-sm">
            This page is the counter-offer.
          </p>
        </motion.div>

        {/* Raw logs link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-5 text-center"
        >
          <a
            href="#"   // ← replace with PDF/Google Drive link before deploying
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-protest-muted hover:text-protest-text underline underline-offset-4 decoration-protest-border hover:decoration-protest-muted transition-colors"
          >
            <Mail className="w-3 h-3 flex-shrink-0" />
            View Full Unedited Email Thread (Raw Logs)
          </a>
        </motion.div>
      </div>
    </section>
  )
}
