// Decorative color-blocks anchored to the corners of a section,
// echoing the MNZ logo motif. Purely presentational.
type Corner = "tl" | "tr" | "bl" | "br";

const positions: Record<Corner, string> = {
  tl: "top-0 left-0 -translate-x-1/3 -translate-y-1/3",
  tr: "top-0 right-0 translate-x-1/3 -translate-y-1/3",
  bl: "bottom-0 left-0 -translate-x-1/3 translate-y-1/3",
  br: "bottom-0 right-0 translate-x-1/3 translate-y-1/3",
};

export function CornerBlocks({
  corner = "tr",
  size = 220,
  className = "",
}: {
  corner?: Corner;
  size?: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute ${positions[corner]} z-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <div className="relative h-full w-full">
        <div
          className="absolute rounded-[14%] shadow-2xl"
          style={{
            inset: "20% 30% 30% 5%",
            background: "var(--mnz-green)",
            transform: "rotate(-16deg)",
          }}
        />
        <div
          className="absolute rounded-[14%] shadow-2xl"
          style={{
            inset: "10% 20% 30% 15%",
            background: "var(--mnz-blue)",
            transform: "rotate(-6deg)",
          }}
        />
        <div
          className="absolute rounded-[14%] shadow-2xl"
          style={{
            inset: "5% 10% 35% 25%",
            background: "var(--mnz-cyan)",
            transform: "rotate(4deg)",
          }}
        />
        <div
          className="absolute rounded-[14%] shadow-2xl"
          style={{
            inset: "0% 5% 40% 35%",
            background: "var(--mnz-yellow)",
            transform: "rotate(14deg)",
          }}
        />
        <div
          className="absolute rounded-[14%] shadow-2xl"
          style={{
            inset: "-5% 0% 45% 45%",
            background: "var(--mnz-red)",
            transform: "rotate(24deg)",
          }}
        />
      </div>
    </div>
  );
}
