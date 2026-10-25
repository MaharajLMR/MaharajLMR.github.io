import Eyebrow from './Eyebrow';
import Reveal from './Reveal';
import Section from './Section';
import type { Site } from '@/lib/types';

export default function About({ site }: { site: Site }) {
  return (
    <Section id="about" tone="alt" labelledBy="about-title">
      <div className="grid gap-10 md:grid-cols-[1fr_1.6fr] md:gap-16">
        <Reveal>
          <Eyebrow index={8}>Who</Eyebrow>
          <h2 id="about-title" className="mt-6 text-h2">
            About
          </h2>
        </Reveal>
        <div>
          {site.bio.map((paragraph, i) => (
            <Reveal key={paragraph.slice(0, 24)} delay={Math.min(i, 3) * 0.06}>
              <p className="mt-6 max-w-prose text-body text-muted first:mt-0">{paragraph}</p>
            </Reveal>
          ))}
          <Reveal delay={0.2}>
            <dl className="mt-14 grid gap-8 border-t border-line pt-10 sm:grid-cols-3">
              <div>
                <dt className="label text-accent">Education</dt>
                {site.education.map((item) => (
                  <dd key={item.degree} className="mt-4 text-small text-muted">
                    {item.degree}
                    <br />
                    {item.institution}
                    <br />
                    <span className="tabular font-mono">{item.period}</span>, {item.detail}
                  </dd>
                ))}
              </div>
              <div>
                <dt className="label text-accent">Based in</dt>
                <dd className="mt-4 text-small text-muted">{site.location}</dd>
              </div>
              <div>
                <dt className="label text-accent">Looking for</dt>
                <dd className="mt-4 text-small text-muted">{site.lookingFor}</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
