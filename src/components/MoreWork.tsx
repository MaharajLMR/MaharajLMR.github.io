import Eyebrow from './Eyebrow';
import Reveal from './Reveal';
import Section from './Section';
import type { MoreProject } from '@/lib/types';

export default function MoreWork({ items }: { items: MoreProject[] }) {
  return (
    <Section id="more" tone="light" labelledBy="more-title">
      <Reveal>
        <Eyebrow index={5}>Earlier builds</Eyebrow>
        <h2 id="more-title" className="mt-6 text-h2">
          More work
        </h2>
        <p className="mt-5 max-w-prose text-lede text-muted">
          Earlier builds and work in progress. No demo video and no measured results yet, so they sit
          here rather than above.
        </p>
      </Reveal>
      <ul className="mt-14 grid border-l border-t border-line md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <Reveal as="li" key={item.slug} delay={Math.min(i, 3) * 0.06}>
            <article className="flex h-full flex-col border-b border-r border-line p-7">
              <p className="label text-muted">{item.status}</p>
              <h3 className="mt-4 text-h3">{item.title}</h3>
              <p className="mt-3 text-body text-muted">{item.line}</p>
              <p className="mt-3 text-small text-muted">{item.note}</p>
              <p className="label mt-auto pt-6 text-muted">{item.stack.join('  /  ')}</p>
            </article>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
