"use client";

import { useEffect, useState } from "react";

const STARS = [
  { x: 5, y: 8, s: 2, o: 0.15 },
  { x: 18, y: 5, s: 1, o: 0.08 },
  { x: 35, y: 14, s: 2, o: 0.12 },
  { x: 52, y: 6, s: 1.5, o: 0.09 },
  { x: 70, y: 12, s: 1, o: 0.07 },
  { x: 88, y: 9, s: 2, o: 0.11 },
  { x: 12, y: 28, s: 1, o: 0.06 },
  { x: 42, y: 32, s: 1.5, o: 0.08 },
  { x: 78, y: 35, s: 2, o: 0.10 },
  { x: 92, y: 25, s: 1, o: 0.07 },
  { x: 25, y: 55, s: 1.5, o: 0.09 },
  { x: 60, y: 60, s: 1, o: 0.06 },
  { x: 8, y: 75, s: 2, o: 0.11 },
  { x: 85, y: 72, s: 1, o: 0.07 },
  { x: 45, y: 85, s: 1.5, o: 0.08 },
  { x: 95, y: 90, s: 2, o: 0.10 },
  { x: 15, y: 93, s: 1, o: 0.06 },
];

export function StarryBackground() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden starry-bg" aria-hidden="true">
      {STARS.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full starry-dot"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.s}px`,
            height: `${star.s}px`,
            opacity: star.o,
            background: `radial-gradient(circle, rgba(255,215,106,0.6) 0%, transparent 70%)`,
            animationDuration: `${3 + (i % 4)}s`,
            animationDelay: `${(i * 0.6).toFixed(1)}s`,
          }}
        />
      ))}
    </div>
  );
}
