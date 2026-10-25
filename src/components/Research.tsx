import Eyebrow from './Eyebrow';
import Reveal from './Reveal';
import Section from './Section';
import type { Site } from '@/lib/types';

/**
 * No papers yet, so this band carries the research and competition record
 * instead of inventing a publication list.
 */
export default function Research({ site }: { site: Site }) {
  return (
    <Section id="research" tone="alt" labelledBy="research-title">
      <Reveal>
        <Eyebrow index={6}>Record</Eyebrow>
        <h2 id="research-title" className="mt-6 text-h2">
          Research and competitions
        </h2>
        <p className="mt-5 max-w-prose text-lede text-muted">
          No publications yet. This is the research work and the competition record behind the
          projects above.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-12 border-t border-line pt-10 md:grid-cols-2 md:gap-16">
        <Reveal>
          <h3 className="label text-accent">Research</h3>
          <ul className="mt-6 space-y-8">
            {site.experience
              .filter((item) => item.role.startsWith('Research'))
              .map((item) => (
                <li key={`${item.org}-${item.period}`}>
                  <p className="text-body font-medium">{item.role}</p>
                  <p className="label mt-2 text-muted">
                    {item.org}
                    <span className="px-2 text-line">|</span>
                    {item.period}
                  </p>
                  <p className="mt-3 max-w-prose text-small text-muted">{item.detail}</p>
                </li>
              ))}
          </ul>
        </Reveal>

        <Reveal delay={0.06}>
          <h3 className="label text-accent">Competitions</h3>
          <ul className="mt-6 space-y-8">
            {site.achievements.map((item) => (
              <li key={item.title}>
                <p className="text-body font-medium">{item.title}</p>
                <p className="mt-3 max-w-prose text-small text-muted">{item.detail}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
