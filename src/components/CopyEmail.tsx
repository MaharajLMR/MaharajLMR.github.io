'use client';

import { useState } from 'react';

export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-current px-5 text-[17px] text-accent transition-colors duration-200 hover:bg-accent/10"
      onClick={() => {
        void navigator.clipboard.writeText(email).then(() => {
          setCopied(true);
          window.setTimeout(() => setCopied(false), 2000);
        });
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        {copied ? (
          <path d="M3 8.5 L6.5 12 L13 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <>
            <rect x="5.5" y="5.5" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.4" />
            <path d="M10.5 3.5h-6a2 2 0 0 0-2 2v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </>
        )}
      </svg>
      {copied ? 'Copied' : 'Copy email'}
      <span className="sr-only"> {email}</span>
    </button>
  );
}
