import Reveal from './Reveal';
import Section from './Section';
import type { Site } from '@/lib/types';

export default function About({ site }: { site: Site }) {
  return (
    <Section id="about" tone="light" labelledBy="about-title">
      <div className="grid gap-10 md:grid-cols-[220px_1fr] md:gap-12">
        <Reveal>
          <h2 id="about-title" className="text-h2">
            About
          </h2>
        </Reveal>
        <div>
          {site.bio.map((paragraph, i) => (
            <Reveal key={paragraph.slice(0, 24)} delay={Math.min(i, 3) * 0.08}>
              <p className="mt-6 max-w-prose text-body text-ink-secondary first:mt-0">{paragraph}</p>
            </Reveal>
          ))}
          <Reveal delay={0.24}>
            <dl className="mt-12 grid gap-8 sm:grid-cols-3">
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
              </div>
              <div>
                <dt className="text-small font-semibold uppercase tracking-[0.14em] text-accent">
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
