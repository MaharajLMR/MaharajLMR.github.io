import type { Metadata } from 'next';
import Link from 'next/link';

import { asset } from '@/lib/asset';
import { featuredProjects, moreProjects, site } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Resume',
  description: `Resume of ${site.name}: ${site.roleLine}. ${site.lookingFor}`,
  alternates: { canonical: '/resume/' },
};

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-10 border-b border-line pb-2 text-small font-semibold uppercase tracking-[0.14em] text-accent print:mt-6">
      {children}
    </h2>
  );
}

export default function Resume() {
  const highlights = featuredProjects.map((project) => {
    const metric = project.results.find((r) => r.headline) ?? project.results[0];
    return {
      slug: project.slug,
      title: project.title,
      stack: project.stack.slice(0, 5).join(', '),
      line: project.oneLineProblem,
      metric: metric
        ? `${metric.label}: ${metric.value}${metric.unit ? ` ${metric.unit}` : ''}. ${metric.context}`
        : '',
      repo: project.links.repo,
    };
  });

  return (
    <div className="bg-surface print:bg-white">
      <div className="mx-auto w-full max-w-[820px] px-6 py-16 text-ink print:px-0 print:py-0 print:text-black">
        <header>
          <h1 className="text-h1">{site.name}</h1>
          <p className="mt-2 text-tagline text-ink-secondary">{site.roleLine}</p>
          <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-small text-ink-secondary">
            <a className="text-accent" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            <a className="text-accent" href={site.github} target="_blank" rel="noreferrer noopener">
              {site.github.replace('https://', '')}
            </a>
            <a className="text-accent" href={site.linkedin} target="_blank" rel="noreferrer noopener">
              {site.linkedin.replace('https://', '')}
            </a>
            <span>{site.location}</span>
          </p>
          <p className="mt-6 flex gap-4 print:hidden">
            <a
              className="inline-flex min-h-[44px] items-center rounded-full bg-accent px-6 text-[17px] text-white"
              href={asset(site.resumePdf)}
              download=""
            >
              Download PDF
            </a>
            <Link
              className="inline-flex min-h-[44px] items-center rounded-full border border-current px-6 text-[17px] text-accent"
              href="/"
            >
              Back to work
            </Link>
          </p>
        </header>

        <Heading>Education</Heading>
        {site.education.map((item) => (
          <p key={item.degree} className="mt-3 text-body">
            <span className="font-medium">{item.degree}</span>, {item.institution}
            <br />
            <span className="text-ink-secondary">
              {item.period} · {item.detail}
            </span>
          </p>
        ))}

        <Heading>Experience</Heading>
        <ul className="mt-3 space-y-5">
          {site.experience.map((item) => (
            <li key={`${item.org}-${item.period}`}>
              <p className="text-body font-medium">
                {item.role} — {item.org}
              </p>
              <p className="text-small text-ink-secondary">{item.period}</p>
              <p className="mt-1 text-body text-ink-secondary">{item.detail}</p>
            </li>
          ))}
        </ul>

        <Heading>Selected projects</Heading>
        <ul className="mt-3 space-y-5">
          {highlights.map((item) => (
            <li key={item.slug}>
              <p className="text-body font-medium">
                {item.title} <span className="font-normal text-ink-secondary">· {item.stack}</span>
              </p>
              <p className="mt-1 text-body text-ink-secondary">{item.line}</p>
              <p className="mt-1 text-body text-ink-secondary">{item.metric}</p>
              <p className="mt-1 text-small">
                <Link className="text-accent" href={`/work/${item.slug}/`}>
                  Case study
                </Link>
                {item.repo ? (
                  <>
                    {' · '}
                    <a className="text-accent" href={item.repo} target="_blank" rel="noreferrer noopener">
                      {item.repo.replace('https://', '')}
                    </a>
                  </>
                ) : null}
              </p>
            </li>
          ))}
        </ul>

        <Heading>Achievements</Heading>
        <ul className="mt-3 space-y-3">
          {site.achievements.map((item) => (
            <li key={item.title} className="text-body">
              <span className="font-medium">{item.title}</span>
              <br />
              <span className="text-ink-secondary">{item.detail}</span>
            </li>
          ))}
        </ul>

        <Heading>Skills</Heading>
        <ul className="mt-3 space-y-3">
          {site.skills.map((group) => (
            <li key={group.group} className="text-body">
              <span className="font-medium">{group.group}:</span>{' '}
              <span className="text-ink-secondary">{group.items.join(', ')}</span>
            </li>
          ))}
        </ul>

        <Heading>Earlier work</Heading>
        <ul className="mt-3 space-y-2">
          {moreProjects.map((item) => (
            <li key={item.slug} className="text-body text-ink-secondary">
              <span className="font-medium text-ink">{item.title}</span> — {item.line}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
