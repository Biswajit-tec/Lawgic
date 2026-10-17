"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DynamicHeroStatue } from "@/components/motion/DynamicHeroStatue";
import { HeroDocumentCard } from "@/components/motion/HeroDocumentCard";
import { Magnet } from "@/components/motion/Magnet";
import { LedgerMarginRuler } from "@/components/motion/LedgerMarginRuler";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        watermarkRef.current,
        { opacity: 0, scale: 0.95, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1.4, delay: 0.2 }
      )
        .fromTo(
          leftContentRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.7"
        )
        .fromTo(
          rightContentRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.8"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      aria-label="Hero"
      className="relative min-h-[100vh] lg:h-[100vh] lg:max-h-[1080px] flex flex-col justify-between overflow-hidden bg-[var(--ivory)] pt-20 pb-6 transition-colors duration-500"
    >
      {/* 1. Low-Transparency Cinematic Courtroom Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <Image
          src="/courtroom-bg.jpg"
          alt="Historic courtroom architecture background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-[0.09] filter grayscale contrast-125 transition-opacity duration-700"
        />
        {/* Soft radial and linear blends to keep light theme pleasant and airy */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 45%, transparent 20%, var(--ivory) 80%), linear-gradient(to bottom, var(--ivory) 0%, transparent 20%, transparent 80%, var(--ivory) 100%)",
          }}
        />
      </div>

      {/* Signature Ledger Coordinate Ruler Margins on borders */}
      <LedgerMarginRuler start={0} end={210} step={10} theme="light" />

      {/* 2. Giant Winzy-Style Architectural Display Typography ("LAWGIC") */}
      <div
        ref={watermarkRef}
        className="absolute top-[12%] sm:top-[10%] md:top-[9%] left-0 right-0 flex justify-center items-center pointer-events-none select-none z-10 overflow-hidden"
        style={{ opacity: 0 }}
        aria-hidden="true"
      >
        <span
          className="font-sans font-black text-[22vw] sm:text-[19vw] md:text-[17vw] tracking-[0.06em] uppercase text-[var(--charcoal)] leading-none select-none"
          style={{
            opacity: 0.08,
            maskImage:
              "linear-gradient(to bottom, black 40%, rgba(0,0,0,0.15) 85%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 40%, rgba(0,0,0,0.15) 85%, transparent 100%)",
          }}
        >
          LAWGIC
        </span>
      </div>

      {/* 3. Centerpiece: Lady Justice Transparent Marble Statue with Clean Normal Reveal & Larger Size */}
      <div
        ref={centerRef}
        className="absolute inset-0 flex justify-center items-end pointer-events-none z-20 pb-0 overflow-hidden"
      >
        <DynamicHeroStatue className="pointer-events-auto h-[500px] sm:h-[580px] md:h-[660px] lg:h-[720px] xl:h-[760px] max-h-[82vh]" />
      </div>

      {/* 4. Bottom Winzy-Style Content Layout (Stats & CTA on Left, Interactive Card on Right) */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-auto pb-2 sm:pb-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end justify-between">
          {/* Bottom Left Column: Metrics + Pill CTA + Editorial Tagline */}
          <div
            ref={leftContentRef}
            style={{ opacity: 0 }}
            className="lg:col-span-7 flex flex-col gap-4 sm:gap-5"
          >
            {/* 3 Metrics in a Row (Winzy Layout: 20K+ / 2K+ / 5K+) */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-md">
              <div className="flex flex-col">
                <span className="font-sans font-bold text-2xl sm:text-3xl text-[var(--charcoal)] tracking-tight">
                  50K+
                </span>
                <span className="font-sans text-[11.5px] sm:text-xs text-[var(--stone)] font-medium mt-0.5">
                  Documents Decoded
                </span>
              </div>

              <div className="flex flex-col border-l border-black/10 pl-3 sm:pl-6">
                <span className="font-sans font-bold text-2xl sm:text-3xl text-[var(--charcoal)] tracking-tight">
                  22
                </span>
                <span className="font-sans text-[11.5px] sm:text-xs text-[var(--stone)] font-medium mt-0.5">
                  Indian Languages
                </span>
              </div>

              <div className="flex flex-col border-l border-black/10 pl-3 sm:pl-6">
                <span className="font-sans font-bold text-2xl sm:text-3xl text-[var(--charcoal)] tracking-tight">
                  99.8%
                </span>
                <span className="font-sans text-[11.5px] sm:text-xs text-[var(--stone)] font-medium mt-0.5">
                  Grounded Accuracy
                </span>
              </div>
            </div>

            {/* CTA Pill Button + Circular Arrow Button + Editorial Tagline */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-1">
              <div className="flex items-center gap-2 shrink-0">
                <Magnet magnetStrength={0.25} padding={20}>
                  <a
                    href="#get-started"
                    id="hero-cta-primary"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-full font-sans font-semibold text-xs tracking-wide uppercase text-[var(--ivory)] bg-[var(--burgundy)] hover:bg-[var(--burgundy-deep)] transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] border border-white/20"
                  >
                    Decode Your Notice
                  </a>
                </Magnet>

                <a
                  href="#what-we-do"
                  aria-label="Explore practice areas and process"
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-white/80 dark:bg-white/90 border border-black/10 text-[var(--charcoal)] hover:text-[var(--burgundy)] hover:border-black/20 hover:scale-105 transition-all duration-200 shadow-xs"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 17 17 7M7 7h10v10" />
                  </svg>
                </a>
              </div>

              {/* Supporting Editorial Tagline */}
              <p className="font-sans text-xs sm:text-[13px] text-[var(--stone)] leading-relaxed max-w-sm">
                Demystifying court summons, legal notices, and statutory compliance into plain,
                source-grounded language across India.
              </p>
            </div>
          </div>

          {/* Bottom Right Column: Interactive Document Decoder Preview Card (Winzy slider card style) */}
          <div
            ref={rightContentRef}
            style={{ opacity: 0 }}
            className="lg:col-span-5 flex justify-start lg:justify-end"
          >
            <HeroDocumentCard />
          </div>
        </div>
      </div>
    </section>
  );
}
