"use client";

import { useEffect, useRef } from "react";

interface RulerWrapperProps {
  children: React.ReactNode;
  className?: string;
  tickCount?: number;
}

export function RulerWrapper({ children, className = "", tickCount = 20 }: RulerWrapperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const ticks = Array.from({ length: tickCount }, (_, i) => i);

  return (
    <div ref={wrapperRef} className={`ruler-wrapper ${className}`} style={{ position: "relative" }}>
      {/* Left ruler */}
      <div className="ruler-line ruler-left" aria-hidden="true">
        {ticks.map((i) => (
          <div
            key={`l-${i}`}
            style={{
              position: "absolute",
              top: `${(i / (tickCount - 1)) * 100}%`,
              left: "0",
              width: i % 5 === 0 ? "8px" : "4px",
              height: "1px",
              background: "var(--stone-faint)",
            }}
          />
        ))}
      </div>
      {/* Right ruler */}
      <div className="ruler-line ruler-right" aria-hidden="true">
        {ticks.map((i) => (
          <div
            key={`r-${i}`}
            style={{
              position: "absolute",
              top: `${(i / (tickCount - 1)) * 100}%`,
              right: "0",
              width: i % 5 === 0 ? "8px" : "4px",
              height: "1px",
              background: "var(--stone-faint)",
            }}
          />
        ))}
      </div>
      {children}
    </div>
  );
}
