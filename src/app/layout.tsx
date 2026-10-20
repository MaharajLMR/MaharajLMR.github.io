import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';

import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import { site } from '@/lib/content';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const updated = new Date().toISOString().slice(0, 10);

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
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:text-white"
        >
          Skip to content
        </a>
        <Nav name={site.name} />
        <main id="main">{children}</main>
        <Footer site={site} updated={updated} />
      </body>
    </html>
  );
}
