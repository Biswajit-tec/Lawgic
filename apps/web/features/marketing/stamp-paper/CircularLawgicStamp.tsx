"use client";

import React from "react";

interface CircularLawgicStampProps {
  color?: string; // Theme aware color
  date?: string;
  regNumber?: string;
  className?: string;
  stamped?: boolean;
}

export function CircularLawgicStamp({
  color = "#4338CA", // Authentic notary violet/indigo or theme color
  date = "18 OCT 2026",
  regNumber = "IN-LAW/2026/01",
  className = "",
  stamped = true,
}: CircularLawgicStampProps) {
  return (
    <div
      className={`relative select-none transition-all duration-700 ${
        stamped ? "opacity-95 scale-100" : "opacity-0 scale-125"
      } ${className}`}
      style={{
        transform: stamped ? "rotate(-7deg)" : "rotate(-18deg) scale(1.3)",
        filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.12))",
      }}
    >
      {/* Rubber Ink Stamp SVG Container */}
      <svg
        viewBox="0 0 200 200"
        className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20"
        style={{ color: color }}
        aria-label="Official Lawgic Notarial Verification Seal"
      >
        <defs>
          {/* Circular Text Path - Outer Top */}
          <path
            id="outerTopPath"
            d="M 24,100 A 76,76 0 1,1 176,100"
            fill="none"
          />
          {/* Circular Text Path - Outer Bottom */}
          <path
            id="outerBottomPath"
            d="M 176,100 A 76,76 0 1,1 24,100"
            fill="none"
          />

          {/* Rubber Ink Stipple/Distress Pattern */}
          <filter id="rubberStampNoise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="3"
              result="noise"
            />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.82 0"
              in="noise"
              result="coloredNoise"
            />
            <feComposite
              in="SourceGraphic"
              in2="coloredNoise"
              operator="in"
            />
          </filter>
        </defs>

        {/* Outer Serrated / Notched Border Ring */}
        <circle
          cx="100"
          cy="100"
          r="92"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeDasharray="4 2"
          opacity="0.85"
        />

        {/* Second Solid Outer Ring */}
        <circle
          cx="100"
          cy="100"
          r="86"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          opacity="0.9"
        />

        {/* Inner Solid Ring */}
        <circle
          cx="100"
          cy="100"
          r="62"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          opacity="0.85"
        />

        {/* Curved Circular Text - Outer Top: LAWGIC LEGAL INTELLIGENCE */}
        <text
          fill="currentColor"
          fontSize="9.5"
          fontFamily="serif"
          fontWeight="bold"
          letterSpacing="2.2"
        >
          <textPath
            href="#outerTopPath"
            startOffset="50%"
            textAnchor="middle"
          >
            ★ LAWGIC LEGAL INTELLIGENCE ★
          </textPath>
        </text>

        {/* Curved Circular Text - Outer Bottom: NOTARIAL AI VERIFICATION */}
        <text
          fill="currentColor"
          fontSize="8.5"
          fontFamily="monospace"
          fontWeight="bold"
          letterSpacing="1.8"
        >
          <textPath
            href="#outerBottomPath"
            startOffset="50%"
            textAnchor="middle"
          >
            • VERIFIED NOTARIAL AI •
          </textPath>
        </text>

        {/* Center Content: Scales of Justice Emblem */}
        <g transform="translate(76, 50)" fill="currentColor" opacity="0.95">
          {/* Scales of Justice Icon */}
          <path d="M24 6 L24 24 M12 12 L36 12 M8 12 L4 20 L20 20 Z M40 12 L32 20 L48 20 Z M18 24 L30 24" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        </g>

        {/* Center Text: REGISTRATION CODE */}
        <text
          x="100"
          y="108"
          textAnchor="middle"
          fill="currentColor"
          fontSize="7.5"
          fontFamily="monospace"
          fontWeight="bold"
          letterSpacing="0.8"
        >
          REG: {regNumber}
        </text>

        {/* Center Box: DATE STAMP */}
        <rect
          x="44"
          y="114"
          width="112"
          height="16"
          rx="2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeDasharray="2 1"
          opacity="0.85"
        />
        <text
          x="100"
          y="125.5"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8.5"
          fontFamily="monospace"
          fontWeight="bold"
          letterSpacing="1.5"
        >
          {date}
        </text>

        {/* Bottom Center Status: GROUNDED & ATTESTED */}
        <text
          x="100"
          y="142"
          textAnchor="middle"
          fill="currentColor"
          fontSize="7"
          fontFamily="serif"
          fontWeight="bold"
          letterSpacing="1.2"
        >
          GROUNDED &amp; ATTESTED
        </text>

        {/* Devanagari Base: सत्यमेव जयते */}
        <text
          x="100"
          y="152"
          textAnchor="middle"
          fill="currentColor"
          fontSize="6.5"
          fontFamily="serif"
          fontWeight="bold"
          letterSpacing="0.5"
          opacity="0.8"
        >
          सत्यमेव जयते
        </text>
      </svg>

      {/* Realistic Stamped Notary Ink Bleed / Distress Layer */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle at 40% 40%, currentColor 1px, transparent 1px)",
          backgroundSize: "6px 6px",
        }}
      />
    </div>
  );
}
