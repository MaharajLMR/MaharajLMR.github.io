import Link from 'next/link';

import Section from '@/components/Section';

export default function NotFound() {
  return (
    <Section tone="dark" className="min-h-[70svh] flex items-center">
      <p className="text-small uppercase tracking-[0.16em] text-accent">404</p>
      <h1 className="mt-4 text-h1">This page does not exist.</h1>
      <p className="mt-6 max-w-prose text-tagline text-ink-secondary">
        The work, the case studies and the resume are all one click away.
      </p>
      <p className="mt-10 flex flex-wrap gap-6">
        <Link className="text-body text-accent underline-offset-4 hover:underline" href="/">
          Home
        </Link>
        <Link className="text-body text-accent underline-offset-4 hover:underline" href="/#work">
          Work
        </Link>
        <Link className="text-body text-accent underline-offset-4 hover:underline" href="/resume/">
          Resume
        </Link>
      </p>
    </Section>
  );
}
