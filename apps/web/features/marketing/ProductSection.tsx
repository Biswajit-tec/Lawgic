"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    id: "decoder",
    tag: "Core Feature",
    title: "Legal Document Decoder",
    description:
      "Upload any legal document — court notice, rental agreement, government order — and receive a structured, plain-language explanation of what it means, what it requires, and what you can do.",
    features: ["Identifies document type and parties", "Highlights key dates and deadlines", "Explains legal obligations clearly", "Links to source legal provisions"],
    status: "available" as const,
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <rect x="6" y="4" width="28" height="32" rx="4" fill="var(--burgundy-faint)" stroke="var(--burgundy)" strokeWidth="1.5"/>
        <path d="M12 12h16M12 17h16M12 22h10" stroke="var(--burgundy)" strokeWidth="1.4" strokeLinecap="round"/>
        <circle cx="29" cy="28" r="7" fill="var(--ivory)" stroke="var(--burgundy)" strokeWidth="1.3"/>
        <path d="M26.5 28l2 2 3-3" stroke="var(--burgundy)" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "assistant",
    tag: "Coming Soon",
    title: "Legal Knowledge Assistant",
    description:
      "Ask questions about your legal situation in plain language. Lawgic searches grounded legal sources and explains the applicable law — without replacing a qualified lawyer.",
    features: ["Natural language questions", "Grounded in actual law", "Clear source citations", "Available in multiple languages"],
    status: "coming-soon" as const,
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <circle cx="20" cy="20" r="14" fill="var(--burgundy-faint)" stroke="var(--burgundy)" strokeWidth="1.5"/>
        <path d="M15 18c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.21-1.43 4.09-3.43 4.74L21 25h-2l-.57-2.26C16.43 22.09 15 20.21 15 18z" stroke="var(--burgundy)" strokeWidth="1.3" strokeLinecap="round"/>
        <circle cx="20" cy="29" r="1" fill="var(--burgundy)"/>
      </svg>
    ),
  },
  {
    id: "tracker",
    tag: "Coming Soon",
    title: "Case Status Tracker",
    description:
      "Understand the current status of a court case and what different stages in the process actually mean for you — in language that makes sense.",
    features: ["Case status in plain language", "Stage-by-stage explanation", "What each stage means for you", "Upcoming steps guidance"],
    status: "coming-soon" as const,
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <rect x="6" y="8" width="28" height="28" rx="4" fill="var(--burgundy-faint)" stroke="var(--burgundy)" strokeWidth="1.5"/>
        <path d="M6 16h28" stroke="var(--burgundy)" strokeWidth="1.2"/>
        <path d="M14 6v4M26 6v4" stroke="var(--burgundy)" strokeWidth="1.3" strokeLinecap="round"/>
        <circle cx="14" cy="24" r="2" fill="var(--burgundy)" opacity="0.6"/>
        <circle cx="20" cy="24" r="2" fill="var(--burgundy)" opacity="0.3"/>
        <circle cx="26" cy="24" r="2" fill="var(--burgundy)" opacity="0.15"/>
      </svg>
    ),
  },
];

export function ProductSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".product-reveal").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            delay: i * 0.12,
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
      id="product"
      aria-labelledby="product-heading"
      style={{
        background: "var(--ivory-deep)",
        padding: "var(--space-section) 0",
      }}
    >
      <div className="container-lawgic">
        {/* Header */}
        <div className="product-reveal" style={{ marginBottom: "1rem" }}>
          <span className="section-badge">Product Capabilities</span>
        </div>
        <div
          className="product-reveal"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(1.5rem, 4vw, 4rem)",
            alignItems: "end",
            marginBottom: "4rem",
          }}
        >
          <h2 id="product-heading" className="text-h2" style={{ maxWidth: "440px" }}>
            Legal clarity,{" "}
            <em style={{ fontStyle: "italic", color: "var(--burgundy)" }}>
              built around you.
            </em>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-body-lg)",
              color: "var(--stone)",
              lineHeight: 1.65,
              maxWidth: "400px",
            }}
          >
            Lawgic is built for individuals navigating the legal system — not
            for legal professionals. Everything is designed for accessibility
            and understanding.
          </p>
        </div>

        {/* Capability cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {capabilities.map((cap, i) => (
            <article
              key={cap.id}
              id={`capability-${cap.id}`}
              className="product-reveal"
              style={{
                background: i === 0 ? "var(--burgundy)" : "var(--ivory-subtle)",
                border: `1px solid ${i === 0 ? "transparent" : "var(--stone-faint)"}`,
                borderRadius: "var(--radius-xl)",
                padding: "2.5rem",
                boxShadow: i === 0 ? "var(--shadow-lg)" : "var(--shadow-sm)",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
                transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLElement).style.boxShadow = i === 0 ? "0 24px 60px rgba(28,25,23,0.18)" : "var(--shadow-md)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = i === 0 ? "var(--shadow-lg)" : "var(--shadow-sm)";
              }}
            >
              {/* Tag */}
              <span
                style={{
                  display: "inline-block",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: i === 0 ? "rgba(244,239,228,0.7)" : "var(--burgundy)",
                  padding: "0.25rem 0.625rem",
                  background: i === 0 ? "rgba(255,255,255,0.1)" : "var(--burgundy-faint)",
                  borderRadius: "var(--radius-pill)",
                  border: i === 0 ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(110,31,31,0.12)",
                  alignSelf: "flex-start",
                }}
              >
                {cap.tag}
              </span>

              {/* Icon */}
              <div
                style={{
                  filter: i === 0 ? "brightness(10)" : "none",
                }}
              >
                {cap.icon}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  color: i === 0 ? "var(--ivory)" : "var(--charcoal)",
                  lineHeight: 1.2,
                }}
              >
                {cap.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.875rem",
                  color: i === 0 ? "rgba(244,239,228,0.75)" : "var(--stone)",
                  lineHeight: 1.7,
                }}
              >
                {cap.description}
              </p>

              {/* Feature list */}
              <ul
                role="list"
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  marginTop: "0.25rem",
                }}
              >
                {cap.features.map((f) => (
                  <li
                    key={f}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.625rem",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.8125rem",
                      color: i === 0 ? "rgba(244,239,228,0.7)" : "var(--stone)",
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
                      <circle cx="7" cy="7" r="6.5" stroke={i === 0 ? "rgba(244,239,228,0.4)" : "var(--stone-faint)"} strokeWidth="1"/>
                      <path d="M4.5 7l2 2 3-3" stroke={i === 0 ? "rgba(244,239,228,0.9)" : "var(--burgundy)"} strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
