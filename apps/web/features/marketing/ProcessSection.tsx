"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BlurText } from "@/components/motion/BlurText";
import { LedgerMarginRuler } from "@/components/motion/LedgerMarginRuler";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { TiltedCard } from "@/components/motion/TiltedCard";
import { GlassMosaicBackground, MOSAIC_THEMES } from "@/components/motion/GlassMosaicBackground";
import { RadarGraphic } from "@/components/motion/RadarGraphic";
import { ChessMatrixGraphic } from "@/components/motion/ChessMatrixGraphic";
import { CompassDialGraphic } from "@/components/motion/CompassDialGraphic";
import FadeContent from "@/components/motion/FadeContent";

gsap.registerPlugin(ScrollTrigger);

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !cardsRef.current) return;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll(".process-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.9,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      aria-labelledby="process-heading"
      className="relative py-28 md:py-36 bg-[var(--ivory-deep)] overflow-hidden"
    >
      {/* Signature Coordinate Rulers */}
      <LedgerMarginRuler start={800} end={1020} step={15} theme="light" />

      <div className="container-lawgic relative z-10">
        <FadeContent effect="fade" duration={0.9} threshold={0.1}>
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs font-sans font-semibold tracking-[0.2em] uppercase text-[var(--burgundy)] mb-4">
              03 / Our Process
            </div>

            <h2
              id="process-heading"
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[var(--charcoal)] tracking-tight leading-[1.15] mb-4"
            >
              Advisory, not just{" "}
              <span className="font-serif italic text-[var(--burgundy)]">
                information.
              </span>
            </h2>

            <p className="font-sans text-base text-[var(--stone)] leading-relaxed">
              A three-step procedural framework engineered to turn confusing legalese into
              crystal-clear risk assessment and decisive next steps.
            </p>
          </div>

          {/* The 3 Cards matching Reference Video Frame 1, 10, 12 */}
          <div
            ref={cardsRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
          >
            {/* Card 01: Assess — Theme: Classic Ivory (Burgundy & Brass Gold) */}
            <div className="process-card">
              <TiltedCard maxTilt={5} scale={1.02}>
                <SpotlightCard
                  className="relative rounded-3xl p-6 sm:p-7 md:p-8 flex flex-col justify-between h-[510px] sm:h-[540px] bg-[var(--ivory-subtle)] border border-[var(--stone-faint)]/70 shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden"
                  spotlightColor={MOSAIC_THEMES["classic-ivory"].spotlightColor}
                >
                  {/* Glass Mosaic Background: Wavy water fadeout */}
                  <GlassMosaicBackground theme="classic-ivory" tileSize={32} gap={2.6} radius={7} />

                  {/* Clean Header at Top - directly on card surface, matching reference */}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3.5">
                      <span
                        className="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wider uppercase text-white shadow-xs"
                        style={{ backgroundColor: MOSAIC_THEMES["classic-ivory"].pillColor }}
                      >
                        01. ASSESS
                      </span>
                      <span
                        className="text-[10px] font-mono font-bold tracking-wider uppercase flex items-center gap-1"
                        style={{ color: MOSAIC_THEMES["classic-ivory"].accentHex }}
                      >
                        AUDIT <span>⚡</span>
                      </span>
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[var(--charcoal)] mb-2.5 leading-snug">
                      Assess Risk &amp; Deadlines
                    </h3>

                    <p className="font-sans text-xs sm:text-[13px] text-[var(--stone)] leading-relaxed">
                      We audit your current legal notice or contract, detect mandatory statutory
                      clauses, identify liability points, and calculate response deadlines.
                    </p>
                  </div>

                  {/* Lower Stage: Graphic floating with solid porcelain base */}
                  <div className="relative z-10 mt-auto flex items-center justify-center min-h-[220px] sm:min-h-[235px]">
                    <RadarGraphic />
                  </div>
                </SpotlightCard>
              </TiltedCard>
            </div>

            {/* Card 02: Advise — Theme: Sand & Cyprus (Emerald & Cyprus Teal) */}
            <div className="process-card">
              <TiltedCard maxTilt={5} scale={1.02}>
                <SpotlightCard
                  className="relative rounded-3xl p-6 sm:p-7 md:p-8 flex flex-col justify-between h-[510px] sm:h-[540px] bg-[var(--ivory-subtle)] border border-[var(--stone-faint)]/70 shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden"
                  spotlightColor={MOSAIC_THEMES["sand-cyprus"].spotlightColor}
                >
                  {/* Glass Mosaic Background: Wavy water fadeout */}
                  <GlassMosaicBackground theme="sand-cyprus" tileSize={32} gap={2.6} radius={7} />

                  {/* Clean Header at Top - directly on card surface, matching reference */}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3.5">
                      <span
                        className="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wider uppercase text-white shadow-xs"
                        style={{ backgroundColor: MOSAIC_THEMES["sand-cyprus"].pillColor }}
                      >
                        02. ADVISE
                      </span>
                      <span
                        className="text-[10px] font-mono font-bold tracking-wider uppercase flex items-center gap-1"
                        style={{ color: MOSAIC_THEMES["sand-cyprus"].accentHex }}
                      >
                        STRATEGY <span>💡</span>
                      </span>
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[var(--charcoal)] mb-2.5 leading-snug">
                      Advise with Precision
                    </h3>

                    <p className="font-sans text-xs sm:text-[13px] text-[var(--stone)] leading-relaxed">
                      We cross-reference relevant sections of the Indian Penal Code, BNS, or
                      special statutes to formulate strategic advice in language you easily grasp.
                    </p>
                  </div>

                  {/* Lower Stage: 9-Cube Light Chessboard */}
                  <div className="relative z-10 mt-auto flex items-center justify-center min-h-[220px] sm:min-h-[235px]">
                    <ChessMatrixGraphic />
                  </div>
                </SpotlightCard>
              </TiltedCard>
            </div>

            {/* Card 03: Act — Theme: Petal & Espresso (Espresso & Terracotta) */}
            <div className="process-card">
              <TiltedCard maxTilt={5} scale={1.02}>
                <SpotlightCard
                  className="relative rounded-3xl p-6 sm:p-7 md:p-8 flex flex-col justify-between h-[510px] sm:h-[540px] bg-[var(--ivory-subtle)] border border-[var(--stone-faint)]/70 shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden"
                  spotlightColor={MOSAIC_THEMES["petal-espresso"].spotlightColor}
                >
                  {/* Glass Mosaic Background: Wavy water fadeout */}
                  <GlassMosaicBackground theme="petal-espresso" tileSize={32} gap={2.6} radius={7} />

                  {/* Clean Header at Top - directly on card surface, matching reference */}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3.5">
                      <span
                        className="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wider uppercase text-white shadow-xs"
                        style={{ backgroundColor: MOSAIC_THEMES["petal-espresso"].pillColor }}
                      >
                        03. ACT
                      </span>
                      <span
                        className="text-[10px] font-mono font-bold tracking-wider uppercase flex items-center gap-1"
                        style={{ color: MOSAIC_THEMES["petal-espresso"].accentHex }}
                      >
                        ACTION <span>⚖️</span>
                      </span>
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[var(--charcoal)] mb-2.5 leading-snug">
                      Act with Verified Counsel
                    </h3>

                    <p className="font-sans text-xs sm:text-[13px] text-[var(--stone)] leading-relaxed">
                      We generate clear action checklists, response outlines, and connect you
                      with specialized, verified legal counsel when court representation is necessary.
                    </p>
                  </div>

                  {/* Lower Stage: Compass dial graphic */}
                  <div className="relative z-10 mt-auto flex items-center justify-center min-h-[220px] sm:min-h-[235px]">
                    <CompassDialGraphic />
                  </div>
                </SpotlightCard>
              </TiltedCard>
            </div>
          </div>
        </FadeContent>
      </div>
    </section>
  );
}
