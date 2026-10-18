"use client";

import React, { useId, useMemo } from "react";

export type MosaicTheme =
  | "classic-ivory"
  | "sand-cyprus"
  | "petal-espresso"
  | "milk-matcha"
  | "lime-canopy";

export interface MosaicThemeConfig {
  id: MosaicTheme;
  name: string;
  badge: string;
  primaryHex: string;
  accentHex: string;
  highlightHex: string;
  pillColor: string;
  spotlightColor: string;
  seamColor: string;
  gradientBackground: string;
}

// Soft, luminous, beautifully diffused gradients matching the reference image ("ductuyen design"):
// - Classic Ivory: Warm apricot amber, honey gold, and soft burgundy glow
// - Sand & Cyprus: Fresh mint, seafoam, cyprus teal, and soft emerald glow
// - Petal & Espresso: Soft petal blush, warm apricot terracotta, and espresso warmth
// - Milk & Matcha: Fresh sage, lime sprout, and warm cream
// - Lime & Canopy: Spring green, airy lime, and deep forest
export const MOSAIC_THEMES: Record<MosaicTheme, MosaicThemeConfig> = {
  "classic-ivory": {
    id: "classic-ivory",
    name: "Classic Ivory",
    badge: "STAGE 01 · AUDIT",
    primaryHex: "#6E1F1F",
    accentHex: "#B8935A",
    highlightHex: "#FFF9EE",
    pillColor: "#6E1F1F",
    spotlightColor: "rgba(184, 147, 90, 0.25)",
    seamColor: "rgba(184, 147, 90, 0.22)",
    // Soft apricot, warm amber, and peach glow radiating into pure ivory light at top:
    gradientBackground: `
      radial-gradient(ellipse 75% 60% at 50% 55%, #FFFFFF 0%, #FEF3C7 28%, transparent 72%),
      radial-gradient(ellipse 68% 55% at 18% 68%, #FDE047 0%, #F59E0B 36%, transparent 76%),
      radial-gradient(ellipse 68% 55% at 82% 65%, #FDBA74 0%, #FB923C 32%, transparent 76%),
      radial-gradient(ellipse 85% 70% at 50% 90%, #EA580C 0%, #C2410C 40%, #6E1F1F 72%, transparent 92%),
      linear-gradient(180deg, transparent 0%, rgba(245, 158, 11, 0.12) 35%, rgba(234, 88, 12, 0.25) 70%, rgba(110, 31, 31, 0.42) 100%)
    `,
  },
  "sand-cyprus": {
    id: "sand-cyprus",
    name: "Sand & Cyprus",
    badge: "STAGE 02 · STRATEGY",
    primaryHex: "#004741",
    accentHex: "#2A7B72",
    highlightHex: "#F0FCF9",
    pillColor: "#004741",
    spotlightColor: "rgba(42, 123, 114, 0.25)",
    seamColor: "rgba(42, 123, 114, 0.22)",
    // Fresh seafoam, vibrant mint, cyprus teal, and soft emerald glow:
    gradientBackground: `
      radial-gradient(ellipse 75% 60% at 50% 55%, #FFFFFF 0%, #ECFDF5 28%, transparent 72%),
      radial-gradient(ellipse 68% 55% at 18% 68%, #6EE7B7 0%, #10B981 36%, transparent 76%),
      radial-gradient(ellipse 68% 55% at 82% 65%, #A7F3D0 0%, #34D399 32%, transparent 76%),
      radial-gradient(ellipse 85% 70% at 50% 90%, #14B8A6 0%, #0D9488 40%, #004741 72%, transparent 92%),
      linear-gradient(180deg, transparent 0%, rgba(52, 211, 153, 0.12) 35%, rgba(20, 184, 166, 0.25) 70%, rgba(0, 71, 65, 0.42) 100%)
    `,
  },
  "petal-espresso": {
    id: "petal-espresso",
    name: "Petal & Espresso",
    badge: "STAGE 03 · ACTION",
    primaryHex: "#4F2B1F",
    accentHex: "#A05A44",
    highlightHex: "#FFF4F0",
    pillColor: "#4F2B1F",
    spotlightColor: "rgba(160, 90, 68, 0.25)",
    seamColor: "rgba(160, 90, 68, 0.22)",
    // Soft petal blush, warm apricot terracotta, and espresso warmth:
    gradientBackground: `
      radial-gradient(ellipse 75% 60% at 50% 55%, #FFFFFF 0%, #FFF1F2 28%, transparent 72%),
      radial-gradient(ellipse 68% 55% at 18% 68%, #FDBA74 0%, #FB923C 36%, transparent 76%),
      radial-gradient(ellipse 68% 55% at 82% 65%, #FDA4AF 0%, #FB7185 32%, transparent 76%),
      radial-gradient(ellipse 85% 70% at 50% 90%, #E11D48 0%, #A05A44 40%, #4F2B1F 72%, transparent 92%),
      linear-gradient(180deg, transparent 0%, rgba(251, 146, 60, 0.12) 35%, rgba(225, 29, 72, 0.25) 70%, rgba(79, 43, 31, 0.42) 100%)
    `,
  },
  "milk-matcha": {
    id: "milk-matcha",
    name: "Milk Honey & Matcha",
    badge: "STAGE 01 · FOUNDATION",
    primaryHex: "#4B5A2F",
    accentHex: "#9CA763",
    highlightHex: "#FCFCEF",
    pillColor: "#4B5A2F",
    spotlightColor: "rgba(156, 167, 99, 0.25)",
    seamColor: "rgba(156, 167, 99, 0.22)",
    gradientBackground: `
      radial-gradient(ellipse 75% 60% at 50% 55%, #FFFFFF 0%, #FEF9C3 28%, transparent 72%),
      radial-gradient(ellipse 68% 55% at 18% 68%, #BEF264 0%, #84CC16 36%, transparent 76%),
      radial-gradient(ellipse 68% 55% at 82% 65%, #D9F99D 0%, #A3E635 32%, transparent 76%),
      radial-gradient(ellipse 85% 70% at 50% 90%, #65A30D 0%, #4D7C0F 40%, #4B5A2F 72%, transparent 92%),
      linear-gradient(180deg, transparent 0%, rgba(163, 230, 53, 0.12) 35%, rgba(101, 163, 13, 0.25) 70%, rgba(75, 90, 47, 0.42) 100%)
    `,
  },
  "lime-canopy": {
    id: "lime-canopy",
    name: "Lime Sprout & Canopy",
    badge: "STAGE 02 · EXECUTION",
    primaryHex: "#2D3E2C",
    accentHex: "#608A5E",
    highlightHex: "#F6FCF0",
    pillColor: "#2D3E2C",
    spotlightColor: "rgba(96, 138, 94, 0.25)",
    seamColor: "rgba(96, 138, 94, 0.22)",
    gradientBackground: `
      radial-gradient(ellipse 75% 60% at 50% 55%, #FFFFFF 0%, #ECFDF5 28%, transparent 72%),
      radial-gradient(ellipse 68% 55% at 18% 68%, #6EE7B7 0%, #10B981 36%, transparent 76%),
      radial-gradient(ellipse 68% 55% at 82% 65%, #A7F3D0 0%, #34D399 32%, transparent 76%),
      radial-gradient(ellipse 85% 70% at 50% 90%, #059669 0%, #047857 40%, #2D3E2C 72%, transparent 92%),
      linear-gradient(180deg, transparent 0%, rgba(52, 211, 153, 0.12) 35%, rgba(5, 150, 105, 0.25) 70%, rgba(45, 62, 44, 0.42) 100%)
    `,
  },
};

