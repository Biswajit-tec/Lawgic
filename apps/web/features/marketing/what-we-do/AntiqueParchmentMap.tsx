"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "@/components/layout/ThemeContext";
import { Sparkles } from "lucide-react";

export interface MapMilestoneNode {
  id: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  category: string;
  territoryName: string;
  description: string;
  statutes: string[];
  actionText: string;
  x: number; // SVG viewBox coordinates (1024 x 576)
  y: number;
  triggerProgress: number; // 0.0 to 1.0 (exact calculated cumulative arc lengths)
  iconType: "notice" | "gavel" | "scales" | "high-court" | "supreme-court" | "constitution";
  // Sticky note position and subtle paper tilt
  noteLeftPct: string;
  noteTopPct: string;
  noteTilt: number;
}

// 6 Core Judicial Milestones with exact mathematical triggerProgress and note positions
export const MAP_MILESTONES: MapMilestoneNode[] = [
  {
    id: "notice",
    stepNumber: "01",
    title: "NOTICE",
    subtitle: "BEGINNING OF A LEGAL JOURNEY",
    category: "PRE-LITIGATION",
    territoryName: "STAGE 1 · LEGAL INTIMATION",
    description:
      "Instant plain-language audit of Sec 138 NI Act notices, police inquiry summons under Sec 41A CrPC / Sec 35 BNSS, and contractual demand letters.",
    statutes: ["Sec 138 NI Act", "Sec 41A CrPC", "15-Day Cure Window"],
    actionText: "Audit a Legal Notice",
    x: 148,
    y: 332,
    triggerProgress: 0.06,
    iconType: "notice",
    // Lower half -> note is BELOW at empty table area
    noteLeftPct: "14.0%",
    noteTopPct: "77%",
    noteTilt: -1.5,
  },
  {
    id: "district-court",
    stepNumber: "02",
    title: "DISTRICT COURT",
    subtitle: "FIRST HEARING",
    category: "TRIAL FORUM",
    territoryName: "STAGE 2 · TRIAL FORUM",
    description:
      "Demystifying court filings, summons return dates, interim injunction applications under Order 39 CPC, and first-instance trial timelines.",
    statutes: ["Order 39 CPC", "Sec 151 CPC", "CrPC Ch. XIX"],
    actionText: "Chart District Stage",
    x: 304,
    y: 214,
    triggerProgress: 0.203,
    iconType: "gavel",
    // Upper half -> note is ABOVE over sky, leaving classical building visible
    noteLeftPct: "30.0%",
    noteTopPct: "13%",
    noteTilt: 1.8,
  },
  {
    id: "statutes-laws",
    stepNumber: "03",
    title: "STATUTES & LAWS",
    subtitle: "RELEVANT LEGAL PROVISIONS",
    category: "CENTRAL ACTS",
    territoryName: "STAGE 3 · CENTRAL STATUTES",
    description:
      "Grounding every claim in substantive rights: statutory defenses across Contract Act, consumer rights under CPA 2019, and builder accountability.",
    statutes: ["Contract Act Sec 74", "Consumer Act 2019", "RERA Sec 18"],
    actionText: "Explore Statutory Codes",
    x: 440,
    y: 363,
    triggerProgress: 0.357,
    iconType: "scales",
    // Lower half -> note is BELOW the books in bottom margin
    noteLeftPct: "44.0%",
    noteTopPct: "84%",
    noteTilt: -1.2,
  },
  {
    id: "high-court",
    stepNumber: "04",
    title: "HIGH COURT",
    subtitle: "APPEAL & REVIEW",
    category: "APPELLATE BENCH",
    territoryName: "STAGE 4 · STATE HIGH BENCH",
    description:
      "Challenging arbitrary state action via Article 226 constitutional writs, civil second appeals under CPC Sec 100, and quashing petitions under Sec 482.",
    statutes: ["Article 226 Writs", "Sec 100 CPC", "Sec 482 CrPC"],
    actionText: "Review High Court Options",
    x: 594,
    y: 153,
    triggerProgress: 0.564,
    iconType: "high-court",
    // Upper half -> note is ABOVE in sky, leaving High Court dome visible
    noteLeftPct: "59.0%",
    noteTopPct: "11%",
    noteTilt: 1.5,
  },
  {
    id: "supreme-court",
    stepNumber: "05",
    title: "SUPREME COURT",
    subtitle: "FINAL INTERPRETATION",
    category: "APEX BENCH",
    territoryName: "STAGE 5 · THE APEX BENCH",
    description:
      "Special Leave Petitions under Article 136, fundamental rights enforcement under Article 32, and binding precedent established under Article 141.",
    statutes: ["Article 136 SLP", "Article 32 Writs", "Article 141"],
    actionText: "Inspect Apex Rulings",
    x: 742,
    y: 368,
    triggerProgress: 0.775,
    iconType: "supreme-court",
    // Lower half -> note is BELOW Supreme Court building
    noteLeftPct: "74.0%",
    noteTopPct: "84%",
    noteTilt: -1.8,
  },
  {
    id: "constitution",
    stepNumber: "06",
    title: "CONSTITUTION",
    subtitle: "THE FOUNDATION",
    category: "THE GRUNDNORM",
    territoryName: "STAGE 6 · THE GRUNDNORM",
    description:
      "The ultimate bedrock of Indian democracy: Part III Fundamental Rights, Article 14 equality, Article 21 life & personal liberty, and rule of law.",
    statutes: ["Article 14 Equality", "Article 19 Freedoms", "Article 21 Liberty"],
    actionText: "Explore Constitution",
    x: 911,
    y: 257,
    triggerProgress: 0.945,
    iconType: "constitution",
    // Upper/mid half -> note is ABOVE over mountain/sky, leaving Lion Capital visible
    noteLeftPct: "89.0%",
    noteTopPct: "13%",
    noteTilt: 1.4,
  },
];

