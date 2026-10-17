"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BlurText } from "@/components/motion/BlurText";
import { ShinyText } from "@/components/motion/ShinyText";
import { Magnet } from "@/components/motion/Magnet";
import { LedgerMarginRuler } from "@/components/motion/LedgerMarginRuler";
import { LaurelWreathSeal } from "@/components/motion/LaurelWreathSeal";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const awardsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 16, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, delay: 0.1 }
      )
        .fromTo(
          subRef.current,
          { opacity: 0, y: 20, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 },
          "-=0.4"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5"
        )
        .fromTo(
          awardsRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
          "-=0.3"
        )
        .fromTo(
          imageRef.current,
          { opacity: 0, scale: 0.96, x: 30, filter: "blur(8px)" },
          { opacity: 1, scale: 1, x: 0, filter: "blur(0px)", duration: 1.2, ease: "power2.out" },
          0.2
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      aria-label="Hero"
      className="relative min-h-[100vh] flex flex-col justify-center overflow-hidden bg-[var(--ivory)] pt-24 pb-12"
      style={{
        backgroundImage: "radial-gradient(circle at 65% 50%, rgba(232, 226, 212, 0.45) 0%, transparent 70%)",
      }}
    >
      {/* Signature Ledger Coordinate Ruler Margins on both borders */}
      <LedgerMarginRuler start={0} end={210} step={10} theme="light" />

      <div className="container-lawgic relative z-10 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6 md:gap-7 z-10">
            {/* Eyebrow Badge */}
            <div ref={badgeRef} style={{ opacity: 0 }}>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-sans font-semibold tracking-wider uppercase text-[var(--burgundy)] bg-[var(--burgundy-faint)] border border-[rgba(110,31,31,0.15)] shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--burgundy)] animate-pulse" />
                India&apos;s Legal Accessibility Platform
              </span>
            </div>

            {/* Display Headline with React Bits BlurText reveal */}
            <div className="max-w-2xl">
              <h1
                className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-semibold text-[var(--charcoal)] tracking-tight leading-[1.08]"
              >
                Legal precision for{" "}
                <br className="hidden sm:inline" />
                <span className="font-serif italic text-[var(--burgundy)]">
                  <ShinyText text="every citizen." speed={4} />
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <p
              ref={subRef}
              style={{ opacity: 0 }}
              className="font-sans text-base md:text-lg text-[var(--stone)] leading-relaxed max-w-lg"
            >
              From court notices and police summons to tenant leases and loan agreements,
              Lawgic translates intimidating legal documents into clear, plain-language
              guidance in the Indian language you know best.
            </p>

            {/* CTAs */}
            <div
              ref={ctaRef}
              style={{ opacity: 0 }}
              className="flex flex-wrap items-center gap-4 pt-1"
            >
              <Magnet magnetStrength={0.3} padding={30}>
                <a
                  href="#get-started"
                  id="hero-cta-primary"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-sans font-semibold text-sm text-[var(--ivory)] bg-[var(--burgundy)] hover:bg-[var(--burgundy-deep)] transition-all duration-300 shadow-md hover:shadow-xl hover:scale-[1.02]"
                  style={{
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  }}
                >
                  <span>Decode Your Document</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </a>
              </Magnet>

              <a
                href="#what-we-do"
                id="hero-cta-secondary"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-full font-sans font-medium text-sm text-[var(--charcoal)] bg-transparent border border-[var(--stone-faint)] hover:border-[var(--stone-light)] hover:bg-[var(--ivory-deep)] transition-all duration-300"
              >
                Explore How It Works
              </a>
            </div>

            {/* Laurel Wreath Award Badges (matching reference video bottom left) */}
            <div
              ref={awardsRef}
              style={{ opacity: 0 }}
              className="pt-6 border-t border-[var(--stone-faint)]/60 flex items-center gap-6 sm:gap-10 overflow-x-auto pb-2"
            >
              <LaurelWreathSeal
                title="Plain Language"
                subtitle="National Standard"
                year="2026"
                stars={3}
              />
              <LaurelWreathSeal
                title="Source Grounded"
                subtitle="Verified Legal AI"
                year="2026"
                stars={3}
              />
              <LaurelWreathSeal
                title="Privacy First"
                subtitle="Client Protection"
                year="2026"
                stars={3}
              />
            </div>
          </div>

          {/* Right Column: Classical Lady Justice Sculpture (5 cols) */}
          <div
            ref={imageRef}
            style={{ opacity: 0 }}
            className="lg:col-span-5 relative hidden lg:flex items-center justify-center pointer-events-none"
            aria-hidden="true"
          >
            {/* Atmospheric backlight */}
            <div
              className="absolute w-[440px] h-[580px] rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(232, 226, 212, 0.9) 0%, rgba(244, 239, 228, 0) 70%)",
                filter: "blur(40px)",
              }}
            />

            <div className="relative w-full max-w-[460px] h-[640px]">
              <Image
                src="/hero-justice.jpg"
                alt="Lady Justice classical marble sculpture representing impartiality and legal clarity"
                fill
                priority
                className="object-contain object-right-bottom drop-shadow-sm"
                style={{
                  maskImage:
                    "linear-gradient(to top, transparent 0%, black 15%, black 85%, transparent 100%), linear-gradient(to left, black 70%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to top, transparent 0%, black 15%, black 85%, transparent 100%), linear-gradient(to left, black 70%, transparent 100%)",
                  maskComposite: "intersect",
                  WebkitMaskComposite: "destination-in",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none opacity-60 hover:opacity-100 transition-opacity"
        aria-hidden="true"
      >
        <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-[var(--stone)] font-medium">
          Scroll to explore
        </span>
        <div className="w-[1px] h-7 bg-gradient-to-b from-[var(--stone)] to-transparent animate-pulse" />
      </div>
    </section>
  );
}
