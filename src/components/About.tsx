import Reveal from './Reveal';
import Section from './Section';
import type { Site } from '@/lib/types';

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 4);
}

export default function About({ site }: { site: Site }) {
  return (
    <Section id="about" tone="light" labelledBy="about-title">
      <div className="grid gap-12 md:grid-cols-[180px_1fr] md:gap-16">
        <Reveal>
          <p
            aria-hidden="true"
            className="flex h-[180px] w-[180px] items-center justify-center rounded-card bg-surface-alt text-h2 tracking-tight text-ink-secondary"
          >
            {initials(site.name)}
          </p>
        </Reveal>
        <div>
          <Reveal>
            <h2 id="about-title" className="text-h2">
              About
            </h2>
          </Reveal>
          {site.bio.map((paragraph, i) => (
            <Reveal key={paragraph.slice(0, 24)} delay={Math.min(i + 1, 3) * 0.08}>
              <p className="mt-6 max-w-prose text-body text-ink-secondary">{paragraph}</p>
            </Reveal>
          ))}
          <Reveal delay={0.24}>
            <dl className="mt-10 grid gap-6 sm:grid-cols-2">
              <div>
                <dt className="text-small font-semibold uppercase tracking-[0.14em] text-accent">
                  Education
                </dt>
                {site.education.map((item) => (
                  <dd key={item.degree} className="mt-3 text-body text-ink-secondary">
                    {item.degree}
                    <br />
                    {item.institution}
                    <br />
                    {item.period} · {item.detail}
                  </dd>
                ))}
              </div>
              <div>
                <dt className="text-small font-semibold uppercase tracking-[0.14em] text-accent">
                  Based in
                </dt>
                <dd className="mt-3 text-body text-ink-secondary">{site.location}</dd>
                <dt className="mt-6 text-small font-semibold uppercase tracking-[0.14em] text-accent">
                  Looking for
                </dt>
                <dd className="mt-3 text-body text-ink-secondary">{site.lookingFor}</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
