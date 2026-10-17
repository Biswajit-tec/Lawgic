"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

export function DynamicHeroStatue({
  className = "",
}: {
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Smooth cinematic entrance on mount
    const timer = setTimeout(() => {
      setMounted(true);
    }, 120);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);
    // Subtle tactile parallax
    setOffset({
      x: Math.max(-1, Math.min(1, deltaX)) * 8,
      y: Math.max(-1, Math.min(1, deltaY)) * 6,
    });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative flex items-end justify-center select-none ${className}`}
      style={{
        width: "100%",
        maxWidth: "720px",
      }}
    >
      {/* Delicate Backlight Ambient Halo */}
      <div
        className="absolute inset-0 m-auto w-[420px] sm:w-[520px] h-[520px] sm:h-[620px] rounded-full pointer-events-none transition-opacity duration-1000"
        style={{
          background:
            "radial-gradient(circle, rgba(184, 147, 90, 0.25) 0%, rgba(232, 226, 212, 0.15) 45%, transparent 70%)",
          filter: "blur(60px)",
          opacity: mounted ? 0.95 : 0,
        }}
        aria-hidden="true"
      />

      {/* Main Dynamic Lady Justice Sculpture with Silk Smooth Reveal */}
      <div
        className="relative w-full h-full pointer-events-none transition-all duration-1000 ease-out"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted
            ? `scale(1) translate3d(${offset.x}px, ${offset.y}px, 0)`
            : "scale(0.95) translate3d(0, 24px, 0)",
          filter: mounted
            ? "blur(0px) drop-shadow(0 25px 45px rgba(0,0,0,0.12))"
            : "blur(14px)",
          transitionProperty: "opacity, transform, filter",
          transitionDuration: mounted ? "400ms" : "1100ms",
        }}
      >
        <Image
          src="/hero-lady-justice-dynamic.png"
          alt="Dynamic classical marble sculpture of Lady Justice stepping forward with scales and sword"
          fill
          priority
          sizes="(max-width: 768px) 90vw, (max-width: 1200px) 680px, 740px"
          className="object-contain object-bottom pointer-events-none"
        />
      </div>
    </div>
  );
}
