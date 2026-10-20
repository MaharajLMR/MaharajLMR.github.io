'use client';

import { useEffect, useRef, useState } from 'react';

import { asset } from '@/lib/asset';
import type { MediaItem } from '@/lib/types';

type Props = { item: MediaItem; className: string };

/**
 * A clip shows its poster until the page has finished loading and the clip is
 * close to the viewport, then loads and plays. The poster carries the clip's
 * exact dimensions, so the swap moves nothing.
 */
export default function VideoPlayer({ item, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const poster = item.poster ? asset(item.poster) : undefined;
  const label = item.alt ? { 'aria-label': item.alt } : { 'aria-hidden': true as const };

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let observer: IntersectionObserver | undefined;
    const arm = () => {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            setActive(true);
            observer?.disconnect();
          }
        },
        { rootMargin: '300px' },
      );
      observer.observe(node);
    };

    if (document.readyState === 'complete') arm();
    else window.addEventListener('load', arm, { once: true });

    return () => {
      window.removeEventListener('load', arm);
      observer?.disconnect();
    };
  }, []);

  if (active) {
    return (
      <video
        className={className}
        width={item.width}
        height={item.height}
        poster={poster}
        preload="auto"
        autoPlay
        muted
        loop
        playsInline
        {...label}
      >
        <source src={asset(item.src)} type="video/mp4" />
      </video>
    );
  }

  return (
    <div ref={ref} className="contents">
      {/* eslint-disable-next-line @next/next/no-img-element -- pre-encoded WebP poster */}
      <img
        className={className}
        src={poster}
        alt={item.alt}
        {...(item.alt ? {} : { 'aria-hidden': true })}
        width={item.width}
        height={item.height}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
