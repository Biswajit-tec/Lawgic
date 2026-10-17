"use client";

import React from "react";
import { FileText, BookOpen, ArrowUpRight, Sparkles } from "lucide-react";
import type { NoticeScenarioData } from "./LegalNoticeStampPaper";

interface LawgicStickyNoteProps {
  scenario: NoticeScenarioData;
  currentIndex: number;
  totalCount: number;
}

export function LawgicStickyNote({
  scenario,
  currentIndex,
  totalCount,
}: LawgicStickyNoteProps) {
  return (
    <div className="relative w-full max-w-md lg:max-w-[460px] select-none group">
      {/* 3D Corner Peel Shadow Effect for Real Sticky Note Depth */}
      <div
        className="pointer-events-none absolute -bottom-3 right-3 w-4/5 h-10 bg-black/35 blur-md -rotate-2 transform origin-bottom-right rounded-br-2xl -z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-1.5 inset-x-4 h-6 bg-black/20 blur-sm -z-10"
        aria-hidden="true"
      />

      {/* The Sticky Note Sheet */}
      <div
        className="relative w-full rounded-sm text-[#1C1917] p-5 sm:p-7 md:p-8 flex flex-col justify-between min-h-[500px] sm:min-h-[550px] transition-all duration-300"
        style={{
          // Authentic warm legal canary/ivory paper texture
          backgroundColor: "#FFFDF5",
          backgroundImage: `
            radial-gradient(#D6C7A8 0.5px, transparent 0.5px),
            linear-gradient(175deg, #FFFDF8 0%, #FFF9EB 45%, #FEF5DC 100%)
          `,
          backgroundSize: "14px 14px, 100% 100%",
          boxShadow: `
            0 1px 2px rgba(0, 0, 0, 0.08),
            0 12px 32px -4px rgba(45, 20, 10, 0.22),
            0 25px 60px -12px rgba(0, 0, 0, 0.35),
            0 0 0 1px rgba(180, 150, 100, 0.25)
          `,
          transform: "rotate(1.2deg)",
        }}
      >
        {/* Top Translucent Frosted Washi / Adhesive Tape Strip */}
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 sm:w-32 h-6 bg-[#FEF08A]/45 border border-[#FDE047]/60 shadow-[0_2px_4px_rgba(0,0,0,0.08)] backdrop-blur-[1px] rotate-[-0.8deg] z-20 pointer-events-none"
          style={{
            clipPath: "polygon(0% 15%, 3% 0%, 97% 0%, 100% 15%, 98% 85%, 100% 100%, 2% 100%, 0% 85%)",
          }}
          aria-hidden="true"
        />

        {/* Paper Grain & Top Adhesive Shadow */}
        <div
          className="pointer-events-none absolute top-0 inset-x-0 h-4 bg-gradient-to-b from-black/[0.04] to-transparent"
          aria-hidden="true"
        />

        {/* Content Container */}
        <div className="relative z-10">
          
          {/* 1. Header Badges: LAWGIC ANALYSIS & IN PLAIN LANGUAGE */}
          <div className="flex items-center justify-between mb-3 pt-1">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider text-[#78350F] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#B45309]" />
              <span>LAWGIC ANALYSIS</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider bg-[#FDE68A]/70 text-[#78350F] border border-[#FCD34D]">
                IN PLAIN LANGUAGE
              </span>
              <span className="font-mono text-[11px] text-[#92400E] font-bold">
                {currentIndex + 1}/{totalCount}
              </span>
            </div>
          </div>

          {/* 2. Editorial Serif Title */}
          <h3 className="font-serif text-3xl sm:text-4xl md:text-[2.5rem] font-normal tracking-tight text-[#1C1917] mb-3">
            In plain language
          </h3>

          {/* 3. Reassuring Plain Language Summary */}
          <p className="font-sans text-xs sm:text-sm text-[#3A332B] leading-relaxed mb-5 font-normal">
            {scenario.plainExplanation}
          </p>

          {/* 4. Three Numbered Structured Breakdown Rows */}
          <div className="space-y-3.5">
            
            {/* Row 01: Key details */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#FEF3C7] border border-[#FDE68A] flex items-center justify-center shrink-0 text-[#92400E] shadow-xs">
                <FileText className="w-4.5 h-4.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between mb-0.5">
                  <h4 className="font-serif text-sm sm:text-base font-bold text-[#1C1917]">
                    Key details
                  </h4>
                  <span className="font-mono text-[11px] text-[#92400E] font-bold">01</span>
                </div>
                <p className="font-sans text-[11px] sm:text-xs text-[#574C40] leading-snug">
                  {scenario.keyDetails}
                </p>
              </div>
            </div>

            {/* Row 02: Source references */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#FEF3C7] border border-[#FDE68A] flex items-center justify-center shrink-0 text-[#92400E] shadow-xs">
                <BookOpen className="w-4.5 h-4.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between mb-0.5">
                  <h4 className="font-serif text-sm sm:text-base font-bold text-[#1C1917]">
                    Source references
                  </h4>
                  <span className="font-mono text-[11px] text-[#92400E] font-bold">02</span>
                </div>
                <p className="font-sans text-[11px] sm:text-xs text-[#574C40] leading-snug">
                  {scenario.sourceReferences}
                </p>
              </div>
            </div>

            {/* Row 03: Next steps */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#FEF3C7] border border-[#FDE68A] flex items-center justify-center shrink-0 text-[#92400E] shadow-xs">
                <ArrowUpRight className="w-4.5 h-4.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between mb-0.5">
                  <h4 className="font-serif text-sm sm:text-base font-bold text-[#1C1917]">
                    Next steps
                  </h4>
                  <span className="font-mono text-[11px] text-[#92400E] font-bold">03</span>
                </div>
                <p className="font-sans text-[11px] sm:text-xs text-[#574C40] leading-snug">
                  {scenario.nextSteps}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* 5. Sticky Note Bottom Edge with Subtle Paper Lift */}
        <div className="mt-4 pt-2.5 border-t border-[#E5D7BA]/70 flex items-center justify-between text-[10px] font-mono text-[#78350F]">
          <span className="flex items-center gap-1.5 font-bold">
            <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
            100% STATUTORY GROUNDING
          </span>
          <span className="font-semibold text-[#92400E]">LAWGIC MEMO</span>
        </div>

        {/* Curved Corner Peel Shading (Bottom-Right) */}
        <div
          className="pointer-events-none absolute bottom-0 right-0 w-8 h-8 overflow-hidden rounded-br-sm"
          aria-hidden="true"
        >
          <div
            className="w-full h-full bg-gradient-to-tl from-black/15 via-black/5 to-transparent"
          />
        </div>

      </div>
    </div>
  );
}
