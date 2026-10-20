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
      duration: 1.2,
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
      <p className="text-metric tabular">
        {shown}
        {unit ? (
          <span className="ml-2 whitespace-nowrap text-[0.4em] font-normal tracking-normal text-ink-secondary">
            {unit}
          </span>
        ) : null}
      </p>
      <p className="mt-2 text-small font-medium">{label}</p>
      {context ? <p className="mt-1 max-w-[34ch] text-small text-ink-secondary">{context}</p> : null}
    </div>
  );
}
