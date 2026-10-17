"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ThemeSelector } from "./ThemeSelector";
import { Magnet } from "@/components/motion/Magnet";

const navLinks = [
  { href: "#what-we-do", label: "What We Do" },
  { href: "#process", label: "Process" },
  { href: "#difference", label: "The Difference" },
  { href: "#languages", label: "Languages" },
  { href: "#trust", label: "Trust & Sources" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [isOverDark, setIsOverDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);

      // Dynamic color detection when header passes over dark sections (like burgundy)
      const darkSections = document.querySelectorAll('[data-header-theme="dark"]');
      const headerCheckY = 48; // collision line
      let foundDark = false;
      darkSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= headerCheckY && rect.bottom >= headerCheckY) {
          foundDark = true;
        }
      });
      setIsOverDark(foundDark);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check on load
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 900) setMobileOpen(false);
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
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 pt-3.5 pb-2 px-4 sm:px-6"
        role="banner"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Brand Logo & Wordmark (Dynamic Color) */}
          <Link
            href="/"
            aria-label="Lawgic — Home"
            className="flex items-center gap-2.5 no-underline group py-1.5"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-350 group-hover:scale-105 shadow-xs"
              style={{
                backgroundColor: isOverDark
                  ? "rgba(255, 255, 255, 0.14)"
                  : "var(--burgundy-faint)",
                borderColor: isOverDark
                  ? "rgba(255, 255, 255, 0.28)"
                  : "rgba(110,31,31,0.2)",
                borderWidth: "1px",
                borderStyle: "solid",
              }}
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke={isOverDark ? "var(--brass-light)" : "var(--burgundy)"}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ transition: "stroke 350ms cubic-bezier(0.16, 1, 0.3, 1)" }}
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
                color: isOverDark ? "var(--ivory)" : "var(--charcoal)",
                letterSpacing: "-0.015em",
                lineHeight: 1,
                transition: "color 350ms cubic-bezier(0.16, 1, 0.3, 1)",
                textShadow: isOverDark ? "0 1px 3px rgba(0,0,0,0.3)" : "none",
              }}
            >
              Lawgic
            </span>
          </Link>

          {/* Center: Winzy-style Floating Rounded Pill Navbar */}
          <nav
            aria-label="Main navigation"
            className="hidden md:flex items-center gap-5 px-6 py-2 rounded-full bg-white/75 dark:bg-white/85 backdrop-blur-xl border border-black/[0.08] shadow-sm hover:shadow-md transition-all duration-300"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-sans text-[13px] font-medium text-[var(--charcoal-mid)] hover:text-[var(--burgundy)] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}

            <div className="w-[1px] h-3.5 bg-black/10 mx-1" aria-hidden="true" />

            {/* Embedded Light Palette Theme Switcher */}
            <ThemeSelector />
          </nav>

          {/* Right: Actions (Log in + Sign Up Pill) with Dynamic "Log in" Color */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#signin"
              className="font-sans text-[13px] font-medium px-3 py-1.5 transition-colors duration-300"
              style={{
                color: isOverDark ? "var(--ivory)" : "var(--charcoal-mid)",
                transition: "color 350ms cubic-bezier(0.16, 1, 0.3, 1)",
                textShadow: isOverDark ? "0 1px 3px rgba(0,0,0,0.3)" : "none",
              }}
            >
              Log in
            </a>

            <Magnet magnetStrength={0.25} padding={20}>
              <a
                href="#get-started"
                className="inline-flex items-center justify-center font-sans font-semibold text-xs tracking-wide px-5 py-2.5 rounded-full text-[var(--ivory)] bg-[var(--burgundy)] hover:bg-[var(--burgundy-deep)] transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.02] border border-white/20"
              >
                <span>Decode Notice</span>
              </a>
            </Magnet>
          </div>

          {/* Mobile Right Controls: Theme + Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeSelector />

            <button
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen((v) => !v)}
              className={`flex flex-col justify-center gap-1.5 p-2 backdrop-blur-md rounded-full cursor-pointer shadow-xs transition-all duration-300 ${
                isOverDark
                  ? "bg-white/15 border border-white/25"
                  : "bg-white/80 border border-black/10"
              }`}
            >
              <span
                className="block w-5 h-[1.5px] transition-all duration-300"
                style={{
                  backgroundColor: isOverDark ? "var(--ivory)" : "var(--charcoal)",
                  transform: mobileOpen ? "rotate(45deg) translate(4px, 4px)" : "none",
                }}
              />
              <span
                className="block w-5 h-[1.5px] transition-all duration-300"
                style={{
                  backgroundColor: isOverDark ? "var(--ivory)" : "var(--charcoal)",
                  opacity: mobileOpen ? 0 : 1,
                }}
              />
              <span
                className="block w-5 h-[1.5px] transition-all duration-300"
                style={{
                  backgroundColor: isOverDark ? "var(--ivory)" : "var(--charcoal)",
                  transform: mobileOpen ? "rotate(-45deg) translate(4px, -4px)" : "none",
                }}
              />
            </button>
          </div>
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
        <div
          aria-hidden="true"
          onClick={() => setMobileOpen(false)}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        />

        <div
          className="absolute top-0 right-0 bottom-0 w-[85vw] max-w-[320px] bg-[var(--ivory)] flex flex-col p-8 pt-24 shadow-2xl transition-transform duration-300 ease-out border-l border-black/10"
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
              className="w-full text-center py-2.5 rounded-full border border-[var(--stone-faint)] text-sm font-semibold text-[var(--charcoal)]"
            >
              Log in
            </a>
            <a
              href="#get-started"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center py-2.5 rounded-full bg-[var(--burgundy)] text-[var(--ivory)] text-sm font-semibold shadow"
            >
              Decode Notice
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
