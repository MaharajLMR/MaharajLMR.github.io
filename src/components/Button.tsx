import Link from 'next/link';
import type { ReactNode } from 'react';

type Props = {
  href: string;
  children: ReactNode;
  variant?: 'solid' | 'outline' | 'text';
  download?: boolean;
};

const BASE =
  'inline-flex min-h-[46px] items-center justify-center rounded-chip px-5 text-small font-medium transition-colors duration-200';

const VARIANT = {
  solid: 'bg-accent text-paper hover:brightness-[1.08]',
  outline: 'border border-line text-ink hover:border-ink',
  text: 'px-0 text-accent hover:underline underline-offset-4',
};

/** Internal links go through next/link so the deploy basePath is applied. */
export default function Button({ href, children, variant = 'solid', download }: Props) {
  const className = `${BASE} ${VARIANT[variant]}`;
  if (href.startsWith('/')) {
    return (
      <Link href={href} className={className} {...(download ? { download: '' } : {})}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} target="_blank" rel="noreferrer noopener">
      {children}
    </a>
  );
}
