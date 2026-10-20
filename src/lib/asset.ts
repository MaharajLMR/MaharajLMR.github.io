const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/** Prefixes a public asset path with the deploy basePath. */
export function asset(src: string): string {
  return `${BASE}${src}`;
}
