type Props = { className?: string; size?: number };

// Stacked color squares from the MNZ logo, rebuilt as inline SVG
// so we can animate, recolor, and use as a brand motif anywhere.
export function MnzMark({ className, size = 56 }: Props) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <g>
        <rect x="6" y="40" width="36" height="36" rx="4" fill="var(--mnz-green)" transform="rotate(-18 24 58)" />
        <rect x="10" y="28" width="36" height="36" rx="4" fill="var(--mnz-blue)" transform="rotate(-10 28 46)" />
        <rect x="16" y="18" width="36" height="36" rx="4" fill="var(--mnz-cyan)" transform="rotate(-2 34 36)" />
        <rect x="24" y="12" width="36" height="36" rx="4" fill="var(--mnz-yellow)" transform="rotate(8 42 30)" />
        <rect x="34" y="8" width="38" height="38" rx="4" fill="var(--mnz-red)" transform="rotate(18 53 27)" />
      </g>
    </svg>
  );
}
