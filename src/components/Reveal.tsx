'use client';

import { m, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'li' | 'section';
  /**
   * First-screen content rises without fading. An element that starts at
   * opacity 0 is not painted, which pushes largest-contentful-paint out by the
   * whole hydration plus animation time.
   */
  fade?: boolean;
};

/** Fade in and rise 24px, once, when 20% of the element is visible. */
export default function Reveal({ children, delay = 0, className, as = 'div', fade = true }: Props) {
  const reduced = useReducedMotion();
  const Tag = m[as];
  const from = fade ? { opacity: 0, y: 24 } : { opacity: 1, y: 24 };

  return (
    <Tag
      className={className}
      initial={reduced ? { opacity: 1 } : from}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduced ? 0.01 : 0.6, ease: [0.16, 1, 0.3, 1], delay: reduced ? 0 : delay }}
    >
      {children}
    </Tag>
  );
}
