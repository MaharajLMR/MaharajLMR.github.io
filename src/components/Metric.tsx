'use client';

import { animate, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

type Props = { value: string; unit: string; label: string; context?: string };

/** Counts up once if the value is a plain number; otherwise shows it as written. */
function useCountUp(value: string, start: boolean): string {
  const numeric = Number(value.replace(/,/g, ''));
  const countable = Number.isFinite(numeric) && Math.abs(numeric) >= 1 && Math.abs(numeric) < 1e6;
  const decimals = value.includes('.') ? (value.split('.')[1] ?? '').length : 0;
  const [shown, setShown] = useState(countable ? '0' : value);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!countable) return;
    if (!start || reduced) {
      setShown(value);
      return;
    }
    const controls = animate(0, numeric, {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setShown(latest.toFixed(decimals)),
      onComplete: () => setShown(value),
    });
    return () => controls.stop();
  }, [countable, start, reduced, numeric, decimals, value]);

  return countable ? shown : value;
}

export default function Metric({ value, unit, label, context }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const shown = useCountUp(value, inView);

  return (
    <div ref={ref}>
      <p className="tabular font-mono text-metric">
        {shown}
        {unit ? <span className="ml-1.5 text-[0.36em] font-normal tracking-normal text-muted">{unit}</span> : null}
      </p>
      <p className="label mt-4 text-ink">{label}</p>
      {context ? <p className="mt-2 max-w-[36ch] text-small text-muted">{context}</p> : null}
    </div>
  );
}
