"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function MissionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".mission-reveal").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            delay: i * 0.15,
            scrollTrigger: {
              trigger: el,
              start: "top 82%",
              once: true,
            },
          }
        );
      });

      // Subtle parallax on the background pattern
      if (sectionRef.current) {
        gsap.to(".mission-bg-pattern", {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="mission"
      aria-labelledby="mission-heading"
      style={{
        background: "var(--burgundy-deep)",
        padding: "var(--space-section) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decorative element */}
      <div
        className="mission-bg-pattern"
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(184,147,90,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-20%",
          left: "-5%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(244,239,228,0.03) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        className="container-lawgic"
        style={{ position: "relative", zIndex: 1 }}
      >
        {/* Editorial centered layout */}
        <div style={{ maxWidth: "780px", margin: "0 auto", textAlign: "center" }}>
          <div className="mission-reveal" style={{ marginBottom: "2rem" }}>
            <span className="section-badge section-badge-dark">Our Mission</span>
          </div>

          {/* Large serif quote */}
          <blockquote
            className="mission-reveal"
            cite="https://lawgic.in/mission"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.75rem, 4vw, 3rem)",
              fontWeight: 500,
              fontStyle: "italic",
              color: "var(--ivory)",
              lineHeight: 1.3,
              letterSpacing: "-0.01em",
              marginBottom: "2rem",
              padding: 0,
              border: "none",
            }}
          >
            &ldquo;Understanding your rights should not depend on
            understanding legal jargon.&rdquo;
          </blockquote>

          <div className="mission-reveal" style={{ marginBottom: "3rem" }}>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-body-lg)",
                color: "rgba(244,239,228,0.6)",
                lineHeight: 1.7,
                maxWidth: "560px",
                margin: "0 auto",
              }}
            >
              The Indian legal system is powerful and robust — but most citizens
              cannot navigate it without help. Lawgic exists to bridge that gap
              with technology that is transparent, responsible, and genuinely
              useful.
            </p>
          </div>

          {/* Divider */}
          <div
            className="mission-reveal"
            aria-hidden="true"
            style={{
              height: "1px",
              background: "linear-gradient(to right, transparent, rgba(255,255,255,0.12) 20%, rgba(255,255,255,0.12) 80%, transparent)",
              marginBottom: "3rem",
            }}
          />

          {/* Three values */}
          <div
            className="mission-reveal"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "2rem",
              textAlign: "center",
            }}
          >
            {[
              { word: "Accessible", description: "Legal knowledge for everyone, not just those who can afford it" },
              { word: "Trustworthy", description: "Grounded in fact, honest about limitations, responsible with data" },
              { word: "Human", description: "Built for real people navigating real situations" },
            ].map((v) => (
              <div key={v.word}>
                <div
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    color: "var(--brass-light)",
                    marginBottom: "0.625rem",
                  }}
                >
                  {v.word}
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.8125rem",
                    color: "rgba(244,239,228,0.45)",
                    lineHeight: 1.6,
                  }}
                >
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
