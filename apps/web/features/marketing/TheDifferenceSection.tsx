"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LedgerMarginRuler } from "@/components/motion/LedgerMarginRuler";
import { SpotlightCard } from "@/components/motion/SpotlightCard";

gsap.registerPlugin(ScrollTrigger);

export function TheDifferenceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".diff-card-1",
        { opacity: 0, x: -30, filter: "blur(6px)" },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 78%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".diff-card-2",
        { opacity: 0, x: 30, filter: "blur(6px)" },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power3.out",
          delay: 0.15,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 78%",
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
      aria-labelledby="difference-heading"
      className="relative py-28 md:py-36 bg-[var(--ivory)] overflow-hidden"
    >
      {/* Signature Coordinate Rulers */}
      <LedgerMarginRuler start={1030} end={1180} step={10} theme="light" />

      <div className="container-lawgic relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-sans font-semibold tracking-wider uppercase text-[var(--burgundy)] bg-[var(--burgundy-faint)] border border-[rgba(110,31,31,0.15)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--burgundy)]" />
                The Difference
              </span>
            </div>

            <h2
              id="difference-heading"
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[var(--charcoal)] tracking-tight leading-[1.12]"
            >
              Most legal systems leave you in the dark.{" "}
              <span className="font-serif italic text-[var(--burgundy)]">
                Lawgic empowers you.
              </span>
            </h2>

            <p className="font-sans text-base text-[var(--stone)] leading-relaxed">
              When an Indian citizen receives an official notice or signs a deed,
              fear and confusion often take over. We replace intimidation with
              transparency, dignity, and prompt clarity.
            </p>

            <div className="p-5 rounded-2xl bg-[var(--ivory-subtle)] border border-[var(--stone-faint)] max-w-md">
              <p className="font-serif italic text-lg text-[var(--charcoal)] mb-2">
                &ldquo;We&apos;re not just here when things go wrong. We&apos;re here so they don&apos;t.&rdquo;
              </p>
              <span className="font-sans text-xs uppercase tracking-wider text-[var(--burgundy)] font-bold">
                The Lawgic Principle
              </span>
            </div>
          </div>

          {/* Right Column: Comparative Cards (7 cols) */}
          <div
            ref={containerRef}
            className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 relative"
          >
            {/* Card 1: Traditional Systems (Muted Ivory) */}
            <div className="diff-card-1 bg-[var(--ivory-subtle)] border border-[var(--stone-faint)] rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-xs">
              <div>
                <span className="font-sans text-xs font-bold uppercase tracking-wider text-[var(--stone)] block mb-4">
                  Traditional Experience
                </span>
                <h3 className="font-serif text-xl font-semibold text-[var(--charcoal)] mb-5">
                  Complex &amp; Reactive
                </h3>

                <ul className="space-y-3.5 text-xs md:text-sm font-sans text-[var(--stone)]">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--stone-light)] mt-0.5">✕</span>
                    <span><strong>Reactive:</strong> Steps in only after crisis or dispute has already escalated</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--stone-light)] mt-0.5">✕</span>
                    <span><strong>Legal Jargon:</strong> Heavy archaic phrasing that conceals real obligations</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--stone-light)] mt-0.5">✕</span>
                    <span><strong>Unclear Costs:</strong> Hourly bills and surprise fees without initial transparency</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--stone-light)] mt-0.5">✕</span>
                    <span><strong>Language Barrier:</strong> Primarily restricted to formal English documents</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--stone-light)] mt-0.5">✕</span>
                    <span><strong>Delayed Timelines:</strong> Days or weeks waiting for basic document understanding</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Card 2: With LAWGIC (Deep Burgundy Floating Card) */}
            <div className="diff-card-2">
              <SpotlightCard
                className="bg-[var(--burgundy)] text-[var(--ivory)] border border-[var(--burgundy-deep)] rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-xl md:-translate-y-3 relative overflow-hidden"
                spotlightColor="rgba(255, 255, 255, 0.15)"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-sans text-xs font-bold uppercase tracking-wider text-[var(--brass-light)]">
                      With Lawgic
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[var(--brass-light)] animate-pulse" />
                  </div>

                  <h3 className="font-serif text-xl font-semibold text-[var(--ivory)] mb-5">
                    Proactive &amp; Plain Language
                  </h3>

                  <ul className="space-y-3.5 text-xs md:text-sm font-sans text-[var(--ivory)]/85">
                    <li className="flex items-start gap-2.5">
                      <span className="text-[var(--brass-light)] mt-0.5">✓</span>
                      <span><strong>Proactive:</strong> Detects deadlines and legal exposure before consequences occur</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[var(--brass-light)] mt-0.5">✓</span>
                      <span><strong>Plain Language:</strong> Translated into simple, understandable explanations</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[var(--brass-light)] mt-0.5">✓</span>
                      <span><strong>Source Grounded:</strong> Every point cites the exact statutory section or rule</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[var(--brass-light)] mt-0.5">✓</span>
                      <span><strong>Multilingual India:</strong> Available in native Hindi, Tamil, Bengali, Telugu, and more</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[var(--brass-light)] mt-0.5">✓</span>
                      <span><strong>Instant Guidance:</strong> Document analysis and next-step checklist in minutes</span>
                    </li>
                  </ul>
                </div>
              </SpotlightCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
