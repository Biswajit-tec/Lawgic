"use client";

import React, { useState } from "react";

// Compass ring letters (A through P)
const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P"];

// Precompute static geometry
const tickLines = Array.from({ length: 48 }).map((_, i) => {
  const angle = (i * 360) / 48;
  const rad = (angle * Math.PI) / 180;
  const isMajor = i % 4 === 0;
  const rOuter = isMajor ? 90 : 86;
  return {
    id: i,
    x1: Math.round((100 + 80 * Math.cos(rad)) * 100) / 100,
    y1: Math.round((100 + 80 * Math.sin(rad)) * 100) / 100,
    x2: Math.round((100 + rOuter * Math.cos(rad)) * 100) / 100,
    y2: Math.round((100 + rOuter * Math.sin(rad)) * 100) / 100,
    isMajor,
  };
});

const letterPositions = letters.map((letter, i) => {
  const angle = (i * 360) / letters.length;
  const rad = (angle * Math.PI) / 180;
  return {
    letter,
    x: Math.round((100 + 68 * Math.cos(rad)) * 100) / 100,
    y: Math.round((100 + 68 * Math.sin(rad)) * 100) / 100,
  };
});

export function CompassDialGraphic() {
  const [rotation, setRotation] = useState(0);

  return (
    <div
      onClick={() => setRotation((prev) => prev + 45)}
      className="relative w-full aspect-square max-w-[205px] mx-auto flex items-center justify-center select-none cursor-pointer"
    >
      {/* 1. Underlying Soft Glow */}
      <div className="absolute inset-3 rounded-full bg-[#A05A44]/20 blur-lg pointer-events-none" />

      {/* 2. Main Dial with Solid Porcelain Base Disc */}
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full relative z-10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: "drop-shadow(0 10px 22px rgba(0,0,0,0.12))" }}
      >
        <defs>
          <radialGradient id="compassPorcelainBase" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="65%" stopColor="#FAF7F2" />
            <stop offset="100%" stopColor="#EFE8DE" />
          </radialGradient>

          <linearGradient id="espressoBevel" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="30%" stopColor="#A05A44" />
            <stop offset="70%" stopColor="#4F2B1F" />
            <stop offset="100%" stopColor="#2D1710" />
          </linearGradient>
        </defs>

        {/* Outer Solid Porcelain Base Disc */}
        <circle
          cx="100"
          cy="100"
          r="93"
          fill="url(#compassPorcelainBase)"
          stroke="url(#espressoBevel)"
          strokeWidth="2.5"
        />

        {/* Rotating Dial Ring */}
        <g
          className="origin-center transition-transform duration-700 ease-out"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {/* Outer tick rings in rich Lawgic Espresso */}
          <circle cx="100" cy="100" r="90" stroke="#4F2B1F" strokeWidth="0.8" strokeOpacity="0.32" />
          <circle cx="100" cy="100" r="78" stroke="#4F2B1F" strokeWidth="0.6" strokeOpacity="0.22" />

          {/* 48 fine tick marks around the perimeter */}
          {tickLines.map((line) => (
            <line
              key={line.id}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="#4F2B1F"
              strokeWidth={line.isMajor ? "1.2" : "0.6"}
              strokeOpacity={line.isMajor ? "0.55" : "0.25"}
            />
          ))}

          {/* Letters around the inner ring */}
          {letterPositions.map((pos) => (
            <text
              key={pos.letter}
              x={pos.x}
              y={pos.y + 3}
              textAnchor="middle"
              fontSize="6.5"
              fontWeight="bold"
              fontFamily="var(--font-sans), monospace"
              fill="#4F2B1F"
              fillOpacity="0.75"
            >
              {pos.letter}
            </text>
          ))}

          {/* Inner concentric ring */}
          <circle cx="100" cy="100" r="50" stroke="#4F2B1F" strokeWidth="0.75" strokeOpacity="0.35" strokeDasharray="4 3" />
        </g>
      </svg>

      {/* 3. Center Solid Gavel Medallion (Still, No Zoom) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
        <div className="w-14 h-14 rounded-full bg-[#4F2B1F] border-2 border-[#E5B56A] flex items-center justify-center shadow-[0_6px_16px_rgba(79,43,31,0.35)]">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFF5E5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m14 13-7.5 7.5c-.8.8-2 .8-2.8 0s-.8-2 0-2.8L11 10" />
            <path d="m16 16 6-6" />
            <path d="m8 8 6-6" />
            <path d="m9 7 8 8" />
            <path d="m21 11-8-8" />
          </svg>
        </div>
      </div>

      {/* 4. Solid Static Status Badges (Completely Still, No Floating / Bouncing) */}
      {/* Pill 1: Top Right - Verified Counsel */}
      <div className="absolute top-[14%] right-[0%] z-20 bg-white/95 text-[#4F2B1F] text-[8px] font-sans font-bold tracking-wider uppercase px-2 py-0.5 rounded-full shadow-sm border border-[#A05A44]/30 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
        Verified Counsel
      </div>

      {/* Pill 2: Bottom Left - Action Checklist */}
      <div className="absolute bottom-[14%] left-[0%] z-20 bg-[#4F2B1F] text-white text-[8px] font-sans font-bold tracking-wider uppercase px-2 py-0.5 rounded-full shadow-[0_4px_12px_rgba(79,43,31,0.25)] border border-white/20 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
        Action Checklist
      </div>
    </div>
  );
}
