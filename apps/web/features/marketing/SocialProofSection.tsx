"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { LedgerMarginRuler } from "@/components/motion/LedgerMarginRuler";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  BookOpen,
  Languages,
  ArrowUpRight,
  User,
  Quote,
} from "lucide-react";

export interface ReviewStory {
  id: number;
  tag: string;
  quote: string;
  author: string;
  role: string;
}

const REVIEWS: ReviewStory[] = [
  {
    id: 1,
    tag: "USER STORY",
    quote:
      "I received a legal notice and could not understand what it meant. Lawgic explained it in plain language and helped me see what steps I could take next. It made a very confusing situation feel manageable.",
    author: "Community Legal Aid Volunteer",
    role: "Illustrative testimonial",
  },
  {
    id: 2,
    tag: "CITIZEN EXPERIENCE",
    quote:
      "When our family received an ancestral property partition summons, the court stamps induced sheer panic. Lawgic decoded every clause into plain Hindi with clear statutory timelines.",
    author: "Rajesh Kulkarni",
    role: "Small Business Owner · Nagpur",
  },
  {
    id: 3,
    tag: "FOUNDER REVIEW",
    quote:
      "As a first-time founder reviewing vendor agreements, cross-referencing indemnity clauses was exhausting. Lawgic gives source-grounded statutory certainty in seconds.",
    author: "Vikramaditya Sen",
    role: "Fintech Co-Founder · Bengaluru",
  },
  {
    id: 4,
    tag: "COMMUNITY ADVOCACY",
    quote:
      "A tenant dispute notice can induce serious panic. Reading the clear breakdown in plain Hindi gave my elderly parents total peace of mind before visiting our advocate.",
    author: "Sunita Sharma",
    role: "High School Principal · New Delhi",
  },
  {
    id: 5,
    tag: "CONSUMER RESOLUTION",
    quote:
      "Lawgic’s multilingual breakdown of our consumer complaint gave us the exact filing steps under the Consumer Protection Act. The dispute was settled in two weeks.",
    author: "Ananya Deshmukh",
    role: "Senior Consultant · Pune",
  },
];

