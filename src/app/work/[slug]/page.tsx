import type { Metadata } from 'next';
import Link from 'next/link';

import ArchitectureDiagram from '@/components/ArchitectureDiagram';
import Chips from '@/components/Chips';
import Eyebrow from '@/components/Eyebrow';
import Media from '@/components/Media';
import Metric from '@/components/Metric';
import Reveal from '@/components/Reveal';
import Section from '@/components/Section';
import { featuredProjects, nextProject, projectBySlug, site } from '@/lib/content';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return featuredProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  return {
    title: project.title,
    description: `${project.tagline}. ${project.oneLineProblem}`,
    alternates: { canonical: `/work/${project.slug}/` },
    openGraph: {
      title: `${project.title} — ${site.name}`,
      description: `${project.tagline}. ${project.oneLineProblem}`,
      url: `/work/${project.slug}/`,
    },
  };
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="label text-muted">{label}</dt>
      <dd className="mt-2 text-small">{value}</dd>
    </div>
  );
}

/** Left rail used by every text section: a label over the heading. */
function Rail({ id, label, children }: { id: string; label: string; children: string }) {
  return (
    <Reveal>
      <Eyebrow>{label}</Eyebrow>
      <h2 id={id} className="mt-5 text-h2">
        {children}
      </h2>
    </Reveal>
  );
}

export default async function CaseStudy({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  const upNext = nextProject(slug);
  const plots = project.media.gallery;

  return (
    <article>
      <Section tone="dark" labelledBy="case-title">
        <Reveal fade={false}>
          <Eyebrow>{project.category}</Eyebrow>
          <h1 id="case-title" className="mt-6 max-w-[18ch] text-display">
            {project.title}
          </h1>
          <p className="mt-6 max-w-prose text-lede text-muted">{project.tagline}.</p>
        </Reveal>
        <Reveal fade={false} delay={0.08}>
          <dl className="mt-14 grid gap-8 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
            <Fact label="Team" value={project.teamSize === 1 ? 'Solo' : `${project.teamSize} people`} />
            <Fact label="Timeline" value={project.timeline} />
            <Fact label="Environment" value={project.environment} />
            <Fact label="Status" value={project.status} />
          </dl>
          <div className="mt-12 max-w-prose">
            <h2 className="label text-accent">What I built</h2>
            <p className="mt-3 text-body text-muted">{project.myRole}</p>
          </div>
          <div className="mt-10">
            <Chips items={project.stack} label={`${project.title} stack`} />
          </div>
          <p className="mt-10 flex flex-wrap gap-6">
            {project.links.repo ? (
              <a className="link text-body" href={project.links.repo} target="_blank" rel="noreferrer noopener">
                Repository
              </a>
            ) : (
              <span className="text-body text-muted">Repository not public yet.</span>
            )}
            {project.links.demo ? (
              <a className="link text-body" href={project.links.demo} target="_blank" rel="noreferrer noopener">
                Demo
              </a>
            ) : null}
          </p>
        </Reveal>
      </Section>

      <Section tone="light">
        <Reveal>
          <Media item={project.media.hero} />
        </Reveal>
      </Section>

      <Section tone="alt" labelledBy="problem-title">
        <div className="grid gap-10 md:grid-cols-[1fr_1.9fr] md:gap-16">
          <Rail id="problem-title" label="The problem">
            Problem
          </Rail>
          <div>
            <Reveal>
              <p className="max-w-prose text-lede">{project.problem}</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h3 className="label mt-14 text-accent">Constraints</h3>
              <ul className="mt-6 max-w-prose divide-y divide-line border-y border-line">
                {project.constraints.map((item) => (
                  <li key={item} className="py-4 text-body text-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section tone="light" labelledBy="approach-title">
        <div className="grid gap-10 md:grid-cols-[1fr_1.9fr] md:gap-16">
          <Rail id="approach-title" label="Decisions">
            Approach
          </Rail>
          <ol className="space-y-12">
            {project.approach.map((item, i) => (
              <Reveal as="li" key={item.decision} delay={Math.min(i, 3) * 0.06}>
                <p className="label tabular text-accent">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-3 max-w-prose text-h3">{item.decision}</h3>
                <p className="mt-3 max-w-prose text-body text-muted">{item.why}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      <Section tone="alt" labelledBy="architecture-title">
        <Reveal>
          <Eyebrow>How it fits together</Eyebrow>
          <h2 id="architecture-title" className="mt-5 text-h2">
            Architecture
          </h2>
          <p className="mt-5 max-w-prose text-body text-muted">{project.architecture.summary}</p>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="mt-12">
            <ArchitectureDiagram stages={project.architecture.stages} title={project.title} />
          </div>
        </Reveal>
      </Section>

      <Section tone="light" labelledBy="results-title">
        <Reveal>
          <Eyebrow>Measured</Eyebrow>
          <h2 id="results-title" className="mt-5 text-h2">
            Results
          </h2>
          <p className="mt-5 max-w-prose text-body text-muted">
            Every number below comes from a script or a recorded run in the project, with the
            baseline it is measured against.
          </p>
        </Reveal>
        <dl className="mt-14 grid divide-y divide-line border-y border-line sm:grid-cols-2 sm:divide-x lg:grid-cols-3">
          {project.results.map((result, i) => (
            <Reveal key={result.label} delay={Math.min(i, 3) * 0.06} className="py-8 sm:px-8 sm:first:pl-0">
              <dt className="sr-only">{result.label}</dt>
              <dd>
                <Metric value={result.value} unit={result.unit} label={result.label} context={result.context} />
              </dd>
            </Reveal>
          ))}
        </dl>
        {plots.length > 0 ? (
          <div className="mt-20 grid gap-12 md:grid-cols-2">
            {plots.map((item, i) => (
              <Reveal key={item.src} delay={Math.min(i, 3) * 0.06}>
                <Media item={item} />
              </Reveal>
            ))}
          </div>
        ) : null}
      </Section>

      <Section tone="alt" labelledBy="failures-title">
        <div className="grid gap-10 md:grid-cols-[1fr_1.9fr] md:gap-16">
          <Rail id="failures-title" label="Honestly">
            What failed
          </Rail>
          <ul className="space-y-12">
            {project.failures.map((item, i) => (
              <Reveal as="li" key={item.what} delay={Math.min(i, 3) * 0.06}>
                <p className="max-w-prose text-body">{item.what}</p>
                <p className="mt-4 max-w-prose border-l border-accent pl-5 text-body text-muted">{item.fix}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="light" labelledBy="next-title">
        <div className="grid gap-10 md:grid-cols-[1fr_1.9fr] md:gap-16">
          <Rail id="next-title" label="Open ends">
            What I would do next
          </Rail>
          <ul className="divide-y divide-line border-y border-line">
            {project.next.map((item, i) => (
              <Reveal as="li" key={item} delay={Math.min(i, 3) * 0.06}>
                <p className="max-w-prose py-4 text-body text-muted">{item}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="dark">
        <Reveal>
          <Eyebrow>Next project</Eyebrow>
          <h2 className="mt-6 max-w-[20ch] text-h1">
            <Link href={`/work/${upNext.slug}/`} className="transition-colors hover:text-accent">
              {upNext.tagline}
            </Link>
          </h2>
          <p className="mt-10">
            <Link href="/#work" className="link text-body">
              All work
            </Link>
          </p>
        </Reveal>
      </Section>
    </article>
  );
}
