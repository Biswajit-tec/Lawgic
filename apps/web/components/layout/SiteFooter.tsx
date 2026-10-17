"use client";

import Link from "next/link";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-[var(--ivory)] border-t border-[var(--stone-faint)] pt-16 pb-12 select-none"
      role="contentinfo"
    >
      <div className="container-lawgic">
        {/* Top Section matching Frame 20 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-14 border-b border-[var(--stone-faint)]">
          {/* Brand & Mission on Left */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 text-decoration-none group"
            >
              <div className="w-8 h-8 rounded-full bg-[var(--burgundy-faint)] border border-[rgba(110,31,31,0.2)] flex items-center justify-center">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--burgundy)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  color: "var(--charcoal)",
                  letterSpacing: "-0.015em",
                  lineHeight: 1,
                }}
              >
                Lawgic
              </span>
            </Link>

            <p className="font-sans text-xs md:text-sm text-[var(--stone)] leading-relaxed max-w-sm">
              Making India&apos;s legal system understandable to everyone. Built to decode
              complex statutory notices, orders, and contracts into plain language.
            </p>

            <div className="text-[11px] font-sans text-[var(--stone-light)] leading-relaxed max-w-md pt-2">
              <strong className="text-[var(--stone)]">Legal Notice:</strong> Lawgic provides legal information, plain-language document analysis, and procedural navigation. It does not provide legal representation or substitute an advocate&apos;s professional counsel.
            </div>
          </div>

          {/* Large Serif Title on Right matching Frame 20 */}
          <div className="lg:col-span-7 flex flex-col justify-center lg:items-end text-left lg:text-right">
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[var(--charcoal)] tracking-tight max-w-xl leading-[1.25]">
              Legal precision for ambitious citizens and businesses.
            </h3>
            <span className="font-sans text-xs uppercase tracking-widest text-[var(--burgundy)] font-semibold mt-3">
              Plain Language · 22 Scheduled Indian Languages
            </span>
          </div>
        </div>

        {/* Middle Navigation Columns matching Frame 20 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-[var(--stone-faint)]">
          {/* Column 1: Sitemaps */}
          <div>
            <h4 className="font-sans text-xs uppercase tracking-wider font-bold text-[var(--charcoal)] mb-4">
              Sitemaps
            </h4>
            <ul className="space-y-2.5 list-none p-0 m-0 font-sans text-xs text-[var(--stone)]">
              <li><a href="#what-we-do" className="hover:text-[var(--burgundy)] transition-colors">What We Do</a></li>
              <li><a href="#process" className="hover:text-[var(--burgundy)] transition-colors">Our Process</a></li>
              <li><a href="#difference" className="hover:text-[var(--burgundy)] transition-colors">The Difference</a></li>
              <li><a href="#languages" className="hover:text-[var(--burgundy)] transition-colors">Languages</a></li>
              <li><a href="#trust" className="hover:text-[var(--burgundy)] transition-colors">Trust &amp; Accuracy</a></li>
            </ul>
          </div>

          {/* Column 2: Contact Us */}
          <div>
            <h4 className="font-sans text-xs uppercase tracking-wider font-bold text-[var(--charcoal)] mb-4">
              Contact Us
            </h4>
            <ul className="space-y-2.5 list-none p-0 m-0 font-sans text-xs text-[var(--stone)]">
              <li>
                <span className="block text-[11px] text-[var(--stone-light)]">Citizen Support:</span>
                <a href="mailto:support@lawgic.in" className="font-medium text-[var(--charcoal)] hover:text-[var(--burgundy)]">support@lawgic.in</a>
              </li>
              <li>
                <span className="block text-[11px] text-[var(--stone-light)]">Helpline (Toll-Free):</span>
                <span className="font-medium text-[var(--charcoal)]">1800-572-9442</span>
              </li>
              <li>
                <span className="block text-[11px] text-[var(--stone-light)]">Legal Operations:</span>
                <span>Bengaluru &amp; New Delhi, India</span>
              </li>
            </ul>
          </div>

          {/* Column 3: About Us */}
          <div>
            <h4 className="font-sans text-xs uppercase tracking-wider font-bold text-[var(--charcoal)] mb-4">
              About Us
            </h4>
            <ul className="space-y-2.5 list-none p-0 m-0 font-sans text-xs text-[var(--stone)]">
              <li><a href="#mission" className="hover:text-[var(--burgundy)] transition-colors">Our Mission</a></li>
              <li><a href="#social-proof" className="hover:text-[var(--burgundy)] transition-colors">Citizen Trust</a></li>
              <li><a href="#trust" className="hover:text-[var(--burgundy)] transition-colors">Verification Methodology</a></li>
              <li><a href="#trust" className="hover:text-[var(--burgundy)] transition-colors">Open Indian Legal Data</a></li>
            </ul>
          </div>

          {/* Column 4: Support & Legal */}
          <div>
            <h4 className="font-sans text-xs uppercase tracking-wider font-bold text-[var(--charcoal)] mb-4">
              Legal &amp; Privacy
            </h4>
            <ul className="space-y-2.5 list-none p-0 m-0 font-sans text-xs text-[var(--stone)]">
              <li><a href="/privacy" className="hover:text-[var(--burgundy)] transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-[var(--burgundy)] transition-colors">Terms of Service</a></li>
              <li><a href="/security" className="hover:text-[var(--burgundy)] transition-colors">Security &amp; Encryption</a></li>
              <li><a href="/disclaimer" className="hover:text-[var(--burgundy)] transition-colors">Legal Disclaimer</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs text-[var(--stone)]">
          <p>© {currentYear} Lawgic Technologies. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--burgundy)] transition-colors">Twitter / X</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--burgundy)] transition-colors">LinkedIn</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--burgundy)] transition-colors">GitHub</a>
            <span className="text-[var(--stone-light)]">·</span>
            <span>Crafted for India with pride 🇮🇳</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
