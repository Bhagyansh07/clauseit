export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <span className="gradient-bg flex h-9 w-9 items-center justify-center rounded-xl shadow-glow">
        <svg width="20" height="20" viewBox="0 0 64 64" aria-hidden="true">
          <path
            d="M18 14h19l9 9v28a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4V18a4 4 0 0 1 4-4z"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="5"
          />
          <path
            d="M23 30h18M23 37h13M23 23h10"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="font-display text-xl font-bold tracking-tight text-navy">
        Clause<span className="gradient-text">It</span>
      </span>
    </span>
  );
}
