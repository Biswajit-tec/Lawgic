"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RulerWrapper } from "@/components/motion/RulerWrapper";

gsap.registerPlugin(ScrollTrigger);

export function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".problem-reveal").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: i * 0.1,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
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
      aria-labelledby="problem-heading"
      style={{
        background: "var(--ivory-deep)",
        padding: "var(--space-section) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle top divider */}
      <hr className="divider-warm" style={{ marginBottom: "var(--space-section)" }} />

      <RulerWrapper>
        <div className="container-lawgic">
          {/* Section label */}
          <div className="problem-reveal" style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="section-badge">The Challenge</span>
          </div>

          {/* Main headline */}
          <div className="problem-reveal" style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <h2
              id="problem-heading"
              className="text-h2"
              style={{ maxWidth: "640px", margin: "0 auto" }}
            >
              Legal documents are{" "}
              <em style={{ color: "var(--burgundy)", fontStyle: "italic" }}>
                written for lawyers,
              </em>{" "}
              not for people.
            </h2>
          </div>

          {/* Supporting copy */}
          <div className="problem-reveal" style={{ textAlign: "center", marginBottom: "5rem" }}>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-body-lg)",
                color: "var(--stone)",
                lineHeight: 1.7,
                maxWidth: "560px",
                margin: "0 auto",
              }}
            >
              Millions of Indians receive legal notices, court orders, and
              government documents every year — but cannot understand what they
              mean, what they require, or what to do next.
            </p>
          </div>

          {/* Document example */}
          <div
            className="problem-reveal"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto 1fr",
              alignItems: "center",
              gap: "clamp(1.5rem, 4vw, 4rem)",
              maxWidth: "900px",
              margin: "0 auto",
            }}
          >
            {/* Before: complex legal text */}
            <div
              style={{
                background: "var(--white)",
                border: "1px solid var(--stone-faint)",
                borderRadius: "var(--radius-lg)",
                padding: "1.75rem",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "1rem",
                  paddingBottom: "0.75rem",
                  borderBottom: "1px solid var(--stone-faint)",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <rect x="2" y="1" width="12" height="14" rx="2" stroke="var(--stone)" strokeWidth="1.2"/>
                  <path d="M5 5h6M5 7.5h6M5 10h4" stroke="var(--stone)" strokeWidth="1" strokeLinecap="round"/>
                </svg>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.7rem", fontWeight: 600, color: "var(--stone)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Original Notice
                </span>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "0.75rem",
                  color: "var(--stone)",
                  lineHeight: 1.8,
                }}
              >
                <span style={{ color: "var(--charcoal-mid)", fontWeight: 500 }}>WHEREAS</span> the
                party of the first part has, by virtue of the covenants and
                conditions hereinafter contained, been served with notice
                pursuant to Section 138 of the Negotiable Instruments Act, 1881
                for dishonour of cheque bearing No.{" "}
                <span style={{ background: "rgba(184,147,90,0.2)", padding: "0 3px" }}>
                  2847361
                </span>{" "}
                drawn on <span style={{ background: "rgba(184,147,90,0.2)", padding: "0 3px" }}>HDFC Bank</span>...
              </p>
            </div>

            {/* Arrow */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: "var(--burgundy)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M4 9h10M10 5l4 4-4 4" stroke="var(--ivory)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.65rem", color: "var(--stone)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Lawgic
              </span>
            </div>

            {/* After: plain language */}
            <div
              style={{
                background: "var(--burgundy-faint)",
                border: "1px solid rgba(110,31,31,0.12)",
                borderRadius: "var(--radius-lg)",
                padding: "1.75rem",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "1rem",
                  paddingBottom: "0.75rem",
                  borderBottom: "1px solid rgba(110,31,31,0.1)",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <circle cx="8" cy="8" r="6.5" stroke="var(--burgundy)" strokeWidth="1.2"/>
                  <path d="M5.5 8l2 2L11 6" stroke="var(--burgundy)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.7rem", fontWeight: 600, color: "var(--burgundy)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Plain Explanation
                </span>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.875rem",
                  color: "var(--charcoal)",
                  lineHeight: 1.7,
                }}
              >
                You have received a{" "}
                <strong>cheque dishonour notice</strong> under the Negotiable Instruments Act. A cheque you issued for{" "}
                <strong>₹___ to ____</strong> was returned by your bank unpaid.
                You have <strong>15 days</strong> to respond or pay.
              </p>
            </div>
          </div>
        </div>
      </RulerWrapper>

      <hr className="divider-warm" style={{ marginTop: "var(--space-section)" }} />
    </section>
  );
}
