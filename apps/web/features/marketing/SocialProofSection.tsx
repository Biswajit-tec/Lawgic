"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AvatarMatrix } from "@/components/motion/AvatarMatrix";
import { LaurelWreathSeal } from "@/components/motion/LaurelWreathSeal";
import { LedgerMarginRuler } from "@/components/motion/LedgerMarginRuler";
import FadeContent from "@/components/motion/FadeContent";

gsap.registerPlugin(ScrollTrigger);

export function SocialProofSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 35, filter: "blur(6px)" },
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
      id="social-proof"
      aria-label="Community and Trust"
      className="relative py-28 md:py-36 bg-[var(--ivory)] overflow-hidden"
    >
      {/* Signature Coordinate Rulers */}
      <LedgerMarginRuler start={1190} end={1370} step={15} theme="light" />

      <div className="container-lawgic relative z-10 text-center">
        <FadeContent effect="fade" duration={0.9} threshold={0.1}>
          {/* Interactive Staggered Avatar Wall */}
          <div className="mb-10">
            <AvatarMatrix />
          </div>

          {/* Section Headline */}
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[var(--charcoal)] tracking-tight leading-[1.2] max-w-2xl mx-auto mb-14">
            Trusted by founders, citizens, and families across India.
          </h2>

          {/* Three Golden Laurel Wreath Seals matching Frame 16 & 18 */}
          <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-16 max-w-4xl mx-auto pt-6 border-t border-[var(--stone-faint)]/60">
            <LaurelWreathSeal
              title="Top Legal Tech"
              subtitle="Accessibility Innovation"
              year="2026"
              stars={3}
            />
            <LaurelWreathSeal
              title="Citizen Trust"
              subtitle="Satisfaction Leader"
              year="2026"
              stars={3}
            />
            <LaurelWreathSeal
              title="Verified AI"
              subtitle="Source-Grounded Quality"
              year="2026"
              stars={3}
            />
          </div>
        </FadeContent>
      </div>
    </section>
  );
}
