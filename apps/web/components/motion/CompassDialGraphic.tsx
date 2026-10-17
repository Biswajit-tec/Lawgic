"use client";

import { useState } from "react";

// Compass ring letters (A through P)
const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P"];

// Precompute static geometry to guarantee zero hydration discrepancy between SSR and client
const tickLines = Array.from({ length: 48 }).map((_, i) => {
  const angle = (i * 360) / 48;
  const rad = (angle * Math.PI) / 180;
  const isMajor = i % 4 === 0;
  const rOuter = isMajor ? 90 : 86;
  return {
    id: i,
    x1: Math.round((100 + 82 * Math.cos(rad)) * 100) / 100,
    y1: Math.round((100 + 82 * Math.sin(rad)) * 100) / 100,
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
    x: Math.round((100 + 70 * Math.cos(rad)) * 100) / 100,
    y: Math.round((100 + 70 * Math.sin(rad)) * 100) / 100,
  };
});

export function CompassDialGraphic() {
  const [rotation, setRotation] = useState(0);

  return (
    <div
      onMouseEnter={() => setRotation((prev) => prev + 45)}
      className="relative w-full aspect-square max-w-[260px] mx-auto flex items-center justify-center p-2 select-none cursor-pointer group"
    >
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full transition-transform duration-700 ease-out"
        style={{ transform: `rotate(${rotation}deg)` }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer tick circle */}
        <circle cx="100" cy="100" r="92" stroke="var(--burgundy)" strokeWidth="0.75" strokeOpacity="0.2" />
        <circle cx="100" cy="100" r="80" stroke="var(--burgundy)" strokeWidth="0.5" strokeOpacity="0.15" />

        {/* 48 fine tick marks around the perimeter */}
        {tickLines.map((line) => (
          <line
            key={line.id}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="var(--burgundy)"
            strokeWidth={line.isMajor ? "1" : "0.5"}
            strokeOpacity={line.isMajor ? "0.4" : "0.2"}
          />
        ))}

        {/* Letters around the inner ring */}
        {letterPositions.map((pos) => (
          <text
            key={pos.letter}
            x={pos.x}
            y={pos.y + 3}
            textAnchor="middle"
            fontSize="7"
            fontFamily="var(--font-sans), monospace"
            fill="var(--stone)"
            fillOpacity="0.5"
          >
            {pos.letter}
          </text>
        ))}

        {/* Inner concentric ring */}
        <circle cx="100" cy="100" r="52" stroke="var(--burgundy)" strokeWidth="0.75" strokeOpacity="0.3" strokeDasharray="4 3" />
        <circle cx="100" cy="100" r="34" fill="var(--ivory-subtle)" stroke="var(--burgundy)" strokeWidth="1" strokeOpacity="0.25" />
      </svg>

      {/* Center Gavel Icon */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-14 h-14 rounded-full bg-[var(--burgundy-faint)] border border-[rgba(110,31,31,0.2)] flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-[var(--burgundy)] transition-all duration-300">
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[var(--burgundy)] group-hover:text-[var(--ivory)] transition-colors duration-300"
          >
            <path d="m14 13-7.5 7.5c-.8.8-2 .8-2.8 0s-.8-2 0-2.8L11 10" />
            <path d="m16 16 6-6" />
            <path d="m8 8 6-6" />
            <path d="m9 7 8 8" />
            <path d="m21 11-8-8" />
          </svg>
        </div>
      </div>
    </div>
  );
}
