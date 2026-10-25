type Props = { index?: number; children: string; className?: string };

/** Mono label with a short accent rule, and the band number when it has one. */
export default function Eyebrow({ index, children, className = '' }: Props) {
  return (
    <p className={`label flex items-center gap-3 text-muted ${className}`}>
      <span aria-hidden="true" className="h-px w-6 bg-accent" />
      {index !== undefined ? (
        <span className="tabular text-accent">{String(index).padStart(2, '0')}</span>
      ) : null}
      <span>{children}</span>
    </p>
  );
}
