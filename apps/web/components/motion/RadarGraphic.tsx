"use client";

import { useEffect, useRef } from "react";

export function RadarGraphic() {
  const sweepRef = useRef<SVGGElement>(null);

  return (
    <div className="relative w-full aspect-square max-w-[260px] mx-auto flex items-center justify-center select-none">
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background base */}
        <circle cx="100" cy="100" r="90" fill="var(--ivory)" fillOpacity="0.6" />

        {/* Concentric rings */}
        <circle cx="100" cy="100" r="85" stroke="var(--burgundy)" strokeWidth="0.75" strokeOpacity="0.2" />
        <circle cx="100" cy="100" r="62" stroke="var(--burgundy)" strokeWidth="0.75" strokeOpacity="0.25" />
        <circle cx="100" cy="100" r="38" stroke="var(--burgundy)" strokeWidth="0.75" strokeOpacity="0.3" strokeDasharray="3 3" />
        <circle cx="100" cy="100" r="14" stroke="var(--burgundy)" strokeWidth="0.75" strokeOpacity="0.4" />

        {/* Crosshairs */}
        <line x1="10" y1="100" x2="190" y2="100" stroke="var(--burgundy)" strokeWidth="0.5" strokeOpacity="0.2" />
        <line x1="100" y1="10" x2="100" y2="190" stroke="var(--burgundy)" strokeWidth="0.5" strokeOpacity="0.2" />

        {/* Rotating radar sweep */}
        <g ref={sweepRef} className="origin-center animate-[spin_6s_linear_infinite]">
          <path
            d="M100 100 L185 100 A85 85 0 0 0 160 40 Z"
            fill="url(#radarSweepGradient)"
          />
          <line x1="100" y1="100" x2="185" y2="100" stroke="var(--burgundy)" strokeWidth="1.2" strokeOpacity="0.7" />
        </g>

        {/* Center pivot */}
        <circle cx="100" cy="100" r="3.5" fill="var(--burgundy)" />
        <circle cx="100" cy="100" r="7" stroke="var(--burgundy)" strokeWidth="1" strokeOpacity="0.5" className="animate-ping" />

        {/* Detected Targets */}
        {/* Target 1: Legal Risk detected */}
        <g transform="translate(136, 68)">
          <circle cx="0" cy="0" r="3.5" fill="var(--burgundy)" />
          <circle cx="0" cy="0" r="7" stroke="var(--burgundy)" strokeWidth="1" strokeOpacity="0.6" className="animate-pulse" />
        </g>

        {/* Target 2: Clause ambiguity */}
        <g transform="translate(64, 134)">
          <circle cx="0" cy="0" r="3" fill="var(--brass)" />
          <circle cx="0" cy="0" r="6" stroke="var(--brass)" strokeWidth="0.8" strokeOpacity="0.6" />
        </g>

        <defs>
          <radialGradient
            id="radarSweepGradient"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(100 100) rotate(20) scale(85)"
          >
            <stop stopColor="var(--burgundy)" stopOpacity="0.28" />
            <stop offset="1" stopColor="var(--burgundy)" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      {/* Flagged Pill 1: top right */}
      <div
        className="absolute top-[26%] right-[2%] bg-[var(--burgundy)] text-[var(--ivory)] text-[9px] font-sans font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full shadow-sm animate-bounce"
        style={{ animationDuration: "3s" }}
      >
        Notice Detected
      </div>

      {/* Flagged Pill 2: bottom left */}
      <div
        className="absolute bottom-[24%] left-[6%] bg-[var(--charcoal)] text-[var(--ivory)] text-[9px] font-sans font-medium px-2 py-0.5 rounded-full shadow-sm border border-[var(--stone-faint)]"
      >
        15-Day Deadline
      </div>
    </div>
  );
}
