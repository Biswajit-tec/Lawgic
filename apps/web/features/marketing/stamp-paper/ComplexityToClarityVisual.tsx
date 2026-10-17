"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  Home,
  CreditCard,
  ShieldCheck,
  Scale,
  FileCheck2,
  Sparkles,
  ArrowRight,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";

interface Scenario {
  id: string;
  category: string;
  icon: typeof ShieldAlert;
  title: string;
  panicPercent: number; // e.g., 85% panic before
  safePercent: number; // e.g., 10% after Lawgic
  legaleseHeadline: string;
  legaleseDenseSnippet: string;
  badges: {
    icon: typeof ShieldCheck;
    tag: string;
    label: string;
    sub: string;
    color: string;
  }[];
  verdictPlain: string;
  precedentTag: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: "sec41a",
    category: "Police Notice",
    icon: ShieldAlert,
    title: "Sec 41A CrPC / Sec 35 BNSS Notice",
    panicPercent: 88,
    safePercent: 8,
    legaleseHeadline: "Arrest Threat & Coercive Summons",
    legaleseDenseSnippet:
      "WHEREAS reasonable suspicion hath been laid... you are strictly directed to appear forthwith default whereof warrants coercive arrest...",
    badges: [
      {
        icon: ShieldCheck,
        tag: "NO ARREST",
        label: "Arbitrary Arrest Forbidden",
        sub: "Inquiry witness summons only",
        color: "#16A34A",
      },
      {
        icon: Scale,
        tag: "CONSTITUTIONAL",
        label: "Right to Legal Counsel",
        sub: "Article 20(3) full protection",
        color: "#0284C7",
      },
      {
        icon: FileCheck2,
        tag: "ACTION",
        label: "Written Appearance Only",
        sub: "Submit attested acknowledgment",
        color: "#D97706",
      },
    ],
    verdictPlain:
      "You are NOT being arrested. This notice legally prevents arbitrary custody as long as you attend with your counsel.",
    precedentTag: "Arnesh Kumar v. State of Bihar (SC Landmark)",
  },
  {
    id: "rental",
    category: "Rental Agreement",
    icon: Home,
    title: "24-Hour Eviction & Deposit Forfeiture",
    panicPercent: 82,
    safePercent: 5,
    legaleseHeadline: "Unilateral Eviction & 100% Penalty",
    legaleseDenseSnippet:
      "LESSOR reserves unilateral rights to terminate tenancy on 24 hours notice and wholly forfeit security deposit of Rs. 1,50,000...",
    badges: [
      {
        icon: ShieldCheck,
        tag: "VOID CLAUSE",
        label: "24-Hr Eviction Illegal",
        sub: "Mandatory 30-day notice under law",
        color: "#16A34A",
      },
      {
        icon: Scale,
        tag: "DEPOSIT SAFE",
        label: "Deposit Cannot Be Forfeited",
        sub: "Contract Act Sec 74 protection",
        color: "#0284C7",
      },
      {
        icon: FileCheck2,
        tag: "AMENDMENT",
        label: "Standard Objection Clause",
        sub: "1-click pre-drafted notice",
        color: "#D97706",
      },
    ],
    verdictPlain:
      "This clause is legally void. Under Indian tenancy jurisprudence, no tenant can be evicted without due process and notice.",
    precedentTag: "Central Inland Water Transport Corp (SC)",
  },
  {
    id: "loan",
    category: "Banking Contract",
    icon: CreditCard,
    title: "Foreclosure & Prepayment Penalty",
    panicPercent: 78,
    safePercent: 0,
    legaleseHeadline: "Hidden 4.5% + GST Prepayment Fine",
    legaleseDenseSnippet:
      "BORROWER shall be penalized a compounding foreclosure levy of 4.5% + GST on entire sanctioned principal upon premature settlement...",
    badges: [
      {
        icon: ShieldCheck,
        tag: "100% WAIVED",
        label: "Zero Foreclosure Levy",
        sub: "Banned by Reserve Bank of India",
        color: "#16A34A",
      },
      {
        icon: Scale,
        tag: "RBI MANDATE",
        label: "Master Circular Directives",
        sub: "Applies to all retail borrowers",
        color: "#0284C7",
      },
      {
        icon: FileCheck2,
        tag: "WAIVER DRAFT",
        label: "Formal Nodal Letter",
        sub: "Send direct to banking ombudsman",
        color: "#D97706",
      },
    ],
    verdictPlain:
      "Strictly illegal under RBI Master Directions. Banks are prohibited from charging foreclosure fees to individual borrowers.",
    precedentTag: "RBI DBOD.No.Dir.BC.107 Circular",
  },
];

