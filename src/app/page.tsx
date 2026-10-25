import About from '@/components/About';
import Contact from '@/components/Contact';
import Hero from '@/components/Hero';
import MoreWork from '@/components/MoreWork';
import ProjectBand from '@/components/ProjectBand';
import Research from '@/components/Research';
import Skills from '@/components/Skills';
import type { Tone } from '@/components/Section';
import { featuredProjects, moreProjects, site } from '@/lib/content';

/** Bands alternate paper and stone, split by a hairline. Only the hero and the
 *  contact band go dark, so the page opens and closes on the same note. */
const TONES: Tone[] = ['light', 'alt'];

export default function Home() {
  const [first, ...rest] = featuredProjects;
  if (!first) throw new Error('no featured projects');

  return (
    <>
      <Hero site={site} backdrop={site.heroBackdrop} />
      <div id="work">
        <ProjectBand project={first} tone="light" index={1} pinned />
        {rest.map((project, i) => (
          <ProjectBand
            key={project.slug}
            project={project}
            tone={TONES[(i + 1) % TONES.length] as Tone}
            index={i + 2}
          />
        ))}
      </div>
      <MoreWork items={moreProjects} />
      <Research site={site} />
      <Skills site={site} />
      <About site={site} />
      <Contact site={site} />
    </>
  );
}