interface AntiqueParchmentMapProps {
  scrollProgress: number; // 0.0 to 1.0 (driven by ScrollTrigger scrub)
  hoveredNodeId: string | null;
  setHoveredNodeId: (id: string | null) => void;
  selectedNodeId: string | null;
  setSelectedNodeId: (id: string | null) => void;
}

export function AntiqueParchmentMap({
  scrollProgress,
  hoveredNodeId,
  setHoveredNodeId,
  selectedNodeId,
  setSelectedNodeId,
}: AntiqueParchmentMapProps) {
  const { currentThemeOption } = useTheme();
  const mapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [totalPathLength, setTotalPathLength] = useState(1375);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  // SVG coordinates: 1024 x 576
  // Serpentine tracing curve traversing through each node position
  const pathD =
    "M 70,360 C 95,355 120,345 148,332 C 185,315 240,240 304,214 C 345,198 370,270 440,363 C 485,420 530,230 594,153 C 640,95 680,260 742,368 C 785,440 855,310 911,257 C 935,235 960,230 980,230";

  // Measure path length dynamically once SVG is mounted
  useEffect(() => {
    if (pathRef.current) {
      try {
        const len = pathRef.current.getTotalLength();
        if (len > 0) setTotalPathLength(len);
      } catch (err) {
        // Fallback default length
      }
    }
  }, []);

  // Compute strokeDashoffset for smooth line reveal
  const clampedProgress = Math.min(Math.max(scrollProgress, 0), 1);
  const strokeDashoffset = Math.max(0, totalPathLength * (1 - clampedProgress));

  // Ambient cursor lighting over the map
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mapRef.current) return;
    const rect = mapRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => setMousePos(null);

  const activeHoverOrSelected = hoveredNodeId || selectedNodeId;

  return (
    <div
      ref={mapRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[1060px] mx-auto select-none"
    >
      {/* =====================================================================
          THE AGED PARCHMENT MAP CONTAINER
          Uses 1st image (/legal-map-bg.jpg) as background
          ===================================================================== */}
      <div
        className="relative w-full rounded-2xl overflow-hidden transition-all duration-700 bg-[#E8DAC2]"
        style={{
          boxShadow: `
            0 25px 60px -12px rgba(45, 20, 10, 0.40),
            0 10px 24px -5px rgba(60, 25, 12, 0.22),
            0 0 0 1px rgba(120, 53, 15, 0.32),
            inset 0 0 40px rgba(50, 20, 8, 0.25)
          `,
        }}
      >
        {/* Dynamic Warm Candle-Lantern Spotlight on Cursor */}
        {mousePos && (
          <div
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl transition-opacity duration-300 z-15"
            style={{
              left: `${mousePos.x}px`,
              top: `${mousePos.y}px`,
              width: "280px",
              height: "280px",
              background:
                "radial-gradient(circle, rgba(254, 243, 199, 0.35) 0%, rgba(245, 158, 11, 0.12) 45%, transparent 70%)",
            }}
            aria-hidden="true"
          />
        )}

        {/* Vintage Vignette & Burn Edge Shading */}
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background:
              "radial-gradient(ellipse 92% 85% at 50% 50%, transparent 60%, rgba(65, 25, 10, 0.18) 85%, rgba(35, 12, 5, 0.45) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Ornate Graticule Margin Frame */}
        <div
          className="pointer-events-none absolute inset-2 sm:inset-3 z-10 rounded-xl border border-[#78350F]/35 flex flex-col justify-between"
          style={{
            outline: "1px dashed rgba(120, 53, 15, 0.22)",
            outlineOffset: "3px",
          }}
        >
          {/* Top Graticule Coordinates */}
          <div className="flex items-center justify-between px-3 sm:px-4 py-0.5 text-[7.5px] sm:text-[8px] font-mono tracking-[0.2em] uppercase bg-[#FAF3E0]/30 backdrop-blur-xs" style={{ color: currentThemeOption.primaryHex }}>
            <span>28°36&apos;N · 77°14&apos;E</span>
            <span className="font-bold hidden sm:inline" style={{ color: currentThemeOption.primaryHex }}>
              CHARTA JURIDICA · REPERTORIUM STATUTORUM INDIAE
            </span>
            <span>APEX JURISDICTION · NEW DELHI</span>
          </div>

          {/* Bottom Graticule Coordinates */}
          <div className="flex items-center justify-between px-3 sm:px-4 py-0.5 text-[7.5px] sm:text-[8px] font-mono tracking-[0.2em] uppercase bg-[#FAF3E0]/30 backdrop-blur-xs" style={{ color: currentThemeOption.primaryHex }}>
            <span>RATIO 1:1 CONSTITUTIONAL ACCURACY</span>
            <span className="hidden sm:inline">SATYAMEVA JAYATE — TRUTH ALONE TRIUMPHS</span>
            <span>45+ CENTRAL STATUTES MAPPED</span>
          </div>
        </div>

        {/* =====================================================================
            MAIN SVG EXPEDITION MAP (1024 x 576 aspect ratio)
            ===================================================================== */}
        <div className="relative z-20 w-full aspect-[1024/576]">
          <svg
            viewBox="0 0 1024 576"
            className="w-full h-full overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Drop shadow for waypoint medallions */}
              <filter id="medallionShadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="3.5" stdDeviation="2.5" floodColor="#230F05" floodOpacity="0.55" />
                <feDropShadow dx="0" dy="1.2" stdDeviation="1.2" floodColor="#180A04" floodOpacity="0.35" />
              </filter>

              {/* Ink bleed shadow for the tracing line */}
              <filter id="inkBleed" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="1.2" stdDeviation="1.2" floodColor="#2B1005" floodOpacity="0.38" />
              </filter>

              {/* Theme-Aware Radial Gradient for the Node Button */}
              <radialGradient id="nodeThemeGrad" cx="35%" cy="32%" r="68%">
                <stop offset="0%" stopColor={currentThemeOption.accentHex} stopOpacity="0.9" />
                <stop offset="55%" stopColor={currentThemeOption.primaryHex} />
                <stop offset="100%" stopColor="#1C1917" />
              </radialGradient>

              {/* Tracing Line Reveal Mask (Drives progressive unrolling on scroll) */}
              <mask id="tracingMask">
                <path
                  d={pathD}
                  stroke="white"
                  strokeWidth="24"
                  strokeLinecap="butt"
                  strokeLinejoin="round"
                  fill="none"
                  strokeDasharray={totalPathLength}
                  strokeDashoffset={strokeDashoffset}
                />
              </mask>
            </defs>

            {/* 1. Exact 1st Background Image Rendered into Canvas Space */}
            <image
              href="/legal-map-bg.jpg"
              x="0"
              y="0"
              width="1024"
              height="576"
              preserveAspectRatio="xMidYMid slice"
            />

            {/* 2. Hidden Path Reference for Length & Math */}
            <path ref={pathRef} d={pathD} fill="none" stroke="none" />

            {/* 3. The Tracing Line (Reveals in sync with scroll) */}
            <g mask="url(#tracingMask)">
              {/* Shadow ink bleed stroke */}
              <path
                d={pathD}
                stroke="#2B0E05"
                strokeWidth="4.5"
                strokeOpacity="0.35"
                strokeDasharray="6 6"
                strokeLinecap="round"
                fill="none"
                filter="url(#inkBleed)"
              />

              {/* Main deep theme-aware dotted line */}
              <path
                d={pathD}
                stroke={currentThemeOption.primaryHex}
                strokeWidth="3.2"
                strokeDasharray="6 6"
                strokeLinecap="round"
                fill="none"
              />

              {/* Core theme highlight */}
              <path
                d={pathD}
                stroke={currentThemeOption.accentHex}
                strokeWidth="1.4"
                strokeDasharray="6 6"
                strokeLinecap="round"
                fill="none"
              />
            </g>

            {/* 4. The 6 Main Milestone Nodes (Sync reveal when tracing line reaches their position) */}
            {MAP_MILESTONES.map((node) => {
              const isRevealed = clampedProgress >= node.triggerProgress;
              const isHovered = hoveredNodeId === node.id || selectedNodeId === node.id;

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredNodeId(node.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedNodeId(selectedNodeId === node.id ? null : node.id);
                  }}
                >
                  {/* Nested group for scaling in-place from (0,0) */}
                  <g
                    style={{
                      opacity: isRevealed ? 1 : 0,
                      transform: isRevealed
                        ? isHovered
                          ? "scale(1.15)"
                          : "scale(1)"
                        : "scale(0)",
                      transformOrigin: "0px 0px",
                      pointerEvents: isRevealed ? "auto" : "none",
                      visibility: isRevealed ? "visible" : "hidden",
                      transition:
                        "opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    }}
                  >
                    {/* Pulsing Outer Glow on Hover */}
                    {isHovered && (
                      <circle
                        cx="0"
                        cy="0"
                        r="24"
                        fill={currentThemeOption.accentHex}
                        opacity="0.35"
                        className="animate-ping"
                      />
                    )}

                    {/* Outer Theme Medallion Rim */}
                    <circle
                      cx="0"
                      cy="0"
                      r="16.5"
                      fill="url(#nodeThemeGrad)"
                      stroke={currentThemeOption.accentHex}
                      strokeWidth={isHovered ? 1.8 : 1.4}
                      filter="url(#medallionShadow)"
                      style={{ transition: "stroke-width 0.2s ease" }}
                    />

                    {/* Inner Fine Accent Border Circle */}
                    <circle
                      cx="0"
                      cy="0"
                      r="13"
                      fill="none"
                      stroke="#F2E9D8"
                      strokeWidth="0.75"
                      strokeOpacity="0.7"
                    />

                    {/* Center Clean Vector Icon (ViewBox 24x24 centered at -8.5, -8.5) */}
                    <g transform="translate(-8.5, -8.5)">
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#FFFDF8"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {/* 1. Notice Document Icon */}
                        {node.iconType === "notice" && (
                          <>
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" y1="13" x2="8" y2="13" />
                            <line x1="16" y1="17" x2="8" y2="17" />
                            <line x1="10" y1="9" x2="8" y2="9" />
                          </>
                        )}

                        {/* 2. District Court Gavel Icon */}
                        {node.iconType === "gavel" && (
                          <>
                            <path d="m14 13-7.5 7.5c-.8.8-2 .8-2.8 0s-.8-2 0-2.8L11 10" />
                            <path d="m16 16 6-6" />
                            <path d="m8 8 6-6" />
                            <path d="m9 7 8 8" />
                            <path d="m21 11-8-8" />
                          </>
                        )}

                        {/* 3. Scales of Justice Icon */}
                        {node.iconType === "scales" && (
                          <>
                            <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
                            <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
                            <path d="M7 21h10" />
                            <path d="M12 3v18" />
                            <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
                          </>
                        )}

                        {/* 4. High Court Appeal Document with Magnifier */}
                        {node.iconType === "high-court" && (
                          <>
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <circle cx="11.5" cy="14.5" r="3" />
                            <path d="m13.7 16.7 2.8 2.8" />
                          </>
                        )}

                        {/* 5. Supreme Court 3-Person Bench */}
                        {node.iconType === "supreme-court" && (
                          <>
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                          </>
                        )}

                        {/* 6. Constitution Foundation Shield */}
                        {node.iconType === "constitution" && (
                          <>
                            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                            <path d="m9 12 2 2 4-4" />
                          </>
                        )}
                      </svg>
                    </g>
                  </g>
                </g>
              );
            })}
          </svg>

          {/* =====================================================================
              5. AUTHENTIC LEGAL STICKY NOTES ON THE MAP ITSELF
              Placed above or below each node spaced far enough to keep artwork visible
              Hovering over a node or note makes it prominent & larger in size!
              ===================================================================== */}
          {MAP_MILESTONES.map((node) => {
            const isRevealed = clampedProgress >= node.triggerProgress;
            const isHovered = hoveredNodeId === node.id || selectedNodeId === node.id;
            const isOtherHovered = activeHoverOrSelected && activeHoverOrSelected !== node.id;

            return (
              <div
                key={`sticky-note-${node.id}`}
                className="absolute pointer-events-auto transition-all duration-300 select-none cursor-pointer"
                style={{
                  left: node.noteLeftPct,
                  top: node.noteTopPct,
                  transform: `translate(-50%, -50%) rotate(${node.noteTilt}deg) scale(${
                    isHovered ? 1.15 : isRevealed ? 1 : 0.6
                  })`,
                  opacity: isRevealed ? (isHovered ? 1 : isOtherHovered ? 0.35 : 0.92) : 0,
                  visibility: isRevealed ? "visible" : "hidden",
                  pointerEvents: isRevealed ? "auto" : "none",
                  zIndex: isHovered ? 45 : 20,
                  width: "clamp(124px, 13vw, 162px)",
                }}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedNodeId(selectedNodeId === node.id ? null : node.id);
                }}
              >
                {/* 3D Realistic Corner Peel Shadow */}
                <div
                  className="pointer-events-none absolute -bottom-1.5 right-1.5 w-4/5 h-4 bg-black/25 blur-xs -rotate-2 transform origin-bottom-right rounded-br-lg -z-10"
                  aria-hidden="true"
                />

                {/* Top Translucent Frosted Washi Adhesive Tape Strip */}
                <div
                  className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-14 sm:w-18 h-4 bg-gradient-to-r from-[#FEF08A]/60 via-[#FEF08A]/85 to-[#FEF08A]/60 border border-[#FDE047]/75 shadow-xs backdrop-blur-[1px] -rotate-1 z-20 pointer-events-none"
                  style={{
                    clipPath: "polygon(0% 15%, 4% 0%, 96% 0%, 100% 15%, 98% 85%, 100% 100%, 2% 100%, 0% 85%)",
                  }}
                  aria-hidden="true"
                />

                {/* The Sticky Note Sheet */}
                <div
                  className="relative w-full rounded-xs p-2 sm:p-2.5 md:p-3 text-[#1C1917] transition-all duration-300"
                  style={{
                    backgroundColor: "#FFFBEB",
                    backgroundImage: `
                      radial-gradient(#E2D4B7 0.5px, transparent 0.5px),
                      linear-gradient(165deg, #FFFDF7 0%, #FEF8E6 50%, #FDF2D0 100%)
                    `,
                    backgroundSize: "10px 10px, 100% 100%",
                    boxShadow: isHovered
                      ? `0 16px 36px -4px rgba(45, 20, 10, 0.45), 0 0 0 1.8px ${currentThemeOption.accentHex}`
                      : "0 3px 14px -2px rgba(45, 20, 10, 0.22), 0 0 0 0.8px rgba(180, 150, 100, 0.32)",
                  }}
                >
                  {/* Header Stage Badge & Step Number */}
                  <div className="flex items-center justify-between mb-1 pb-0.5">
                    <span
                      className="px-1.5 py-0.5 rounded-full text-[6.5px] sm:text-[7.5px] font-mono font-bold uppercase tracking-wider text-white shadow-xs"
                      style={{ backgroundColor: currentThemeOption.primaryHex }}
                    >
                      {node.category}
                    </span>
                    <span
                      className="font-mono text-[7px] sm:text-[8px] font-bold"
                      style={{ color: currentThemeOption.primaryHex }}
                    >
                      0{node.stepNumber}
                    </span>
                  </div>

                  {/* Title */}
                  <h5 className="font-serif text-[10px] sm:text-[11.5px] font-bold text-[#1C1917] leading-tight">
                    {node.title}
                  </h5>

                  {/* Subtitle */}
                  <p className="text-[6.5px] sm:text-[7.5px] font-mono font-semibold uppercase tracking-wider text-[#92400E] mb-1">
                    {node.subtitle}
                  </p>

                  {/* Plain Language Summary */}
                  <p className="font-sans text-[7.5px] sm:text-[8.5px] text-[#4A3F33] leading-snug line-clamp-3">
                    {node.description}
                  </p>

                  {/* Controlling Law Tags */}
                  <div className="flex flex-wrap gap-1 mt-1.5 pt-1 border-t border-[#E8DCBF]/80">
                    {node.statutes.map((s) => (
                      <span
                        key={s}
                        className="text-[6px] sm:text-[7px] font-mono font-semibold px-1 py-0.2 rounded-xs bg-[#FEF3C7] text-[#78350F] border border-[#FDE68A]"
                      >
                        § {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
