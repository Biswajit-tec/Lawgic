"use client";

import React from "react";
import { CurvyDottedPath } from "./CurvyDottedPath";

interface ConstitutionBookProps {
  scrollProgress: number; // 0.0 to 1.0
  hoveredNodeId: string | null;
  setHoveredNodeId: (id: string | null) => void;
  selectedNodeId: string | null;
  setSelectedNodeId: (id: string | null) => void;
}

export function ConstitutionBook({
  scrollProgress,
  hoveredNodeId,
  setHoveredNodeId,
  selectedNodeId,
  setSelectedNodeId,
}: ConstitutionBookProps) {
  // Opening transition: 0.0 to 0.25 opens the book from closed to wide spread
  // 0.25 to 1.0 draws the curvy dotted path across the open pages
  const openProgress = Math.min(Math.max(scrollProgress / 0.25, 0), 1);
  const pathProgress = Math.min(Math.max((scrollProgress - 0.2) / 0.8, 0), 1);

  // 3D rotation of the front cover: 0deg when closed, -180deg when fully open
  const coverRotateY = -openProgress * 180;

  return (
    <div className="relative w-full max-w-6xl mx-auto flex items-center justify-center select-none py-4">
      {/* 3D Perspective Book Stage */}
      <div
        className="relative w-full max-w-[1050px] h-[520px] sm:h-[580px] md:h-[620px] transition-transform duration-300"
        style={{
          perspective: "2200px",
        }}
      >
        {/* =====================================================================
            1. THE OPEN BOOK (Double-Page Parchment Spread)
            Becomes visible and expands as the book opens
            ===================================================================== */}
        <div
          className="absolute inset-0 w-full h-full rounded-lg flex transition-all duration-700 ease-out shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5),0_0_0_1px_rgba(180,130,90,0.35)]"
          style={{
            opacity: openProgress > 0.05 ? 1 : 0,
            transform: `scale(${0.92 + openProgress * 0.08})`,
            backgroundColor: "#F5ECD7",
            backgroundImage: `
              linear-gradient(rgba(247, 240, 228, 0.5), rgba(243, 233, 216, 0.6)),
              url('/parchment-texture.jpg')
            `,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Leather Outer Rim of the open book */}
          <div className="absolute inset-0 border-[8px] sm:border-[12px] border-[#380E0E] rounded-lg pointer-events-none z-10 shadow-inner" />
          <div className="absolute inset-[8px] sm:inset-[12px] border border-[#B45309]/50 pointer-events-none z-10" />

          {/* LEFT PAGE (Preamble of the Constitution) */}
          <div className="relative w-1/2 h-full p-6 sm:p-8 md:p-10 pr-6 sm:pr-8 md:pr-10 flex flex-col justify-between border-r border-[#D4C3A3] overflow-hidden">
            {/* Heritage Indian Ornamental Floral Border */}
            <div className="absolute inset-4 sm:inset-6 border-2 border-[#B45309]/30 rounded-xs pointer-events-none" />
            <div className="absolute inset-5 sm:inset-7 border border-[#B45309]/20 rounded-xs pointer-events-none" />

            {/* Corner Filigrees */}
            <span className="absolute top-4 left-4 text-xs text-[#92400E]/40 font-serif">❖</span>
            <span className="absolute top-4 right-4 text-xs text-[#92400E]/40 font-serif">❖</span>
            <span className="absolute bottom-4 left-4 text-xs text-[#92400E]/40 font-serif">❖</span>
            <span className="absolute bottom-4 right-4 text-xs text-[#92400E]/40 font-serif">❖</span>

            {/* Left Page Header */}
            <div className="relative z-10 text-center pt-1 sm:pt-2">
              <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-[#92400E] uppercase font-bold">
                THE CONSTITUTION OF INDIA
              </div>
              <h3 className="font-serif text-base sm:text-lg md:text-xl font-bold tracking-widest text-[#1C1917] uppercase mt-0.5">
                PREAMBLE
              </h3>
              <div className="w-16 h-[1px] bg-[#B45309]/40 mx-auto my-1" />
            </div>

            {/* Classical Preamble Excerpt */}
            <div className="relative z-10 text-center font-serif text-[10px] sm:text-[11px] md:text-xs text-[#3D3226] leading-relaxed max-w-sm mx-auto opacity-75">
              <p className="font-semibold text-[#1C1917] mb-1">
                WE, THE PEOPLE OF INDIA,
              </p>
              <p className="italic">
                having solemnly resolved to constitute India into a SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC and to secure to all its citizens:
              </p>
              <p className="font-bold text-[#78350F] text-[9.5px] sm:text-[10.5px] mt-1 tracking-wider uppercase">
                JUSTICE · LIBERTY · EQUALITY · FRATERNITY
              </p>
            </div>

            {/* Left Page Footer */}
            <div className="relative z-10 flex items-center justify-between text-[9px] font-mono text-[#78350F]/70 pt-2 border-t border-[#D4C3A3]/60">
              <span>ARTICLES 1 – 395</span>
              <span>PAGE I</span>
            </div>
          </div>

          {/* CENTER BOOK SPINE GUTTER & CREASE SHADOW */}
          <div className="relative w-8 sm:w-10 h-full shrink-0 flex items-center justify-center -mx-4 sm:-mx-5 z-20 pointer-events-none">
            {/* Deep Gutter Crease Shadow */}
            <div className="w-full h-full bg-gradient-to-r from-black/25 via-black/45 to-black/25 shadow-2xl" />
            {/* Golden Silk Bookmark Ribbon Draping Down */}
            <div
              className="absolute top-0 w-2.5 sm:w-3 bg-gradient-to-r from-[#D97706] via-[#F59E0B] to-[#B45309] shadow-md z-30"
              style={{
                height: "85%",
                clipPath: "polygon(0 0, 100% 0, 100% 92%, 50% 100%, 0 92%)",
              }}
            />
          </div>

          {/* RIGHT PAGE (Statutory Protection & Living Jurisprudence) */}
          <div className="relative w-1/2 h-full p-6 sm:p-8 md:p-10 pl-6 sm:pl-8 md:pl-10 flex flex-col justify-between overflow-hidden">
            {/* Heritage Border */}
            <div className="absolute inset-4 sm:inset-6 border-2 border-[#B45309]/30 rounded-xs pointer-events-none" />
            <div className="absolute inset-5 sm:inset-7 border border-[#B45309]/20 rounded-xs pointer-events-none" />

            {/* Corner Filigrees */}
            <span className="absolute top-4 left-4 text-xs text-[#92400E]/40 font-serif">❖</span>
            <span className="absolute top-4 right-4 text-xs text-[#92400E]/40 font-serif">❖</span>
            <span className="absolute bottom-4 left-4 text-xs text-[#92400E]/40 font-serif">❖</span>
            <span className="absolute bottom-4 right-4 text-xs text-[#92400E]/40 font-serif">❖</span>

            {/* Right Page Header */}
            <div className="relative z-10 text-center pt-1 sm:pt-2">
              <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-[#92400E] uppercase font-bold">
                PART III &amp; STATUTORY REMEDIES
              </div>
              <h3 className="font-serif text-base sm:text-lg md:text-xl font-bold tracking-widest text-[#1C1917] uppercase mt-0.5">
                PRACTICE JURISDICTIONS
              </h3>
              <div className="w-16 h-[1px] bg-[#B45309]/40 mx-auto my-1" />
            </div>

            {/* Right Page Text Excerpt */}
            <div className="relative z-10 text-center font-serif text-[10px] sm:text-[11px] md:text-xs text-[#3D3226] leading-relaxed max-w-sm mx-auto opacity-75">
              <p className="font-semibold text-[#1C1917] mb-0.5">
                FUNDAMENTAL REMEDIES &amp; STATUTORY RELIEF
              </p>
              <p className="italic">
                &quot;Ubi jus ibi remedium — Where there is a right, there is a legal remedy.&quot;
              </p>
              <p className="text-[9.5px] sm:text-[10.5px] text-[#78350F] mt-1">
                From court summons to high-stakes contracts, Lawgic grounds every clause in sovereign statutory code.
              </p>
            </div>

            {/* Right Page Footer */}
            <div className="relative z-10 flex items-center justify-between text-[9px] font-mono text-[#78350F]/70 pt-2 border-t border-[#D4C3A3]/60">
              <span>STATUTES &amp; CODES</span>
              <span>PAGE II</span>
            </div>
          </div>

          {/* ===================================================================
              CURVY DOTTED PATH & INTERACTIVE COURT NODES
              Spans across both pages from left to right!
              =================================================================== */}
          <div className="absolute inset-0 w-full h-full z-30 pointer-events-auto">
            <CurvyDottedPath
              progress={pathProgress}
              hoveredNodeId={hoveredNodeId}
              setHoveredNodeId={setHoveredNodeId}
              selectedNodeId={selectedNodeId}
              setSelectedNodeId={setSelectedNodeId}
            />
          </div>
        </div>

        {/* =====================================================================
            2. THE 3D FRONT COVER (Closed Constitution Volume)
            Flips open towards the left when scrolling down
            ===================================================================== */}
        {openProgress < 0.98 && (
          <div
            className={`absolute inset-y-0 right-0 w-1/2 rounded-r-lg origin-left z-20 overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.7),0_0_0_2px_rgba(217,119,6,0.5)] ${
              openProgress > 0.08 ? "pointer-events-none" : "cursor-pointer"
            }`}
            style={{
              transform: `rotateY(${coverRotateY}deg)`,
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
              backgroundColor: "#3B0E0E",
              backgroundImage: `
                radial-gradient(circle at 50% 40%, rgba(136, 19, 55, 0.4) 0%, rgba(35, 8, 8, 0.9) 100%),
                url('/parchment-texture.jpg')
              `,
              backgroundBlendMode: "multiply",
              backgroundSize: "cover",
            }}
          >
            {/* Deep Moroccan Leather Border & Gold Filigree */}
            <div className="absolute inset-4 sm:inset-6 border-4 border-[#D97706]/70 rounded-xs shadow-inner pointer-events-none" />
            <div className="absolute inset-6 sm:inset-8 border border-[#FDE047]/50 rounded-xs pointer-events-none" />

            {/* Corner Gold Filigrees */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#FDE047]" />
            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#FDE047]" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#FDE047]" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#FDE047]" />

            {/* Front Cover Embossed Content */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6 text-center text-[#FEF3C7]">
              {/* Ashoka Lion Capitol Gold Seal */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#FDE047]/60 bg-[#991B1B]/40 flex items-center justify-center mb-3 sm:mb-4 shadow-lg">
                <svg viewBox="0 0 100 100" className="w-10 h-10 sm:w-12 sm:h-12 text-[#FDE047] fill-current">
                  <path d="M50 15 C 38 15, 30 24, 30 36 C 30 50, 42 62, 50 68 C 58 62, 70 50, 70 36 C 70 24, 62 15, 50 15 Z" fill="none" stroke="currentColor" strokeWidth="3" />
                  <circle cx="50" cy="38" r="8" fill="currentColor" />
                  <path d="M40 70 L 60 70 L 64 82 L 36 82 Z" stroke="currentColor" strokeWidth="2.5" fill="none" />
                  <circle cx="50" cy="76" r="3" fill="currentColor" />
                </svg>
              </div>

              {/* Devanagari Title */}
              <div className="font-serif text-lg sm:text-xl font-bold tracking-widest text-[#FDE047] drop-shadow-md mb-1">
                भारत का संविधान
              </div>

              {/* English Gold Leaf Debossed Title */}
              <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-extrabold tracking-[0.2em] text-[#FEF3C7] drop-shadow-lg uppercase leading-tight">
                CONSTITUTION
                <span className="block text-sm sm:text-base font-normal tracking-[0.3em] text-[#FDE047] mt-1">
                  OF INDIA
                </span>
              </h2>

              <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#FDE047] to-transparent my-3 sm:my-4" />

              <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-[#FDE047]/80 uppercase">
                SOVEREIGN FOUNDATION OF LAW
              </p>

              {/* Scroll Cue on Cover */}
              <div className="mt-6 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C1917]/60 border border-[#FDE047]/40 text-[10px] font-mono text-[#FDE047] animate-pulse">
                <span>SCROLL TO OPEN BOOK &amp; REVEAL PATH</span>
                <span>↓</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
