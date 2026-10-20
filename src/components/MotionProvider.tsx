'use client';

import { LazyMotion } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * The animation engine is fetched as its own chunk after hydration, so it never
 * sits on the critical path. Only the DOM animation features are loaded, which
 * is all this site uses.
 */
const features = () => import('framer-motion').then((mod) => mod.domAnimation);

export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={features} strict>
      {children}
    </LazyMotion>
  );
}
