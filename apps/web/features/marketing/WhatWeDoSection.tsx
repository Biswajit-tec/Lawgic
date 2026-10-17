"use client";

import { useState } from "react";
import Image from "next/image";
import { LedgerMarginRuler } from "@/components/motion/LedgerMarginRuler";
import { Magnet } from "@/components/motion/Magnet";

interface PracticeArea {
  id: string;
  title: string;
  description: string;
  highlights: string[];
}

const practiceAreas: PracticeArea[] = [
  {
    id: "decoder",
    title: "Legal Document & Notice Decoder",
    description:
      "Upload court notices, advocate letters, or government summons. Lawgic highlights statutory provisions, identifies actionable deadlines, and translates confusing clauses into plain language.",
    highlights: ["Section 138 NI Act Notices", "Civil Court Summons", "Police & Authority Letters"],
  },
  {
    id: "contracts",
    title: "Agreements & Contract Protection",
    description:
      "Review rental leases, builder-buyer contracts, employment letters, and service agreements before signing. Detect one-sided indemnities, unfair penalties, and deposit forfeit terms.",
    highlights: ["Rental & Lease Deeds", "Employment NDAs & Bonds", "Loan & Guarantee Clauses"],
  },
  {
    id: "rights",
    title: "Citizen Rights & Statutory Remedies",
    description:
      "Know exactly what the law permits and requires. Clear step-by-step guidance on Consumer Protection, RERA real estate appeals, RTI applications, and motor insurance claims.",
    highlights: ["Consumer Disputes", "RERA Complaints", "Cyber Fraud & Banking Grievances"],
  },
  {
    id: "procedure",
    title: "Court Process & Stage Navigator",
    description:
      "Understand where your matter stands in the judicial pipeline. Clear explanations of summons, interim injunctions, evidence stages, and settlement mediation.",
    highlights: ["Stage-by-stage timelines", "What to prepare", "When a lawyer is essential"],
  },
];

export function WhatWeDoSection() {
  const [activeArea, setActiveArea] = useState<string>("decoder");

  return (
    <section
      id="what-we-do"
      aria-labelledby="what-we-do-heading"
      className="relative py-24 md:py-32 bg-[var(--ivory)] overflow-hidden"
    >
      {/* Signature Coordinate Rulers */}
      <LedgerMarginRuler start={470} end={590} step={10} theme="light" />

      <div className="container-lawgic relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Practice area accordion (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Eyebrow badge */}
            <div>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-sans font-semibold tracking-wider uppercase text-[var(--burgundy)] bg-[var(--burgundy-faint)] border border-[rgba(110,31,31,0.15)]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                What We Do
              </span>
            </div>

            {/* Section Headline */}
            <h2
              id="what-we-do-heading"
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[var(--charcoal)] tracking-tight leading-[1.12]"
            >
              Full-spectrum legal clarity for citizens and founders
            </h2>

            {/* Subhead */}
            <p className="font-sans text-base text-[var(--stone)] leading-relaxed max-w-xl">
              From unexpected legal notices to high-stakes contracts, we give you the
              clarity, source citations, and protection you need to make sound decisions without delay.
            </p>

            {/* Accordion List */}
            <div className="flex flex-col gap-3 pt-2">
              {practiceAreas.map((area) => {
                const isOpen = activeArea === area.id;

                return (
                  <div
                    key={area.id}
                    onClick={() => setActiveArea(area.id)}
                    className={`rounded-xl transition-all duration-300 cursor-pointer border ${
                      isOpen
                        ? "bg-[var(--ivory-subtle)] border-[var(--burgundy)] shadow-sm p-5"
                        : "bg-transparent border-[var(--stone-faint)]/80 hover:border-[var(--stone-light)] p-4"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h3
                        className={`font-serif text-lg md:text-xl font-semibold transition-colors duration-200 ${
                          isOpen ? "text-[var(--burgundy)]" : "text-[var(--charcoal)]"
                        }`}
                      >
                        {area.title}
                      </h3>

                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-transform duration-300 ${
                          isOpen
                            ? "rotate-90 bg-[var(--burgundy)] text-[var(--ivory)]"
                            : "bg-[var(--stone-faint)] text-[var(--stone)]"
                        }`}
                      >
                        →
                      </span>
                    </div>

                    {isOpen && (
                      <div className="mt-3 pt-3 border-t border-[var(--stone-faint)]/60 animate-fadeIn">
                        <p className="font-sans text-sm text-[var(--stone)] leading-relaxed mb-3">
                          {area.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {area.highlights.map((tag) => (
                            <span
                              key={tag}
                              className="text-[11px] font-sans font-medium px-2.5 py-0.5 rounded-md bg-[var(--burgundy-faint)] text-[var(--burgundy)] border border-[rgba(110,31,31,0.1)]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* CTAs matching reference video */}
            <div className="flex flex-wrap items-center gap-5 pt-4">
              <Magnet magnetStrength={0.25} padding={25}>
                <a
                  href="#get-started"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-sans font-semibold text-xs tracking-wider uppercase text-[var(--ivory)] bg-[var(--burgundy)] hover:bg-[var(--burgundy-deep)] transition-all duration-300 shadow-md hover:scale-[1.02]"
                >
                  <span>Decode Your Document</span>
                  <span>→</span>
                </a>
              </Magnet>

              <span className="font-sans text-xs text-[var(--stone)] font-medium">
                Plain language · Grounded in Indian Law
              </span>
            </div>
          </div>

          {/* Right Column: Lady Justice Sculpture with Scales (5 cols) */}
          <div className="lg:col-span-5 relative hidden lg:flex items-center justify-center pointer-events-none select-none">
            <div className="relative w-full max-w-[440px] h-[580px]">
              <Image
                src="/hero-justice.jpg"
                alt="Lady Justice holding scales of justice"
                fill
                className="object-contain object-center"
                style={{
                  maskImage:
                    "linear-gradient(to top, transparent 0%, black 20%, black 80%, transparent 100%), linear-gradient(to left, black 75%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to top, transparent 0%, black 20%, black 80%, transparent 100%), linear-gradient(to left, black 75%, transparent 100%)",
                  maskComposite: "intersect",
                  WebkitMaskComposite: "destination-in",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
