import Link from 'next/link';

import Chips from './Chips';
import Eyebrow from './Eyebrow';
import Media from './Media';
import Metric from './Metric';
import PinnedStory from './PinnedStory';
import Reveal from './Reveal';
import Section, { type Tone } from './Section';
import type { Project } from '@/lib/types';

type Props = { project: Project; tone: Tone; index: number; pinned?: boolean };

export default function ProjectBand({ project, tone, index, pinned = false }: Props) {
  const headline = project.results.filter((r) => r.headline).slice(0, 3);

  return (
    <Section tone={tone} labelledBy={`${project.slug}-title`}>
      <Reveal>
        <Eyebrow index={index}>{project.category}</Eyebrow>
        <h2 id={`${project.slug}-title`} className="mt-6 max-w-[20ch] text-h1">
          {project.tagline}
        </h2>
        <p className="mt-6 max-w-prose text-lede text-muted">{project.oneLineProblem}</p>
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
        <dl className="mt-16 grid divide-y divide-line border-y border-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {headline.map((result) => (
            <div key={result.label} className="py-8 first:pt-8 sm:px-8 sm:first:pl-0 sm:last:pr-0">
              <dt className="sr-only">{result.label}</dt>
              <dd>
                <Metric value={result.value} unit={result.unit} label={result.label} context={result.context} />
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <Reveal delay={0.16}>
        <div className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-4">
          <span className="label rounded-chip bg-accent-soft px-2.5 py-1.5 text-accent">
            {project.environment}
          </span>
          <Chips items={project.stack} label={`${project.title} stack`} />
        </div>
        <p className="mt-10">
          <Link href={`/work/${project.slug}/`} className="link group inline-flex items-center gap-2 text-body">
            Read the case study
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
              <path d="M1 5h11M8.5 1.5 12 5l-3.5 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="sr-only">: {project.title}</span>
          </Link>
        </p>
      </Reveal>
    </Section>
  );
}
