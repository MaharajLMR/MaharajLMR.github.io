import Reveal from './Reveal';
import Section from './Section';
import type { Site } from '@/lib/types';

/**
 * No papers yet, so this band carries the research and competition record
 * instead of inventing a publication list.
 */
export default function Research({ site }: { site: Site }) {
  return (
    <Section id="research" tone="light" labelledBy="research-title">
      <Reveal>
        <h2 id="research-title" className="text-h2">
          Research and competitions
        </h2>
        <p className="mt-4 max-w-prose text-tagline text-ink-secondary">
          No publications yet. This is the research work and the competition record behind the
          projects above.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-12 md:grid-cols-2">
        <Reveal>
          <h3 className="text-h3">Research</h3>
          <ul className="mt-6 space-y-8">
            {site.experience
              .filter((item) => item.role.startsWith('Research'))
              .map((item) => (
                <li key={`${item.org}-${item.period}`}>
                  <p className="text-body font-medium">{item.role}</p>
                  <p className="text-small text-accent">
                    {item.org} · {item.period}
                  </p>
                  <p className="mt-2 max-w-prose text-body text-ink-secondary">{item.detail}</p>
                </li>
              ))}
          </ul>
        </Reveal>

        <Reveal delay={0.08}>
          <h3 className="text-h3">Competitions</h3>
          <ul className="mt-6 space-y-8">
            {site.achievements.map((item) => (
              <li key={item.title}>
                <p className="text-body font-medium">{item.title}</p>
                <p className="mt-2 max-w-prose text-body text-ink-secondary">{item.detail}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
