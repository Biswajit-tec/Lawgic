"use client";

import React, { useEffect, useRef, useState } from "react";
import { StampPaperHeader } from "./StampPaperHeader";
import { CircularLawgicStamp } from "./CircularLawgicStamp";
import type { NoticeScenarioData } from "./LegalNoticeStampPaper";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaperStackCarouselProps {
  scenarios: NoticeScenarioData[];
  activeIndex: number;
  onSelectIndex: (index: number) => void;
  isStamped: boolean;
  notaryColor?: string;
}

export function PaperStackCarousel({
  scenarios,
  activeIndex,
  onSelectIndex,
  isStamped,
  notaryColor = "#6E1F1F",
}: PaperStackCarouselProps) {
  // Physical 3D Card Shuffle Animation State
  // When activeIndex changes, the previous card lifts up/out and tucks to the back of the deck
  const [shufflingCard, setShufflingCard] = useState<number | null>(null);
  const [shuffleStage, setShuffleStage] = useState<"idle" | "fly-out" | "fly-back">("idle");
  const prevActiveRef = useRef(activeIndex);

  useEffect(() => {
    if (prevActiveRef.current !== activeIndex) {
      const outgoingIndex = prevActiveRef.current;
      prevActiveRef.current = activeIndex;

      // Phase 1: Card lifts up and slides out to top-right
      setShufflingCard(outgoingIndex);
      setShuffleStage("fly-out");

      // Phase 2: Card drops z-index to behind the stack and tucks into the rear
      const flyOutTimer = setTimeout(() => {
        setShuffleStage("fly-back");
      }, 260);

      // Phase 3: Settle complete
      const finishTimer = setTimeout(() => {
        setShuffleStage("idle");
        setShufflingCard(null);
      }, 620);

      return () => {
        clearTimeout(flyOutTimer);
        clearTimeout(finishTimer);
      };
    }
  }, [activeIndex]);

  const handlePrev = () => {
    onSelectIndex((activeIndex - 1 + scenarios.length) % scenarios.length);
  };

  const handleNext = () => {
    onSelectIndex((activeIndex + 1) % scenarios.length);
  };

  return (
    <div className="relative w-full max-w-[420px] sm:max-w-md lg:max-w-[480px] select-none flex flex-col items-center">
      {/* 3D Paper Stack Container */}
      <div className="relative w-full h-[530px] sm:h-[600px] md:h-[630px] lg:h-[640px]">
        {scenarios.map((scenario, index) => {
          // Calculate offset relative to active card (0 = active front, 1 = behind, 2 = furthest behind)
          const offset = (index - activeIndex + scenarios.length) % scenarios.length;
          const isFront = offset === 0;
          const isThisCardShuffling = shufflingCard === index;

          let zIndex = 30;
          let transform = "translate3d(0, 0, 0) scale(1) rotate(0deg)";
          let opacity = 1;
          let filter = "none";

          if (isThisCardShuffling) {
            if (shuffleStage === "fly-out") {
              // Physically lift off stack, rotate right, fly out
              zIndex = 45;
              transform = "translate3d(48px, -42px, 0) scale(1.03) rotate(6.5deg)";
              opacity = 0.95;
            } else if (shuffleStage === "fly-back") {
              // Slip behind deck and settle into back position
              zIndex = 10;
              transform = "translate3d(-20px, -15px, 0) scale(0.92) rotate(-4.2deg)";
              opacity = 0.65;
              filter = "brightness(0.92)";
            }
          } else if (offset === 0) {
            // Active front card
            zIndex = 30;
            transform = "translate3d(0, 0, 0) scale(1) rotate(0deg)";
            opacity = 1;
          } else if (offset === 1) {
            // First card behind: shifted UP and LEFT (so bottom NEVER pokes out)
            zIndex = 20;
            transform = "translate3d(-10px, -8px, 0) scale(0.96) rotate(-2.2deg)";
            opacity = 0.82;
            filter = "brightness(0.95)";
          } else {
            // Furthest card behind: shifted further UP and LEFT
            zIndex = 10;
            transform = "translate3d(-20px, -15px, 0) scale(0.92) rotate(-4.2deg)";
            opacity = 0.65;
            filter = "brightness(0.92)";
          }

          return (
            <div
              key={scenario.id}
              onClick={() => {
                if (!isFront) onSelectIndex(index);
              }}
              className={`absolute inset-0 w-full rounded-sm overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] ${
                isFront ? "cursor-default" : "cursor-pointer hover:opacity-95"
              }`}
              style={{
                zIndex,
                transform,
                opacity,
                filter,
                // Authentic vintage aged parchment background
                backgroundColor: "#F4E8D5",
                backgroundImage: `
                  linear-gradient(rgba(247, 239, 226, 0.40), rgba(242, 231, 212, 0.50)),
                  url('/parchment-texture.jpg')
                `,
                backgroundSize: "cover",
                backgroundPosition: "center",
                boxShadow: isFront
                  ? `
                    0 28px 75px -12px rgba(0, 0, 0, 0.8),
                    0 12px 30px -8px rgba(0, 0, 0, 0.55),
                    0 0 0 1px rgba(160, 130, 90, 0.35),
                    inset 0 1px 0 rgba(255, 255, 255, 0.7)
                  `
                  : `
                    0 16px 36px -8px rgba(0, 0, 0, 0.5),
                    0 0 0 1px rgba(160, 130, 90, 0.25)
                  `,
              }}
            >
              {/* Left Margin Court Perforations */}
              <div
                className="pointer-events-none absolute top-0 bottom-0 left-1.5 sm:left-2 w-3 flex flex-col justify-between py-4 sm:py-6 opacity-30 z-10"
                aria-hidden="true"
              >
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="text-[8px] sm:text-[9px] font-mono text-[#7A6E60] leading-none">
                    –
                  </div>
                ))}
              </div>

              {/* Inner Document Layout - Contained cleanly without overflow */}
              <div
                className={`relative z-10 p-3.5 sm:p-5 md:p-6 pl-5 sm:pl-7 md:pl-8 flex flex-col justify-between h-full ${
                  !isFront ? "pointer-events-none select-none" : ""
                }`}
              >
                <div>
                  {/* 1. Authentic Rs. 100 Stamp Banner */}
                  <StampPaperHeader
                    serialNumber={scenario.serialNumber}
                    noticeNumber={scenario.noticeNumber}
                    date={scenario.date}
                  />

                  {/* 2. Classical Legal Notice Crest Header */}
                  <div className="mt-1 sm:mt-2 text-center">
                    <div className="inline-flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-[#9A3412]/30 bg-[#9A3412]/10 mb-0.5">
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#881337] fill-none stroke-current stroke-1.5">
                        <path d="M12 3v17M6 7l6-2 6 2M3 13l3-6 3 6a3 3 0 0 1-6 0zM15 13l3-6 3 6a3 3 0 0 1-6 0zM9 20h6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>

                    <h3 className="font-serif text-sm sm:text-base md:text-lg font-bold tracking-wider text-[#1C1917] uppercase leading-tight">
                      {scenario.noticeTitle}
                    </h3>
                    <p className="font-mono text-[8px] sm:text-[9px] tracking-[0.2em] text-[#7A6E60] uppercase">
                      {scenario.noticeSubtitle}
                    </p>

                    <div className="flex items-center justify-center gap-2 my-1 text-[#9A3412]/40">
                      <span className="w-6 sm:w-8 h-[1px] bg-current" />
                      <span className="text-[7px] sm:text-[8px]">✦</span>
                      <span className="w-6 sm:w-8 h-[1px] bg-current" />
                    </div>
                  </div>

                  {/* 3. Addressee Block */}
                  <div className="font-sans text-[10px] sm:text-[11px] md:text-xs text-[#2A231C] leading-tight">
                    <div className="font-semibold text-[#574C40]">To,</div>
                    {scenario.addressee.map((line, idx) => (
                      <div key={idx} className={idx === 0 ? "font-bold text-[#1C1917]" : "text-[#4A3F33]"}>
                        {line}
                      </div>
                    ))}
                  </div>

                  {/* 4. Subject Line with Yellow Marker Highlight */}
                  <div className="font-sans text-[10px] sm:text-[11px] md:text-xs font-semibold text-[#1C1917] mt-1.5 pt-1 border-t border-[#D8C7B0]/60 leading-tight">
                    <span className="text-[#574C40]">Subject: </span>
                    <span className="bg-[#FDE047]/65 px-1 py-0.2 rounded-xs text-[#1C1917] font-bold">
                      {scenario.subjectHighlight}
                    </span>
                  </div>

                  {/* 5. Notice Body with Glowing Marker Highlights */}
                  <div className="font-typewriter text-[9.5px] sm:text-[10.5px] md:text-[11.5px] text-[#2A231C] leading-snug sm:leading-relaxed mt-1.5 space-y-1.5 sm:space-y-2">
                    {scenario.bodyParagraphs.map((para, idx) => (
                      <p key={idx}>
                        {para.textBefore}
                        <span className="bg-[#FDE047]/65 px-1 py-0.2 rounded-xs font-semibold text-[#1C1917]">
                          {para.highlight}
                        </span>
                        {para.textAfter}
                      </p>
                    ))}
                  </div>
                </div>

                {/* 6. Closing Signatory Block & Secure Notary Seal (Strictly Inside Document) */}
                <div className="relative mt-2 pt-1.5 border-t border-[#D8C7B0]/60 flex items-end justify-between">
                  <div className="text-[10px] sm:text-[11px] md:text-xs font-sans text-[#2A231C]">
                    <div className="text-[9px] sm:text-[10px] text-[#574C40]">Yours faithfully,</div>
                    <div className="font-bold text-[#1C1917] text-[10px] sm:text-[11px]">{scenario.signatoryCompany}</div>

                    {/* Cursive Signature */}
                    <div className="my-0.5 w-22 sm:w-26 h-5 sm:h-6 opacity-85 text-[#1E3A8A]">
                      <svg viewBox="0 0 140 40" className="w-full h-full fill-none stroke-current stroke-1.8">
                        <path d="M 10 28 C 25 15, 35 8, 48 22 C 55 30, 62 10, 75 18 C 88 26, 92 12, 105 24 C 115 32, 125 18, 132 20 M 20 32 L 120 31" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-[#574C40] font-medium">Authorized Signatory</div>
                  </div>

                  {/* Official Notary Seal - Positioned Safely INSIDE Card with Zero Spill */}
                  <div className="relative shrink-0">
                    <CircularLawgicStamp
                      stamped={isFront && isStamped}
                      color={notaryColor}
                      date="18 OCT 2026"
                      regNumber="DL/2026/LG-100"
                    />
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Carousel Nav Controls Below Stack */}
      <div className="mt-3 sm:mt-4 flex items-center justify-between w-full px-2 text-xs font-mono text-[var(--brass-light)]">
        <button
          onClick={handlePrev}
          type="button"
          className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-[#1C1917]/75 hover:bg-[#1C1917] border border-[var(--brass)]/30 backdrop-blur-md transition-all cursor-pointer shadow-sm text-[var(--ivory)] text-[11px] sm:text-xs active:scale-95"
          aria-label="Previous Notice Document"
        >
          <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--brass-light)]" />
          <span>Previous Notice</span>
        </button>

        {/* Indicator Dots */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {scenarios.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => onSelectIndex(idx)}
              type="button"
              className={`h-1.5 sm:h-2 rounded-full transition-all cursor-pointer ${
                idx === activeIndex
                  ? "w-5 sm:w-6 bg-[var(--brass-light)]"
                  : "w-1.5 sm:w-2 bg-[var(--ivory)]/35 hover:bg-[var(--ivory)]/60"
              }`}
              aria-label={`Jump to ${s.category}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          type="button"
          className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-[#1C1917]/75 hover:bg-[#1C1917] border border-[var(--brass)]/30 backdrop-blur-md transition-all cursor-pointer shadow-sm text-[var(--ivory)] text-[11px] sm:text-xs active:scale-95"
          aria-label="Next Notice Document"
        >
          <span>Next Notice</span>
          <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--brass-light)]" />
        </button>
      </div>
    </div>
  );
}
