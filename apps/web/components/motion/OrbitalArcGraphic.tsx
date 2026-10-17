"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { id: "notices", label: "Court Summons", angle: -45, icon: "⚖️" },
  { id: "agreements", label: "Rental Agreements", angle: -20, icon: "📜" },
  { id: "banking", label: "Banking & Loan Contracts", angle: 0, icon: "🏦", primary: true },
  { id: "consumer", label: "Consumer Disputes", angle: 20, icon: "🛡️" },
  { id: "employment", label: "Labor & Service Notices", angle: 45, icon: "💼" },
];

// Precompute static geometry for the arc nodes
const precomputedNodes = categories.map((cat) => {
  const rad = ((cat.angle - 90) * Math.PI) / 180;
  return {
    ...cat,
    cx: Math.round((400 + 380 * Math.cos(rad)) * 100) / 100,
    cy: Math.round((380 + 380 * Math.sin(rad)) * 100) / 100,
  };
});

export function OrbitalArcGraphic() {
  const containerRef = useRef<HTMLDivElement>(null);
  const arcRef = useRef<SVGSVGElement>(null);
  const [activeCategory, setActiveCategory] = useState("banking");

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        arcRef.current,
        { rotate: -8 },
        {
          rotate: 8,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-4xl mx-auto pt-8 pb-4 flex flex-col items-center justify-center overflow-hidden select-none"
    >
      <div className="relative w-full h-[220px] md:h-[260px] flex items-center justify-center">
        <svg
          ref={arcRef}
          viewBox="0 0 800 400"
          className="w-full h-full max-w-[800px] overflow-visible origin-bottom"
          fill="none"
        >
          {/* Main arched orbital curve */}
          <path
            d="M 50 380 A 380 380 0 0 1 750 380"
            stroke="rgba(244, 239, 228, 0.18)"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />

          {/* Inner subtle glow curve */}
          <path
            d="M 120 380 A 320 320 0 0 1 680 380"
            stroke="rgba(184, 147, 90, 0.12)"
            strokeWidth="1"
          />

          {/* Interactive Nodes along the arc */}
          {precomputedNodes.map((node) => {
            const isSelected = activeCategory === node.id;

            return (
              <g
                key={node.id}
                className="cursor-pointer transition-all duration-300"
                onClick={() => setActiveCategory(node.id)}
              >
                {isSelected && (
                  <circle
                    cx={node.cx}
                    cy={node.cy}
                    r="24"
                    fill="rgba(184, 147, 90, 0.15)"
                    className="animate-ping"
                  />
                )}
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r={isSelected ? "14" : "10"}
                  fill={isSelected ? "var(--brass-light)" : "rgba(244, 239, 228, 0.15)"}
                  stroke={isSelected ? "var(--ivory)" : "rgba(255, 255, 255, 0.3)"}
                  strokeWidth="2"
                />
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r="3.5"
                  fill={isSelected ? "var(--burgundy-deep)" : "var(--ivory)"}
                />
              </g>
            );
          })}
        </svg>

        {/* Floating Category Pills below the arc nodes */}
        <div className="absolute inset-x-0 bottom-4 flex flex-wrap items-center justify-center gap-2 md:gap-4 z-10 px-4">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="px-3.5 py-1.5 rounded-full text-xs font-sans tracking-wide transition-all duration-300 flex items-center gap-1.5"
                style={{
                  backgroundColor: isSelected
                    ? "rgba(255, 255, 255, 0.18)"
                    : "rgba(255, 255, 255, 0.06)",
                  borderColor: isSelected
                    ? "var(--brass-light)"
                    : "rgba(255, 255, 255, 0.12)",
                  borderWidth: "1px",
                  color: isSelected ? "var(--ivory)" : "rgba(244, 239, 228, 0.6)",
                  transform: isSelected ? "translateY(-2px)" : "translateY(0)",
                  boxShadow: isSelected ? "0 4px 16px rgba(0,0,0,0.3)" : "none",
                }}
              >
                <span>{cat.icon}</span>
                <span className="font-medium">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
