'use client'

import { motion } from 'framer-motion'
import { FileX, HelpCircle, AlertTriangle } from 'lucide-react'

const terminal = [
  { t: '$',  line: 'customer.contact({ issue: "headband_cracked" })' },
  { t: '→',  line: 'Ticket opened. Photos submitted. Issue documented.' },
  { t: '$',  line: 'warranty.verify()' },
  { t: '!',  line: 'ERROR: invoice_not_found' },
  { t: '→',  line: 'REASON: product received as gift — no PDF exists' },
  { t: '?',  line: 'QUESTION: does a missing PDF change the headband\'s structural integrity?' },
  { t: '→',  line: 'ANSWER:   no.' },
  { t: '$',  line: 'resolution.compute()' },
  { t: '→',  line: 'OFFER: 10% discount on a new purchase' },
  { t: '→',  line: 'MATHS: customer pays ₹6,390 for a ₹7,100 design flaw' },
  { t: '!',  line: 'customer_satisfaction     = false' },
  { t: '!',  line: 'brand_loyalty             = undefined' },
  { t: '!',  line: 'design_accountability     = null' },
]

const faqs = [
  {
    q: 'What if the headphone was a birthday gift?',
    a: "Gifts don't come with invoices. Design defects shouldn't require one to be acknowledged.",
    icon: HelpCircle,
  },
  {
    q: 'Does a missing PDF change the physics of the crack?',
    a: 'No. The Q30 headband crack is a documented structural weakness — reported across forums, Reddit, and Amazon reviews. The receipt changes nothing about the metallurgy.',
    icon: AlertTriangle,
  },
  {
    q: "What does '10% off your next purchase' actually communicate?",
    a: "It says: \"We know it broke, we know it's a known issue, and we know you're stuck. Here's a coupon.\" That's not a resolution — that's a rebrand of the problem.",
    icon: FileX,
  },
]

export function InvoiceDialogue() {
  return (
    <section id="invoice" className="py-28 px-4 relative">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono text-protest-gold border border-protest-gold/30 bg-protest-gold/5 px-4 py-2 rounded-full mb-6 uppercase tracking-[0.18em]">
            <FileX className="w-3 h-3" />
            Case Study
          </div>
          <h2 className="font-display text-6xl md:text-8xl text-protest-text leading-none mb-4">
            THE INVISIBLE{' '}
            <span className="text-protest-gold">INVOICE</span>
          </h2>
          <p className="font-mono text-protest-muted text-sm max-w-lg mx-auto leading-relaxed">
            // A design defect does not disappear because a PDF is missing.
            <br />
            // Neither does the responsibility to fix it.
          </p>
        </motion.div>

        {/* Terminal log */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-protest-bg-el border border-protest-border rounded-2xl p-6 mb-10 font-mono text-xs overflow-x-auto"
        >
          {/* Window chrome */}
          <div className="flex items-center gap-2 mb-5 border-b border-protest-border pb-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-protest-red/60" />
              <div className="w-3 h-3 rounded-full bg-protest-gold/60" />
              <div className="w-3 h-3 rounded-full bg-green-800/60" />
            </div>
            <span className="text-protest-muted text-[10px] ml-2 tracking-wider">
              soundcore_support.log  —  bash
            </span>
          </div>

          <div className="space-y-1.5">
            {terminal.map((row, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.055 }}
                className="flex gap-4"
              >
                <span
                  className={
                    row.t === '$'
                      ? 'text-green-400 flex-shrink-0'
                      : row.t === '!'
                      ? 'text-protest-red flex-shrink-0'
                      : row.t === '?'
                      ? 'text-protest-gold flex-shrink-0'
                      : 'text-protest-muted flex-shrink-0'
                  }
                >
                  {row.t}
                </span>
                <span
                  className={
                    row.t === '!'
                      ? 'text-protest-red/80'
                      : row.t === '$'
                      ? 'text-protest-text'
                      : 'text-protest-muted'
                  }
                >
                  {row.line}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ items */}
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="border border-protest-border bg-protest-bg-el rounded-2xl p-6 hover:border-protest-red/25 transition-colors"
            >
              <div className="flex items-start gap-4">
                <faq.icon className="w-5 h-5 text-protest-red flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-display text-xl text-protest-text mb-2">{faq.q}</h3>
                  <p className="font-mono text-xs text-protest-muted leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
