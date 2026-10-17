"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { OrbitalArcGraphic } from "@/components/motion/OrbitalArcGraphic";
import { LedgerMarginRuler } from "@/components/motion/LedgerMarginRuler";

gsap.registerPlugin(ScrollTrigger);

export function ComplexitySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
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
      id="complexity"
      aria-label="Legal Complexity and Clarity"
      className="relative py-28 md:py-36 overflow-hidden select-none"
      style={{
        backgroundColor: "var(--burgundy-deep)",
        color: "var(--ivory)",
      }}
    >
      {/* Signature Coordinate Rulers in Dark Theme */}
      <LedgerMarginRuler start={220} end={460} step={15} theme="dark" />

      {/* Atmospheric radial ambient light */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(184, 147, 90, 0.12) 0%, transparent 80%)",
        }}
        aria-hidden="true"
      />

      <div ref={contentRef} className="container-lawgic relative z-10 text-center">
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-sans font-medium tracking-wide text-[var(--brass-light)] bg-white/10 border border-white/15 backdrop-blur-xs mb-8">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 21h18M3 10h18M5 10v11M19 10v11M9 10v11M15 10v11M12 2 2 7h20L12 2z"/>
          </svg>
          <span>Complexity Brings Uncertainty. We Bring Clarity.</span>
        </div>

        {/* Large Editorial Serif Headline */}
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-normal leading-[1.2] tracking-tight max-w-4xl mx-auto mb-8 text-[var(--ivory)]">
          Our intelligence model is built to catch risk before it becomes a liability, so everyday Indians can act with confidence.
        </h2>

        {/* Supporting description */}
        <div className="max-w-xl mx-auto mb-10">
          <h3 className="font-serif text-lg md:text-xl font-semibold text-[var(--brass-light)] mb-2">
            Dedicated Advisory &amp; Document Intelligence
          </h3>
          <p className="font-sans text-sm md:text-base text-[var(--ivory)]/70 leading-relaxed">
            Get instant legal analysis that decodes statutory clauses, identifies your
            rights, and provides clear, grounded next steps for any notice or contract.
          </p>
        </div>

        {/* Arched Orbital Radar graphic matching reference video Frame 4 & 22 */}
        <OrbitalArcGraphic />
      </div>
    </section>
  );
}
