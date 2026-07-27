const STARS = [
  [5, 8, 2, 0.15],
  [18, 5, 1, 0.08],
  [35, 14, 2, 0.12],
  [52, 6, 1.5, 0.09],
  [70, 12, 1, 0.07],
  [88, 9, 2, 0.11],
  [12, 28, 1, 0.06],
  [42, 32, 1.5, 0.08],
  [78, 35, 2, 0.1],
  [92, 25, 1, 0.07],
  [25, 55, 1.5, 0.09],
  [60, 60, 1, 0.06],
  [8, 75, 2, 0.11],
  [85, 72, 1, 0.07],
  [45, 85, 1.5, 0.08],
  [95, 90, 2, 0.1],
  [15, 93, 1, 0.06],
] as const;

export function StarryBackground() {
  return (
    <div
      className="starry-bg pointer-events-none fixed inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {STARS.map(([x, y, size, opacity], index) => (
        <span
          key={`${x}-${y}`}
          className="starry-dot absolute rounded-full"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            width: `${size}px`,
            height: `${size}px`,
            opacity,
            background:
              "radial-gradient(circle, rgba(255,215,106,0.6) 0%, transparent 70%)",
            animationDuration: `${3 + (index % 4)}s`,
            animationDelay: `${(index * 0.6).toFixed(1)}s`,
          }}
        />
      ))}
    </div>
  );
}
