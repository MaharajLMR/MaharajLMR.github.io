import VideoPlayer from './VideoPlayer';
import { asset } from '@/lib/asset';
import type { MediaItem } from '@/lib/types';

type Props = {
  item: MediaItem;
  priority?: boolean;
  className?: string;
  rounded?: boolean;
  /** Fill the parent instead of keeping the intrinsic aspect ratio. */
  fill?: boolean;
};

/**
 * One renderer for every picture and clip on the site. Images are pre-encoded
 * WebP at their display size; clips are muted, looping and silent by design.
 * Anything with a caption comes out as a figure with the caption set in mono.
 */
export default function Media({ item, priority = false, className = '', rounded = true, fill = false }: Props) {
  const shape = `${rounded ? 'rounded-card border border-line' : ''} ${
    fill ? 'h-full w-full object-cover' : 'h-auto w-full'
  } ${className}`;

  const inner =
    item.type === 'video' ? (
      <VideoPlayer item={item} className={shape} />
    ) : (
      // eslint-disable-next-line @next/next/no-img-element -- pre-optimised WebP, static export
      <img
        className={shape}
        src={asset(item.src)}
        alt={item.alt}
        {...(item.alt ? {} : { 'aria-hidden': true })}
        width={item.width}
        height={item.height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
      />
    );

  const framed =
    item.type === 'image' && item.frame ? (
      <span className="block rounded-card border border-line bg-white p-3 sm:p-5">{inner}</span>
    ) : (
      inner
    );

  if (fill || !item.caption) return framed;

  return (
    <figure>
      {framed}
      <figcaption className="label mt-4 text-muted">{item.caption}</figcaption>
    </figure>
  );
}