export function SocialProofSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Automatically cycle through reviews every 3.5 seconds (pause on hover)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [isPaused]);

  const activeReview = REVIEWS[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  return (
    <section
      ref={sectionRef}
      id="social-proof"
      aria-label="Trust and Community Stories"
      className="relative w-full min-h-[780px] lg:min-h-[840px] bg-[#FAF8F5] overflow-hidden flex flex-col justify-between py-12 lg:py-16"
    >
      {/* Signature Coordinate Rulers in FRONT of images (z-30) */}
      <LedgerMarginRuler start={1190} end={1370} step={15} theme="light" className="z-30" />

      {/* =========================================================================
          BACKGROUND LAYER: Exact high-resolution clean background image
          (Indian advocate on left, cream diagonal channel in center, court dome on right)
          ========================================================================= */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <Image
          src="/images/social-proof/stories-backdrop.jpg"
          alt="Indian legal advocate reviewing documents with Supreme Court of India architecture"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Access · Understand · Move forward calligraphic text on bottom-left desk area */}
      <div className="hidden xl:block absolute bottom-28 left-14 z-20 pointer-events-none select-none">
        <div className="flex items-center gap-3">
          <span className="w-8 h-px bg-[#D4AF7A]/60" />
          <div className="flex flex-col font-serif italic text-lg text-[#F4EFE4]/90 leading-tight drop-shadow-sm">
            <span>Access</span>
            <span>Understand</span>
            <span>Move forward</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          FOREGROUND CONTENT: Laid out exactly as in Reference Image 2
          ========================================================================= */}
      <div className="container-lawgic relative z-10 flex flex-col justify-between h-full flex-1">
        
        {/* ---------------------------------------------------------------------
            TOP ROW: Title & Subtitle on Left, Narrative Note on Right
            --------------------------------------------------------------------- */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-8 lg:mb-12">
          <div className="max-w-xl">
            {/* Category Eyebrow */}
            <span className="inline-block text-[11px] font-sans font-bold tracking-[0.2em] uppercase text-[#7A6E60] mb-2.5">
              TRUST & COMMUNITY
            </span>

            {/* Main Editorial Headline */}
            <h2 className="font-serif text-3xl sm:text-4xl md:text-[2.75rem] lg:text-5xl font-semibold text-[#1C1917] tracking-tight leading-[1.12] mb-3">
              Clarity that helps people move forward.
            </h2>

            {/* Subtitle */}
            <p className="font-sans text-sm sm:text-base text-[#7A6E60] leading-relaxed">
              Real people. Real situations. A simpler way to understand the law.
            </p>
          </div>

          {/* Center-Top Subtle Note with Divider and Flourish */}
          <div className="hidden lg:flex items-center gap-4 text-xs font-sans text-[#7A6E60] border-l border-[#D9D2C4] pl-6 max-w-[240px] pt-2">
            <p className="leading-relaxed">
              Stories from people navigating legal complexity.
            </p>
          </div>
        </div>

        {/* ---------------------------------------------------------------------
            MIDDLE ROW: Floating Testimonial Review Card (Center-Right)
            Fixed height so background NEVER shifts or resizes on review change!
            --------------------------------------------------------------------- */}
        <div className="w-full flex justify-end my-4 lg:my-6">
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="w-full lg:max-w-xl xl:max-w-2xl bg-[#FFFFFF]/95 backdrop-blur-md rounded-[28px] border border-[#E5DFD3] shadow-[0_20px_50px_-10px_rgba(28,25,23,0.12)] p-6 sm:p-8 md:p-9 flex flex-col justify-between transition-all duration-300"
          >
            {/* Tag Pill */}
            <div className="mb-3">
              <span className="inline-block px-3 py-1 rounded-full bg-[#EFECE6] border border-[#E0DCD3] text-[10px] font-sans font-bold uppercase tracking-wider text-[#7A6E60]">
                {activeReview.tag}
              </span>
            </div>

            {/* Large Decorative Brass/Olive Quote Mark */}
            <div className="text-[#B8935A] -mt-1 mb-2">
              <Quote className="w-7 h-7 fill-current opacity-80 rotate-180" />
            </div>

            {/* Testimonial Quote: FIXED HEIGHT CONTAINER to eliminate any background jumping */}
            <div className="h-[120px] sm:h-[105px] md:h-[95px] flex items-center overflow-hidden">
              <p
                key={activeReview.id}
                className="font-serif text-base sm:text-lg md:text-xl text-[#1C1917] font-normal leading-relaxed italic animate-fadeIn"
              >
                &ldquo;{activeReview.quote}&rdquo;
              </p>
            </div>

            {/* Author Attribution & Pagination Controls */}
            <div className="mt-6 pt-5 border-t border-[#EDE8DA] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              
              {/* Author Info */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#EFECE6] border border-[#E0DCD3] flex items-center justify-center text-[#7A6E60] shrink-0">
                  <User className="w-4 h-4 text-[#7A6E60]" />
                </div>
                <div>
                  <h4 className="font-sans text-sm font-bold text-[#1C1917] leading-tight">
                    {activeReview.author}
                  </h4>
                  <p className="font-sans text-xs text-[#7A6E60] mt-0.5">
                    {activeReview.role}
                  </p>
                </div>
              </div>

              {/* Carousel Controls: Previous, Dot Indicators, Next */}
              <div className="flex items-center gap-3 self-end sm:self-auto">
                {/* Previous Button */}
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous review"
                  className="w-7 h-7 rounded-full border border-[#D9D2C4] hover:border-[#1C1917] flex items-center justify-center text-[#7A6E60] hover:text-[#1C1917] transition-colors cursor-pointer bg-white"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                {/* Dot Indicators */}
                <div className="flex items-center gap-1.5 px-1">
                  {REVIEWS.map((review, idx) => (
                    <button
                      key={review.id}
                      type="button"
                      onClick={() => setCurrentIndex(idx)}
                      aria-label={`Go to review ${idx + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        currentIndex === idx
                          ? "w-5 bg-[#1C1917]"
                          : "w-2 bg-[#D9D2C4] hover:bg-[#7A6E60]"
                      }`}
                    />
                  ))}
                </div>

                {/* Next Button */}
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next review"
                  className="w-7 h-7 rounded-full border border-[#D9D2C4] hover:border-[#1C1917] flex items-center justify-center text-[#7A6E60] hover:text-[#1C1917] transition-colors cursor-pointer bg-white"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* ---------------------------------------------------------------------
            BOTTOM BAR: 3 Value Pillars + CTA Button (Identical to Image 2)
            --------------------------------------------------------------------- */}
        <div className="pt-6 border-t border-[#D9D2C4]/80 flex flex-col lg:flex-row items-center justify-between gap-6 mt-6">
          
          {/* The 3 Value Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 w-full lg:w-auto flex-1">
            
            {/* Pillar 1 */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#EFECE6] border border-[#E0DCD3] flex items-center justify-center text-[#1C1917] shrink-0 mt-0.5">
                <FileText className="w-4 h-4 text-[#1C1917]" />
              </div>
              <div>
                <h5 className="font-serif text-sm font-bold text-[#1C1917] leading-tight mb-0.5">
                  Plain-language explanations
                </h5>
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#7A6E60] font-semibold block">
                  LEGAL INFORMATION MADE UNDERSTANDABLE
                </span>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#EFECE6] border border-[#E0DCD3] flex items-center justify-center text-[#1C1917] shrink-0 mt-0.5">
                <BookOpen className="w-4 h-4 text-[#1C1917]" />
              </div>
              <div>
                <h5 className="font-serif text-sm font-bold text-[#1C1917] leading-tight mb-0.5">
                  Source-grounded information
                </h5>
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#7A6E60] font-semibold block">
                  CONNECTED TO RELEVANT ACTS & REFERENCES
                </span>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#EFECE6] border border-[#E0DCD3] flex items-center justify-center text-[#1C1917] shrink-0 mt-0.5">
                <Languages className="w-4 h-4 text-[#1C1917]" />
              </div>
              <div>
                <h5 className="font-serif text-sm font-bold text-[#1C1917] leading-tight mb-0.5">
                  Designed for Indian languages
                </h5>
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#7A6E60] font-semibold block">
                  MORE PEOPLE CAN ACCESS THEIR RIGHTS
                </span>
              </div>
            </div>

          </div>

          {/* Action CTA Pill Button */}
          <div className="shrink-0 w-full sm:w-auto text-right">
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#1C2826] hover:bg-[#2C3E3B] text-white text-xs font-sans font-bold uppercase tracking-wider shadow-sm hover:shadow-md transition-all group w-full sm:w-auto"
            >
              <span>Explore how Lawgic works</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
