import Button from './Button';
import Media from './Media';
import Reveal from './Reveal';
import type { MediaItem, Site } from '@/lib/types';

type Props = { site: Site; backdrop: MediaItem };

export default function Hero({ site, backdrop }: Props) {
  const facts = [
    { k: 'Based in', v: site.location },
    { k: 'Studying', v: 'BE Mechatronics, CIT Chennai' },
    { k: 'From Nov 2026', v: 'Research intern, IIT Madras' },
    { k: 'Email', v: site.email },
  ];

  return (
    <section className="band-dark grain relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Media item={backdrop} priority fill rounded={false} className="opacity-[0.42] [filter:grayscale(1)_contrast(1.08)_brightness(0.95)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0d0e]/70 via-[#0c0d0e]/82 to-[#0c0d0e]" />
        <div className="blueprint absolute inset-0 opacity-90" />
      </div>

      <div className="mx-auto flex min-h-[86svh] w-full max-w-content flex-col justify-end px-6 pb-12 pt-28 md:px-10 md:pb-16 md:pt-36">
        <Reveal fade={false}>
          <p className="label text-muted">Mechatronics engineer</p>
        </Reveal>
        <Reveal fade={false} delay={0.06}>
          <h1 className="mt-6 text-display">
            {site.name.replace(' L M R', '')}{' '}
            <span className="text-muted">L M R</span>
          </h1>
        </Reveal>
        <Reveal fade={false} delay={0.12}>
          <p className="mt-7 max-w-prose text-lede text-[#c9c9c3]">{site.identityLine}</p>
        </Reveal>
        <Reveal fade={false} delay={0.18}>
          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Main stack">
            {site.proofStrip.map((item) => (
              <li key={item} className="label rounded-chip border border-line px-2.5 py-1.5 text-[#c9c9c3]">
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal fade={false} delay={0.24}>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/#work">See the work</Button>
            <Button href="/resume/" variant="outline">
              Resume
            </Button>
          </div>
        </Reveal>

        <Reveal fade={false} delay={0.3}>
          <dl className="mt-14 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-8 md:grid-cols-4">
            {facts.map((fact) => (
              <div key={fact.k} className={fact.k === 'Email' ? 'col-span-2 md:col-span-1' : undefined}>
                <dt className="label text-muted">{fact.k}</dt>
                <dd className="mt-2 break-words text-small text-[#c9c9c3]">{fact.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
