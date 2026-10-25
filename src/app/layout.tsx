import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google';

import Footer from '@/components/Footer';
import MotionProvider from '@/components/MotionProvider';
import Nav from '@/components/Nav';
import { site } from '@/lib/content';

import './globals.css';

const sans = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const mono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

const display = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-display',
});

const updated = new Date().toLocaleDateString('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.seo.url),
  title: {
    default: site.seo.title,
    template: `%s — ${site.name}`,
  },
  description: site.seo.description,
  authors: [{ name: site.name, url: site.github }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    title: site.seo.title,
    description: site.seo.description,
    url: site.seo.url,
    siteName: site.name,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: site.seo.title }],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.seo.title,
    description: site.seo.description,
    images: ['/og.png'],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fbfaf8' },
    { media: '(prefers-color-scheme: dark)', color: '#0c0d0e' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${display.variable}`}>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-chip focus:bg-accent focus:px-5 focus:py-3 focus:text-white"
        >
          Skip to content
        </a>
        <MotionProvider>
          <Nav name={site.name} />
          <main id="main">{children}</main>
          <Footer site={site} updated={updated} />
        </MotionProvider>
      </body>
    </html>
  );
}
