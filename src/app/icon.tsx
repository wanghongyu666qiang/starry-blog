import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fefce8",
          borderRadius: "20%",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 120 120" fill="none">
          <defs>
            <linearGradient id="sg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#EF4444" />
            </linearGradient>
          </defs>
          {/* Orbit arc */}
          <path
            d="M 15 80 A 55 35 0 0 1 90 20"
            stroke="#F59E0B"
            strokeWidth="1.5"
            fill="none"
            opacity="0.25"
          />
          {/* Geometric S */}
          <line x1="20" y1="18" x2="72" y2="18" stroke="url(#sg)" strokeWidth="5" strokeLinecap="round" />
          <line x1="72" y1="18" x2="30" y2="55" stroke="url(#sg)" strokeWidth="5" strokeLinecap="round" />
          <line x1="30" y1="55" x2="82" y2="55" stroke="url(#sg)" strokeWidth="5" strokeLinecap="round" />
          <line x1="82" y1="55" x2="22" y2="95" stroke="url(#sg)" strokeWidth="5" strokeLinecap="round" />
          <line x1="22" y1="95" x2="68" y2="95" stroke="url(#sg)" strokeWidth="5" strokeLinecap="round" />
          {/* Star dot */}
          <circle cx="85" cy="22" r="3" fill="#F59E0B" opacity="0.2" />
          <circle cx="85" cy="22" r="1.5" fill="#F59E0B" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
