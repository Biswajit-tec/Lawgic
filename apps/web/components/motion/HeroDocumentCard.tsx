"use client";

import React, { useState, useEffect } from "react";

interface SampleDoc {
  id: string;
  tag: string;
  title: string;
  originalText: string;
  plainMeaning: string;
  actionItem: string;
  urgency: "high" | "medium" | "low";
}

const SAMPLE_DOCS: SampleDoc[] = [
  {
    id: "01",
    tag: "Sec 138 NI Act",
    title: "Cheque Dishonour Notice",
    originalText:
      "Whereas said cheque returning unpaid with remark 'Funds Insufficient', take notice...",
    plainMeaning:
      "Demand to pay ₹2,50,000 within 15 days or formal criminal complaint will be initiated.",
    actionItem: "Reply within 15 statutory days via registered speed post.",
    urgency: "high",
  },
  {
    id: "02",
    tag: "Sec 41A CrPC / BNSS",
    title: "Police Investigation Notice",
    originalText:
      "You are hereby directed to appear before the undersigned at 11:00 AM for inquiry...",
    plainMeaning:
      "Summons for inquiry as a potential witness. Does not authorize immediate arrest.",
    actionItem: "Appear accompanied by legal counsel; request written copy of statement.",
    urgency: "medium",
  },
  {
    id: "03",
    tag: "Tenancy Act",
    title: "Eviction Notice from Landlord",
    originalText:
      "Notice to quit and deliver vacant possession of premises under premises tenancy act...",
    plainMeaning:
      "Landlord requests vacant possession in 30 days; security deposit balance disputed.",
    actionItem: "Verify 60-day notice clause in original registered lease agreement.",
    urgency: "medium",
  },
  {
    id: "04",
    tag: "Sec 27 Contract Act",
    title: "Employer Non-Compete Notice",
    originalText:
      "Restraining covenant alleging violation of post-employment restriction clause...",
    plainMeaning:
      "Former employer attempting to block employment at competitor firm.",
    actionItem: "Section 27 holds post-employment non-competes void in Indian courts.",
    urgency: "low",
  },
];

export function HeroDocumentCard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SAMPLE_DOCS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const doc = SAMPLE_DOCS[currentIndex];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full max-w-[340px] sm:max-w-[360px] rounded-2xl bg-white/80 dark:bg-white/90 backdrop-blur-xl border border-black/[0.08] p-4 shadow-xl text-[var(--charcoal)] transition-all duration-300 hover:shadow-2xl hover:border-black/15"
    >
      {/* Top Header Row with Counter & Progress */}
      <div className="flex items-center justify-between border-b border-black/5 pb-2.5 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--burgundy)]" />
          <span className="font-sans text-[11px] font-semibold uppercase tracking-wider text-[var(--burgundy)]">
            {doc.tag}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] font-medium text-[var(--stone)]">
            {doc.id}/0{SAMPLE_DOCS.length}
          </span>
          {/* Progress bar line */}
          <div className="w-12 h-1 bg-black/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--burgundy)] transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / SAMPLE_DOCS.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Document Title */}
      <div className="mb-2">
        <h4 className="font-serif text-base font-semibold text-[var(--charcoal)] leading-snug">
          {doc.title}
        </h4>
      </div>

      {/* Raw Legalese vs Plain Clarity */}
      <div className="flex flex-col gap-2 text-xs font-sans">
        <div className="p-2 rounded-lg bg-black/[0.03] border border-black/5">
          <div className="text-[10px] uppercase tracking-wider font-semibold text-[var(--stone)] mb-0.5">
            Original Notice Text
          </div>
          <p className="line-clamp-2 italic text-[var(--stone)] text-[11.5px] leading-relaxed">
            &ldquo;{doc.originalText}&rdquo;
          </p>
        </div>

        <div className="p-2.5 rounded-lg bg-[var(--burgundy-faint)]/60 border border-[rgba(110,31,31,0.12)]">
          <div className="text-[10px] uppercase tracking-wider font-semibold text-[var(--burgundy)] mb-0.5">
            Decoded Plain Meaning
          </div>
          <p className="text-[var(--charcoal)] font-medium text-[11.5px] leading-relaxed">
            {doc.plainMeaning}
          </p>
        </div>
      </div>

      {/* Actionable Next Step */}
      <div className="mt-2.5 pt-2 border-t border-black/5 flex items-center justify-between text-[11px]">
        <div className="text-[var(--stone)]">
          <span className="font-semibold text-[var(--charcoal)]">Action:</span>{" "}
          <span className="text-[var(--stone)] line-clamp-1">{doc.actionItem}</span>
        </div>

        {/* Carousel controls */}
        <div className="flex items-center gap-1 shrink-0 ml-2">
          <button
            type="button"
            onClick={() =>
              setCurrentIndex((prev) => (prev - 1 + SAMPLE_DOCS.length) % SAMPLE_DOCS.length)
            }
            className="w-5 h-5 rounded-full flex items-center justify-center bg-black/5 hover:bg-black/10 text-[var(--charcoal)] transition-colors cursor-pointer"
            aria-label="Previous sample document"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => setCurrentIndex((prev) => (prev + 1) % SAMPLE_DOCS.length)}
            className="w-5 h-5 rounded-full flex items-center justify-center bg-black/5 hover:bg-black/10 text-[var(--charcoal)] transition-colors cursor-pointer"
            aria-label="Next sample document"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
