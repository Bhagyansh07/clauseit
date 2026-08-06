export function Logo() {
  return (
    <span className="flex items-center gap-2">
      <svg width="30" height="30" viewBox="0 0 64 64" aria-hidden="true">
        <rect width="64" height="64" rx="14" fill="#0F1B2D" />
        <path
          d="M18 14h19l9 9v28a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4V18a4 4 0 0 1 4-4z"
          fill="none"
          stroke="#D4A837"
          strokeWidth="3.5"
        />
        <path
          d="M23 30h18M23 37h13M23 23h10"
          stroke="#FAF9F6"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      <span className="font-display text-xl font-semibold tracking-tight text-navy">
        Clause<span className="text-gold">It</span>
      </span>
    </span>
  );
}
