"use client";

import React, { useRef } from "react";

export function RadarGraphic() {
  const sweepRef = useRef<SVGGElement>(null);

  return (
    <div className="relative w-full aspect-square max-w-[205px] mx-auto flex items-center justify-center select-none">
      {/* 1. Underlying Soft Glow */}
      <div className="absolute inset-3 rounded-full bg-[#B8935A]/20 blur-lg pointer-events-none" />

      {/* 2. Main Radar Console with Solid Porcelain Base Disc */}
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full relative z-10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: "drop-shadow(0 10px 22px rgba(0,0,0,0.12))" }}
      >
        <defs>
          {/* Porcelain Disc Shading */}
          <radialGradient id="radarPorcelainBase" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="65%" stopColor="#FAF7F2" />
            <stop offset="100%" stopColor="#EFE8DE" />
          </radialGradient>

          {/* Brass Bevel Ring */}
          <linearGradient id="brassBevel" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="25%" stopColor="#E5B56A" />
            <stop offset="70%" stopColor="#B8935A" />
            <stop offset="100%" stopColor="#6E1F1F" stopOpacity="0.8" />
          </linearGradient>

          {/* Radar Sweep Gradient */}
          <radialGradient
            id="radarSweepGradient"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(100 100) rotate(20) scale(85)"
          >
            <stop stopColor="#6E1F1F" stopOpacity="0.45" />
            <stop offset="0.6" stopColor="#B8935A" stopOpacity="0.2" />
            <stop offset="1" stopColor="#6E1F1F" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer Solid Porcelain Base Disc */}
        <circle
          cx="100"
          cy="100"
          r="92"
          fill="url(#radarPorcelainBase)"
          stroke="url(#brassBevel)"
          strokeWidth="2.5"
        />

        {/* Concentric rings in crisp Lawgic Burgundy */}
        <circle cx="100" cy="100" r="82" stroke="#6E1F1F" strokeWidth="0.8" strokeOpacity="0.28" />
        <circle cx="100" cy="100" r="60" stroke="#6E1F1F" strokeWidth="0.9" strokeOpacity="0.36" />
        <circle cx="100" cy="100" r="38" stroke="#6E1F1F" strokeWidth="1" strokeOpacity="0.45" strokeDasharray="3 3" />
        <circle cx="100" cy="100" r="16" stroke="#6E1F1F" strokeWidth="1.2" strokeOpacity="0.6" />

        {/* Crosshairs */}
        <line x1="16" y1="100" x2="184" y2="100" stroke="#6E1F1F" strokeWidth="0.75" strokeOpacity="0.3" />
        <line x1="100" y1="16" x2="100" y2="184" stroke="#6E1F1F" strokeWidth="0.75" strokeOpacity="0.3" />

        {/* Rotating radar sweep */}
        <g ref={sweepRef} className="origin-center animate-[spin_5s_linear_infinite]">
          <path
            d="M100 100 L182 100 A82 82 0 0 0 158 42 Z"
            fill="url(#radarSweepGradient)"
          />
          <line x1="100" y1="100" x2="182" y2="100" stroke="#6E1F1F" strokeWidth="1.5" strokeOpacity="0.85" />
        </g>

        {/* Center pivot */}
        <circle cx="100" cy="100" r="4" fill="#6E1F1F" />

        {/* Detected Targets */}
        <g transform="translate(138, 66)">
          <circle cx="0" cy="0" r="3.5" fill="#6E1F1F" />
          <circle cx="0" cy="0" r="7" stroke="#6E1F1F" strokeWidth="1.2" strokeOpacity="0.7" />
        </g>

        <g transform="translate(62, 136)">
          <circle cx="0" cy="0" r="3" fill="#B8935A" />
          <circle cx="0" cy="0" r="6" stroke="#B8935A" strokeWidth="0.9" strokeOpacity="0.7" />
        </g>
      </svg>

      {/* 3. Solid Static Status Badges (Completely Still, No Floating / Bouncing) */}
      {/* Pill 1: Top Right - Notice Detected */}
      <div
        className="absolute top-[14%] right-[0%] z-20 bg-[#6E1F1F] text-white text-[8.5px] font-sans font-bold tracking-wider uppercase px-2 py-0.5 rounded-full shadow-[0_4px_12px_rgba(110,31,31,0.25)] border border-white/30 flex items-center gap-1.5"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#FBBF24]" />
        Notice Detected
      </div>

      {/* Pill 2: Bottom Left - 15-Day Deadline */}
      <div
        className="absolute bottom-[14%] left-[0%] z-20 bg-[#1C1917] text-[#FAF7F0] text-[8.5px] font-sans font-medium px-2 py-0.5 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.2)] border border-white/20 flex items-center gap-1.5"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]" />
        15-Day Deadline
      </div>
    </div>
  );
}
