"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "@/components/layout/ThemeContext";
import { LedgerMarginRuler } from "@/components/motion/LedgerMarginRuler";
import AeroShards from "@/components/motion/AeroShards";
import FadeContent from "@/components/motion/FadeContent";
import { AntiqueParchmentMap } from "./what-we-do/AntiqueParchmentMap";
import { ShieldCheck, ArrowRight, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function WhatWeDoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { currentThemeOption } = useTheme();

  const [mapProgress, setMapProgress] = useState(0);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const handleSetHovered = useCallback(
    (id: string | null) => setHoveredNodeId(id),
    []
  );
  const handleSetSelected = useCallback(
    (id: string | null) => setSelectedNodeId(id),
    []
  );

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!sectionRef.current) return;

    if (prefersReducedMotion) {
      setMapProgress(1.0); // show completed map trail
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=2600",
        pin: true,
        pinSpacing: true,
        scrub: 1.2,
        anticipatePin: 1,
        onUpdate: (self) => {
          setMapProgress(self.progress);
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
      className="relative min-h-screen w-full bg-white overflow-hidden select-none"
    >
      {/* =====================================================================
          BACKGROUND: AEROSHARDS IN THEME-AWARE SECONDARY DARK COLOR & ACCENT
          Keeps the background clean white as requested, with glass shards floating
          ===================================================================== */}
      <div className="absolute inset-0 pointer-events-auto overflow-hidden opacity-85 z-0" aria-hidden="true">
        <AeroShards
          shardColor={currentThemeOption.primaryHex}
          accentColor={currentThemeOption.accentHex}
          placement="full"
          material="glass"
          markers="plus"
          count={1200}
          depthOfField={0.75}
          vignette={0.2}
          mouseInteraction
          pulseOnClick
          holdToGather
          lightMode={true}
          shardSize={1}
          spread={1}
          twist={1}
          billow={1}
          speed={0.8}
          scale={1}
          glow={0.25}
          grain={0.04}
          intro
          mouseStrength={0.6}
          parallax={0.5}
          paused={false}
        />
      </div>

      {/* Signature Coordinate Rulers in Light Theme */}
      <LedgerMarginRuler start={470} end={590} step={10} theme="light" />

      {/* Pinned Stage Container */}
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-between px-3 sm:px-6 md:px-8 pt-20 sm:pt-24 pb-3">
        {/* =====================================================================
            TOP SECTION HEADER (NO PILL BADGE)
            ===================================================================== */}
        <FadeContent effect="fade" duration={0.9} threshold={0.1} className="w-full">
          <div className="text-center max-w-3xl mx-auto shrink-0 mb-1">
            <h2
              id="what-we-do-heading"
              className="font-serif text-lg sm:text-2xl md:text-3xl lg:text-[2.1rem] font-bold text-[#1C1917] tracking-tight leading-tight"
            >
              Full-Spectrum Legal Clarity for Citizens &amp; Founders
            </h2>
            <p className="mt-1 text-[11px] sm:text-xs md:text-sm text-[#7A6E60] font-sans max-w-xl mx-auto">
              From initial statutory notices to constitutional remedies — interactive judicial pipeline.
            </p>
          </div>
        </FadeContent>

        {/* =====================================================================
            CENTER PIECE: ANTIQUE PARCHMENT MAP WITH SERPENTINE TRACING TRAIL
            ===================================================================== */}
        <FadeContent effect="focus" duration={1.1} threshold={0.1} className="w-full flex-1 flex items-center justify-center my-0.5">
          <div className="w-full flex items-center justify-center">
            <AntiqueParchmentMap
              scrollProgress={mapProgress}
              hoveredNodeId={hoveredNodeId}
              setHoveredNodeId={handleSetHovered}
              selectedNodeId={selectedNodeId}
              setSelectedNodeId={handleSetSelected}
            />
          </div>
        </FadeContent>

        {/* =====================================================================
            BOTTOM CALL-TO-ACTION WITH LITTLE SPACING FROM THE MAP
            ===================================================================== */}
        <div className="shrink-0 flex flex-col items-center gap-1.5 mt-2 sm:mt-3 mb-1">
          <a
            href="/decode"
            className="group relative inline-flex items-center gap-2.5 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-white font-sans text-xs sm:text-sm font-semibold tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.03]"
            style={{
              backgroundColor: currentThemeOption.primaryHex,
              boxShadow: `0 8px 24px -4px ${currentThemeOption.primaryHex}55`,
            }}
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FDE047] animate-pulse" />
            <span>Decode Your Legal Document Now</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>

          {/* Statutory Confidentiality Badge */}
          <div
            className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono shrink-0 pt-0.5"
            style={{ color: currentThemeOption.primaryHex }}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
            <span>100% Confidential · Plain-Language Analysis · Grounded in 45+ Central Indian Acts</span>
          </div>
        </div>
      </div>
    </section>
  );
}
