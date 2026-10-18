"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BlurText } from "@/components/motion/BlurText";
import { LedgerMarginRuler } from "@/components/motion/LedgerMarginRuler";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { TiltedCard } from "@/components/motion/TiltedCard";
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
            {/* Card 01: Assess */}
            <div className="process-card">
              <TiltedCard maxTilt={6} scale={1.02}>
                <SpotlightCard
                  className="bg-[var(--ivory-subtle)] border border-[var(--stone-faint)] rounded-2xl p-6 md:p-8 flex flex-col justify-between h-full shadow-sm hover:shadow-md transition-shadow"
                  spotlightColor="rgba(110, 31, 31, 0.12)"
                >
                  {/* Visual Radar Graphic */}
                  <div className="mb-6">
                    <RadarGraphic />
                  </div>

                  {/* Card Content */}
                  <div className="pt-4 border-t border-[var(--stone-faint)]/60">
                    <div className="font-serif text-xl font-bold text-[var(--charcoal)] mb-2 flex items-center gap-2">
                      <span className="text-[var(--burgundy)] text-sm font-sans font-semibold tracking-wider uppercase">01.</span>
                      <span>Assess</span>
                    </div>
                    <p className="font-sans text-sm text-[var(--stone)] leading-relaxed">
                      We audit your current legal notice or contract, detect mandatory statutory
                      clauses, identify liability points, and calculate response deadlines.
                    </p>
                  </div>
                </SpotlightCard>
              </TiltedCard>
            </div>

            {/* Card 02: Advise */}
            <div className="process-card">
              <TiltedCard maxTilt={6} scale={1.02}>
                <SpotlightCard
                  className="bg-[var(--ivory-subtle)] border border-[var(--stone-faint)] rounded-2xl p-6 md:p-8 flex flex-col justify-between h-full shadow-sm hover:shadow-md transition-shadow"
                  spotlightColor="rgba(184, 147, 90, 0.16)"
                >
                  {/* Visual Chess Strategy Matrix */}
                  <div className="mb-6">
                    <ChessMatrixGraphic />
                  </div>

                  {/* Card Content */}
                  <div className="pt-4 border-t border-[var(--stone-faint)]/60">
                    <div className="font-serif text-xl font-bold text-[var(--charcoal)] mb-2 flex items-center gap-2">
                      <span className="text-[var(--burgundy)] text-sm font-sans font-semibold tracking-wider uppercase">02.</span>
                      <span>Advise</span>
                    </div>
                    <p className="font-sans text-sm text-[var(--stone)] leading-relaxed">
                      We cross-reference relevant sections of the Indian Penal Code, BNS, or
                      special statutes to formulate strategic advice in language you easily grasp.
                    </p>
                  </div>
                </SpotlightCard>
              </TiltedCard>
            </div>

            {/* Card 03: Act */}
            <div className="process-card">
              <TiltedCard maxTilt={6} scale={1.02}>
                <SpotlightCard
                  className="bg-[var(--ivory-subtle)] border border-[var(--stone-faint)] rounded-2xl p-6 md:p-8 flex flex-col justify-between h-full shadow-sm hover:shadow-md transition-shadow"
                  spotlightColor="rgba(110, 31, 31, 0.12)"
                >
                  {/* Visual Compass & Gavel Dial */}
                  <div className="mb-6">
                    <CompassDialGraphic />
                  </div>

                  {/* Card Content */}
                  <div className="pt-4 border-t border-[var(--stone-faint)]/60">
                    <div className="font-serif text-xl font-bold text-[var(--charcoal)] mb-2 flex items-center gap-2">
                      <span className="text-[var(--burgundy)] text-sm font-sans font-semibold tracking-wider uppercase">03.</span>
                      <span>Act</span>
                    </div>
                    <p className="font-sans text-sm text-[var(--stone)] leading-relaxed">
                      We generate clear action checklists, response outlines, and connect you
                      with specialized, verified legal counsel when court representation is necessary.
                    </p>
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
