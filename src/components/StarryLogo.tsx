"use client";

import { useId } from "react";

interface StarryLogoProps {
  size: number;
  animated?: boolean;
  watermark?: boolean;
}

export function StarryLogo({ size, animated = false, watermark = false }: StarryLogoProps) {
  const uid = useId().replace(/:/g, "");
  const sGradId = `sGrad-${uid}`;
  const starGlowId = `starGlow-${uid}`;

  // SVG constants
  const vb = { w: 120, h: 120, cx: 60, cy: 60 };
  const starX = 85;
  const starY = 22;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${vb.w} ${vb.h}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`group ${
        watermark
          ? "opacity-[0.06]"
          : "transition-opacity duration-300"
      }`}
      style={{ opacity: watermark ? 0.06 : undefined }}
      aria-hidden="true"
    >
      <defs>
        {/* Warm gradient for the S */}
        <linearGradient id={sGradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#EF4444" />
        </linearGradient>

        {/* Star glow filter */}
        <filter id={starGlowId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ── Orbit arc (partial ellipse, bottom-left → top-right) ── */}
      <path
        d="M 15 80 A 55 35 0 0 1 90 20"
        stroke="#F59E0B"
        strokeWidth="1.5"
        strokeDasharray="200"
        fill="none"
        opacity={0.35}
        className={animated ? "motion-safe:animate-[draw-orbit_700ms_ease-out_both]" : undefined}
      />

      {/* ── Geometric S ── */}
      <g
        className={animated ? "motion-safe:animate-[logo-reveal_500ms_200ms_ease-out_both]" : undefined}
      >
        {/* Top horizontal */}
        <line x1="20" y1="18" x2="72" y2="18" stroke={`url(#${sGradId})`} strokeWidth="5" strokeLinecap="round" />
        {/* Diagonal to middle */}
        <line x1="72" y1="18" x2="30" y2="55" stroke={`url(#${sGradId})`} strokeWidth="5" strokeLinecap="round" />
        {/* Mid horizontal */}
        <line x1="30" y1="55" x2="82" y2="55" stroke={`url(#${sGradId})`} strokeWidth="5" strokeLinecap="round" />
        {/* Diagonal to bottom */}
        <line x1="82" y1="55" x2="22" y2="95" stroke={`url(#${sGradId})`} strokeWidth="5" strokeLinecap="round" />
        {/* Bottom horizontal */}
        <line x1="22" y1="95" x2="68" y2="95" stroke={`url(#${sGradId})`} strokeWidth="5" strokeLinecap="round" />
      </g>

      {/* ── Star dot at end of orbit ── */}
      <g
        filter={`url(#${starGlowId})`}
        className={`${animated ? "motion-safe:animate-[logo-reveal_500ms_450ms_ease-out_both]" : ""} motion-safe:transition-transform motion-safe:duration-500 ${watermark ? "" : "group-hover:translate-x-1 group-hover:-translate-y-1"}`}
      >
          {/* Outer glow ring */}
          <circle
            cx={starX}
            cy={starY}
            r="8"
            fill="#FFD76A"
            opacity={0.15}
            className="motion-safe:transition-all motion-safe:duration-500"
          />
          {/* Star body */}
          <circle
            cx={starX}
            cy={starY}
            r="3.5"
            fill="#FFD76A"
            className="motion-safe:transition-all motion-safe:duration-500"
          />
          {/* Star point */}
          <path
            d={`M ${starX} ${starY - 6} L ${starX + 1.5} ${starY - 2} L ${starX + 6} ${starY} L ${starX + 1.5} ${starY + 2} L ${starX} ${starY + 6} L ${starX - 1.5} ${starY + 2} L ${starX - 6} ${starY} L ${starX - 1.5} ${starY - 2} Z`}
            fill="#FFD76A"
            className="motion-safe:transition-all motion-safe:duration-500"
          />
      </g>
    </svg>
  );
}
