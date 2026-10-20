import Reveal from './Reveal';
import Section from './Section';
import type { MoreProject } from '@/lib/types';

export default function MoreWork({ items }: { items: MoreProject[] }) {
  return (
    <Section id="more" tone="alt" labelledBy="more-title">
      <Reveal>
        <h2 id="more-title" className="text-h2">
          More work
        </h2>
        <p className="mt-4 max-w-prose text-tagline text-ink-secondary">
          Earlier builds and work in progress. No demo video, no measured results yet, so they are
          here rather than above.
        </p>
      </Reveal>
      <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <Reveal as="li" key={item.slug} delay={Math.min(i, 3) * 0.08}>
            <article className="h-full rounded-card bg-surface p-6 transition-shadow duration-300 hover:shadow-card">
              <h3 className="text-h3">{item.title}</h3>
              <p className="mt-2 text-small text-accent">{item.status}</p>
              <p className="mt-3 text-body text-ink-secondary">{item.line}</p>
              <p className="mt-3 text-small text-ink-secondary">{item.note}</p>
              <p className="mt-4 text-small text-ink-secondary">{item.stack.join(' · ')}</p>
            </article>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