export interface GlassMosaicBackgroundProps {
  theme: MosaicTheme;
  className?: string;
  tileSize?: number; // Tile dimension in px (default 32)
  gap?: number; // Seam gap in px (default 2.6)
  radius?: number; // Corner radius in px (default 7)
  opacity?: number; // 0.0 to 1.0 (default 1.0)
}

export function GlassMosaicBackground({
  theme,
  className = "",
  tileSize = 32,
  gap = 2.6,
  radius = 7,
  opacity = 1.0,
}: GlassMosaicBackgroundProps) {
  const rawId = useId();
  const uniqueId = useMemo(
    () => `mosaic-${theme}-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`,
    [theme, rawId]
  );

  const config = MOSAIC_THEMES[theme] || MOSAIC_THEMES["classic-ivory"];

  // Geometry calculations
  const bodySize = Math.max(tileSize - gap, 12);
  const offset = gap / 2;
  const innerRadius = Math.max(radius - 1, 2);

  // SVG Data URI for organic, ununiform wavy / water-like fadeout mask at the top:
  const wavyWaterMask = useMemo(() => {
    const svg = `
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 1000' preserveAspectRatio='none'>
  <defs>
    <linearGradient id='wfade1' x1='0' y1='0' x2='0' y2='1'>
      <stop offset='0%' stop-color='black' stop-opacity='0'/>
      <stop offset='25%' stop-color='black' stop-opacity='0'/>
      <stop offset='34%' stop-color='black' stop-opacity='0.12'/>
      <stop offset='43%' stop-color='black' stop-opacity='0.45'/>
      <stop offset='52%' stop-color='black' stop-opacity='0.85'/>
      <stop offset='62%' stop-color='black' stop-opacity='1'/>
      <stop offset='100%' stop-color='black' stop-opacity='1'/>
    </linearGradient>
    <linearGradient id='wfade2' x1='0' y1='0' x2='0' y2='1'>
      <stop offset='0%' stop-color='black' stop-opacity='0'/>
      <stop offset='28%' stop-color='black' stop-opacity='0'/>
      <stop offset='37%' stop-color='black' stop-opacity='0.15'/>
      <stop offset='46%' stop-color='black' stop-opacity='0.5'/>
      <stop offset='56%' stop-color='black' stop-opacity='0.9'/>
      <stop offset='66%' stop-color='black' stop-opacity='1'/>
      <stop offset='100%' stop-color='black' stop-opacity='1'/>
    </linearGradient>
    <linearGradient id='hGrad' x1='0' y1='0' x2='1' y2='0'>
      <stop offset='0%' stop-color='white' stop-opacity='0.78'/>
      <stop offset='18%' stop-color='white' stop-opacity='1'/>
      <stop offset='40%' stop-color='white' stop-opacity='0.82'/>
      <stop offset='62%' stop-color='white' stop-opacity='1'/>
      <stop offset='82%' stop-color='white' stop-opacity='0.80'/>
      <stop offset='100%' stop-color='white' stop-opacity='0.96'/>
    </linearGradient>
    <mask id='hMod'>
      <rect width='1000' height='1000' fill='url(#hGrad)'/>
    </mask>
  </defs>
  <!-- Group masked by horizontal modulation for organic fluidity -->
  <g mask='url(#hMod)'>
    <!-- Primary asymmetric wave: varied heights and broad undulations -->
    <path
      d='M 0,365 C 95,350 125,290 235,315 C 335,340 355,405 475,365 C 565,335 620,280 720,320 C 825,365 855,400 925,345 C 955,325 975,330 1000,340 L 1000,1000 L 0,1000 Z'
      fill='url(#wfade1)'
    />
    <!-- Secondary wave with a distinct contour, preventing edge reinforcement -->
    <path
      d='M 0,400 C 105,385 155,340 250,355 C 350,375 395,425 505,390 C 600,360 650,325 750,355 C 835,385 885,410 950,375 C 970,365 985,365 1000,370 L 1000,1000 L 0,1000 Z'
      fill='url(#wfade2)'
      opacity='0.65'
    />
  </g>
</svg>
`.trim().replace(/\n/g, '').replace(/\s+/g, ' ');

    return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
  }, []);

  return (
    <div
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* =====================================================================
          THE SOFTLY ILLUMINATED GLASS MOSAIC WITH UNUNIFORM WAVY WATER FADEOUT
          Asymmetric, organic fluid water wave dissolving into the clean card face.
          Clean bevelled tiles with NO intersection dots.
          ===================================================================== */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          maskImage: wavyWaterMask,
          WebkitMaskImage: wavyWaterMask,
          maskSize: "100% 100%",
          WebkitMaskSize: "100% 100%",
        }}
      >
        {/* Layer 1: Radiant Theme-Aware Gradient Field */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background: config.gradientBackground,
          }}
        />

        {/* Layer 2: Vector-Crisp Rounded Glass Mosaic Tiles Pattern (NO DOTS) */}
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Tile translucent cushion fill */}
            <linearGradient
              id={`${uniqueId}-tileGrad`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
              <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.15" />
              <stop offset="68%" stopColor="#000000" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.16" />
            </linearGradient>

            {/* Inset specular bevel highlight */}
            <linearGradient
              id={`${uniqueId}-bevelGrad`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.45" />
              <stop offset="65%" stopColor="#000000" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.28" />
            </linearGradient>

            {/* Center pillow light volume */}
            <radialGradient
              id={`${uniqueId}-pillowGrad`}
              cx="40%"
              cy="35%"
              r="55%"
            >
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.3" />
              <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>

            {/* The repeating glass tile pattern - NO DOTS */}
            <pattern
              id={`${uniqueId}-pattern`}
              width={tileSize}
              height={tileSize}
              patternUnits="userSpaceOnUse"
            >
              {/* Seam groove outline around tile */}
              <rect
                x="0"
                y="0"
                width={tileSize}
                height={tileSize}
                fill="none"
                stroke={config.seamColor}
                strokeWidth={gap}
              />

              {/* Glass tile translucent cushion body */}
              <rect
                x={offset}
                y={offset}
                width={bodySize}
                height={bodySize}
                rx={radius}
                ry={radius}
                fill={`url(#${uniqueId}-tileGrad)`}
                stroke="rgba(255, 255, 255, 0.45)"
                strokeWidth="0.8"
              />

              {/* Center pillow light reflection */}
              <rect
                x={offset + 1}
                y={offset + 1}
                width={bodySize - 2}
                height={bodySize - 2}
                rx={innerRadius}
                ry={innerRadius}
                fill={`url(#${uniqueId}-pillowGrad)`}
              />

              {/* Specular bevel rim */}
              <rect
                x={offset + 0.75}
                y={offset + 0.75}
                width={bodySize - 1.5}
                height={bodySize - 1.5}
                rx={radius - 0.75}
                fill="none"
                stroke={`url(#${uniqueId}-bevelGrad)`}
                strokeWidth="0.85"
              />
            </pattern>
          </defs>

          {/* Pattern Fill Layer */}
          <rect
            width="100%"
            height="100%"
            fill={`url(#${uniqueId}-pattern)`}
          />
        </svg>

        {/* Layer 3: Surface Specular Sheen (masked with water fadeout) */}
        <div
          className="absolute inset-0 w-full h-full mix-blend-overlay opacity-90"
          style={{
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.1) 40%, transparent 65%, rgba(255, 255, 255, 0.2) 100%)",
          }}
        />
      </div>
    </div>
  );
}
