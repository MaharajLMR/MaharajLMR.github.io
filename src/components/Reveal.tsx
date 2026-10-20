'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'li' | 'section';
};

/** Fade in and rise 24px, once, when 20% of the element is visible. */
export default function Reveal({ children, delay = 0, className, as = 'div' }: Props) {
  const reduced = useReducedMotion();
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduced ? 0.01 : 0.6, ease: [0.16, 1, 0.3, 1], delay: reduced ? 0 : delay }}
    >
      {children}
    </Tag>
  );
}
