"use client";

import React from "react";
import { FileText, ShieldAlert, Home, ShieldCheck, Sparkles } from "lucide-react";
import type { NoticeScenarioData } from "./LegalNoticeStampPaper";

interface StickyNotesClusterProps {
  scenarios: NoticeScenarioData[];
  activeIndex: number;
  maxRevealedIndex: number;
  onSelectIndex: (index: number) => void;
}

export function StickyNotesCluster({
  scenarios,
  activeIndex,
  maxRevealedIndex,
  onSelectIndex,
}: StickyNotesClusterProps) {
  // Scenario 0 = Employment Notice
  const sc0 = scenarios[0];
  // Scenario 1 = Police Summons 41A
  const sc1 = scenarios[1];
  // Scenario 2 = Tenant Eviction Demand
  const sc2 = scenarios[2];

  const isNote0Revealed = maxRevealedIndex >= 0;
  const isNote1Revealed = maxRevealedIndex >= 1;
  const isNote2Revealed = maxRevealedIndex >= 2;

  return (
    <div className="relative w-full max-w-lg lg:max-w-[490px] select-none flex flex-col items-center">
      {/* Cluster Eyebrow Badge */}
      <div className="flex items-center justify-between w-full px-2 mb-2 sm:mb-3">
        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-mono font-bold tracking-wider text-[var(--brass-light)] uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[var(--brass-light)]" />
          <span>LAWGIC ANALYSIS MEMOS</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#FDE68A]/25 text-[var(--brass-light)] border border-[#FDE68A]/40">
            {maxRevealedIndex === 2
              ? "ALL 3 REVEALED"
              : `${maxRevealedIndex + 1} OF ${scenarios.length} REVEALED`}
          </span>
        </div>
      </div>

      {/* =========================================================================
          TRIANGLE STICKY NOTE LAYOUT
          Top Row: 2 Sticky Notes side-by-side (Note 1 for Notice 1, Note 2 for Notice 2)
          Bottom Row: 1 Sticky Note centered below both (Note 3 for Notice 3)
          ========================================================================= */}
      <div className="w-full flex flex-col items-center gap-3 sm:gap-4">
        
        {/* TOP ROW: Two Notes Side-by-Side */}
        <div className="w-full grid grid-cols-2 gap-2.5 sm:gap-4">
          
          {/* -------------------------------------------------------------------
              STICKY NOTE 1: EMPLOYMENT NOTICE MEMO (Top-Left)
              Revealed with Stamp Paper 1
              ------------------------------------------------------------------- */}
          <div
            onClick={() => isNote0Revealed && onSelectIndex(0)}
            className={`relative rounded-sm p-3 sm:p-4 flex flex-col justify-between transition-all duration-500 ease-out ${
              !isNote0Revealed
                ? "opacity-0 translate-y-4 scale-90 pointer-events-none invisible"
                : activeIndex === 0
                ? "opacity-100 translate-y-0 scale-[1.02] ring-2 ring-[#B45309] shadow-2xl cursor-pointer"
                : "opacity-70 translate-y-0 scale-100 hover:scale-[1.01] hover:opacity-100 cursor-pointer"
            }`}
            style={{
              backgroundColor: "#FFFBEB",
              backgroundImage: `
                radial-gradient(#E2D4B7 0.5px, transparent 0.5px),
                linear-gradient(165deg, #FFFDF7 0%, #FEF8E6 50%, #FDF2D0 100%)
              `,
              backgroundSize: "10px 10px, 100% 100%",
              boxShadow: `
                0 1px 2px rgba(0, 0, 0, 0.08),
                0 8px 20px -3px rgba(35, 15, 5, 0.25),
                0 16px 36px -8px rgba(0, 0, 0, 0.35),
                0 0 0 1px rgba(180, 150, 100, 0.3)
              `,
              transform: "rotate(-1.5deg)",
              minHeight: "155px",
            }}
          >
            {/* Top Frosted Washi Tape Strip */}
            <div
              className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-5 bg-gradient-to-r from-[#FEF08A]/50 via-[#FEF08A]/80 to-[#FEF08A]/50 border border-[#FDE047]/70 shadow-xs backdrop-blur-[1px] rotate-[-2deg] z-20 pointer-events-none"
              style={{
                clipPath: "polygon(0% 15%, 4% 0%, 96% 0%, 100% 15%, 98% 85%, 100% 100%, 2% 100%, 0% 85%)",
              }}
              aria-hidden="true"
            />

            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-1.5 pt-0.5">
                <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-mono font-bold tracking-wider text-[#92400E] uppercase">
                  <FileText className="w-3 h-3 text-[#B45309]" />
                  EMPLOYMENT MEMO
                </span>
                <span className="font-mono text-[10px] text-[#B45309] font-bold">01</span>
              </div>

              {/* Title */}
              <h4 className="font-serif text-xs sm:text-sm font-bold text-[#1C1917] leading-tight mb-1">
                Notice Core Demands
              </h4>

              {/* Body */}
              <p className="font-sans text-[10px] sm:text-[11px] text-[#4A3F33] leading-relaxed line-clamp-4">
                {sc0?.keyDetails || "Notice period of 60 days demanded; written response required within 15 days."}
              </p>
            </div>

            {/* Note Tag */}
            <div className="mt-2 pt-1 border-t border-[#E8DCBF]/70 flex items-center justify-between text-[8px] sm:text-[9px] font-mono text-[#78350F]">
              <span>ICA 1872</span>
              <span className="font-semibold">{activeIndex === 0 ? "★ VIEWING" : "NOTICE 01"}</span>
            </div>

            {/* Subtle Bottom-Right Corner Peel */}
            <div
              className="pointer-events-none absolute bottom-0 right-0 w-5 h-5 overflow-hidden rounded-br-sm"
              aria-hidden="true"
            >
              <div className="w-full h-full bg-gradient-to-tl from-black/15 to-transparent" />
            </div>
          </div>

          {/* -------------------------------------------------------------------
              STICKY NOTE 2: POLICE SUMMONS MEMO (Top-Right)
              Revealed with Stamp Paper 2
              ------------------------------------------------------------------- */}
          <div
            onClick={() => isNote1Revealed && onSelectIndex(1)}
            className={`relative rounded-sm p-3 sm:p-4 flex flex-col justify-between transition-all duration-500 ease-out ${
              !isNote1Revealed
                ? "opacity-0 translate-y-4 scale-90 pointer-events-none invisible"
                : activeIndex === 1
                ? "opacity-100 translate-y-0 scale-[1.02] ring-2 ring-[#B45309] shadow-2xl cursor-pointer"
                : "opacity-70 translate-y-0 scale-100 hover:scale-[1.01] hover:opacity-100 cursor-pointer"
            }`}
            style={{
              backgroundColor: "#FEF9C3",
              backgroundImage: `
                radial-gradient(#DECFA9 0.5px, transparent 0.5px),
                linear-gradient(165deg, #FEFCE8 0%, #FEF08A 60%, #FDE047 120%)
              `,
              backgroundSize: "10px 10px, 100% 100%",
              boxShadow: `
                0 1px 2px rgba(0, 0, 0, 0.08),
                0 8px 20px -3px rgba(35, 15, 5, 0.25),
                0 16px 36px -8px rgba(0, 0, 0, 0.35),
                0 0 0 1px rgba(180, 150, 100, 0.3)
              `,
              transform: "rotate(1.8deg)",
              minHeight: "155px",
            }}
          >
            {/* Top Frosted Washi Tape Strip */}
            <div
              className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-5 bg-gradient-to-r from-[#FDE68A]/50 via-[#FDE68A]/80 to-[#FDE68A]/50 border border-[#FCD34D]/70 shadow-xs backdrop-blur-[1px] rotate-[1.5deg] z-20 pointer-events-none"
              style={{
                clipPath: "polygon(0% 15%, 4% 0%, 96% 0%, 100% 15%, 98% 85%, 100% 100%, 2% 100%, 0% 85%)",
              }}
              aria-hidden="true"
            />

            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-1.5 pt-0.5">
                <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-mono font-bold tracking-wider text-[#92400E] uppercase">
                  <ShieldAlert className="w-3 h-3 text-[#B45309]" />
                  POLICE SUMMONS 41A
                </span>
                <span className="font-mono text-[10px] text-[#B45309] font-bold">02</span>
              </div>

              {/* Title */}
              <h4 className="font-serif text-xs sm:text-sm font-bold text-[#1C1917] leading-tight mb-1">
                Statutory Attendance Rights
              </h4>

              {/* Body */}
              <p className="font-sans text-[10px] sm:text-[11px] text-[#4A3F33] leading-relaxed line-clamp-4">
                {sc1?.keyDetails || "Inquiry witness attendance only; no arbitrary arrest permitted under statutory compliance."}
              </p>
            </div>

            {/* Note Tag */}
            <div className="mt-2 pt-1 border-t border-[#E8DCBF]/70 flex items-center justify-between text-[8px] sm:text-[9px] font-mono text-[#78350F]">
              <span>BNSS SEC 35</span>
              <span className="font-semibold">{activeIndex === 1 ? "★ VIEWING" : "NOTICE 02"}</span>
            </div>

            {/* Subtle Bottom-Right Corner Peel */}
            <div
              className="pointer-events-none absolute bottom-0 right-0 w-5 h-5 overflow-hidden rounded-br-sm"
              aria-hidden="true"
            >
              <div className="w-full h-full bg-gradient-to-tl from-black/15 to-transparent" />
            </div>
          </div>

        </div>

        {/* BOTTOM ROW: Sticky Note 3 Centered Beneath Both Top Notes (Revealed with Stamp Paper 3) */}
        <div className="w-full flex justify-center">
          <div
            onClick={() => isNote2Revealed && onSelectIndex(2)}
            className={`relative w-full max-w-[340px] sm:max-w-[380px] rounded-sm p-3.5 sm:p-4.5 flex flex-col justify-between transition-all duration-500 ease-out ${
              !isNote2Revealed
                ? "opacity-0 translate-y-4 scale-90 pointer-events-none invisible"
                : activeIndex === 2
                ? "opacity-100 translate-y-0 scale-[1.02] ring-2 ring-[#15803D] shadow-2xl cursor-pointer"
                : "opacity-70 translate-y-0 scale-100 hover:scale-[1.01] hover:opacity-100 cursor-pointer"
            }`}
            style={{
              backgroundColor: "#FFFDF5",
              backgroundImage: `
                radial-gradient(#D8C9A7 0.5px, transparent 0.5px),
                linear-gradient(170deg, #FFFFFF 0%, #FFFDF7 40%, #FEF6DF 100%)
              `,
              backgroundSize: "10px 10px, 100% 100%",
              boxShadow: `
                0 1px 2px rgba(0, 0, 0, 0.08),
                0 10px 24px -4px rgba(35, 15, 5, 0.28),
                0 20px 45px -10px rgba(0, 0, 0, 0.4),
                0 0 0 1px rgba(180, 150, 100, 0.3)
              `,
              transform: "rotate(-0.5deg)",
              minHeight: "140px",
            }}
          >
            {/* Top Frosted Washi Tape (Centered) */}
            <div
              className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-5 bg-gradient-to-r from-[#FEF08A]/50 via-[#FEF08A]/80 to-[#FEF08A]/50 border border-[#FDE047]/70 shadow-xs backdrop-blur-[1px] rotate-[-0.6deg] z-20 pointer-events-none"
              style={{
                clipPath: "polygon(0% 15%, 4% 0%, 96% 0%, 100% 15%, 98% 85%, 100% 100%, 2% 100%, 0% 85%)",
              }}
              aria-hidden="true"
            />

            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-1.5 pt-0.5">
                <span className="inline-flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono font-bold tracking-wider text-[#15803D] uppercase">
                  <Home className="w-3.5 h-3.5 text-[#16A34A]" />
                  TENANT EVICTION MEMO
                </span>
                <span className="font-mono text-[10px] text-[#15803D] font-bold">03</span>
              </div>

              {/* Title */}
              <h4 className="font-serif text-xs sm:text-sm font-bold text-[#1C1917] leading-tight mb-1">
                Eviction &amp; Deposit Voidance
              </h4>

              {/* Body */}
              <p className="font-sans text-[10px] sm:text-[11px] text-[#332A22] leading-relaxed">
                {sc2?.keyDetails || "24-hr eviction is void under law; deposit cannot be forfeited arbitrarily without court decree."}
              </p>
            </div>

            {/* Bottom Grounding Attestation */}
            <div className="mt-2.5 pt-1.5 border-t border-[#E8DCBF]/70 flex items-center justify-between text-[8px] sm:text-[9px] font-mono text-[#78350F]">
              <span className="flex items-center gap-1 text-[#15803D] font-bold">
                <ShieldCheck className="w-3 h-3 text-[#16A34A]" />
                100% STATUTORY GROUNDED
              </span>
              <span className="font-semibold text-[#92400E]">{activeIndex === 2 ? "★ VIEWING" : "NOTICE 03"}</span>
            </div>

            {/* Subtle Bottom-Right Corner Peel */}
            <div
              className="pointer-events-none absolute bottom-0 right-0 w-6 h-6 overflow-hidden rounded-br-sm"
              aria-hidden="true"
            >
              <div className="w-full h-full bg-gradient-to-tl from-black/15 to-transparent" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
