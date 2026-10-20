type Props = { items: string[]; label?: string };

/** Stack chips. Plain text, no icons. */
export default function Chips({ items, label }: Props) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label={label ?? 'Stack'}>
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full border border-line px-3 py-1 text-small text-ink-secondary"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
