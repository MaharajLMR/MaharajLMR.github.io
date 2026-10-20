import Link from 'next/link';

import Chips from './Chips';
import Media from './Media';
import Metric from './Metric';
import PinnedStory from './PinnedStory';
import Reveal from './Reveal';
import Section, { type Tone } from './Section';
import type { Project } from '@/lib/types';

type Props = { project: Project; tone: Tone; pinned?: boolean };

export default function ProjectBand({ project, tone, pinned = false }: Props) {
  const headline = project.results.filter((r) => r.headline).slice(0, 3);

  return (
    <Section tone={tone} labelledBy={`${project.slug}-title`}>
      <Reveal>
        <p className="text-small font-medium uppercase tracking-[0.16em] text-accent">
          {project.category}
        </p>
        <h2 id={`${project.slug}-title`} className="mt-4 max-w-[18ch] text-h1">
          {project.tagline}
        </h2>
        <p className="mt-5 max-w-prose text-tagline text-ink-secondary">{project.oneLineProblem}</p>
      </Reveal>

      {pinned && project.pinnedStory ? (
        <PinnedStory media={project.media.hero} steps={project.pinnedStory} />
      ) : (
        <Reveal delay={0.08}>
          <div className="mt-12">
            <Media item={project.media.hero} />
          </div>
        </Reveal>
      )}

      <Reveal delay={0.08}>
        <dl className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {headline.map((result) => (
            <div key={result.label}>
              <dt className="sr-only">{result.label}</dt>
              <dd>
                <Metric
                  value={result.value}
                  unit={result.unit}
                  label={result.label}
                  context={result.context}
                />
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <Reveal delay={0.16}>
        <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-4">
          <span className="rounded-full bg-accent/10 px-3 py-1 text-small text-accent">
            {project.environment}
          </span>
          <Chips items={project.stack} label={`${project.title} stack`} />
        </div>
        <p className="mt-8">
          <Link
            href={`/work/${project.slug}/`}
            className="text-body text-accent underline-offset-4 hover:underline"
          >
            Read case study <span aria-hidden="true">→</span>
            <span className="sr-only">: {project.title}</span>
          </Link>
        </p>
      </Reveal>
    </Section>
  );
}
