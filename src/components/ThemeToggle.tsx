'use client';

import { useEffect, useState } from 'react';

type Mode = 'light' | 'dark';

/**
 * Follows the system until you click it, then sticks. localStorage can throw in
 * a private window, so every access is wrapped.
 */
export default function ThemeToggle() {
  const [mode, setMode] = useState<Mode | null>(null);

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = window.localStorage.getItem('theme');
    } catch {
      saved = null;
    }
    if (saved === 'light' || saved === 'dark') {
      setMode(saved);
      document.documentElement.dataset.theme = saved;
    }
  }, []);

  const next = () => {
    const current =
      mode ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const value: Mode = current === 'dark' ? 'light' : 'dark';
    setMode(value);
    document.documentElement.dataset.theme = value;
    try {
      window.localStorage.setItem('theme', value);
    } catch {
      /* ignore */
    }
  };

  return (
    <button
      type="button"
      onClick={next}
      className="flex h-11 w-11 items-center justify-center text-muted transition-colors hover:text-ink"
      aria-label="Switch between light and dark"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.3" />
        <path
          d="M8 1v1.8M8 13.2V15M1 8h1.8M13.2 8H15M3.1 3.1l1.3 1.3M11.6 11.6l1.3 1.3M12.9 3.1l-1.3 1.3M4.4 11.6l-1.3 1.3"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
