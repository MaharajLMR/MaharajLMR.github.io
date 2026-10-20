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
 */
export default function Media({ item, priority = false, className = '', rounded = true, fill = false }: Props) {
  const shape = `${rounded ? 'rounded-card' : ''} ${fill ? 'h-full w-full object-cover' : 'h-auto w-full'} ${className}`;

  if (item.type === 'video') {
    return <VideoPlayer item={item} className={shape} />;
  }

  const image = (
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

  if (!item.frame) return image;

  return <span className="block rounded-card bg-white p-3 sm:p-5">{image}</span>;
}
