"use client";

import React from "react";
import { StampPaperHeader } from "./StampPaperHeader";
import { CircularLawgicStamp } from "./CircularLawgicStamp";

export interface NoticeScenarioData {
  id: string;
  category: string;
  noticeTitle: string;
  noticeSubtitle: string;
  addressee: string[];
  subject: string;
  subjectHighlight: string;
  bodyParagraphs: {
    textBefore: string;
    highlight: string;
    textAfter: string;
  }[];
  signatoryCompany: string;
  signatoryTitle: string;
  serialNumber: string;
  noticeNumber: string;
  date: string;
  plainHeadline: string;
  plainExplanation: string;
  keyDetails: string;
  sourceReferences: string;
  nextSteps: string;
}

interface LegalNoticeStampPaperProps {
  scenario: NoticeScenarioData;
  typewriterProgress: number; // 0 to 1
  isStamped: boolean;
  notaryColor?: string;
}

export function LegalNoticeStampPaper({
  scenario,
  typewriterProgress,
  isStamped,
  notaryColor = "#6E1F1F",
}: LegalNoticeStampPaperProps) {
  // Compute text reveal for body paragraphs
  const isTyping = typewriterProgress > 0 && typewriterProgress < 1;

  return (
    <div className="relative w-full max-w-md lg:max-w-lg select-none">
      {/* Underlying Stacked Sheet (Slightly tilted behind for authentic multi-page physical realism) */}
      <div
        className="absolute inset-0 rounded-sm bg-[#EDE3D0] shadow-lg -rotate-2 scale-[0.99] origin-bottom-left -z-10 opacity-70"
        style={{
          backgroundImage: "url('/parchment-texture.jpg')",
          backgroundSize: "cover",
        }}
        aria-hidden="true"
      />

      {/* Main A4 Vintage Legal Notice Sheet */}
      <div
        className="relative w-full rounded-sm text-[#1C1917] transition-all duration-300"
        style={{
          backgroundColor: "#F4E8D5",
          backgroundImage: `
            linear-gradient(rgba(247, 239, 226, 0.40), rgba(242, 231, 212, 0.50)),
            url('/parchment-texture.jpg')
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxShadow: `
            0 35px 80px -15px rgba(0, 0, 0, 0.75),
            0 15px 35px -10px rgba(0, 0, 0, 0.5),
            0 0 0 1px rgba(160, 130, 90, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 0.6)
          `,
        }}
      >
        {/* Left Court Margin Perforations */}
        <div
          className="pointer-events-none absolute top-0 bottom-0 left-2 w-3 flex flex-col justify-between py-6 opacity-30"
          aria-hidden="true"
        >
          {Array.from({ length: 22 }).map((_, i) => (
            <div key={i} className="text-[9px] font-mono text-[#7A6E60] leading-none">
              –
            </div>
          ))}
        </div>

        {/* Paper Content Wrapper with Stately Court Margins */}
        <div className="relative z-10 p-4 sm:p-6 md:p-7 pl-6 sm:pl-8 md:pl-9 flex flex-col justify-between min-h-[540px] sm:min-h-[590px]">
          <div>
            {/* 1. Seamless ₹100 Non-Judicial Intaglio Banner Header */}
            <StampPaperHeader
              serialNumber={scenario.serialNumber}
              noticeNumber={scenario.noticeNumber}
              date={scenario.date}
            />

            {/* 2. Classical Legal Notice Crest Header */}
            <div className="mt-2.5 sm:mt-3 text-center">
              {/* Scales of Justice Heraldic Icon */}
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-[#9A3412]/30 bg-[#9A3412]/10 mb-1">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#881337] fill-none stroke-current stroke-1.5">
                  <path d="M12 3v17M6 7l6-2 6 2M3 13l3-6 3 6a3 3 0 0 1-6 0zM15 13l3-6 3 6a3 3 0 0 1-6 0zM9 20h6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <h3 className="font-serif text-lg sm:text-xl font-bold tracking-wider text-[#1C1917] uppercase">
                {scenario.noticeTitle}
              </h3>
              <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-[#7A6E60] uppercase mt-0.5">
                {scenario.noticeSubtitle}
              </p>

              {/* Decorative Center Dot Divider */}
              <div className="flex items-center justify-center gap-2 my-2 text-[#9A3412]/40">
                <span className="w-8 h-[1px] bg-current" />
                <span className="text-[8px]">✦</span>
                <span className="w-8 h-[1px] bg-current" />
              </div>
            </div>

            {/* 3. Addressee Block */}
            <div className="font-sans text-[11px] sm:text-xs text-[#2A231C] leading-snug mt-1">
              <div className="font-semibold text-[#574C40]">To,</div>
              {scenario.addressee.map((line, idx) => (
                <div key={idx} className={idx === 0 ? "font-bold text-[#1C1917]" : "text-[#4A3F33]"}>
                  {line}
                </div>
              ))}
            </div>

            {/* 4. Subject Line with Warm Yellow Marker Highlight */}
            <div className="font-sans text-[11px] sm:text-xs font-semibold text-[#1C1917] mt-2.5 pt-1.5 border-t border-[#D8C7B0]/60">
              <span className="text-[#574C40]">Subject: </span>
              <span className="bg-[#FDE047]/65 px-1 py-0.5 rounded-xs text-[#1C1917] font-bold">
                {scenario.subjectHighlight}
              </span>
            </div>

            {/* 5. Typewritten Notice Body with Dynamic Highlighter Strips */}
            <div className="font-typewriter text-[11px] sm:text-xs text-[#2A231C] leading-relaxed mt-2 space-y-2">
              {scenario.bodyParagraphs.map((para, idx) => (
                <p key={idx} className="transition-opacity duration-300">
                  {para.textBefore}
                  <span className="bg-[#FDE047]/60 px-1 py-0.2 rounded-xs font-semibold text-[#1C1917]">
                    {para.highlight}
                  </span>
                  {para.textAfter}
                </p>
              ))}
              {isTyping && (
                <span className="inline-block w-2 h-3.5 bg-[#C82A68] animate-pulse align-middle ml-0.5" />
              )}
            </div>
          </div>

          {/* 6. Closing Signatory Block & Official Circular Rubber Seal */}
          <div className="relative mt-4 pt-2 border-t border-[#D8C7B0]/60 flex items-end justify-between">
            {/* Left: Signatory & Cursive Signature */}
            <div className="text-[11px] sm:text-xs font-sans text-[#2A231C]">
              <div className="text-[10px] text-[#574C40]">Yours faithfully,</div>
              <div className="font-bold text-[#1C1917]">{scenario.signatoryCompany}</div>

              {/* Realistic Cursive Handwritten Signature SVG */}
              <div className="my-1 w-28 h-8 opacity-85 text-[#1E3A8A]">
                <svg viewBox="0 0 140 40" className="w-full h-full fill-none stroke-current stroke-1.8">
                  <path d="M 10 28 C 25 15, 35 8, 48 22 C 55 30, 62 10, 75 18 C 88 26, 92 12, 105 24 C 115 32, 125 18, 132 20 M 20 32 L 120 31" strokeLinecap="round" />
                </svg>
              </div>
              <div className="text-[10px] text-[#574C40] font-medium">Authorized Signatory</div>
            </div>

            {/* Right: Circular Rubber Notary Seal */}
            <div className="relative -mb-1 -mr-1">
              <CircularLawgicStamp
                stamped={isStamped}
                color={notaryColor}
                date="18 OCT 2026"
                regNumber="DL/2026/LG-100"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
