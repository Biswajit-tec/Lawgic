"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Magnet } from "@/components/motion/Magnet";

const navLinks = [
  { href: "#what-we-do", label: "What We Do" },
  { href: "#process", label: "Our Process" },
  { href: "#difference", label: "The Difference" },
  { href: "#languages", label: "Languages" },
  { href: "#trust", label: "Trust & Sources" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Trap focus / close on Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out"
        style={{
          background: scrolled
            ? "rgba(244, 239, 228, 0.94)"
            : "rgba(244, 239, 228, 0.4)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: scrolled
            ? "1px solid rgba(122, 110, 96, 0.15)"
            : "1px solid transparent",
          boxShadow: scrolled ? "0 4px 20px rgba(28, 25, 23, 0.04)" : "none",
        }}
        role="banner"
      >
        <div className="container-lawgic">
          <nav
            aria-label="Main navigation"
            className="flex items-center justify-between h-[72px]"
          >
            {/* Wordmark Logo */}
            <Link
              href="/"
              aria-label="Lawgic — Home"
              className="flex items-center gap-2.5 no-underline group"
            >
              <div className="w-8 h-8 rounded-full bg-[var(--burgundy-faint)] border border-[rgba(110,31,31,0.2)] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                {/* Scales / Feather emblem */}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--burgundy)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
                  <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
                  <path d="M7 21h10" />
                  <path d="M12 3v18" />
                  <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
                </svg>
              </div>

              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.45rem",
                  fontWeight: 600,
                  color: "var(--charcoal)",
                  letterSpacing: "-0.015em",
                  lineHeight: 1,
                }}
              >
                Lawgic
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <ul
              role="list"
              className="hidden md:flex items-center gap-7 list-none m-0 p-0"
            >
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-sans text-[13.5px] font-medium text-[var(--charcoal-mid)] hover:text-[var(--burgundy)] transition-colors duration-200 relative py-1"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="#signin"
                className="font-sans text-[13.5px] font-medium text-[var(--stone)] hover:text-[var(--charcoal)] transition-colors duration-200"
              >
                Sign in
              </a>

              <Magnet magnetStrength={0.25} padding={25}>
                <a
                  href="#get-started"
                  className="inline-flex items-center justify-center gap-2 font-sans font-semibold text-xs tracking-wide uppercase px-5 py-2.5 rounded-full text-[var(--ivory)] bg-[var(--burgundy)] hover:bg-[var(--burgundy-deep)] transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.02]"
                  style={{
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                  }}
                >
                  <span>Decode Notice</span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </a>
              </Magnet>
            </div>

            {/* Mobile hamburger - strictly hidden on md+ */}
            <button
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen((v) => !v)}
              className="flex md:hidden flex-col justify-center gap-1.5 p-2 bg-transparent border-0 cursor-pointer rounded"
            >
              <span
                className="block w-6 h-[1.5px] bg-[var(--charcoal)] transition-all duration-300"
                style={{
                  transform: mobileOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
                }}
              />
              <span
                className="block w-6 h-[1.5px] bg-[var(--charcoal)] transition-all duration-300"
                style={{
                  opacity: mobileOpen ? 0 : 1,
                }}
              />
              <span
                className="block w-6 h-[1.5px] bg-[var(--charcoal)] transition-all duration-300"
                style={{
                  transform: mobileOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
                }}
              />
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-label="Mobile navigation"
        aria-modal="true"
        className="fixed inset-0 z-50 transition-opacity duration-300 md:hidden"
        style={{
          pointerEvents: mobileOpen ? "auto" : "none",
          opacity: mobileOpen ? 1 : 0,
        }}
      >
        {/* Backdrop */}
        <div
          aria-hidden="true"
          onClick={() => setMobileOpen(false)}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        />

        {/* Drawer Body */}
        <div
          className="absolute top-0 right-0 bottom-0 w-[85vw] max-w-[340px] bg-[var(--ivory)] flex flex-col p-8 pt-24 shadow-2xl transition-transform duration-400 ease-out"
          style={{
            transform: mobileOpen ? "translateX(0)" : "translateX(100%)",
          }}
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-serif text-xl font-medium text-[var(--charcoal)] py-2 border-b border-[var(--stone-faint)]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <a
              href="#signin"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center py-2.5 rounded-lg border border-[var(--stone-faint)] text-sm font-semibold text-[var(--charcoal)]"
            >
              Sign in
            </a>
            <a
              href="#get-started"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center py-2.5 rounded-lg bg-[var(--burgundy)] text-[var(--ivory)] text-sm font-semibold shadow"
            >
              Decode Notice
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
