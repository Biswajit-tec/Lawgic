"use client";

import React from "react";
import { FileText, BookOpen, ArrowUpRight, Sparkles } from "lucide-react";
import type { NoticeScenarioData } from "./LegalNoticeStampPaper";

interface PlainLanguageAnalysisCardProps {
  scenario: NoticeScenarioData;
  activeScenarioId: string;
  onSelectScenario: (id: string) => void;
  allScenarios: NoticeScenarioData[];
}

export function PlainLanguageAnalysisCard({
  scenario,
  activeScenarioId,
  onSelectScenario,
  allScenarios,
}: PlainLanguageAnalysisCardProps) {
  return (
    <div className="relative w-full max-w-md lg:max-w-lg select-none">
      {/* Sleek Modern Analysis Card Container */}
      <div
        className="relative w-full rounded-2xl md:rounded-3xl bg-[#FAF7F2] p-6 sm:p-7 md:p-8 flex flex-col justify-between min-h-[540px] sm:min-h-[590px] border border-[#E8DEC8]/80 text-[#1C1917]"
        style={{
          boxShadow: `
            0 30px 70px -15px rgba(0, 0, 0, 0.45),
            0 12px 25px -8px rgba(0, 0, 0, 0.25),
            0 0 0 1px rgba(255, 255, 255, 0.7) inset
          `,
        }}
      >
        <div>
          {/* Top Scenario Pills Selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-4 border-b border-[#E8DEC8]/70 no-scrollbar">
            {allScenarios.map((s) => {
              const isActive = s.id === activeScenarioId;
              return (
                <button
                  key={s.id}
                  onClick={() => onSelectScenario(s.id)}
                  type="button"
                  className={`px-3 py-1 rounded-full text-xs font-sans font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "bg-[#6E1F1F] text-[#FAF7F2] shadow-sm scale-102"
                      : "bg-[#EFE7D8] text-[#5A4D3E] hover:bg-[#E5DAC6]"
                  }`}
                >
                  {s.category}
                </button>
              );
            })}
          </div>

          {/* 1. Top Badges Row */}
          <div className="flex items-center justify-between mb-4">
            {/* Left: LAWGIC ANALYSIS with Star */}
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider text-[#6E1F1F] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#B8935A]" />
              <span>LAWGIC ANALYSIS</span>
            </div>

            {/* Right: IN PLAIN LANGUAGE Badge */}
            <span className="px-3 py-0.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-[#F5E6DC] text-[#78350F] border border-[#F5D0C5]">
              IN PLAIN LANGUAGE
            </span>
          </div>

          {/* 2. Editorial Serif Headline */}
          <h3 className="font-serif text-3xl sm:text-4xl md:text-[2.6rem] font-normal tracking-tight text-[#1C1917] mb-4">
            In plain language
          </h3>

          {/* 3. Plain Language Reassuring Summary */}
          <p className="font-sans text-sm sm:text-base text-[#3A332B] leading-relaxed mb-6 font-normal">
            {scenario.plainExplanation}
          </p>

          {/* 4. Three Structured Breakdown Rows */}
          <div className="space-y-4">
            
            {/* Row 01: Key details */}
            <div className="flex items-start gap-3 sm:gap-4 group">
              <div className="w-10 h-10 rounded-xl bg-[#F7ECE8] flex items-center justify-center shrink-0 text-[#881337] shadow-xs group-hover:scale-105 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between mb-0.5">
                  <h4 className="font-serif text-base sm:text-lg font-bold text-[#1C1917]">
                    Key details
                  </h4>
                  <span className="font-mono text-xs text-[#9C8E7D]">01</span>
                </div>
                <p className="font-sans text-xs sm:text-sm text-[#574C40] leading-snug">
                  {scenario.keyDetails}
                </p>
              </div>
            </div>

            {/* Row 02: Source references */}
            <div className="flex items-start gap-3 sm:gap-4 group">
              <div className="w-10 h-10 rounded-xl bg-[#F4EDE2] flex items-center justify-center shrink-0 text-[#9A3412] shadow-xs group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between mb-0.5">
                  <h4 className="font-serif text-base sm:text-lg font-bold text-[#1C1917]">
                    Source references
                  </h4>
                  <span className="font-mono text-xs text-[#9C8E7D]">02</span>
                </div>
                <p className="font-sans text-xs sm:text-sm text-[#574C40] leading-snug">
                  {scenario.sourceReferences}
                </p>
              </div>
            </div>

            {/* Row 03: Next steps */}
            <div className="flex items-start gap-3 sm:gap-4 group">
              <div className="w-10 h-10 rounded-xl bg-[#F8ECE5] flex items-center justify-center shrink-0 text-[#B45309] shadow-xs group-hover:scale-105 transition-transform">
                <ArrowUpRight className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between mb-0.5">
                  <h4 className="font-serif text-base sm:text-lg font-bold text-[#1C1917]">
                    Next steps
                  </h4>
                  <span className="font-mono text-xs text-[#9C8E7D]">03</span>
                </div>
                <p className="font-sans text-xs sm:text-sm text-[#574C40] leading-snug">
                  {scenario.nextSteps}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* 5. Trust Footnote */}
        <div className="mt-5 pt-3 border-t border-[#E8DEC8]/80 flex items-center justify-between text-[11px] font-mono text-[#7A6E60]">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
            100% GROUNDED STATUTORY PARSING
          </span>
          <span className="text-[#6E1F1F] font-semibold">LAWGIC AI MODEL</span>
        </div>
      </div>
    </div>
  );
}
