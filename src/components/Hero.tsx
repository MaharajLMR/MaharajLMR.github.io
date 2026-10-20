import Button from './Button';
import Media from './Media';
import Reveal from './Reveal';
import type { MediaItem, Site } from '@/lib/types';

type Props = { site: Site; backdrop: MediaItem };

export default function Hero({ site, backdrop }: Props) {
  return (
    <section className="band-dark relative isolate flex min-h-[86svh] items-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Media
          item={backdrop}
          priority
          fill
          rounded={false}
          className="opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/70 to-black" />
      </div>

      <div className="mx-auto w-full max-w-content px-6 py-band-sm md:px-10 md:py-band">
        <Reveal fade={false}>
          <p className="text-small uppercase tracking-[0.18em] text-accent-on-dark">{site.roleLine}</p>
        </Reveal>
        <Reveal fade={false} delay={0.08}>
          <h1 className="mt-5 text-display">{site.name}</h1>
        </Reveal>
        <Reveal fade={false} delay={0.16}>
          <p className="mt-6 max-w-prose text-tagline text-[#d6d6db]">{site.identityLine}</p>
        </Reveal>
        <Reveal fade={false} delay={0.24}>
          <ul className="mt-8 flex flex-wrap items-center text-small text-[#a1a1a6]">
            {site.proofStrip.map((item, i) => (
              <li key={item} className="whitespace-nowrap">
                {item}
                {i < site.proofStrip.length - 1 ? (
                  <span aria-hidden="true" className="px-3">
                    ·
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal fade={false} delay={0.32}>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/#work">View work</Button>
            <Button href="/resume/" variant="outline">
              Resume
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
