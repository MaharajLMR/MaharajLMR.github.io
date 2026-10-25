import Link from 'next/link';

import Eyebrow from '@/components/Eyebrow';
import Section from '@/components/Section';

export default function NotFound() {
  return (
    <Section tone="dark" className="flex min-h-[70svh] items-center">
      <Eyebrow>404</Eyebrow>
      <h1 className="mt-6 text-h1">This page does not exist.</h1>
      <p className="mt-6 max-w-prose text-lede text-muted">
        The work, the case studies and the resume are all one click away.
      </p>
      <p className="mt-10 flex flex-wrap gap-6">
        <Link className="link text-body" href="/">
          Home
        </Link>
        <Link className="link text-body" href="/#work">
          Work
        </Link>
        <Link className="link text-body" href="/resume/">
          Resume
        </Link>
      </p>
    </Section>
  );
}
