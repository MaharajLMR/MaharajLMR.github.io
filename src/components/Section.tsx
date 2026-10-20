import type { ReactNode } from 'react';

export type Tone = 'light' | 'alt' | 'dark';

const TONE_CLASS: Record<Tone, string> = {
  light: 'bg-surface text-ink',
  alt: 'bg-surface-alt text-ink',
  dark: 'band-dark',
};

type Props = {
  id?: string;
  tone?: Tone;
  children: ReactNode;
  className?: string;
  labelledBy?: string;
  full?: boolean;
};

/** One full-width band. Content is centred at 1080px unless `full` is set. */
export default function Section({ id, tone = 'light', children, className = '', labelledBy, full }: Props) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`${TONE_CLASS[tone]} py-band-sm md:py-band ${className}`}
    >
      <div className={full ? '' : 'mx-auto w-full max-w-content px-6 md:px-10'}>{children}</div>
    </section>
  );
}
