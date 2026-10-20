import Link from 'next/link';
import type { ReactNode } from 'react';

type Props = {
  href: string;
  children: ReactNode;
  variant?: 'solid' | 'outline' | 'text';
  download?: boolean;
};

const BASE =
  'inline-flex min-h-[44px] items-center justify-center rounded-full px-6 text-[17px] transition-colors duration-200';

const VARIANT = {
  solid: 'bg-accent text-white hover:brightness-110',
  outline: 'border border-current text-accent hover:bg-accent/10',
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
