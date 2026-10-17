"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LedgerMarginRuler } from "@/components/motion/LedgerMarginRuler";
import { Magnet } from "@/components/motion/Magnet";
import { ConstitutionBook } from "./what-we-do/ConstitutionBook";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function WhatWeDoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!sectionRef.current) return;
    if (prefersReducedMotion) {
      setScrollProgress(1);
      return;
    }

    const ctx = gsap.context(() => {
      // Pinned ScrollTrigger for the Book Opening & Curvy Dotted Path Animation
      // Scrub: 1 ensures buttery-smooth forward AND reverse scrubbing!
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=1600",
        pin: true,
        pinSpacing: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="what-we-do"
      aria-labelledby="what-we-do-heading"
      className="relative min-h-screen w-full bg-[#FAF7F0] overflow-hidden select-none"
      style={{
        backgroundImage: `
          radial-gradient(#E8DEC8 0.75px, transparent 0.75px),
          linear-gradient(180deg, #FDFBF7 0%, #FAF6EE 50%, #F5EFE4 100%)
        `,
        backgroundSize: "20px 20px, 100% 100%",
        color: "var(--charcoal)",
      }}
    >
      {/* Signature Coordinate Rulers in Light Theme */}
      <LedgerMarginRuler start={470} end={590} step={10} theme="light" />

      {/* Atmospheric Ambient Warmth */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(217, 119, 6, 0.08) 0%, transparent 80%)",
        }}
        aria-hidden="true"
      />

      {/* Pinned Stage Container */}
      <div
        ref={pinContainerRef}
        className="relative z-10 w-full min-h-screen flex flex-col items-center justify-between px-4 sm:px-6 md:px-8 pt-16 sm:pt-20 pb-8"
      >
        {/* =====================================================================
            TOP SECTION HEADER
            ===================================================================== */}
        <div className="text-center max-w-3xl mx-auto shrink-0">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-[0.2em] bg-[#F5E6DC] text-[#78350F] border border-[#F5D0C5] mb-2 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#B45309]" />
            02 // PRACTICE AREAS &amp; STATUTORY CODES
          </div>

          <h2
            id="what-we-do-heading"
            className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-bold text-[#1C1917] tracking-tight leading-[1.15]"
          >
            Full-Spectrum Legal Clarity for Citizens &amp; Founders
          </h2>

          <p className="font-sans text-xs sm:text-sm text-[#574C40] leading-relaxed max-w-xl mx-auto mt-1.5">
            Every notice decoded, every clause verified, every right defended — anchored directly in the{" "}
            <span className="font-semibold text-[#78350F]">Constitution of India</span>.
          </p>
        </div>

        {/* =====================================================================
            CENTER PIECE: CONSTITUTION OF INDIA 3D BOOK & CURVY DOTTED PATH
            Book opens in 3D perspective -> Curvy path draws left to right -> Nodes reveal
            ===================================================================== */}
        <div className="w-full flex-1 flex items-center justify-center my-2 sm:my-3">
          <ConstitutionBook
            scrollProgress={scrollProgress}
            hoveredNodeId={hoveredNodeId}
            setHoveredNodeId={setHoveredNodeId}
            selectedNodeId={selectedNodeId}
            setSelectedNodeId={setSelectedNodeId}
          />
        </div>

        {/* =====================================================================
            CENTER CALL-TO-ACTION (CTA)
            Prominently positioned at the center bottom of the section
            ===================================================================== */}
        <div className="flex flex-col items-center gap-2 shrink-0">
          <Magnet magnetStrength={0.25} padding={25}>
            <a
              href="#get-started"
              className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full font-sans font-bold text-xs tracking-wider uppercase text-[#FEF3C7] bg-[#7F1D1D] hover:bg-[#991B1B] active:scale-98 transition-all duration-300 shadow-[0_10px_25px_-5px_rgba(127,29,29,0.45)] hover:shadow-[0_15px_32px_-5px_rgba(127,29,29,0.55)] border border-[#FDE047]/40 cursor-pointer"
            >
              <span>Decode Your Document Now</span>
              <ArrowRight className="w-4 h-4 text-[#FDE047]" />
            </a>
          </Magnet>

          <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono text-[#78350F]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
            <span>100% Confidential · Free Plain-Language Analysis · Grounded in 45+ Central Indian Acts</span>
          </div>
        </div>

      </div>
    </section>
  );
}
