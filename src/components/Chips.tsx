type Props = { items: string[]; label?: string };

/** Stack chips: mono, square corners, hairline border. */
export default function Chips({ items, label }: Props) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label={label ?? 'Stack'}>
      {items.map((item) => (
        <li key={item} className="label rounded-chip border border-line px-2.5 py-1.5 text-muted">
          {item}
        </li>
      ))}
    </ul>
  );
}
