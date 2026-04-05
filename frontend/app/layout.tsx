import type { Metadata } from 'next'
import { Bebas_Neue, Syne, Space_Mono } from 'next/font/google'
import './globals.css'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
})

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono',
  display: 'swap',
})

/* ─────────────────────────────────────────────────────────────────────────
   OG image: drop a 1200×630 image at /public/og-image.png before deploying.
   Twitter / X card preview uses the same image.
───────────────────────────────────────────────────────────────────────── */
const SITE_URL    = 'https://soundcore-self.vercel.app'
const OG_IMAGE_URL = `${SITE_URL}/og-image.png`

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'The 10% Masterpiece | A Soundcore Protest',
  description:
    'When customer service fails, developers build. See how a global brand rewards loyalty with a 10% discount on a defective design.',

  /* ── OpenGraph ────────────────────────────────────────────────────────── */
  openGraph: {
    title: 'The 10% Masterpiece | A Soundcore Protest',
    description:
      'When customer service fails, developers build. See how a global brand rewards loyalty with a 10% discount on a defective design.',
    type: 'website',
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: 'The 10% Masterpiece — A Soundcore Protest Site',
      },
    ],
  },

  /* ── Twitter / X ──────────────────────────────────────────────────────── */
  twitter: {
    card: 'summary_large_image',
    title: 'The 10% Masterpiece | A Soundcore Protest',
    description:
      'When customer service fails, developers build. See how a global brand rewards loyalty with a 10% discount on a defective design.',
    images: [OG_IMAGE_URL],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${syne.variable} ${spaceMono.variable}`}
    >
      <body className="bg-protest-bg text-protest-text font-mono overflow-x-hidden antialiased">
        {children}
      </body>
    </html>
  )
}
