"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const principles = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M14 3L4 8v7c0 5.25 4.25 10.15 10 11.35C19.75 25.15 24 20.25 24 15V8L14 3z" stroke="var(--brass)" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M9 14l3 3 7-7" stroke="var(--brass)" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Source-grounded explanations",
    description:
      "Every explanation traces back to the actual law, section, or legal provision. We show you where our explanation comes from.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="14" r="10.5" stroke="var(--brass)" strokeWidth="1.5"/>
        <path d="M14 8v6l4 2" stroke="var(--brass)" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Honest about uncertainty",
    description:
      "When a situation is ambiguous or requires professional legal advice, Lawgic says so — clearly and without hedging.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="4" y="4" width="20" height="20" rx="4" stroke="var(--brass)" strokeWidth="1.5"/>
        <path d="M9 14l3 3 7-7" stroke="var(--brass)" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Facts, not interpretations",
    description:
      "Lawgic distinguishes between what the law says and what it might mean for your specific situation — a distinction that matters.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M14 4c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10S19.52 4 14 4z" stroke="var(--brass)" strokeWidth="1.5"/>
        <path d="M14 9v5l3.5 3.5" stroke="var(--brass)" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="14" cy="19" r="1" fill="var(--brass)"/>
      </svg>
    ),
    title: "Private by design",
    description:
      "Documents you upload are processed securely and not used to train AI models without your explicit consent.",
  },
];

export function TrustSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".trust-reveal").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            delay: i * 0.1,
            scrollTrigger: {
              trigger: el,
              start: "top 86%",
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
      aria-labelledby="trust-heading"
      style={{
        background: "var(--ivory)",
        padding: "var(--space-section) 0",
      }}
    >
      <div className="container-lawgic">
        {/* Two-column layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(3rem, 8vw, 8rem)",
            alignItems: "start",
          }}
        >
          {/* Left: editorial headline */}
          <div>
            <div className="trust-reveal" style={{ marginBottom: "1.25rem" }}>
              <span className="text-xs font-sans font-semibold tracking-[0.2em] uppercase text-[var(--burgundy)]">
                06 / Trust &amp; Accuracy
              </span>
            </div>
            <div className="trust-reveal" style={{ marginBottom: "1.5rem" }}>
              <h2
                id="trust-heading"
                className="text-h2"
                style={{ maxWidth: "400px" }}
              >
                Built on what{" "}
                <em style={{ fontStyle: "italic", color: "var(--burgundy)" }}>
                  the law actually says.
                </em>
              </h2>
            </div>
            <div className="trust-reveal" style={{ marginBottom: "2.5rem" }}>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "var(--text-body-lg)",
                  color: "var(--stone)",
                  lineHeight: 1.7,
                  maxWidth: "380px",
                }}
              >
                Lawgic does not invent legal interpretations. Every explanation
                is grounded in actual law, and every claim can be traced to its
                source. Trust is earned through transparency.
              </p>
            </div>

            {/* Source chain illustration */}
            <div className="trust-reveal">
              <div
                style={{
                  background: "var(--ivory-subtle)",
                  border: "1px solid var(--stone-faint)",
                  borderRadius: "var(--radius-lg)",
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.7rem", fontWeight: 600, color: "var(--stone)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  How an explanation is built
                </span>
                {[
                  { step: "Your document", color: "var(--stone-faint)", text: "Uploaded by you" },
                  { step: "Legal provision", color: "var(--burgundy-faint)", text: "IPC § 138, CPC Rule 4..." },
                  { step: "Plain explanation", color: "rgba(110,31,31,0.12)", text: "What it means for you" },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: i === 2 ? "var(--burgundy)" : "var(--stone-light)",
                        flexShrink: 0,
                      }}
                    />
                    <div
                      style={{
                        flex: 1,
                        background: item.color,
                        border: "1px solid var(--stone-faint)",
                        borderRadius: "var(--radius-sm)",
                        padding: "0.5rem 0.75rem",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", fontWeight: 600, color: "var(--charcoal-mid)" }}>{item.step}</span>
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.7rem", color: "var(--stone)" }}>{item.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: principles */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              paddingTop: "3.5rem",
            }}
          >
            {principles.map((p, i) => (
              <div
                key={p.title}
                className="trust-reveal"
                style={{
                  display: "flex",
                  gap: "1.25rem",
                  padding: "1.5rem",
                  background: "var(--ivory-subtle)",
                  border: "1px solid var(--stone-faint)",
                  borderRadius: "var(--radius-lg)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--brass-light)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-sm)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--stone-faint)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <div style={{ flexShrink: 0, marginTop: "0.125rem" }}>{p.icon}</div>
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.0625rem",
                      fontWeight: 600,
                      color: "var(--charcoal)",
                      marginBottom: "0.375rem",
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.875rem",
                      color: "var(--stone)",
                      lineHeight: 1.65,
                    }}
                  >
                    {p.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
