'use client'

import { motion } from 'framer-motion'
import { Zap, AlertTriangle, TrendingUp, Code2, Globe, ChevronRight } from 'lucide-react'

const chapters = [
  {
    n: '01',
    label: 'The Loyalty',
    icon: Zap,
    accent: '#F5C518',
    heading: 'A developer. A pair of headphones. A year of trust.',
    body: [
      'I used my Soundcore Life Q30 for over a year. As a developer, I spent countless hours with these headphones on — building products, writing code, debugging at 2am. I loved the sound and I took great care of them.',
      "They weren't just headphones. They were part of my daily workflow. I was already a loyal Anker customer. This was supposed to be a safe bet.",
    ],
  },
  {
    n: '02',
    label: 'The Snap',
    icon: AlertTriangle,
    accent: '#FF1F1F',
    heading: 'No drops. No accidents. Just a crack.',
    body: [
      'One afternoon, during normal use, I heard a sickening snap. The headband had fractured right at the left hinge joint — a clean, structural break with zero impact involved.',
      'A quick search confirmed I was far from alone. Thousands of Q30 and Q35 users worldwide had posted photos of the exact same crack at the exact same spot. This wasn\'t bad luck. It was a documented design flaw — and Soundcore knew.',
    ],
  },
  {
    n: '03',
    label: 'The Bargain',
    icon: TrendingUp,
    accent: '#FF1F1F',
    heading: "10%… then 15%. That's not a fix. That's a sales pitch.",
    body: [
      'I contacted Soundcore Support with photos and a clear description. Because the headphones were a birthday gift originally purchased in Saudi Arabia, my claim was dismissed immediately — "Out of Warranty. Region Locked."',
      'Then came the bargaining:',
    ],
    list: [
      'First offer: a 10% discount code to buy a new pair.',
      'I refused, and told them I would take this to social media.',
      'Second offer: they "upgraded" it to 15%.',
    ],
    footnote:
      'I realized they weren\'t trying to fix the problem. They were trying to sell me the same flawed design again — and asking me to pay ₹6,035 of the bill for a defect I didn\'t create.',
  },
  {
    n: '04',
    label: 'The Build',
    icon: Code2,
    accent: '#A0A0A8',
    heading: "When emails stop working, developers build things.",
    body: [
      'I stopped sending emails. I opened my code editor instead.',
      "If Soundcore wouldn't listen to one customer, maybe they'd listen to the documented evidence of thousands. I spent my weekend building soundcore.social — not a complaint thread, but a structured global database: every cracked unit, every rejected claim, every insulting discount offer, all in one place.",
    ],
    quote:
      "I'm a developer. When my code has a bug, I fix it. I don't charge my users to see the same bug again. It's time Soundcore does the same.",
  },
  {
    n: '05',
    label: 'The Impact',
    icon: Globe,
    accent: '#22c55e',
    heading: 'The community showed up — fast.',
    body: [
      'Within 4 hours of a soft launch on Reddit, the post became the #1 Trending post on r/soundcore with over 1,700 global views — 25% from the United States alone.',
      'Real users are now uploading photos of their broken units. The evidence is growing. This is no longer one developer\'s complaint. This is a global record that cannot be quietly dismissed.',
    ],
    stats: [
      { value: '1.7k+', label: 'Global views in 4 hours' },
      { value: '#1', label: 'Trending on r/soundcore' },
      { value: '25%', label: 'Traffic from the USA' },
    ],
  },
]

