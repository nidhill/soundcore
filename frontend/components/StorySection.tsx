'use client'

import { motion } from 'framer-motion'
import { ShoppingBag, Headphones, Phone, FileQuestion, DollarSign, Code2 } from 'lucide-react'

const steps = [
  {
    n: '01',
    title: 'The Gift',
    icon: ShoppingBag,
    color: '#F5C518',
    code: '// A gesture of love. A product you trusted.',
    terminal: [
      { t: '$', line: 'purchase.execute({ product: "Life Q30", intent: "gift" })' },
      { t: '→', line: 'Order confirmed. Delivered. Loved.' },
    ],
    note: 'The Soundcore Life Q30 — received as a gift. A brand you already trusted thanks to your Boom 2. Everything was fine.',
  },
  {
    n: '02',
    title: 'The Crack',
    icon: Headphones,
    color: '#FF1F1F',
    code: '// No drops. No abuse. Just: normal use.',
    terminal: [
      { t: '$', line: 'headband.status()' },
      { t: '!', line: 'ERROR: structural_failure at headband_joint' },
      { t: '!', line: 'NOTE: known manufacturing defect (see forums)' },
    ],
    note: 'The headband cracked at the left joint during normal use. A quick search confirms this is a widely-reported structural weakness in the Q30 — not an isolated incident.',
  },
  {
    n: '03',
    title: 'The Contact',
    icon: Phone,
    color: '#60A5FA',
    code: '// Polite. Patient. Hopeful.',
    terminal: [
      { t: '$', line: 'support.contact({ issue: "headband_cracked", tone: "polite" })' },
      { t: '→', line: 'Ticket opened: #Q30-CRACK-0001' },
      { t: '→', line: 'Photos submitted. Issue documented.' },
    ],
    note: 'Did everything right. Reached out with photos, a clear description, and a reasonable expectation: a brand that stands behind its products.',
  },
  {
    n: '04',
    title: 'The Invoice Request',
    icon: FileQuestion,
    color: '#F5C518',
    code: '// ERROR: invoice_not_found\n// REASON: gift purchase — no PDF exists',
    terminal: [
      { t: '$', line: 'warranty.verify()' },
      { t: '!', line: 'ERROR: missing_invoice.pdf' },
      { t: '?', line: 'QUESTION: does a PDF change the physics of the crack?' },
      { t: '→', line: 'ANSWER: no.' },
    ],
    note: 'Support asked for an invoice. It was a gift. No invoice exists. The headband cracked regardless. Both of these facts are true simultaneously. Only one was treated as a problem.',
  },
  {
    n: '05',
    title: 'The Generous Offer',
    icon: DollarSign,
    color: '#FF1F1F',
    code: '// 10% off a new purchase.\n// You pay ₹6,390 for their design flaw.',
    terminal: [
      { t: '$', line: 'resolution.compute()' },
      { t: '→', line: 'OFFER: 10% discount on a new purchase' },
      { t: '→', line: 'TRANSLATION: "Pay 90% for our mistake"' },
      { t: '!', line: 'customer_satisfaction = false' },
      { t: '!', line: 'brand_loyalty = undefined' },
    ],
    note: 'After all that, the resolution was a 10% discount coupon. Not a replacement. Not accountability. Ten percent. On a ₹7,100 product with a known structural defect.',
  },
  {
    n: '06',
    title: 'This Page',
    icon: Code2,
    color: '#A0A0A8',
    code: '// developer.frustration === Infinity\n// Action: build something.',
    terminal: [
      { t: '$', line: 'protest.init({ target: 7100, tone: "professional_yet_furious" })' },
      { t: '→', line: 'Site deployed. Justice pending.' },
      { t: '→', line: 'Awaiting: community || Soundcore response' },
    ],
    note: 'When customer support fails, developers build. This page is that build. Help recover ₹7,100 — or challenge Soundcore to do the right thing.',
  },
]

const terminalColor: Record<string, string> = {
  '$': 'text-green-400',
  '!': 'text-protest-red',
  '?': 'text-protest-gold',
}

export function StorySection() {
  return (
    <section id="story" className="py-28 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono text-protest-muted border border-protest-border px-4 py-2 rounded-full mb-6 uppercase tracking-[0.18em]">
            Case #Q30-CRACK-0001
          </div>
          <h2 className="font-display text-6xl md:text-8xl text-protest-text leading-none mb-4">
            HOW WE GOT <span className="text-protest-red">HERE</span>
          </h2>
          <p className="font-mono text-protest-muted text-sm">
            // Six steps from loyal customer to protest website.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-5 md:left-7 top-0 bottom-0 w-px bg-protest-border" />

          <div className="space-y-8">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="relative"
                style={{ paddingLeft: '4rem' }}
              >
                <div
                  className="absolute left-2 md:left-4 top-5 w-6 h-6 rounded-full border bg-protest-bg-el flex items-center justify-center z-10"
                  style={{ borderColor: s.color + '55' }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                </div>

                <div className="bg-protest-bg-el border border-protest-border rounded-2xl p-5 hover:border-protest-border/80 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <s.icon className="w-4 h-4 flex-shrink-0" style={{ color: s.color }} />
                    <span className="font-mono text-xs text-protest-muted">{s.n}</span>
                    <h3 className="font-display text-xl" style={{ color: s.color }}>{s.title}</h3>
                  </div>

                  <div className="bg-protest-bg rounded-lg px-4 py-3 mb-3 font-mono text-xs">
                    {s.code.split('\n').map((l, j) => (
                      <div key={j} className="text-protest-muted">{l}</div>
                    ))}
                  </div>

                  <div className="bg-black/40 border border-protest-border/50 rounded-lg px-4 py-3 mb-3 font-mono text-xs space-y-1">
                    {s.terminal.map((row, j) => (
                      <div key={j} className="flex gap-3">
                        <span className={`${terminalColor[row.t] ?? 'text-protest-muted'} flex-shrink-0`}>
                          {row.t}
                        </span>
                        <span className="text-protest-dim">{row.line}</span>
                      </div>
                    ))}
                  </div>

                  <p className="font-mono text-xs text-protest-muted leading-relaxed">{s.note}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
