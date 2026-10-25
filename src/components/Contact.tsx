import Link from 'next/link';

import Button from './Button';
import CopyEmail from './CopyEmail';
import Eyebrow from './Eyebrow';
import Reveal from './Reveal';
import Section from './Section';
import type { Site } from '@/lib/types';

export default function Contact({ site }: { site: Site }) {
  return (
    <Section id="contact" tone="dark" labelledBy="contact-title">
      <Reveal>
        <Eyebrow index={9}>Contact</Eyebrow>
        <h2 id="contact-title" className="mt-6 max-w-[22ch] text-h1">
          If you are hiring for robots that have to work, write to me.
        </h2>
        <p className="mt-6 max-w-prose text-lede text-muted">{site.lookingFor}</p>
      </Reveal>
      <Reveal delay={0.06}>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Button href={`mailto:${site.email}`}>{site.email}</Button>
          <CopyEmail email={site.email} />
        </div>
      </Reveal>
      <Reveal delay={0.12}>
        <ul className="mt-12 grid border-l border-t border-line sm:grid-cols-3">
          <li className="border-b border-r border-line p-6">
            <a className="label text-muted transition-colors hover:text-ink" href={site.github} target="_blank" rel="noreferrer noopener">
              GitHub
            </a>
            <p className="mt-2 text-small">MaharajLMR</p>
          </li>
          <li className="border-b border-r border-line p-6">
            <a className="label text-muted transition-colors hover:text-ink" href={site.linkedin} target="_blank" rel="noreferrer noopener">
              LinkedIn
            </a>
            <p className="mt-2 text-small">maharaj-lmr</p>
          </li>
          <li className="border-b border-r border-line p-6">
            <Link className="label text-muted transition-colors hover:text-ink" href="/resume/">
              Resume
            </Link>
            <p className="mt-2 text-small">One page, PDF</p>
          </li>
        </ul>
      </Reveal>
    </Section>
  );
}
