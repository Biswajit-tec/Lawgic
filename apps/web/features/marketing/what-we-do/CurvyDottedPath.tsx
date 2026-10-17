"use client";

import React, { useMemo } from "react";
import {
  ScalesOfJustice,
  CourtGavel,
  NoticeDecoderIcon,
  ContractShieldIcon,
  CourtNavigatorIcon,
} from "./CourtElements";

export interface MilestoneNode {
  id: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  statutes: string[];
  actionText: string;
  xPercent: number; // 0 to 100
  yPercent: number; // 0 to 100
  triggerProgress: number; // when this node reveals (0.0 to 1.0)
  iconType: "notice" | "scales" | "gavel" | "shield" | "navigator";
}

export const MILESTONE_NODES: MilestoneNode[] = [
  {
    id: "notice-decoder",
    stepNumber: "01",
    title: "Legal Notice & Summons Decoder",
    subtitle: "Criminal Summons & Advocate Letters",
    category: "STATUTORY DEFENSE",
    description:
      "Instant clause-by-clause translation of Section 138 NI Act notices, Sec 41A CrPC summons, and landlord demands into simple, empowering plain language.",
    statutes: ["Sec 138 NI Act", "Sec 41A CrPC", "Sec 35 BNSS", "Notice Periods"],
    actionText: "Upload a Notice to Decode →",
    xPercent: 18,
    yPercent: 32,
    triggerProgress: 0.18,
    iconType: "notice",
  },
  {
    id: "scales-balance",
    stepNumber: "02",
    title: "Citizen Rights & Statutory Balance",
    subtitle: "Consumer & Regulatory Equality",
    category: "RIGHTS & FAIRNESS",
    description:
      "Restores equilibrium when dealing with corporate builders, insurers, and landlords. Identifies illegal forfeiture clauses and drafts enforceable statutory objections.",
    statutes: ["Consumer Protection 2019", "RERA Sec 18", "Indian Contract Act Sec 74"],
    actionText: "Check Your Statutory Rights →",
    xPercent: 34,
    yPercent: 68,
    triggerProgress: 0.38,
    iconType: "scales",
  },
  {
    id: "gavel-process",
    stepNumber: "03",
    title: "Magistrate & Judicial Pipeline",
    subtitle: "Court Stage & Procedural Navigator",
    category: "JUDICIAL PROCEDURE",
    description:
      "Demystifies exactly what happens at every stage of an Indian court matter—from initial summons and interim injunctions to evidence, mediation, and final order.",
    statutes: ["CPC Order 39", "Criminal Trial Stages", "Mediation Act 2023"],
    actionText: "Navigate Your Court Stage →",
    xPercent: 50,
    yPercent: 28,
    triggerProgress: 0.56,
    iconType: "gavel",
  },
  {
    id: "contract-protection",
    stepNumber: "04",
    title: "Agreements & Contract Shield",
    subtitle: "Commercial & Employment Defense",
    category: "PREVENTATIVE PROTECTION",
    description:
      "Pre-signature analysis of rental deeds, employment bonds, non-compete clauses, and vendor contracts. Pinpoints hidden liabilities before you commit your signature.",
    statutes: ["Specific Relief Act", "Arbitration Act Sec 9", "Employment Labour Codes"],
    actionText: "Audit an Agreement Deed →",
    xPercent: 68,
    yPercent: 70,
    triggerProgress: 0.74,
    iconType: "shield",
  },
  {
    id: "court-navigator",
    stepNumber: "05",
    title: "Constitutional Writs & Redress",
    subtitle: "High Court & Supreme Court Remedies",
    category: "CONSTITUTIONAL REMEDIES",
    description:
      "When statutory authorities fail or act arbitrarily, understand fundamental remedies under Article 226 and Article 32, public grievances, and high-court writ petitions.",
    statutes: ["Article 226 Writs", "Article 32 Mandamus", "RTI Act 2005"],
    actionText: "Explore Constitutional Remedies →",
    xPercent: 84,
    yPercent: 36,
    triggerProgress: 0.90,
    iconType: "navigator",
  },
];

interface CurvyDottedPathProps {
  progress: number; // 0.0 to 1.0 (scroll scrub progress)
  hoveredNodeId: string | null;
  setHoveredNodeId: (id: string | null) => void;
  selectedNodeId: string | null;
  setSelectedNodeId: (id: string | null) => void;
}

