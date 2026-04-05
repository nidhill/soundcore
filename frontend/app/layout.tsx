import type { Metadata } from 'next'
import { Bebas_Neue, Syne, Space_Mono } from 'next/font/google'
import Script from 'next/script'
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
const SITE_URL    = 'https://www.soundcore.social'
const OG_IMAGE_URL = `${SITE_URL}/og-image.jpg`

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Soundcore by Anker Life Q30 Review | The Headband Crack Issue',
  description:
    'Thinking of buying the Soundcore by Anker Life Q30? Read this first. A detailed look at the known headband structural defect and Anker customer support.',
  keywords: [
    'Soundcore by Anker Life Q30',
    'Life Q30 headband crack',
    'Soundcore warranty',
    'Anker support review',
  ],
  alternates: {
    canonical: SITE_URL,
  },

  /* ── OpenGraph ────────────────────────────────────────────────────────── */
  openGraph: {
    title: 'The Truth About Soundcore by Anker Life Q30',
    description:
      'Thinking of buying the Soundcore by Anker Life Q30? Read this first. A detailed look at the known headband structural defect and Anker customer support.',
    url: SITE_URL,
    siteName: 'soundcore.social',
    type: 'website',
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: 'Soundcore by Anker Life Q30 cracked headband defect',
      },
    ],
  },

  /* ── Twitter / X ──────────────────────────────────────────────────────── */
  twitter: {
    card: 'summary_large_image',
    title: 'The Truth About Soundcore by Anker Life Q30',
    description:
      'Thinking of buying the Soundcore by Anker Life Q30? Read this first. A detailed look at the known headband structural defect and Anker customer support.',
    images: [OG_IMAGE_URL],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${syne.variable} ${spaceMono.variable}`}
    >
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-26MSKKWDD9"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-26MSKKWDD9');
          `}
        </Script>
      </head>
      <body className="bg-protest-bg text-protest-text font-mono overflow-x-hidden antialiased">
        {children}
      </body>
    </html>
  )
}
