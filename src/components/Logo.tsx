export function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Outer rounded square */}
      <rect
        x="1"
        y="1"
        width="30"
        height="30"
        rx="7"
        fill="oklch(0.55 0.190 255)"
      />
      {/* Inner sparkle */}
      <path
        d="M16 7l1.2 4.8L22 13l-4.8 1.2L16 19l-1.2-4.8L10 13l4.8-1.2z"
        fill="white"
      />
      {/* Document lines */}
      <rect x="10" y="20" width="8" height="1.5" rx="0.75" fill="white" opacity="0.6" />
      <rect x="10" y="23" width="6" height="1.5" rx="0.75" fill="white" opacity="0.4" />
    </svg>
  );
}
