import { Zap, ExternalLink } from 'lucide-react'

const quickLinks = [
  { href: '#emails',     label: 'Email Audit' },
  { href: '#story',      label: 'The Story'   },
  { href: '#tracker',    label: 'Justice Tracker' },
  { href: '#calculator', label: 'Calculator'  },
  { href: '#evidence',   label: 'Evidence'    },
  { href: '#community',  label: 'Community'   },
  { href: '#donate',     label: 'Support'     },
]


export function Footer() {
  return (
    <footer className="border-t border-protest-border bg-protest-bg py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-protest-red" />
              <span className="font-display text-xl text-protest-text tracking-wider">
                Q30 <span className="text-protest-red">PROTEST</span>
              </span>
            </div>
            <p className="font-mono text-xs text-protest-muted leading-relaxed">
              A developer's response to a customer service failure.
              <br />
              Built with precision. Deployed with purpose.
              <br />
              <span className="text-protest-muted/50">
                Target: ₹7,100 — the cost of the headphone.
              </span>
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-mono text-[10px] text-protest-muted uppercase tracking-[0.2em] mb-4">
              Quick Links
            </h4>
            <div className="space-y-2">
              {quickLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="flex items-center gap-2 font-mono text-xs text-protest-muted hover:text-protest-text transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  {l.label}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Disclaimer */}
        <div className="border-t border-protest-border pt-8 space-y-3">
          <p className="font-mono text-[11px] text-protest-muted text-center leading-relaxed max-w-3xl mx-auto">
            <span className="text-protest-text font-bold">DISCLAIMER:</span>{' '}
            This is a personal satirical protest website. It is not affiliated with, endorsed by,
            or representative of Anker Innovations Ltd. or Soundcore. All brand names, product names,
            and trademarks are used solely for the purpose of consumer commentary and remain the
            intellectual property of their respective owners. All emails shown are based on actual
            support communications received by the author. This site constitutes protected
            expression under applicable fair use and free speech provisions.
          </p>
          <p className="font-mono text-[10px] text-protest-muted/40 text-center">
            Made by Muhammad Nidhil — a junior developer who just wanted his headphones to work. ©{' '}
            {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  )
}
