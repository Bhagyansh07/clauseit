export function Logo() {
  return (
    <span className="flex items-center gap-2">
      <svg width="30" height="30" viewBox="0 0 64 64" aria-hidden="true">
        <defs>
          <linearGradient id="clauseit-logo" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#0052FF" />
            <stop offset="1" stopColor="#4D7CFF" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="14" fill="url(#clauseit-logo)" />
        <path
          d="M18 14h19l9 9v28a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4V18a4 4 0 0 1 4-4z"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="3.5"
        />
        <path
          d="M23 30h18M23 37h13M23 23h10"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      <span className="font-display text-xl tracking-tight text-foreground">
        Clause<span className="gradient-text">It</span>
      </span>
    </span>
  );
}