export function CurvyDottedPath({
  progress,
  hoveredNodeId,
  setHoveredNodeId,
  selectedNodeId,
  setSelectedNodeId,
}: CurvyDottedPathProps) {
  // SVG Curve definition across 1000 x 500 space
  // Swirling gracefully from left page (x: 80) across the spine (x: 500) to right page (x: 920)
  const pathD = "M 80 200 C 140 100, 220 160, 280 260 C 330 350, 420 380, 500 200 C 580 60, 640 340, 740 370 C 820 400, 860 180, 930 240";

  // Total nominal path length for mask calculation
  const pathLength = 1150;
  const strokeDashoffset = Math.max(0, pathLength - progress * pathLength);

  // Approximate tip coordinates of golden particle based on progress
  const particlePos = useMemo(() => {
    // Piecewise cubic bezier interpolation for the glowing particle tip
    const t = Math.min(Math.max(progress, 0), 1);
    // Interpolate through the 5 waypoint hubs
    if (t <= 0.2) {
      const sub = t / 0.2;
      return { x: 80 + sub * 120, y: 200 - sub * 40 };
    } else if (t <= 0.4) {
      const sub = (t - 0.2) / 0.2;
      return { x: 200 + sub * 150, y: 160 + sub * 190 };
    } else if (t <= 0.6) {
      const sub = (t - 0.4) / 0.2;
      return { x: 350 + sub * 150, y: 350 - sub * 200 };
    } else if (t <= 0.8) {
      const sub = (t - 0.6) / 0.2;
      return { x: 500 + sub * 200, y: 150 + sub * 200 };
    } else {
      const sub = (t - 0.8) / 0.2;
      return { x: 700 + sub * 220, y: 350 - sub * 120 };
    }
  }, [progress]);

  return (
    <div className="relative w-full h-full select-none">
      {/* SVG Container for the Path and Nodes */}
      <svg
        viewBox="0 0 1000 500"
        className="w-full h-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Glowing Golden Gradient for Path */}
          <linearGradient id="goldPathGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D97706" />
            <stop offset="25%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="#FCD34D" />
            <stop offset="75%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          {/* Reveal Mask based on Scroll Progress */}
          <mask id="pathProgressMask">
            <path
              d={pathD}
              stroke="white"
              strokeWidth="20"
              strokeLinecap="round"
              fill="none"
              strokeDasharray={pathLength}
              strokeDashoffset={strokeDashoffset}
              style={{ transition: "stroke-dashoffset 0.1s linear" }}
            />
          </mask>

          {/* Ambient Glow Filter */}
          <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Underlying Faint Track Line (Parchment Engraving Guide) */}
        <path
          d={pathD}
          stroke="#B45309"
          strokeOpacity="0.22"
          strokeWidth="3"
          strokeDasharray="4 8"
          strokeLinecap="round"
          fill="none"
        />

        {/* 2. Active Glowing Dotted Path (Revealed via Scroll Mask) */}
        <g mask="url(#pathProgressMask)">
          {/* Outer Ambient Glow Aura */}
          <path
            d={pathD}
            stroke="#F59E0B"
            strokeOpacity="0.6"
            strokeWidth="7"
            strokeDasharray="6 10"
            strokeLinecap="round"
            fill="none"
            filter="url(#goldGlow)"
          />
          {/* Core Bright Golden Dotted Line */}
          <path
            d={pathD}
            stroke="url(#goldPathGrad)"
            strokeWidth="3.5"
            strokeDasharray="6 10"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* 3. Glowing Golden Spark Particle Gliding Along Leading Edge */}
        {progress > 0.05 && progress < 0.98 && (
          <g transform={`translate(${particlePos.x}, ${particlePos.y})`}>
            {/* Pulsing Outer Flare */}
            <circle cx="0" cy="0" r="14" fill="#F59E0B" opacity="0.35" className="animate-ping" />
            {/* Bright Center Bead */}
            <circle cx="0" cy="0" r="6" fill="#FFFDF5" stroke="#D97706" strokeWidth="2.5" />
            <circle cx="0" cy="0" r="2.5" fill="#FEF08A" />
          </g>
        )}
      </svg>

      {/* 4. Interactive HTML / Component Nodes Overlay positioned exactly at milestone percentages */}
      {MILESTONE_NODES.map((node) => {
        const isRevealed = progress >= node.triggerProgress;
        const isHovered = hoveredNodeId === node.id || selectedNodeId === node.id;

        return (
          <div
            key={node.id}
            style={{
              left: `${node.xPercent}%`,
              top: `${node.yPercent}%`,
            }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
              isHovered ? "z-50" : "z-30"
            } ${
              isRevealed
                ? "opacity-100 scale-100 pointer-events-auto"
                : "opacity-0 scale-50 pointer-events-none"
            }`}
          >
            {/* Node Interactive Hitbox Button */}
            <div
              onMouseEnter={() => setHoveredNodeId(node.id)}
              onMouseLeave={() => setHoveredNodeId(null)}
              onClick={() => setSelectedNodeId(selectedNodeId === node.id ? null : node.id)}
              className="group relative flex flex-col items-center cursor-pointer"
            >
              {/* Outer Golden Aura Ring on Hover */}
              <div
                className={`absolute inset-0 -m-3 rounded-full transition-all duration-300 pointer-events-none ${
                  isHovered
                    ? "bg-[#F59E0B]/25 scale-125 blur-sm"
                    : "bg-transparent scale-100"
                }`}
              />

              {/* Node Orb Container with Parchment Gradient and Brass Border */}
              <div
                className={`relative w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isHovered
                    ? "scale-115 shadow-[0_12px_28px_rgba(180,83,9,0.45)] border-2 border-[#D97706]"
                    : "shadow-[0_6px_16px_rgba(0,0,0,0.18)] border border-[#B45309]/50"
                }`}
                style={{
                  backgroundColor: "#FFFDF7",
                  backgroundImage: "radial-gradient(#FDF6E2 0%, #F5E8C7 100%)",
                }}
              >
                {/* Court Element Icon Component */}
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 flex items-center justify-center">
                  {node.iconType === "notice" && <NoticeDecoderIcon isHovered={isHovered} />}
                  {node.iconType === "scales" && <ScalesOfJustice isHovered={isHovered} />}
                  {node.iconType === "gavel" && <CourtGavel isHovered={isHovered} />}
                  {node.iconType === "shield" && <ContractShieldIcon isHovered={isHovered} />}
                  {node.iconType === "navigator" && <CourtNavigatorIcon isHovered={isHovered} />}
                </div>

                {/* Milestone Step Number Pill Badge */}
                <div className="absolute -top-1.5 -right-1 px-1.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-[#991B1B] text-[#FEF3C7] border border-[#FDE047] shadow-xs">
                  {node.stepNumber}
                </div>
              </div>

              {/* Node Label Below */}
              <div className="mt-2 text-center whitespace-nowrap">
                <span className="font-serif text-[11px] sm:text-xs font-bold text-[#1C1917] tracking-wide block drop-shadow-xs bg-[#FFFDF7]/90 px-2 py-0.5 rounded-full border border-[#D8C7B0]/60 backdrop-blur-xs">
                  {node.title.split("&")[0].trim()}
                </span>
                <span className="text-[9px] font-mono font-semibold text-[#92400E] uppercase tracking-wider block">
                  {node.category}
                </span>
              </div>

              {/* Floating Parchment Tooltip Memo on Hover */}
              {isHovered && (
                <div
                  className={`absolute w-64 sm:w-72 p-3.5 rounded-md shadow-[0_20px_45px_rgba(40,15,5,0.45)] border border-[#B45309]/50 z-50 text-left transition-all duration-300 animate-fadeIn pointer-events-auto ${
                    node.yPercent < 50 ? "top-full mt-3" : "bottom-full mb-3"
                  } ${
                    node.xPercent < 25
                      ? "left-0"
                      : node.xPercent > 75
                      ? "right-0 -translate-x-4"
                      : "left-1/2 -translate-x-1/2"
                  }`}
                  style={{
                    backgroundColor: "#FFFDF8",
                    backgroundImage: `
                      radial-gradient(#DECFA9 0.5px, transparent 0.5px),
                      linear-gradient(165deg, #FFFDF8 0%, #FEF8E8 60%, #FDF0D0 100%)
                    `,
                    backgroundSize: "8px 8px, 100% 100%",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Top Tape Accent */}
                  <div
                    className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-[#FEF08A]/70 border border-[#FDE047]/80 rotate-[-1deg]"
                    style={{
                      clipPath: "polygon(0% 15%, 5% 0%, 95% 0%, 100% 15%, 98% 85%, 100% 100%, 2% 100%, 0% 85%)",
                    }}
                  />

                  {/* Tooltip Header */}
                  <div className="flex items-center justify-between text-[9px] font-mono text-[#92400E] font-bold uppercase tracking-wider mb-1 pt-1">
                    <span>{node.category}</span>
                    <span>NODE {node.stepNumber}</span>
                  </div>

                  <h5 className="font-serif text-sm font-bold text-[#1C1917] leading-snug mb-1">
                    {node.title}
                  </h5>

                  <p className="font-sans text-[11px] text-[#4A3F33] leading-relaxed mb-2.5">
                    {node.description}
                  </p>

                  {/* Statute Pills */}
                  <div className="flex flex-wrap gap-1 mb-2.5">
                    {node.statutes.map((s) => (
                      <span
                        key={s}
                        className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded-xs bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Action Link */}
                  <div className="pt-1.5 border-t border-[#E8DCBF] flex items-center justify-between text-[10px] font-sans font-semibold text-[#991B1B]">
                    <span>{node.actionText}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
