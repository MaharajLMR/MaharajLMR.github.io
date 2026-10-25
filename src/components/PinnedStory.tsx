import Media from './Media';
import Reveal from './Reveal';
import type { MediaItem } from '@/lib/types';

type Step = { label: string; title: string; body: string };

type Props = { media: MediaItem; steps: Step[] };

/**
 * The visual pins while three steps scroll past it. On small screens it is a
 * plain stack: pinning a half-height video on a phone helps nobody.
 */
export default function PinnedStory({ media, steps }: Props) {
  return (
    <div className="mt-16 grid gap-10 md:grid-cols-[1.15fr_1fr] md:gap-16">
      <div className="md:sticky md:top-[14vh] md:h-fit">
        <Media item={media} />
      </div>
      <div>
        {steps.map((step, i) => (
          <Reveal key={step.label} delay={i * 0.06}>
            <div className="flex flex-col justify-center border-t border-line py-10 first:border-t-0 first:pt-0 md:min-h-[62svh] md:border-t-0 md:py-0">
              <p className="label text-accent">{step.label}</p>
              <h3 className="mt-4 text-h3">{step.title}</h3>
              <p className="mt-4 max-w-prose text-body text-muted">{step.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
