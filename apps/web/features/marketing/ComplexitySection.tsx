"use client";

import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "@/components/layout/ThemeContext";
import { LedgerMarginRuler } from "@/components/motion/LedgerMarginRuler";
import { PaperStackCarousel } from "./stamp-paper/PaperStackCarousel";
import { StickyNotesCluster } from "./stamp-paper/StickyNotesCluster";
import type { NoticeScenarioData } from "./stamp-paper/LegalNoticeStampPaper";
import { ArrowDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// 3 Real-World Indian Document Scenarios for the 3D Paper Stack Carousel
const SCENARIOS_DATA: NoticeScenarioData[] = [
  {
    id: "employment",
    category: "Employment Notice",
    noticeTitle: "LEGAL NOTICE",
    noticeSubtitle: "NON-JUDICIAL STAMP PAPER",
    addressee: [
      "Mr. Arjun Mehta",
      "123, Green Park",
      "New Delhi, 110016",
    ],
    subject: "Notice for Breach of Employment Agreement",
    subjectHighlight: "Notice for Breach of Employment Agreement",
    bodyParagraphs: [
      {
        textBefore:
          "This is to inform you that you are in breach of the employment agreement dated 15 January 2024, in respect of your obligation to serve a ",
        highlight: "notice period of 60 days",
        textAfter:
          " prior to resignation. Your resignation dated 1 March 2024 is in violation of Clause 7 of the said agreement.",
      },
      {
        textBefore:
          "You are hereby called upon to provide a written explanation ",
        highlight: "within 15 days",
        textAfter:
          " from the date of receipt of this notice, failing which appropriate legal action may be initiated as per the terms of the agreement.",
      },
    ],
    signatoryCompany: "For ABC Technologies Pvt. Ltd.",
    signatoryTitle: "Authorized Signatory",
    serialNumber: "AP 014507",
    noticeNumber: "NOTICE NO. LP/2024/0173",
    date: "DATED: 12 MAR 2024",
    plainHeadline: "In plain language",
    plainExplanation:
      "Your employer is saying that you did not follow the 60-day notice period mentioned in your employment agreement. They have asked you to respond in writing within 15 days, otherwise they may take legal action as per the agreement.",
    keyDetails:
      "Notice period of 60 days demanded; written response required within 15 days under Clause 7.",
    sourceReferences:
      "Indian Contract Act, 1872 & Industrial Disputes Act; non-compete/arbitrary forfeiture is legally voidable.",
    nextSteps:
      "Issue formal written response through counsel within 15 days contesting disproportionate penalty clauses.",
  },
  {
    id: "police",
    category: "Police Inquiry (Sec 41A)",
    noticeTitle: "STATUTORY POLICE SUMMONS",
    noticeSubtitle: "UNDER SECTION 41A CrPC / SEC 35 BNSS",
    addressee: [
      "Mr. Rajesh Sharma",
      "45, Civil Lines",
      "Jaipur, Rajasthan, 302006",
    ],
    subject: "Summons for Appearance in Investigation",
    subjectHighlight: "Summons for Attendance under Section 41A CrPC",
    bodyParagraphs: [
      {
        textBefore:
          "WHEREAS reasonable suspicion hath been reported against you in FIR No. 89/2026. You are hereby directed to appear in person for inquiry ",
        highlight: "within 7 days of notice",
        textAfter:
          " before the Investigating Officer at Ashok Nagar Police Station.",
      },
      {
        textBefore:
          "Take notice that so long as you comply with this notice, ",
        highlight: "you shall not be arrested",
        textAfter:
          " unless reasons are recorded in writing as mandated by the Supreme Court of India.",
      },
    ],
    signatoryCompany: "Station House Officer (SHO)",
    signatoryTitle: "Investigating Authority",
    serialNumber: "RJ 894102",
    noticeNumber: "CR-INQ/2026/041",
    date: "DATED: 18 OCT 2026",
    plainHeadline: "In plain language",
    plainExplanation:
      "The police are calling you as an inquiry witness or person of interest. The law explicitly prohibits them from arbitrarily arresting you as long as you attend and cooperate with your legal counsel.",
    keyDetails:
      "Inquiry witness attendance only; no arbitrary arrest permitted under statutory compliance.",
    sourceReferences:
      "Supreme Court landmark Arnesh Kumar v. State of Bihar & Section 41A(3) CrPC (BNSS Sec 35).",
    nextSteps:
      "Submit an attested acknowledgment copy, and attend the scheduled inquiry with your advocate.",
  },
  {
    id: "rental",
    category: "Tenant Eviction Notice",
    noticeTitle: "TENANCY TERMINATION DEMAND",
    noticeSubtitle: "MODEL TENANCY ACT JURISDICTION",
    addressee: [
      "Ms. Priya Nair",
      "Flat 402, Palm Heights",
      "Bengaluru, Karnataka, 560034",
    ],
    subject: "Demand for Possession & Forfeiture of Deposit",
    subjectHighlight: "Notice to Vacate within 24 Hours & Deposit Forfeiture",
    bodyParagraphs: [
      {
        textBefore:
          "Notice is hereby given that your lease is terminated immediately. You are directed to vacate the premises ",
        highlight: "within 24 hours notice",
        textAfter:
          ", failing which the lessor shall initiate immediate lock-out proceedings.",
      },
      {
        textBefore:
          "Furthermore, your entire security deposit amounting to ",
        highlight: "Rs. 1,50,000 is forfeited",
        textAfter:
          " towards liquidated breach damages without further recourse.",
      },
    ],
    signatoryCompany: "For Apex Realty Management",
    signatoryTitle: "Lessor Attorney",
    serialNumber: "KA 442109",
    noticeNumber: "TEN/2026/0892",
    date: "DATED: 15 OCT 2026",
    plainHeadline: "In plain language",
    plainExplanation:
      "Your landlord is illegally threatening to evict you in 24 hours and keep your deposit. Indian rent control laws require at least a 30-day notice, and deposit forfeiture without proven damage is legally void.",
    keyDetails:
      "24-hr eviction is void under law; deposit cannot be forfeited arbitrarily without court decree.",
    sourceReferences:
      "Model Tenancy Act, Karnataka Rent Act & Section 74 of the Indian Contract Act.",
    nextSteps:
      "Issue a formal legal objection citing Model Tenancy rules and demand full deposit accounting.",
  },
];

export function ComplexitySection() {
  const { currentThemeOption } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [maxRevealedIndex, setMaxRevealedIndex] = useState(0);

  // Animation lock to ensure that small or long scrolls go through animations step-by-step
  const isAnimatingRef = useRef(false);
  const isPinnedRef = useRef(false);
  const activeIndexRef = useRef(0);
  activeIndexRef.current = activeIndex;

  const handleSelectIndex = useCallback((index: number) => {
    setActiveIndex(index);
    setMaxRevealedIndex((prev) => Math.max(prev, index));
  }, []);

  // Update max revealed whenever activeIndex changes
  useEffect(() => {
    setMaxRevealedIndex((prev) => Math.max(prev, activeIndex));
  }, [activeIndex]);

  // =========================================================================
  // STEP-BY-STEP SCROLL CONTROLLER
  // Small or long scrolls step through each notice & sticky note one by one
  // without skipping or rushing into the next section
  // =========================================================================
  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const handleWheel = (e: WheelEvent) => {
      const rect = sectionEl.getBoundingClientRect();
      // Only control scroll when section is pinned at viewport top
      const isAtTop = Math.abs(rect.top) < 30;
      if (!isAtTop) return;

      const deltaY = e.deltaY;
      if (Math.abs(deltaY) < 15) return;

      const currentIdx = activeIndexRef.current;

      if (deltaY > 0) {
        // Scrolling DOWN
        if (currentIdx < SCENARIOS_DATA.length - 1) {
          // Gated stepping: prevent default so velocity cannot skip notices
          e.preventDefault();
          if (isAnimatingRef.current) return;

          isAnimatingRef.current = true;
          const nextIdx = currentIdx + 1;
          setActiveIndex(nextIdx);
          setMaxRevealedIndex((m) => Math.max(m, nextIdx));

          // Cooldown matches physical card shuffle & sticky note reveal timing
          setTimeout(() => {
            isAnimatingRef.current = false;
          }, 580);
        }
        // If currentIdx === SCENARIOS_DATA.length - 1 (all notices seen), allow normal scroll down to next section!
      } else if (deltaY < 0) {
        // Scrolling UP
        if (currentIdx > 0) {
          // Gated stepping back
          e.preventDefault();
          if (isAnimatingRef.current) return;

          isAnimatingRef.current = true;
          const prevIdx = currentIdx - 1;
          setActiveIndex(prevIdx);

          setTimeout(() => {
            isAnimatingRef.current = false;
          }, 580);
        }
        // If currentIdx === 0, allow normal scroll back up to Hero!
      }
    };

    // Mobile touch gestures
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const rect = sectionEl.getBoundingClientRect();
      const isAtTop = Math.abs(rect.top) < 30;
      if (!isAtTop) return;

      const touchCurrentY = e.touches[0].clientY;
      const deltaY = touchStartY - touchCurrentY;

      if (Math.abs(deltaY) < 25) return;

      const currentIdx = activeIndexRef.current;

      if (deltaY > 0) {
        // Swiping UP = Scrolling DOWN
        if (currentIdx < SCENARIOS_DATA.length - 1) {
          if (e.cancelable) e.preventDefault();
          if (isAnimatingRef.current) return;

          isAnimatingRef.current = true;
          touchStartY = touchCurrentY;
          const nextIdx = currentIdx + 1;
          setActiveIndex(nextIdx);
          setMaxRevealedIndex((m) => Math.max(m, nextIdx));

          setTimeout(() => {
            isAnimatingRef.current = false;
          }, 580);
        }
      } else if (deltaY < 0) {
        // Swiping DOWN = Scrolling UP
        if (currentIdx > 0) {
          if (e.cancelable) e.preventDefault();
          if (isAnimatingRef.current) return;

          isAnimatingRef.current = true;
          touchStartY = touchCurrentY;
          const prevIdx = currentIdx - 1;
          setActiveIndex(prevIdx);

          setTimeout(() => {
            isAnimatingRef.current = false;
          }, 580);
        }
      }
    };

    // Attach non-passive wheel & touch listeners for deterministic stepping
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  // GSAP Pinning
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!sectionRef.current) return;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=1200",
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        onEnter: () => {
          isPinnedRef.current = true;
        },
        onEnterBack: () => {
          isPinnedRef.current = true;
        },
        onLeave: () => {
          isPinnedRef.current = false;
        },
        onLeaveBack: () => {
          isPinnedRef.current = false;
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Dynamic theme aware dark background overlay
  const burgundyOverlay = useMemo(() => {
    switch (currentThemeOption.id) {
      case "sand-cyprus":
        return "linear-gradient(180deg, rgba(0, 56, 51, 0.72) 0%, rgba(0, 36, 33, 0.82) 100%)";
      case "milk-matcha":
        return "linear-gradient(180deg, rgba(55, 69, 33, 0.72) 0%, rgba(35, 45, 20, 0.82) 100%)";
      case "petal-espresso":
        return "linear-gradient(180deg, rgba(59, 30, 21, 0.72) 0%, rgba(35, 17, 12, 0.82) 100%)";
      case "lime-canopy":
        return "linear-gradient(180deg, rgba(29, 43, 28, 0.72) 0%, rgba(18, 28, 17, 0.82) 100%)";
      case "classic-ivory":
      default:
        return "linear-gradient(180deg, rgba(65, 14, 14, 0.70) 0%, rgba(35, 8, 8, 0.80) 100%)";
    }
  }, [currentThemeOption]);

  // Notice-specific authentic ink colors
  const scenarioNotaryColor = useMemo(() => {
    if (activeIndex === 0) return "#1E3A8A"; // Deep Indigo / Navy for Corporate Agreement
    if (activeIndex === 1) return "#991B1B"; // Statutory Crimson for Police Summons
    return "#9A3412"; // Deep Ochre / Amber for Property Eviction
  }, [activeIndex]);

  // Dynamic ambient glow that reacts to notice switches
  const scenarioAmbientGlow = useMemo(() => {
    if (activeIndex === 0) return "rgba(30, 58, 138, 0.25)";
    if (activeIndex === 1) return "rgba(153, 27, 27, 0.28)";
    return "rgba(180, 83, 9, 0.25)";
  }, [activeIndex]);

  return (
    <section
      ref={sectionRef}
      id="complexity"
      data-header-theme="dark"
      aria-label="Indian Court Stamp Paper Carousel — Complexity Into Clarity"
      className="relative min-h-screen w-full overflow-hidden select-none"
      style={{
        // Unified Grand Courtroom Library with mahogany desk, Indian law books & Scales
        backgroundImage: `${burgundyOverlay}, url('/cinematic-court-library-unified.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#2B0B0B",
        color: "var(--ivory)",
      }}
    >
      {/* Signature Coordinate Rulers in Dark Theme */}
      <LedgerMarginRuler start={220} end={480} step={15} theme="dark" />

      {/* Atmospheric Ambient Desk Glow (Shifts with Notices) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-45 transition-colors duration-500 ease-out"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 50% 50%, ${scenarioAmbientGlow} 0%, transparent 80%)`,
        }}
        aria-hidden="true"
      />

      {/* Pinned Carousel Stage Container - Sized safely below fixed header without the pill */}
      <div
        ref={pinContainerRef}
        className="relative z-10 w-full min-h-screen flex flex-col items-center justify-start lg:justify-center px-3 sm:px-6 md:px-8 pt-18 sm:pt-20 pb-6 sm:pb-8"
      >
        {/* =========================================================================
            TWO-PANEL CAROUSEL LAYOUT
            Left: 3D Stamp Paper Deck Carousel (shuffles card to back on scroll/click)
            Right: Authentic 3 Sticky Notes Cluster (revealed one by one per notice)
            ========================================================================= */}
        <div className="relative z-10 w-full max-w-6xl flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-10 xl:gap-14">
          
          {/* LEFT: 3D Stamp Paper Deck Carousel */}
          <div className="w-full flex justify-center">
            <PaperStackCarousel
              scenarios={SCENARIOS_DATA}
              activeIndex={activeIndex}
              onSelectIndex={handleSelectIndex}
              isStamped={true}
              notaryColor={scenarioNotaryColor}
            />
          </div>

          {/* RIGHT: Authentic 3 Sticky Notes Cluster (Revealed one by one per stamp paper) */}
          <div className="w-full flex justify-center transition-all duration-500 ease-out">
            <StickyNotesCluster
              scenarios={SCENARIOS_DATA}
              activeIndex={activeIndex}
              maxRevealedIndex={maxRevealedIndex}
              onSelectIndex={handleSelectIndex}
            />
          </div>

        </div>

        {/* Bottom Scroll Helper Cue */}
        <div className="mt-3 sm:mt-4 flex items-center gap-2 text-[11px] sm:text-xs font-mono text-[var(--brass-light)] opacity-85 shrink-0">
          {activeIndex < SCENARIOS_DATA.length - 1 ? (
            <>
              <span className="w-2 h-2 rounded-full bg-[var(--brass-light)] animate-ping" />
              <span>Scroll down or tap Next to reveal Notice {activeIndex + 2} &amp; sticky note memo</span>
            </>
          ) : (
            <span className="flex items-center gap-1.5 text-[var(--ivory)] font-semibold">
              <ArrowDown className="w-4 h-4 animate-bounce text-[var(--brass-light)]" />
              All 3 notices &amp; memos revealed. Continue scrolling down to explore practice areas
            </span>
          )}
        </div>

      </div>
    </section>
  );
}