export function AboutSection() {
  return (
    <section id="about" className="py-28 px-4 bg-protest-bg-card relative overflow-hidden">
      {/* subtle diagonal grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(-45deg, #FF1F1F 0, #FF1F1F 1px, transparent 0, transparent 50%)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono text-protest-red border border-protest-red/30 bg-protest-red/5 px-4 py-2 rounded-full mb-6 uppercase tracking-[0.18em]">
            <AlertTriangle className="w-3 h-3" />
            About The Protest
          </div>
          <h2 className="font-display text-6xl md:text-8xl text-protest-text leading-none mb-5">
            THE STORY <span className="text-protest-red">SO FAR</span>
          </h2>
          <p className="font-sans text-protest-dim text-base max-w-2xl leading-relaxed">
            A loyal customer. A cracked headband. A support team offering coupons instead of accountability.
            And one developer who decided to stop emailing and start building.
          </p>
        </motion.div>

        {/* chapters */}
        <div className="space-y-6">
          {chapters.map((ch, i) => (
            <motion.div
              key={ch.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-protest-bg-el border border-protest-border rounded-2xl overflow-hidden hover:border-protest-border/80 transition-colors"
              style={{ borderLeftColor: ch.accent + '60', borderLeftWidth: 3 }}
            >
              <div className="p-7">
                {/* chapter label */}
                <div className="flex items-center gap-3 mb-5">
                  <ch.icon className="w-4 h-4 flex-shrink-0" style={{ color: ch.accent }} />
                  <span className="font-mono text-[10px] text-protest-muted uppercase tracking-[0.2em]">
                    Chapter {ch.n}
                  </span>
                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.2em] px-2 py-0.5 rounded"
                    style={{ color: ch.accent, backgroundColor: ch.accent + '15' }}
                  >
                    {ch.label}
                  </span>
                </div>

                {/* heading */}
                <h3 className="font-display text-2xl md:text-3xl text-protest-text mb-5 leading-snug">
                  {ch.heading}
                </h3>

                {/* body */}
                <div className="space-y-3 mb-4">
                  {ch.body.map((p, j) => (
                    <p key={j} className="font-sans text-protest-dim text-sm leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>

                {/* optional list */}
                {ch.list && (
                  <ul className="space-y-2 mb-4 pl-1">
                    {ch.list.map((item, j) => (
                      <li key={j} className="flex items-start gap-2.5 font-mono text-xs text-protest-muted">
                        <ChevronRight className="w-3 h-3 text-protest-red flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {/* footnote */}
                {ch.footnote && (
                  <p className="font-mono text-xs text-protest-muted/70 leading-relaxed border-t border-protest-border pt-4">
                    {ch.footnote}
                  </p>
                )}

                {/* pull quote */}
                {ch.quote && (
                  <blockquote className="mt-5 border-l-2 border-protest-red pl-5 py-1">
                    <p className="font-display text-xl md:text-2xl text-protest-text leading-snug">
                      "{ch.quote}"
                    </p>
                    <cite className="font-mono text-[10px] text-protest-muted mt-2 block not-italic uppercase tracking-[0.15em]">
                      — Muhammad Nidhil, MERN Stack Developer
                    </cite>
                  </blockquote>
                )}

                {/* stats */}
                {ch.stats && (
                  <div className="mt-5 grid grid-cols-3 gap-3">
                    {ch.stats.map((s) => (
                      <div
                        key={s.label}
                        className="bg-protest-bg rounded-xl px-4 py-4 text-center border border-protest-border"
                      >
                        <p
                          className="font-display text-3xl leading-none mb-1"
                          style={{ color: ch.accent }}
                        >
                          {s.value}
                        </p>
                        <p className="font-mono text-[10px] text-protest-muted leading-tight">{s.label}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* mission statement + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 bg-protest-bg-el border border-protest-red/30 rounded-2xl p-8 text-center"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono text-protest-red border border-protest-red/30 bg-protest-red/5 px-4 py-2 rounded-full mb-6 uppercase tracking-[0.18em]">
            <Globe className="w-3 h-3" />
            The Mission
          </div>
          <h3 className="font-display text-4xl md:text-5xl text-protest-text leading-tight mb-5">
            THIS SITE STAYS LIVE UNTIL <span className="text-protest-red">SOUNDCORE ACTS.</span>
          </h3>
          <p className="font-sans text-protest-dim text-sm max-w-2xl mx-auto leading-relaxed mb-8">
            We are building a global, public database of every cracked Q30 and Q35 unit — every rejected
            warranty claim, every insulting discount offer — until the evidence is too large to ignore.
            This is not one customer's complaint. This is a movement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#community"
              className="inline-flex items-center justify-center gap-2 bg-protest-red hover:bg-protest-red-dim text-white font-display text-lg tracking-widest px-8 py-3.5 rounded-xl transition-colors"
            >
              LOG YOUR CASE
              <ChevronRight className="w-4 h-4" />
            </a>
            <a
              href="#emails"
              className="inline-flex items-center justify-center gap-2 border border-protest-border hover:border-protest-red text-protest-muted hover:text-protest-red font-display text-lg tracking-widest px-8 py-3.5 rounded-xl transition-colors"
            >
              READ THE EMAILS
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
