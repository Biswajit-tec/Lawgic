"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="6" y="4" width="20" height="24" rx="3" stroke="var(--burgundy)" strokeWidth="1.5"/>
        <path d="M10 10h12M10 14h12M10 18h8" stroke="var(--burgundy)" strokeWidth="1.3" strokeLinecap="round"/>
        <circle cx="22" cy="22" r="6" fill="var(--ivory)" stroke="var(--burgundy)" strokeWidth="1.3"/>
        <path d="M20 22l1.5 1.5L24 20" stroke="var(--burgundy)" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
    title: "Upload your document",
    description:
      "Upload any legal document, notice, or order. Lawgic accepts PDFs, images, and scanned copies.",
  },
  {
    number: "02",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="16" r="11" stroke="var(--burgundy)" strokeWidth="1.5"/>
        <path d="M10 16h12M16 10v12" stroke="var(--burgundy)" strokeWidth="1.3" strokeLinecap="round"/>
        <circle cx="16" cy="16" r="3" fill="var(--burgundy-faint)" stroke="var(--burgundy)" strokeWidth="1"/>
      </svg>
    ),
    title: "Lawgic reads and extracts",
    description:
      "Our system identifies the document type, key dates, parties involved, and legal obligations.",
  },
  {
    number: "03",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="4" y="8" width="16" height="16" rx="3" stroke="var(--burgundy)" strokeWidth="1.5"/>
        <rect x="12" y="12" width="16" height="16" rx="3" fill="var(--ivory-deep)" stroke="var(--burgundy)" strokeWidth="1.3"/>
        <path d="M16 17h8M16 21h6" stroke="var(--burgundy)" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    title: "AI explains in plain language",
    description:
      "Lawgic explains what the document means, what it requires from you, and what the relevant law says.",
  },
  {
    number: "04",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="16" r="11" stroke="var(--burgundy)" strokeWidth="1.5"/>
        <path d="M10 16l1.5 1.5L14 15M14 16h4M18 14v4" stroke="var(--burgundy)" strokeWidth="1.3" strokeLinecap="round"/>
        <text x="10" y="22" fontSize="9" fontFamily="sans-serif" fill="var(--burgundy)" opacity="0.7">A हि</text>
      </svg>
    ),
    title: "Read in your language",
    description:
      "Choose from multiple Indian languages. The explanation is written for clarity, not complexity.",
  },
  {
    number: "05",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M8 24l4-8 4 4 4-8 4 12" stroke="var(--burgundy)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 28h20" stroke="var(--burgundy)" strokeWidth="1.2" strokeLinecap="round"/>
        <circle cx="24" cy="10" r="4" fill="var(--burgundy-faint)" stroke="var(--burgundy)" strokeWidth="1"/>
        <path d="M22.5 10l1 1 2-2" stroke="var(--burgundy)" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
    title: "Review sources and next steps",
    description:
      "Every explanation links to the actual law and relevant official sources. Know your options and next steps.",
  },
];

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".hiw-reveal").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            delay: i * 0.08,
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      aria-labelledby="hiw-heading"
      style={{
        background: "var(--ivory)",
        padding: "var(--space-section) 0",
      }}
    >
      <div className="container-lawgic">
        {/* Header */}
        <div className="hiw-reveal" style={{ textAlign: "center", marginBottom: "1rem" }}>
          <span className="section-badge">How It Works</span>
        </div>
        <div className="hiw-reveal" style={{ textAlign: "center", marginBottom: "1rem" }}>
          <h2 id="hiw-heading" className="text-h2" style={{ maxWidth: "560px", margin: "0 auto" }}>
            Advisory, not just{" "}
            <em style={{ color: "var(--burgundy)", fontStyle: "italic" }}>
              information.
            </em>
          </h2>
        </div>
        <div className="hiw-reveal" style={{ textAlign: "center", marginBottom: "5rem" }}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-body-lg)", color: "var(--stone)", maxWidth: "480px", margin: "0 auto", lineHeight: 1.65 }}>
            From document to understanding in minutes, not days.
          </p>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="hiw-reveal"
              onMouseEnter={() => setActiveStep(i)}
              onMouseLeave={() => setActiveStep(0)}
              style={{
                background: activeStep === i ? "var(--off-white)" : "var(--ivory-subtle)",
                border: `1px solid ${activeStep === i ? "var(--stone-light)" : "var(--stone-faint)"}`,
                borderRadius: "var(--radius-lg)",
                padding: "2rem",
                transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                boxShadow: activeStep === i ? "var(--shadow-md)" : "var(--shadow-sm)",
                transform: activeStep === i ? "translateY(-3px)" : "none",
                cursor: "default",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Step number watermark */}
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1.25rem",
                  fontFamily: "var(--font-serif)",
                  fontSize: "3.5rem",
                  fontWeight: 700,
                  color: "var(--stone-faint)",
                  lineHeight: 1,
                  userSelect: "none",
                }}
              >
                {step.number}
              </span>

              {/* Icon */}
              <div style={{ marginBottom: "1.5rem" }}>{step.icon}</div>

              {/* Number label */}
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.7rem", fontWeight: 700, color: "var(--burgundy)", letterSpacing: "0.12em", textTransform: "uppercase", display: "block", marginBottom: "0.625rem" }}>
                {step.number}.
              </span>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  color: "var(--charcoal)",
                  marginBottom: "0.75rem",
                  lineHeight: 1.25,
                }}
              >
                {step.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.875rem",
                  color: "var(--stone)",
                  lineHeight: 1.65,
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
