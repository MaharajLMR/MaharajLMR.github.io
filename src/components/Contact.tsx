import Button from './Button';
import CopyEmail from './CopyEmail';
import Reveal from './Reveal';
import Section from './Section';
import type { Site } from '@/lib/types';

export default function Contact({ site }: { site: Site }) {
  return (
    <Section id="contact" tone="dark" labelledBy="contact-title">
      <Reveal>
        <h2 id="contact-title" className="text-h1">
          Let&apos;s build something.
        </h2>
        <p className="mt-6 max-w-prose text-tagline text-ink-secondary">{site.lookingFor}</p>
      </Reveal>
      <Reveal delay={0.08}>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Button href={`mailto:${site.email}`}>{site.email}</Button>
          <CopyEmail email={site.email} />
        </div>
      </Reveal>
      <Reveal delay={0.16}>
        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
          <li>
            <a className="text-body text-accent underline-offset-4 hover:underline" href={site.github} target="_blank" rel="noreferrer noopener">
              GitHub
            </a>
          </li>
          <li>
            <a className="text-body text-accent underline-offset-4 hover:underline" href={site.linkedin} target="_blank" rel="noreferrer noopener">
              LinkedIn
            </a>
          </li>
          <li>
            <Button href="/resume/" variant="text">
              Resume
            </Button>
          </li>
        </ul>
      </Reveal>
    </Section>
  );
}
