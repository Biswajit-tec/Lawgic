"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  onAnimationComplete?: () => void;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  style?: React.CSSProperties;
}

export function BlurText({
  text,
  delay = 50,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  as: Component = "p",
  style = {},
  onAnimationComplete,
}: BlurTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  const elements = animateBy === "words" ? text.split(" ") : text.split("");

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  useEffect(() => {
    if (!inView || !containerRef.current) return;

    const spans = containerRef.current.querySelectorAll(".blur-item");
    const yOffset = direction === "top" ? -24 : 24;

    gsap.fromTo(
      spans,
      {
        opacity: 0,
        filter: "blur(12px)",
        y: yOffset,
      },
      {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        duration: 0.9,
        stagger: delay / 1000,
        ease: "power3.out",
        onComplete: onAnimationComplete,
      }
    );
  }, [inView, delay, direction, onAnimationComplete]);

  return (
    <Component
      ref={containerRef as any}
      className={`blur-text-container ${className}`}
      style={{ display: "inline-block", ...style }}
    >
      {elements.map((element, index) => (
        <span
          key={index}
          className="blur-item"
          style={{
            display: "inline-block",
            willChange: "transform, filter, opacity",
            opacity: inView ? undefined : 0,
          }}
        >
          {element}
          {animateBy === "words" && index < elements.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </Component>
  );
}
