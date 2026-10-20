import type { ArchitectureStage } from '@/lib/types';

type Props = { stages: ArchitectureStage[]; title: string };

const WIDTH = 1000;
const TITLE_W = 200;
const PAD_X = 20;
const LINE_H = 23;
const BOX_PAD_Y = 18;
const GAP = 30;
const WRAP = 58;

/** Greedy word wrap, because SVG text does not wrap on its own. */
function wrap(text: string, max: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let line = '';
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length > max && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/**
 * Data-driven architecture diagram: one row per stage, items wrapped inside it,
 * arrows pointing down the flow. SVG, so it stays sharp and uses the band's colours.
 */
export default function ArchitectureDiagram({ stages, title }: Props) {
  const rows = stages.map((stage) => {
    const lines = stage.items.map((item) => wrap(item, WRAP));
    const count = lines.reduce((total, l) => total + l.length, 0);
    return { stage, lines, height: count * LINE_H + BOX_PAD_Y * 2 };
  });

  const height = rows.reduce((total, row) => total + row.height + GAP, 0) - GAP;

  let y = 0;
  const placed = rows.map((row) => {
    const top = y;
    y += row.height + GAP;
    return { ...row, top };
  });

  return (
    <figure>
      {/* Below the small breakpoint the same stages are a list: an SVG this wide
          would either scroll sideways or shrink past reading size. */}
      <ol className="space-y-4 lg:hidden">
        {stages.map((stage, i) => (
          <li key={stage.title} className="rounded-card border border-line p-5">
            <p className="text-small font-semibold text-accent">
              {i + 1}. {stage.title}
            </p>
            <ul className="mt-3 space-y-2">
              {stage.items.map((item) => (
                <li key={item} className="flex gap-3 text-small text-ink-secondary">
                  <span aria-hidden="true" className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      <svg
        viewBox={`0 0 ${WIDTH} ${height}`}
        width={WIDTH}
        height={height}
        role="img"
        aria-label={`Architecture of ${title}: ${stages
          .map((s) => `${s.title} — ${s.items.join(', ')}`)
          .join('; then ')}`}
        className="hidden h-auto w-full lg:block"
      >
        <defs>
          <marker id="arrow-down" viewBox="0 0 8 8" refX="4" refY="7" markerWidth="8" markerHeight="8" orient="0">
            <path d="M0 0 L4 8 L8 0" fill="none" stroke="var(--border)" strokeWidth="1.4" />
          </marker>
        </defs>

        {placed.map((row, i) => {
          let lineIndex = 0;
          return (
            <g key={row.stage.title}>
              <rect
                x="0"
                y={row.top}
                width={WIDTH}
                height={row.height}
                rx="14"
                fill="var(--surface)"
                stroke="var(--border)"
              />
              <text x={PAD_X} y={row.top + BOX_PAD_Y + 15} fill="var(--accent)" fontSize="15" fontWeight="600">
                {row.stage.title}
              </text>
              {row.lines.map((lines, itemIndex) =>
                lines.map((line, j) => {
                  const dy = row.top + BOX_PAD_Y + 15 + lineIndex * LINE_H;
                  lineIndex += 1;
                  return (
                    <g key={`${itemIndex}-${j}`}>
                      {j === 0 ? (
                        <circle cx={TITLE_W + 4} cy={dy - 5} r="2.5" fill="var(--accent)" opacity="0.6" />
                      ) : null}
                      <text x={TITLE_W + 18} y={dy} fill="var(--text-secondary)" fontSize="14.5">
                        {line}
                      </text>
                    </g>
                  );
                }),
              )}
              {i < placed.length - 1 ? (
                <line
                  x1={TITLE_W / 2}
                  y1={row.top + row.height + 4}
                  x2={TITLE_W / 2}
                  y2={row.top + row.height + GAP - 6}
                  stroke="var(--border)"
                  strokeWidth="1.5"
                  markerEnd="url(#arrow-down)"
                />
              ) : null}
            </g>
          );
        })}
      </svg>
    </figure>
  );
}
