import Link from 'next/link';

import type { Site } from '@/lib/types';

export default function Footer({ site, updated }: { site: Site; updated: string }) {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto flex w-full max-w-content flex-col gap-4 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-10">
        <p className="label text-muted">
          {site.name}, {site.location}
        </p>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link className="label text-muted transition-colors hover:text-ink" href="/#work">
                Work
              </Link>
            </li>
            <li>
              <Link className="label text-muted transition-colors hover:text-ink" href="/resume/">
                Resume
              </Link>
            </li>
            <li>
              <a className="label text-muted transition-colors hover:text-ink" href={site.github} target="_blank" rel="noreferrer noopener">
                GitHub
              </a>
            </li>
            <li>
              <a className="label text-muted transition-colors hover:text-ink" href={site.linkedin} target="_blank" rel="noreferrer noopener">
                LinkedIn
              </a>
            </li>
          </ul>
        </nav>
        <p className="label text-muted">Updated {updated}</p>
      </div>
    </footer>
  );
}
