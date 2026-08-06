export function RiskGauge({
  score,
  color,
  onDark = false,
}: {
  score: number;
  color: string;
  onDark?: boolean;
}) {
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(Math.max(score, 0), 10) / 10;
  const dash = circumference * pct;

  return (
    <svg
      viewBox="0 0 80 80"
      className="h-20 w-20 shrink-0"
      role="img"
      aria-label={`Risk score ${score} out of 10`}
    >
      <circle
        cx="40"
        cy="40"
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.15"
        strokeWidth="6"
        className={onDark ? "text-white" : "text-violet"}
      />
      <circle
        cx="40"
        cy="40"
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={`${dash} ${circumference}`}
        transform="rotate(-90 40 40)"
      />
      <text
        x="40"
        y="45"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={onDark ? "#FFFFFF" : "#1E1B33"}
      >
        {score}
        <tspan fontSize="9" dx="1">
          /10
        </tspan>
      </text>
    </svg>
  );
}
