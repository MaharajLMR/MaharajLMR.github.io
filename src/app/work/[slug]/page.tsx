import type { Metadata } from 'next';
import Link from 'next/link';

import ArchitectureDiagram from '@/components/ArchitectureDiagram';
import Chips from '@/components/Chips';
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
      <dt className="text-small uppercase tracking-[0.14em] text-ink-secondary">{label}</dt>
      <dd className="mt-2 text-body">{value}</dd>
    </div>
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
          <p className="text-small font-medium uppercase tracking-[0.16em] text-accent">
            {project.category}
          </p>
          <h1 id="case-title" className="mt-4 max-w-[16ch] text-display">
            {project.title}
          </h1>
          <p className="mt-6 max-w-prose text-tagline text-ink-secondary">{project.tagline}.</p>
        </Reveal>
        <Reveal fade={false} delay={0.08}>
          <dl className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Fact label="Team" value={project.teamSize === 1 ? 'Solo' : `${project.teamSize} people`} />
            <Fact label="Timeline" value={project.timeline} />
            <Fact label="Environment" value={project.environment} />
            <Fact label="Status" value={project.status} />
          </dl>
          <div className="mt-10 max-w-prose">
            <h2 className="text-small uppercase tracking-[0.14em] text-ink-secondary">What I built</h2>
            <p className="mt-3 text-body text-ink-secondary">{project.myRole}</p>
          </div>
          <div className="mt-10">
            <Chips items={project.stack} label={`${project.title} stack`} />
          </div>
          <p className="mt-8 flex flex-wrap gap-6">
            {project.links.repo ? (
              <a
                className="text-body text-accent underline-offset-4 hover:underline"
                href={project.links.repo}
                target="_blank"
                rel="noreferrer noopener"
              >
                Repository <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <span className="text-body text-ink-secondary">
                Repository not public yet.
              </span>
            )}
            {project.links.demo ? (
              <a
                className="text-body text-accent underline-offset-4 hover:underline"
                href={project.links.demo}
                target="_blank"
                rel="noreferrer noopener"
              >
                Demo <span aria-hidden="true">↗</span>
              </a>
            ) : null}
          </p>
        </Reveal>
      </Section>

      <Section tone="light">
        <Reveal>
          <Media item={project.media.hero} />
          {project.media.hero.caption ? (
            <p className="mt-4 text-small text-ink-secondary">{project.media.hero.caption}</p>
          ) : null}
        </Reveal>
      </Section>

      <Section tone="alt" labelledBy="problem-title">
        <div className="grid gap-12 md:grid-cols-[220px_1fr]">
          <Reveal>
            <h2 id="problem-title" className="text-h2">
              Problem
            </h2>
          </Reveal>
          <div>
            <Reveal>
              <p className="max-w-prose text-tagline">{project.problem}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h3 className="mt-12 text-h3">Constraints</h3>
              <ul className="mt-6 max-w-prose space-y-3">
                {project.constraints.map((item) => (
                  <li key={item} className="flex gap-3 text-body text-ink-secondary">
                    <span aria-hidden="true" className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section tone="light" labelledBy="approach-title">
        <div className="grid gap-12 md:grid-cols-[220px_1fr]">
          <Reveal>
            <h2 id="approach-title" className="text-h2">
              Approach
            </h2>
          </Reveal>
          <ol className="space-y-12">
            {project.approach.map((item, i) => (
              <Reveal as="li" key={item.decision} delay={Math.min(i, 3) * 0.08}>
                <p className="text-small tabular text-accent">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-2 max-w-prose text-h3">{item.decision}</h3>
                <p className="mt-3 max-w-prose text-body text-ink-secondary">{item.why}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      <Section tone="alt" labelledBy="architecture-title">
        <Reveal>
          <h2 id="architecture-title" className="text-h2">
            Architecture
          </h2>
          <p className="mt-4 max-w-prose text-body text-ink-secondary">
            {project.architecture.summary}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mt-12">
            <ArchitectureDiagram stages={project.architecture.stages} title={project.title} />
          </div>
        </Reveal>
      </Section>

      <Section tone="light" labelledBy="results-title">
        <Reveal>
          <h2 id="results-title" className="text-h2">
            Results
          </h2>
          <p className="mt-4 max-w-prose text-body text-ink-secondary">
            Every number below comes from a script or a recorded run in the project, with the
            baseline it is measured against.
          </p>
        </Reveal>
        <dl className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {project.results.map((result, i) => (
            <Reveal key={result.label} delay={Math.min(i, 3) * 0.08}>
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
              <Reveal key={item.src} delay={Math.min(i, 3) * 0.08}>
                <figure>
                  <Media item={item} />
                  {item.caption ? (
                    <figcaption className="mt-4 text-small text-ink-secondary">{item.caption}</figcaption>
                  ) : null}
                </figure>
              </Reveal>
            ))}
          </div>
        ) : null}
      </Section>

      <Section tone="alt" labelledBy="failures-title">
        <div className="grid gap-12 md:grid-cols-[220px_1fr]">
          <Reveal>
            <h2 id="failures-title" className="text-h2">
              What failed
            </h2>
          </Reveal>
          <ul className="space-y-12">
            {project.failures.map((item, i) => (
              <Reveal as="li" key={item.what} delay={Math.min(i, 3) * 0.08}>
                <p className="max-w-prose text-body">{item.what}</p>
                <p className="mt-3 max-w-prose border-l-2 border-accent pl-4 text-body text-ink-secondary">
                  {item.fix}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="light" labelledBy="next-title">
        <div className="grid gap-12 md:grid-cols-[220px_1fr]">
          <Reveal>
            <h2 id="next-title" className="text-h2">
              What I&apos;d do next
            </h2>
          </Reveal>
          <ul className="space-y-4">
            {project.next.map((item, i) => (
              <Reveal as="li" key={item} delay={Math.min(i, 3) * 0.08}>
                <p className="flex max-w-prose gap-3 text-body text-ink-secondary">
                  <span aria-hidden="true" className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {item}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="dark">
        <Reveal>
          <p className="text-small uppercase tracking-[0.16em] text-ink-secondary">Next project</p>
          <h2 className="mt-4 max-w-[18ch] text-h1">
            <Link href={`/work/${upNext.slug}/`} className="hover:text-accent">
              {upNext.tagline} <span aria-hidden="true">→</span>
            </Link>
          </h2>
          <p className="mt-10">
            <Link href="/#work" className="text-body text-accent underline-offset-4 hover:underline">
              All work
            </Link>
          </p>
        </Reveal>
      </Section>
    </article>
  );
}
