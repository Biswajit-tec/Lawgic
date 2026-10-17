"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Magnet } from "@/components/motion/Magnet";
import { LedgerMarginRuler } from "@/components/motion/LedgerMarginRuler";

gsap.registerPlugin(ScrollTrigger);

export function FinalCTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 35, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
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
      id="get-started"
      aria-label="Get Started"
      className="relative py-20 md:py-28 bg-[var(--ivory)] overflow-hidden"
    >
      <LedgerMarginRuler start={1490} end={1620} step={10} theme="light" />

      <div className="container-lawgic relative z-10">
        <div
          ref={cardRef}
          className="relative rounded-3xl overflow-hidden p-8 sm:p-12 lg:p-16 text-[var(--ivory)] shadow-2xl"
          style={{
            backgroundColor: "var(--burgundy)",
            backgroundImage: "radial-gradient(circle at 20% 50%, rgba(184, 147, 90, 0.15) 0%, transparent 60%)",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Column (8 cols) */}
            <div className="lg:col-span-8 flex flex-col gap-6 max-w-2xl">
              <div>
                <span className="text-xs font-sans font-semibold tracking-[0.2em] uppercase text-[var(--brass-light)]">
                  07 / Legal Understanding For Everyone
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-semibold text-[var(--ivory)] tracking-tight leading-[1.12]">
                Your documents. Your language.{" "}
                <span className="font-serif italic text-[var(--brass-light)]">
                  A clearer understanding.
                </span>
              </h2>

              <p className="font-sans text-sm md:text-base text-[var(--ivory)]/75 leading-relaxed max-w-xl">
                Upload any court notice, tenancy agreement, or government letter today.
                Receive an instant plain-language breakdown with verified source provisions and clear next steps.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Magnet magnetStrength={0.25} padding={25}>
                  <a
                    href="#signup"
                    id="final-cta-btn"
                    className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-sans font-bold text-sm tracking-wide text-[var(--burgundy-deep)] bg-[var(--ivory)] hover:bg-[var(--off-white)] transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-[1.03]"
                  >
                    <span>Decode Your Document Now</span>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </a>
                </Magnet>

                <span className="font-sans text-xs text-[var(--ivory)]/60">
                  Free confidential scan · No credit card required
                </span>
              </div>
            </div>

            {/* Right Column: Lady Justice Sculpture overlay matching Frame 20 */}
            <div className="lg:col-span-4 relative hidden lg:flex items-center justify-end pointer-events-none">
              <div className="relative w-[340px] h-[400px] opacity-75">
                <Image
                  src="/hero-justice.jpg"
                  alt=""
                  fill
                  className="object-contain object-right-bottom mix-blend-luminosity filter brightness-110"
                  style={{
                    maskImage:
                      "linear-gradient(to top, transparent 0%, black 30%, black 85%, transparent 100%), linear-gradient(to left, black 60%, transparent 100%)",
                    WebkitMaskImage:
                      "linear-gradient(to top, transparent 0%, black 30%, black 85%, transparent 100%), linear-gradient(to left, black 60%, transparent 100%)",
                    maskComposite: "intersect",
                    WebkitMaskComposite: "destination-in",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
