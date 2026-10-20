import Reveal from './Reveal';
import Section from './Section';
import type { Site } from '@/lib/types';

export default function Skills({ site }: { site: Site }) {
  return (
    <Section id="skills" tone="alt" labelledBy="skills-title">
      <Reveal>
        <h2 id="skills-title" className="text-h2">
          Skills
        </h2>
        <p className="mt-4 max-w-prose text-tagline text-ink-secondary">
          Everything here is used by a project on this page.
        </p>
      </Reveal>
      <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {site.skills.map((group, i) => (
          <Reveal key={group.group} delay={Math.min(i, 3) * 0.08}>
            <h3 className="text-small font-semibold uppercase tracking-[0.14em] text-accent">
              {group.group}
            </h3>
            <ul className="mt-4 space-y-2">
              {group.items.map((item) => (
                <li key={item} className="text-body text-ink-secondary">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
