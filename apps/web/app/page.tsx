import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SkipToContent } from "@/components/layout/SkipToContent";
import { LenisProvider } from "@/components/motion/LenisProvider";

import { HeroSection } from "@/features/marketing/HeroSection";
import { ComplexitySection } from "@/features/marketing/ComplexitySection";
import { WhatWeDoSection } from "@/features/marketing/WhatWeDoSection";
import { ProcessSection } from "@/features/marketing/ProcessSection";
import { TheDifferenceSection } from "@/features/marketing/TheDifferenceSection";
import { SocialProofSection } from "@/features/marketing/SocialProofSection";
import { LanguagesSection } from "@/features/marketing/LanguagesSection";
import { TrustSection } from "@/features/marketing/TrustSection";
import { FinalCTASection } from "@/features/marketing/FinalCTASection";

export const metadata: Metadata = {
  title: "Lawgic — Making India's Legal System Understandable",
  description:
    "Lawgic decodes legal notices, court summons, and government documents into clear plain language in the Indian language you know best.",
  alternates: {
    canonical: "https://lawgic.in",
  },
};

export default function LandingPage() {
  return (
    <LenisProvider>
      <SkipToContent />

      <SiteHeader />

      <main id="main-content" tabIndex={-1} className="outline-none overflow-x-hidden">
        {/* 1. Hero: Classical sculpture + BlurText + Laurel Seals */}
        <HeroSection />

        {/* 2. Burgundy Contrast: Orbital Arc Radar + Complexity to Clarity */}
        <ComplexitySection />

        {/* 3. What We Do: Interactive Practice Areas Accordion + Lady Justice */}
        <WhatWeDoSection />

        {/* 4. Our Process: Radar scan, Chess matrix, Compass gavel cards */}
        <ProcessSection />

        {/* 5. The Difference: Traditional Systems vs Lawgic Comparative Cards */}
        <TheDifferenceSection />

        {/* 6. Social Proof: Interactive Avatar Matrix + Three Laurel Wreath Awards */}
        <SocialProofSection />

        {/* 7. Multilingual India: 22 Scheduled Languages + Live Translation */}
        <LanguagesSection />

        {/* 8. Trust & Sources: Source-grounded explanations & Privacy */}
        <TrustSection />

        {/* 9. Final CTA: Floating Burgundy Container + Statue Silhouette */}
        <FinalCTASection />
      </main>

      {/* 10. Editorial Footer */}
      <SiteFooter />
    </LenisProvider>
  );
}
