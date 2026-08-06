import type { Verdict } from "@/lib/verdict";

const GLYPHS: Record<Verdict, string> = {
  yes: "✓",
  cautious: "!",
  "dont-sign": "✕",
};

export function Stamp({ verdict }: { verdict: Verdict }) {
  const ticks = Array.from({ length: 24 });
  return (
    <svg
      viewBox="0 0 140 140"
      className="pointer-events-none absolute -right-4 -top-5 h-24 w-24 select-none sm:h-28 sm:w-28"
      aria-hidden="true"
    >
      <g transform="rotate(-12 70 70)">
        <circle
          cx="70"
          cy="70"
          r="58"
          fill="none"
          stroke="#C99A3D"
          strokeWidth="2.5"
        />
        <circle
          cx="70"
          cy="70"
          r="49"
          fill="none"
          stroke="#C99A3D"
          strokeWidth="4.5"
        />
        {ticks.map((_, i) => {
          const a = (i / 24) * Math.PI * 2;
          const r1 = 49;
          const r2 = 56;
          return (
            <line
              key={i}
              x1={70 + r1 * Math.cos(a)}
              y1={70 + r1 * Math.sin(a)}
              x2={70 + r2 * Math.cos(a)}
              y2={70 + r2 * Math.sin(a)}
              stroke="#C99A3D"
              strokeWidth="1.5"
            />
          );
        })}
        <text
          x="70"
          y="62"
          textAnchor="middle"
          fontSize="10"
          letterSpacing="1.5"
          fill="#C99A3D"
          fontFamily="var(--font-jetbrains), monospace"
        >
          VERDICT
        </text>
        <text
          x="70"
          y="94"
          textAnchor="middle"
          fontSize="28"
          fontWeight="700"
          fill="#C99A3D"
          fontFamily="var(--font-poppins), sans-serif"
        >
          {GLYPHS[verdict]}
        </text>
      </g>
    </svg>
  );
}