interface ComplexityToClarityVisualProps {
  themeColor?: string;
  themeAccent?: string;
}

export function ComplexityToClarityVisual({
  themeColor = "#6E1F1F",
  themeAccent = "#B8935A",
}: ComplexityToClarityVisualProps) {
  const [activeScenarioId, setActiveScenarioId] = useState("sec41a");
  const [clarityMode, setClarityMode] = useState<"decoded" | "legalese">("decoded");

  const current =
    SCENARIOS.find((s) => s.id === activeScenarioId) || SCENARIOS[0];

  // Threat meter needle rotation:
  // Legalese mode = high panic (needle around +65 deg)
  // Decoded mode = low risk (needle around -65 deg)
  const isDecoded = clarityMode === "decoded";
  const needleAngle = isDecoded ? -65 : 65;

  return (
    <div className="w-full mt-1.5 select-none">
      {/* 1. Scenario Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-[#D8C7B0]/80 pb-1.5 mb-2">
        <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-0.5 no-scrollbar">
          {SCENARIOS.map((s) => {
            const Icon = s.icon;
            const isActive = s.id === activeScenarioId;
            return (
              <button
                key={s.id}
                onClick={() => setActiveScenarioId(s.id)}
                type="button"
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-sans font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-[#2A231C] text-[#FDFBF7] shadow-sm scale-102"
                    : "bg-[#EFE5D3]/90 text-[#4A3F33] hover:bg-[#E5D7C0]"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#D4AF7A]" : "text-[#7A6E60]"}`} />
                <span>{s.category}</span>
              </button>
            );
          })}
        </div>

        {/* Live Interactive Scanner Toggle: Legalese vs. Decoded */}
        <div className="flex items-center gap-1 ml-auto">
          <button
            onClick={() => setClarityMode(isDecoded ? "legalese" : "decoded")}
            type="button"
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold transition-all cursor-pointer shadow-xs border border-[#C6B89F]/80 bg-[#FAF4E6] text-[#2A231C] hover:bg-[#F2E8D2]"
          >
            <RefreshCw className={`w-3 h-3 text-[#B8935A] ${isDecoded ? "" : "animate-spin"}`} />
            <span>{isDecoded ? "View Archaic Legalese" : "Activate Lawgic Clarity"}</span>
          </button>
        </div>
      </div>

      {/* 2. Visual Interactive Threat-to-Safety Dashboard */}
      <div className="grid grid-cols-12 gap-2 sm:gap-3 items-stretch">
        
        {/* Left Column: The Visual Animated Risk Meter & Scanner (Cols 1-4) */}
        <div className="col-span-12 sm:col-span-4 rounded border border-[#D8C7B0] bg-[#FAF5E8]/90 p-2 sm:p-2.5 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#7A6E60] font-bold">
                RISK AUDIT DIAL
              </span>
              <span
                className={`text-[10px] font-mono font-extrabold px-1.5 py-0.2 rounded ${
                  isDecoded
                    ? "text-[#16A34A] bg-[#DCFCE7]"
                    : "text-[#DC2626] bg-[#FEE2E2] animate-pulse"
                }`}
              >
                {isDecoded ? "SAFE (08%)" : "CRITICAL (88%)"}
              </span>
            </div>

            {/* Semicircular Speedometer Dial SVG */}
            <div className="relative w-full flex flex-col items-center justify-center py-1">
              <svg viewBox="0 0 160 85" className="w-28 sm:w-32 h-16 sm:h-18">
                {/* Dial Arc Track: Red (Panic) on Right, Green (Safety) on Left */}
                <path
                  d="M 20 80 A 60 60 0 0 1 140 80"
                  fill="none"
                  stroke="#E8DCB8"
                  strokeWidth="12"
                  strokeLinecap="round"
                />
                {/* Safe Green Zone */}
                <path
                  d="M 20 80 A 60 60 0 0 1 70 24"
                  fill="none"
                  stroke="#22C55E"
                  strokeWidth="12"
                  strokeLinecap="round"
                  opacity={isDecoded ? "0.9" : "0.3"}
                />
                {/* Caution Amber Zone */}
                <path
                  d="M 70 24 A 60 60 0 0 1 100 24"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="12"
                  opacity="0.5"
                />
                {/* Danger Red Zone */}
                <path
                  d="M 100 24 A 60 60 0 0 1 140 80"
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="12"
                  strokeLinecap="round"
                  opacity={isDecoded ? "0.3" : "0.95"}
                />

                {/* Animated Needle */}
                <g
                  style={{
                    transform: `rotate(${needleAngle}deg)`,
                    transformOrigin: "80px 80px",
                    transition: "transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  }}
                >
                  <circle cx="80" cy="80" r="5" fill="#2A231C" />
                  <line
                    x1="80"
                    y1="80"
                    x2="80"
                    y2="28"
                    stroke="#2A231C"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle cx="80" cy="28" r="2.5" fill={isDecoded ? "#22C55E" : "#EF4444"} />
                </g>
              </svg>

              {/* Status Caption */}
              <div className="text-[11px] font-sans font-bold text-center mt-0.5">
                {isDecoded ? (
                  <span className="text-[#16A34A] flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Protected Citizen Rights
                  </span>
                ) : (
                  <span className="text-[#DC2626] flex items-center justify-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Archaic Coercive Panic
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Precedent Citation */}
          <div className="mt-1 pt-1 border-t border-[#E5DAC4] text-[9.5px] font-mono text-[#7A6E60] truncate text-center">
            {current.precedentTag}
          </div>
        </div>

        {/* Right Column: 3 Visual Protection Badges OR Archaic Legalese (Cols 5-12) */}
        <div className="col-span-12 sm:col-span-8 rounded border-2 transition-all duration-500 flex flex-col justify-between p-2.5 sm:p-3 shadow-xs bg-[#FAF5E8]/85 border-[#15803D]/40">
          
          {isDecoded ? (
            /* DECODED MODE: 3 Instant Action Badges (Understood at a glance without reading walls of text) */
            <div className="flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-sans font-extrabold uppercase tracking-wider text-[#15803D] bg-[#DCFCE7] px-2 py-0.5 rounded-full">
                    <Sparkles className="w-3 h-3 text-[#15803D]" />
                    LAWGIC INSTANT CLARITY SHIELD
                  </span>
                  <span className="text-[10px] font-mono font-bold text-[#15803D]">
                    99.8% VERIFIED
                  </span>
                </div>

                {/* 3 Visual Icons Grid */}
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2 my-1">
                  {current.badges.map((b, idx) => {
                    const BadgeIcon = b.icon;
                    return (
                      <div
                        key={idx}
                        className="rounded border border-[#D4C6AF] bg-[#FFFFFF]/90 p-1.5 sm:p-2 text-center flex flex-col items-center justify-center shadow-xs hover:border-[#15803D]/60 transition-colors"
                      >
                        <div
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mb-1"
                          style={{ backgroundColor: `${b.color}15`, color: b.color }}
                        >
                          <BadgeIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                        </div>
                        <span
                          className="text-[9px] font-mono font-extrabold uppercase px-1 rounded tracking-wide mb-0.5"
                          style={{ backgroundColor: `${b.color}20`, color: b.color }}
                        >
                          {b.tag}
                        </span>
                        <div className="font-sans font-bold text-[10px] sm:text-[11px] text-[#1C1917] leading-tight">
                          {b.label}
                        </div>
                        <div className="text-[9px] text-[#7A6E60] font-sans leading-tight mt-0.5 hidden sm:block">
                          {b.sub}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Verdict Line */}
              <div className="mt-1.5 pt-1.5 border-t border-[#D4C6AF]/70 flex items-center gap-1.5 text-[11px] sm:text-xs font-sans text-[#1C1917]">
                <ArrowRight className="w-3.5 h-3.5 text-[#15803D] shrink-0" />
                <span className="font-semibold">{current.verdictPlain}</span>
              </div>
            </div>
          ) : (
            /* ARCHAIC LEGALESE MODE: Intimidating Red Warning */
            <div className="flex flex-col justify-between h-full bg-[#FAF0ED] p-2 rounded border border-[#F87171]/40">
              <div>
                <div className="flex items-center justify-between mb-1 text-[10px] font-mono font-bold text-[#DC2626]">
                  <span className="flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    ARCHAIC DECEPTIVE DRAFT
                  </span>
                  <span>UNVETTED EXPOSURE</span>
                </div>
                <div className="font-serif font-bold text-xs text-[#1C1917] mb-1">
                  {current.legaleseHeadline}
                </div>
                <p className="font-typewriter text-[11px] text-[#4A3F33] bg-white/70 p-2 rounded border border-[#FCA5A5] italic leading-relaxed">
                  &ldquo;{current.legaleseDenseSnippet}&rdquo;
                </p>
              </div>
              <div className="mt-2 text-[10px] font-mono text-[#DC2626] font-bold flex items-center justify-between">
                <span>CLICK &apos;ACTIVATE LAWGIC CLARITY&apos; TO DECODE</span>
                <span>STATUS: HIGH THREAT</span>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
