'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import ThemeToggle from './ThemeToggle';

type Item = { label: string; href: string };

const ITEMS: Item[] = [
  { label: 'Work', href: '/#work' },
  { label: 'Research', href: '/#research' },
  { label: 'About', href: '/#about' },
  { label: 'Resume', href: '/resume/' },
  { label: 'Contact', href: '/#contact' },
];

export default function Nav({ name }: { name: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? 'border-b border-line bg-paper/85 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-14 w-full max-w-content items-center justify-between px-6 md:px-10"
      >
        <Link href="/" className="text-small font-medium tracking-tight">
          {name}
        </Link>

        <div className="flex items-center gap-1 md:gap-6">
          <ul className="hidden items-center gap-6 md:flex">
            {ITEMS.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="label text-muted transition-colors hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <svg width="18" height="14" viewBox="0 0 18 14" aria-hidden="true" fill="none">
              <path
                d={open ? 'M2 2 L16 12 M16 2 L2 12' : 'M0 2 H18 M0 12 H18'}
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </nav>

      {open ? (
        <ul id="mobile-menu" className="border-t border-line px-6 pb-4 md:hidden">
          {ITEMS.map((item) => (
            <li key={item.label} className="border-b border-line last:border-b-0">
              <Link
                href={item.href}
                className="flex min-h-[48px] items-center text-body"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </header>
  );
}
