"use client";

import React, { useState } from "react";

// =============================================================================
// 1. THE SCALES OF JUSTICE (Tarazu / तुला) — Playful Tilting Brass Balance
// =============================================================================
export function ScalesOfJustice({
  isHovered = false,
  className = "w-10 h-10",
}: {
  isHovered?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative select-none transition-transform duration-500 ease-out ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="brassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="45%" stopColor="#D97706" />
            <stop offset="70%" stopColor="#B45309" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>
          <linearGradient id="goldHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>

        {/* Central Pedestal / Base */}
        <ellipse cx="50" cy="88" rx="20" ry="5" fill="url(#brassGrad)" />
        <ellipse cx="50" cy="86" rx="15" ry="3.5" fill="url(#goldHighlight)" />
        <path d="M47 86 L48 24 L52 24 L53 86 Z" fill="url(#brassGrad)" />
        <circle cx="50" cy="22" r="4.5" fill="url(#goldHighlight)" />

        {/* Pivoting Crossbeam (Tilts dynamically when hovered!) */}
        <g
          className="transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-[50px_22px]"
          style={{ transform: isHovered ? "rotate(-7deg)" : "rotate(0deg)" }}
        >
          {/* Main Beam */}
          <path d="M16 22 C 30 19, 70 19, 84 22 C 84 23.5, 16 23.5, 16 22 Z" fill="url(#brassGrad)" />
          <circle cx="16" cy="22.5" r="2.5" fill="url(#goldHighlight)" />
          <circle cx="84" cy="22.5" r="2.5" fill="url(#goldHighlight)" />

          {/* Left Pan Chains & Pan (Counter-rotates to stay gravity-level) */}
          <g
            className="transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-[16px_22.5px]"
            style={{ transform: isHovered ? "rotate(7deg)" : "rotate(0deg)" }}
          >
            <line x1="16" y1="23" x2="8" y2="48" stroke="#B45309" strokeWidth="1.2" strokeDasharray="1.5 1.5" />
            <line x1="16" y1="23" x2="24" y2="48" stroke="#B45309" strokeWidth="1.2" strokeDasharray="1.5 1.5" />
            {/* Left Pan */}
            <path d="M6 48 C 6 56, 26 56, 26 48 Z" fill="url(#brassGrad)" />
            <ellipse cx="16" cy="48" rx="10" ry="2.5" fill="url(#goldHighlight)" />
          </g>

          {/* Right Pan Chains & Pan (Counter-rotates to stay gravity-level) */}
          <g
            className="transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-[84px_22.5px]"
            style={{ transform: isHovered ? "rotate(7deg)" : "rotate(0deg)" }}
          >
            <line x1="84" y1="23" x2="76" y2="48" stroke="#B45309" strokeWidth="1.2" strokeDasharray="1.5 1.5" />
            <line x1="84" y1="23" x2="92" y2="48" stroke="#B45309" strokeWidth="1.2" strokeDasharray="1.5 1.5" />
            {/* Right Pan */}
            <path d="M74 48 C 74 56, 94 56, 94 48 Z" fill="url(#brassGrad)" />
            <ellipse cx="84" cy="48" rx="10" ry="2.5" fill="url(#goldHighlight)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

// =============================================================================
// 2. THE COURT GAVEL (Judicial Hammer / हथौड़ा) — Playful Lift & Tap
// =============================================================================
export function CourtGavel({
  isHovered = false,
  className = "w-10 h-10",
}: {
  isHovered?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative select-none transition-transform duration-300 ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="rosewood" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7F1D1D" />
            <stop offset="50%" stopColor="#450A0A" />
            <stop offset="100%" stopColor="#2A0505" />
          </linearGradient>
          <linearGradient id="brassGrip" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="#FEF3C7" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
        </defs>

        {/* Circular Soundblock Base */}
        <ellipse cx="50" cy="80" rx="30" ry="10" fill="url(#rosewood)" stroke="#B45309" strokeWidth="1.5" />
        <ellipse cx="50" cy="76" rx="24" ry="7" fill="url(#brassGrip)" opacity="0.6" />
        <ellipse cx="50" cy="74" rx="20" ry="5.5" fill="url(#rosewood)" />

        {/* Impact Wave Rings on Soundblock (Shown on Hover Tap) */}
        {isHovered && (
          <ellipse
            cx="50"
            cy="74"
            rx="28"
            ry="8.5"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="1.5"
            className="animate-ping opacity-75 origin-[50px_74px]"
          />
        )}

        {/* The Gavel Handle & Head (Lifts and Taps on Hover) */}
        <g
          className="transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-[30px_70px]"
          style={{
            transform: isHovered
              ? "translate3d(-2px, -8px, 0) rotate(-14deg)"
              : "translate3d(0, 0, 0) rotate(0deg)",
          }}
        >
          {/* Wooden Turned Handle */}
          <path
            d="M 68 32 L 28 68 C 26 70, 24 68, 26 66 L 66 30 Z"
            fill="url(#rosewood)"
            stroke="#9A3412"
            strokeWidth="0.8"
          />
          {/* Handle Brass Finial */}
          <circle cx="26" cy="68" r="3.5" fill="url(#brassGrip)" />

          {/* Gavel Head Barrel (Perpendicular to Handle) */}
          <g transform="translate(68, 30) rotate(45)">
            {/* Left Brass Ring */}
            <rect x="-18" y="-10" width="4" height="20" rx="1.5" fill="url(#brassGrip)" />
            {/* Main Wood Barrel */}
            <rect x="-14" y="-9" width="28" height="18" rx="2" fill="url(#rosewood)" stroke="#B45309" strokeWidth="0.8" />
            {/* Center Brass Band */}
            <rect x="-2" y="-9.5" width="4" height="19" fill="url(#brassGrip)" />
            {/* Right Brass Ring */}
            <rect x="14" y="-10" width="4" height="20" rx="1.5" fill="url(#brassGrip)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

// =============================================================================
// 3. THE NOTICE DECODER ICON — Court Notice & Ashoka Seal
// =============================================================================
export function NoticeDecoderIcon({
  isHovered = false,
  className = "w-10 h-10",
}: {
  isHovered?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative select-none transition-transform duration-300 ${isHovered ? "scale-110" : "scale-100"} ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md" fill="none">
        {/* Document Sheet */}
        <rect x="20" y="15" width="60" height="72" rx="3" fill="#FFFDF5" stroke="#B45309" strokeWidth="1.5" />
        {/* Corner Fold */}
        <path d="M64 15 L80 31 L64 31 Z" fill="#E5D7BA" stroke="#B45309" strokeWidth="1" />
        
        {/* Top Court Header */}
        <rect x="28" y="24" width="28" height="3" rx="1" fill="#78350F" />
        <rect x="28" y="31" width="36" height="2" rx="0.5" fill="#92400E" opacity="0.6" />
        
        {/* Text Lines */}
        <rect x="28" y="38" width="44" height="2" rx="0.5" fill="#78350F" opacity="0.5" />
        <rect x="28" y="44" width="40" height="2" rx="0.5" fill="#F59E0B" opacity="0.9" />
        <rect x="28" y="50" width="44" height="2" rx="0.5" fill="#78350F" opacity="0.5" />
        <rect x="28" y="56" width="32" height="2" rx="0.5" fill="#78350F" opacity="0.5" />
        
        {/* Circular Red Ashoka Seal */}
        <circle cx="62" cy="68" r="9" fill="#991B1B" opacity="0.85" />
        <circle cx="62" cy="68" r="7.5" fill="none" stroke="#FEF3C7" strokeWidth="1" strokeDasharray="1.5 1" />
        <text x="62" y="71" textAnchor="middle" fill="#FEF3C7" fontSize="7" fontFamily="serif" fontWeight="bold">
          ★
        </text>

        {/* Magnifying Glass (Tilts on Hover) */}
        <g
          className="transition-transform duration-500 ease-out origin-[45px_50px]"
          style={{ transform: isHovered ? "rotate(12deg) scale(1.1)" : "rotate(0deg)" }}
        >
          <circle cx="45" cy="50" r="14" fill="#60A5FA" fillOpacity="0.2" stroke="#D97706" strokeWidth="2.5" />
          <line x1="55" y1="60" x2="72" y2="77" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
          <line x1="55" y1="60" x2="68" y2="73" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}

// =============================================================================
// 4. THE CONTRACT SHIELD ICON — Sealed Deed & Defensive Shield
// =============================================================================
export function ContractShieldIcon({
  isHovered = false,
  className = "w-10 h-10",
}: {
  isHovered?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative select-none transition-transform duration-300 ${isHovered ? "scale-110" : "scale-100"} ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md" fill="none">
        {/* Heraldic Shield */}
        <path
          d="M 50 12 C 68 12, 82 18, 82 32 C 82 60, 50 86, 50 86 C 50 86, 18 60, 18 32 C 18 18, 32 12, 50 12 Z"
          fill="#FFFDF7"
          stroke="#D97706"
          strokeWidth="2.5"
        />
        {/* Inner Shield Inlay */}
        <path
          d="M 50 18 C 64 18, 76 23, 76 34 C 76 56, 50 78, 50 78 C 50 78, 24 56, 24 34 C 24 23, 36 18, 50 18 Z"
          fill="#FEF3C7"
          opacity="0.5"
        />

        {/* Scroll Lines Inside Shield */}
        <rect x="34" y="32" width="32" height="2.5" rx="1" fill="#78350F" />
        <rect x="34" y="38" width="28" height="2" rx="0.5" fill="#92400E" opacity="0.7" />
        <rect x="34" y="44" width="32" height="2" rx="0.5" fill="#92400E" opacity="0.7" />

        {/* Wax Seal with Ribbon */}
        <path d="M 46 56 L 43 72 L 48 68 L 53 72 L 50 56 Z" fill="#DC2626" />
        <circle cx="50" cy="56" r="9" fill="#991B1B" stroke="#FDE047" strokeWidth="1.2" />
        <text x="50" y="59.5" textAnchor="middle" fill="#FEF3C7" fontSize="9" fontFamily="serif" fontWeight="bold">
          §
        </text>
      </svg>
    </div>
  );
}

// =============================================================================
// 5. THE CONSTITUTIONAL WHEEL (Dharma Chakra / Court Process Navigator)
// =============================================================================
export function CourtNavigatorIcon({
  isHovered = false,
  className = "w-10 h-10",
}: {
  isHovered?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative select-none transition-transform duration-300 ${isHovered ? "scale-110" : "scale-100"} ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md" fill="none">
        {/* Dharma Chakra Wheel Outer Rim */}
        <circle cx="50" cy="50" r="38" stroke="#D97706" strokeWidth="3" />
        <circle cx="50" cy="50" r="33" stroke="#B45309" strokeWidth="1.5" />
        <circle cx="50" cy="50" r="28" fill="#FFFDF7" stroke="#F59E0B" strokeWidth="1" />

        {/* Rotating 24-Spoke Wheel */}
        <g
          className="transition-transform duration-1000 ease-linear origin-[50px_50px]"
          style={{ transform: isHovered ? "rotate(90deg)" : "rotate(0deg)" }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={i}
              x1="50"
              y1="22"
              x2="50"
              y2="78"
              stroke="#D97706"
              strokeWidth="1.5"
              transform={`rotate(${i * 15} 50 50)`}
            />
          ))}
          {/* Wheel Hub */}
          <circle cx="50" cy="50" r="8" fill="#78350F" stroke="#FEF3C7" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="3.5" fill="#FEF3C7" />
        </g>

        {/* Four Compass Cardinal Points */}
        <polygon points="50,6 53,13 47,13" fill="#991B1B" />
        <polygon points="94,50 87,53 87,47" fill="#B45309" />
        <polygon points="50,94 53,87 47,87" fill="#B45309" />
        <polygon points="6,50 13,53 13,47" fill="#B45309" />
      </svg>
    </div>
  );
}
