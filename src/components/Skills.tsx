import Eyebrow from './Eyebrow';
import Reveal from './Reveal';
import Section from './Section';
import type { Site } from '@/lib/types';

export default function Skills({ site }: { site: Site }) {
  return (
    <Section id="skills" tone="light" labelledBy="skills-title">
      <Reveal>
        <Eyebrow index={7}>Stack</Eyebrow>
        <h2 id="skills-title" className="mt-6 text-h2">
          Skills
        </h2>
        <p className="mt-5 max-w-prose text-lede text-muted">
          Everything here is used by a project on this page.
        </p>
      </Reveal>
      <div className="mt-14 grid gap-10 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
        {site.skills.map((group, i) => (
          <Reveal key={group.group} delay={Math.min(i, 3) * 0.06}>
            <h3 className="label text-accent">{group.group}</h3>
            <ul className="mt-5 space-y-2.5">
              {group.items.map((item) => (
                <li key={item} className="text-small text-muted">
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
