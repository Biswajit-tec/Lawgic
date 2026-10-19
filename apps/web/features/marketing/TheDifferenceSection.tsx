"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LedgerMarginRuler } from "@/components/motion/LedgerMarginRuler";
import {
  Star,
  ArrowRight,
  ShieldCheck,
  Scale,
  ChevronRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export interface DifferencePillar {
  id: string;
  title: string;
  badge: string;
  badgeBg: string;
  metadata: { label: string; highlight?: boolean }[];
  description: string;
  image: string;
  imageAlt: string;
  actionText: string;
  actionHref: string;
  citation: string;
}

const DIFFERENCE_PILLARS: DifferencePillar[] = [
  {
    id: "precedents",
    title: "Supreme Court & High Court Precedents",
    badge: "VERIFIED BENCH",
    badgeBg: "bg-[#139A8C] text-white",
    metadata: [
      { label: "ALL 28 HIGH COURTS", highlight: true },
      { label: "AIR & SCC CITATIONS" },
      { label: "DAILY UPDATED" },
    ],
    description:
      "Unlike opaque hearsay or unverified legal forums, Lawgic grounds every analysis in binding judgments from the Supreme Court of India and 28 High Courts, citing exact paragraph numbers, relevant bench majorities, and active statutory amendments.",
    image: "/images/difference/precedents-library.jpg",
    imageAlt:
      "Authentic Supreme Court law library with leather-bound All India Reporter volumes, brass balance scale, and banker lamp",
    actionText: "EXPLORE CITATION ARCHIVE",
    actionHref: "#practice-areas",
    citation: "AIR 2024 SC 184 · Art. 141 Binding Precedent",
  },
  {
    id: "vernacular",
    title: "Plain Language Vernacular Translation",
    badge: "12 LANGUAGES",
    badgeBg: "bg-[#9C4153] text-white",
    metadata: [
      { label: "12 OFFICIAL LANGUAGES", highlight: true },
      { label: "ZERO LATIN JARGON" },
      { label: "STAMP PAPER DEEDS" },
    ],
    description:
      "Converts impenetrable colonial Latin jargon, complex summons, and archaic legal deeds into crystal-clear everyday language in Hindi, Tamil, Bengali, Telugu, and 8 other Indian languages—retaining absolute legal precision without intimidation.",
    image: "/images/difference/stamp-analysis.png",
    imageAlt:
      "Authentic Indian non-judicial stamp paper legal deed under plain-language forensic clause analysis",
    actionText: "VIEW TRANSLATION ENGINE",
    actionHref: "#languages",
    citation: "Indian Stamp Act 1899 · Plain Language Standard",
  },
  {
    id: "procedural",
    title: "Actionable Procedural Filing Protocols",
    badge: "TIME-BOUND",
    badgeBg: "bg-[#C88A2E] text-white",
    metadata: [
      { label: "LIMITATION ACT 1963", highlight: true },
      { label: "ORDER VII CPC" },
      { label: "FILING CHECKLISTS" },
    ],
    description:
      "Replaces procedural panic with exact statutory limitation periods, required document affidavits, and jurisdiction verification. Lawgic outlines precise, step-by-step court protocols so you never miss a mandatory statutory filing window.",
    image: "/images/difference/courtroom-bench.jpg",
    imageAlt:
      "Authentic Indian courtroom bench with judicial gavel, mahogany podium, and courtroom advocate seating",
    actionText: "VIEW PROCEDURAL PROTOCOL",
    actionHref: "#how-it-works",
    citation: "Limitation Act 1963 · Schedule I Articles 54 & 113",
  },
];

export function TheDifferenceSection() {
  const [activeId, setActiveId] = useState<string>("precedents");
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Active pillar is the featured expanded card
  const activePillar =
    DIFFERENCE_PILLARS.find((p) => p.id === activeId) ?? DIFFERENCE_PILLARS[0];

  // Secondary pillars are the compact clickable rows below
  const secondaryPillars = DIFFERENCE_PILLARS.filter((p) => p.id !== activeId);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".diff-hero-backdrop",
        { opacity: 0.6, scale: 1.02 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 95%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".diff-floating-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 95%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="difference"
      aria-label="The Lawgic Difference"
      className="relative w-full bg-[var(--charcoal)] overflow-hidden"
    >
      {/* Signature Coordinate Rulers in FRONT of images (z-30) */}
      <LedgerMarginRuler start={1030} end={1180} step={10} theme="dark" className="z-30" />

      {/* =========================================================================
          FULL-BLEED SHOWCASE CANVAS: Spans 100% of the page from left to right.
          Grand High Court architectural vista on the left, elevated museum-grade
          white interactive editorial card on the right.
          ========================================================================= */}
      <div
        className="relative w-full min-h-[660px] lg:min-h-[720px] xl:min-h-[760px] flex flex-col lg:flex-row items-stretch"
        ref={containerRef}
      >
        {/* -------------------------------------------------------------------
            FULL-BLEED BACKGROUND: Grand Indian High Court Architectural Photograph
            Sunlit sandstone colonnades, palm trees, marble steps, azure sky
            ------------------------------------------------------------------- */}
        <div className="diff-hero-backdrop absolute inset-0 z-0 select-none pointer-events-none">
          <Image
            src="/images/difference/hero-court.jpg"
            alt="Grand High Court of India sandstone architecture with advocates in robes"
            fill
            priority
            className="object-cover object-center lg:object-left"
            sizes="100vw"
          />
          {/* Luminous, Balanced Vignette: Preserves Sunlight and Architectural Grandeur */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/25 lg:bg-gradient-to-r lg:from-black/80 lg:via-black/35 lg:to-black/15" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-transparent via-black/15 to-black/60" />
        </div>

        {/* -------------------------------------------------------------------
            LEFT REGION: Monumental Architectural Brand Statement & Metadata
            Mirrors the bold 'ITALY' display typography in the reference design
            ------------------------------------------------------------------- */}
        <div className="relative z-10 w-full lg:w-[44%] xl:w-[42%] p-8 sm:p-12 lg:p-16 xl:p-20 flex flex-col justify-between text-white">
          {/* Top Rating & Jurisprudence Benchmark */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-[10px] sm:text-[11px] font-bold text-[#E5D7BE] tracking-widest uppercase drop-shadow-sm">
                CONSTITUTIONAL INTEGRITY
              </span>
              <span className="text-white/40">·</span>
              <div className="flex items-center gap-1 text-[#F5C451] drop-shadow-sm">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
                <span className="font-mono text-xs font-bold text-white ml-1">
                  4.9
                </span>
              </div>
            </div>

            {/* Monumental Hero Headline (Like 'ITALY' in Reference) */}
            <h3 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold tracking-tight text-white leading-[0.92] drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)] my-4">
              JUSTICE
            </h3>

            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E8C28A] font-semibold mb-4 drop-shadow-sm">
              <Scale className="w-4 h-4" />
              <span>SUPREME COURT & 28 HIGH COURTS</span>
            </div>

            <p className="font-sans text-xs sm:text-sm text-white/90 leading-relaxed max-w-sm drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              Democratizing India’s constitutional protections. Transforming archaic
              procedural complexity into verifiable, transparent clarity for every citizen.
            </p>
          </div>

          {/* Bottom Official Seal & Constitutional Reference */}
          <div className="mt-8 pt-6 border-t border-white/20 flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/25 text-[11px] font-sans text-white/95 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E8C28A]" />
              <span className="font-medium">Article 39A & 21 Verified</span>
            </div>

            <span className="font-mono text-[10px] tracking-wider uppercase text-white/70 drop-shadow-xs">
              Gazette Synchronized
            </span>
          </div>
        </div>

        {/* -------------------------------------------------------------------
            RIGHT REGION: Elevated Museum-Grade Floating White Editorial Card
            Contains the Active Expanded Feature (Top) and Compact Rows (Bottom)
            ------------------------------------------------------------------- */}
        <div className="relative z-10 w-full lg:w-[56%] xl:w-[58%] p-4 sm:p-8 lg:p-12 xl:p-16 flex items-center justify-end">
          <div className="diff-floating-card w-full max-w-2xl xl:max-w-3xl bg-[#FFFFFF] rounded-2xl sm:rounded-[32px] border border-[var(--stone-faint)]/90 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.45)] p-5 sm:p-7 md:p-8 flex flex-col gap-6 text-[var(--charcoal)] backdrop-blur-xs">
            
            {/* ===============================================================
                TOP FEATURED CARD (Expanded Detail View)
                Mirrors 'Val di Funes' card in the reference image
                =============================================================== */}
            <div
              key={activePillar.id}
              className="transition-all duration-500 animate-fadeIn"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-stretch">
                
                {/* Photo Column */}
                <div className="md:col-span-5 relative w-full min-h-[190px] sm:min-h-[220px] md:min-h-full rounded-2xl overflow-hidden border border-stone-200/70 shadow-sm shrink-0">
                  <Image
                    src={activePillar.image}
                    alt={activePillar.imageAlt}
                    fill
                    className="object-cover object-center transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 360px"
                  />
                  {/* Subtle Statute Citation Stamp */}
                  <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-[9px] font-mono font-medium text-white/95 border border-white/15 truncate shadow-sm">
                    {activePillar.citation}
                  </div>
                </div>

                {/* Content Column */}
                <div className="md:col-span-7 flex flex-col justify-between">
                  <div>
                    {/* Top Header: Title & Distinct Tag Pill (like $1250 in reference) */}
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h4 className="font-serif text-xl sm:text-2xl font-bold text-[var(--charcoal)] tracking-tight leading-snug">
                        {activePillar.title}
                      </h4>
                      <span
                        className={`shrink-0 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider shadow-2xs ${activePillar.badgeBg}`}
                      >
                        {activePillar.badge}
                      </span>
                    </div>

                    {/* Metadata Row (e.g. MARCH, 12 | 14 DAYS | 3 PEOPLE LEFT in reference) */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      {activePillar.metadata.map((meta, idx) => (
                        <span
                          key={idx}
                          className={`font-sans text-[10px] font-bold uppercase tracking-wider ${
                            meta.highlight
                              ? "text-[#E05A47] bg-[#E05A47]/10 px-2 py-0.5 rounded"
                              : "text-[var(--stone)]"
                          }`}
                        >
                          {meta.label}
                          {idx < activePillar.metadata.length - 1 && (
                            <span className="text-[var(--stone-light)] ml-2">
                              |
                            </span>
                          )}
                        </span>
                      ))}
                    </div>

                    {/* Paragraph Description */}
                    <p className="font-sans text-xs sm:text-sm text-[var(--stone)] leading-relaxed mb-5">
                      {activePillar.description}
                    </p>
                  </div>

                  {/* Action Button (e.g. BOOK THIS TOUR in reference) */}
                  <div>
                    <a
                      href={activePillar.actionHref}
                      className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#E05A47] hover:bg-[#C94735] text-white text-xs font-sans font-bold uppercase tracking-wider shadow-md hover:shadow-lg hover:brightness-105 active:scale-[0.98] transition-all group w-fit"
                    >
                      <span>{activePillar.actionText}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Subtle Horizontal Divider */}
            <div className="w-full h-px bg-[var(--stone-faint)]/80" />

            {/* ===============================================================
                BOTTOM SECONDARY COMPACT ROWS (Clickable Cards to Switch)
                Faithfully mirrors 'Bogliasco' and 'Tuscany' in reference image.
                =============================================================== */}
            <div className="space-y-3">
              {secondaryPillars.map((pillar) => (
                <button
                  key={pillar.id}
                  type="button"
                  onClick={() => setActiveId(pillar.id)}
                  className="w-full text-left group flex items-center gap-4 sm:gap-5 p-2.5 sm:p-3 rounded-2xl border border-transparent hover:border-[var(--stone-faint)] hover:bg-[var(--ivory-subtle)]/70 focus:outline-none focus:ring-2 focus:ring-[var(--burgundy)]/20 transition-all cursor-pointer"
                >
                  {/* Thumbnail Photo on Left */}
                  <div className="relative w-24 h-18 sm:w-28 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-stone-200/80 shadow-2xs">
                    <Image
                      src={pillar.image}
                      alt={pillar.imageAlt}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      sizes="120px"
                    />
                  </div>

                  {/* Content on Right */}
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <h5 className="font-serif text-base sm:text-lg font-bold text-[var(--charcoal)] group-hover:text-[var(--burgundy)] transition-colors truncate">
                        {pillar.title}
                      </h5>
                      <span
                        className={`shrink-0 px-2.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider shadow-2xs ${pillar.badgeBg}`}
                      >
                        {pillar.badge}
                      </span>
                    </div>

                    <p className="font-sans text-xs text-[var(--stone)] line-clamp-1 mb-1.5">
                      {pillar.description}
                    </p>

                    {/* Interactive Text Link with Circular Arrow Icon */}
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-sans font-bold uppercase tracking-wider text-[#E05A47] group-hover:text-[var(--burgundy)] transition-colors">
                      <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center shrink-0">
                        <ChevronRight className="w-2.5 h-2.5 stroke-[2.5]" />
                      </span>
                      <span>VIEW THIS PILLAR</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
