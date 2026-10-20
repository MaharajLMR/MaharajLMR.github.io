import type { ArchitectureStage } from '@/lib/types';

type Props = { stages: ArchitectureStage[]; title: string };

const BOX_W = 232;
const GAP = 28;
const HEAD = 34;
const ROW = 22;
const PAD = 16;

/**
 * Data-driven architecture diagram: one box per stage, arrows between them.
 * Drawn as SVG so it stays sharp and inherits the band's colours.
 */
export default function ArchitectureDiagram({ stages, title }: Props) {
  const heights = stages.map((s) => HEAD + s.items.length * ROW + PAD);
  const height = Math.max(...heights) + 8;
  const width = stages.length * BOX_W + (stages.length - 1) * GAP;

  return (
    <figure className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        role="img"
        aria-label={`Architecture of ${title}: ${stages.map((s) => s.title).join(' then ')}`}
        className="h-auto w-full min-w-[720px]"
      >
        <defs>
          <marker id="arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0 L8 4 L0 8 z" fill="var(--border)" />
          </marker>
        </defs>
        {stages.map((stage, i) => {
          const x = i * (BOX_W + GAP);
          const h = heights[i] as number;
          const y = (height - h) / 2;
          return (
            <g key={stage.title}>
              <rect
                x={x}
                y={y}
                width={BOX_W}
                height={h}
                rx="14"
                fill="var(--surface)"
                stroke="var(--border)"
              />
              <text x={x + 16} y={y + 23} fill="var(--accent)" fontSize="13" fontWeight="600">
                {stage.title}
              </text>
              {stage.items.map((item, j) => (
                <text
                  key={item}
                  x={x + 16}
                  y={y + HEAD + 12 + j * ROW}
                  fill="var(--text-secondary)"
                  fontSize="12.5"
                >
                  {item.length > 36 ? `${item.slice(0, 35)}…` : item}
                </text>
              ))}
              {i < stages.length - 1 ? (
                <line
                  x1={x + BOX_W + 5}
                  y1={height / 2}
                  x2={x + BOX_W + GAP - 7}
                  y2={height / 2}
                  stroke="var(--border)"
                  strokeWidth="1.5"
                  markerEnd="url(#arrow)"
                />
              ) : null}
            </g>
          );
        })}
      </svg>
    </figure>
  );
}
