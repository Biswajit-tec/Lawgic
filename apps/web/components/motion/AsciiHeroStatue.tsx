"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface AsciiParticle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  char: string;
  size: number;
  alpha: number;
  targetAlpha: number;
  color: string;
  delay: number;
}

// Legal & classical ASCII character spectrum from high density to low
const LEGAL_ASCII_CHARS = ["⚖", "§", "¶", "W", "#", "%", "B", "@", "*", "+", "=", "-", ":", "·"];

export function AsciiHeroStatue({
  className = "",
  onRevealComplete,
}: {
  className?: string;
  onRevealComplete?: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageVisible, setImageVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });

  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) {
      setReducedMotion(true);
      setImageVisible(true);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isDestroyed = false;

    // Load transparent statue image onto an offscreen canvas to sample particle coordinates
    const img = new window.Image();
    img.src = "/lady-justice-transparent.png";
    img.crossOrigin = "anonymous";

    img.onload = () => {
      if (isDestroyed) return;
      setImageLoaded(true);

      const width = canvas.clientWidth || 440;
      const height = canvas.clientHeight || 620;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      // Create offscreen sampling canvas
      const sampleWidth = Math.floor(width / 7.5);
      const sampleHeight = Math.floor(height / 7.5);
      const sampleCanvas = document.createElement("canvas");
      sampleCanvas.width = sampleWidth;
      sampleCanvas.height = sampleHeight;
      const sampleCtx = sampleCanvas.getContext("2d");
      if (!sampleCtx) return;

      sampleCtx.drawImage(img, 0, 0, sampleWidth, sampleHeight);
      const imgData = sampleCtx.getImageData(0, 0, sampleWidth, sampleHeight).data;

      const particles: AsciiParticle[] = [];

      for (let y = 0; y < sampleHeight; y++) {
        for (let x = 0; x < sampleWidth; x++) {
          const idx = (y * sampleWidth + x) * 4;
          const r = imgData[idx];
          const g = imgData[idx + 1];
          const b = imgData[idx + 2];
          const a = imgData[idx + 3];

          // Sample pixels belonging to the statue
          if (a > 35 && (r > 30 || g > 30 || b > 30)) {
            // Brightness calculation
            const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
            const charIdx = Math.floor((1 - brightness) * (LEGAL_ASCII_CHARS.length - 1));
            const char = LEGAL_ASCII_CHARS[Math.max(0, Math.min(LEGAL_ASCII_CHARS.length - 1, charIdx))];

            const targetX = (x / sampleWidth) * width;
            const targetY = (y / sampleHeight) * height;

            // Disperse initial positions around the center
            const angle = Math.random() * Math.PI * 2;
            const dist = 180 + Math.random() * 260;
            const startX = targetX + Math.cos(angle) * dist;
            const startY = targetY + Math.sin(angle) * dist;

            // Subtle color tint based on brightness
            const isHighlight = brightness > 0.65;
            const color = isHighlight ? "#B8935A" : brightness > 0.4 ? "#6E1F1F" : "#7A6E60";

            particles.push({
              x: startX,
              y: startY,
              targetX,
              targetY,
              vx: (Math.random() - 0.5) * 2,
              vy: (Math.random() - 0.5) * 2,
              char,
              size: 8 + brightness * 4.5,
              alpha: 0,
              targetAlpha: Math.min(0.9, a / 255 * (0.4 + brightness * 0.6)),
              color,
              delay: Math.random() * 25,
            });
          }
        }
      }

      let frameCount = 0;
      const startTime = performance.now();

      const render = (currentTime: number) => {
        if (isDestroyed) return;
        frameCount++;
        const elapsed = currentTime - startTime;

        ctx.clearRect(0, 0, width, height);

        const mouse = mouseRef.current;
        let allConverged = true;

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          if (frameCount < p.delay) continue;

          // Convergence step towards target
          const dx = p.targetX - p.x;
          const dy = p.targetY - p.y;
          const distToTarget = Math.sqrt(dx * dx + dy * dy);

          if (distToTarget > 1.5) {
            allConverged = false;
            p.x += dx * 0.085;
            p.y += dy * 0.085;
          } else {
            p.x = p.targetX;
            p.y = p.targetY;
          }

          // Fade alpha in
          if (p.alpha < p.targetAlpha) {
            p.alpha += 0.035;
          }

          // Mouse repulsion interaction
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          let drawX = p.x;
          let drawY = p.y;

          if (mdist < 70 && mdist > 0) {
            const force = (70 - mdist) / 70;
            drawX += (mdx / mdist) * force * 15;
            drawY += (mdy / mdist) * force * 15;
          }

          ctx.font = `600 ${p.size}px monospace, var(--font-sans)`;
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.fillText(p.char, drawX, drawY);
        }

        ctx.globalAlpha = 1;

        // At 1.8s, trigger the smooth photo cross-fade
        if (elapsed > 1800 && !imageVisible) {
          setImageVisible(true);
          if (onRevealComplete) onRevealComplete();
        }

        // Keep ambient particles moving subtly even after reveal
        animationFrameId = requestAnimationFrame(render);
      };

      animationFrameId = requestAnimationFrame(render);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      isDestroyed = true;
      cancelAnimationFrame(animationFrameId);
      if (canvas) {
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [onRevealComplete, imageVisible]);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{
        width: "100%",
        maxWidth: "460px",
      }}
    >
      {/* Dynamic Backlight Halo */}
      <div
        className="absolute inset-0 m-auto w-[360px] h-[480px] rounded-full pointer-events-none transition-opacity duration-1000"
        style={{
          background:
            "radial-gradient(circle, rgba(184, 147, 90, 0.22) 0%, rgba(110, 31, 31, 0.08) 45%, transparent 70%)",
          filter: "blur(50px)",
          opacity: imageVisible ? 0.9 : 0.4,
        }}
        aria-hidden="true"
      />

      {/* ASCII Particle Canvas */}
      {!reducedMotion && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-auto z-10 transition-opacity duration-1000"
          style={{
            opacity: imageVisible ? 0.35 : 1,
            filter: imageVisible ? "blur(0.5px)" : "none",
          }}
          aria-hidden="true"
        />
      )}

      {/* High-Resolution Transparent Lady Justice Sculpture */}
      <div
        className="relative w-full h-full z-20 pointer-events-none transition-all duration-1000 ease-out"
        style={{
          opacity: imageVisible ? 1 : 0,
          transform: imageVisible ? "scale(1) translateY(0)" : "scale(0.97) translateY(8px)",
          filter: imageVisible ? "drop-shadow(0 20px 40px rgba(0,0,0,0.18))" : "none",
        }}
      >
        <Image
          src="/lady-justice-transparent.png"
          alt="Lady Justice classical marble statue at the center of Lawgic"
          fill
          priority
          sizes="(max-width: 768px) 300px, 460px"
          className="object-contain object-bottom pointer-events-none"
        />
      </div>
    </div>
  );
}
