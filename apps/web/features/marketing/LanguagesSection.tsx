"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { LedgerMarginRuler } from "@/components/motion/LedgerMarginRuler";

gsap.registerPlugin(ScrollTrigger);

interface LanguageSample {
  name: string;
  native: string;
  code: string;
  sampleNotice: string;
  samplePlain: string;
}

const languages: LanguageSample[] = [
  {
    name: "Hindi",
    native: "हिंदी",
    code: "hi",
    sampleNotice: "धारा 138 परक्राम्य लिखत अधिनियम के तहत विधिक सूचना...",
    samplePlain: "आपको चेक बाउंस का विधिक नोटिस मिला है। 15 दिनों में भुगतान या उत्तर दें।",
  },
  {
    name: "Bengali",
    native: "বাংলা",
    code: "bn",
    sampleNotice: "নেগোশিয়েবল ইন্সট্রুমেন্টস অ্যাক্টের ১৩৮ ধারা অনুযায়ী নোটিশ...",
    samplePlain: "আপনার কাছে চেক বাউন্সের আইনি নোটিশ এসেছে। ১৫ দিনের মধ্যে ব্যবস্থা নিন।",
  },
  {
    name: "Tamil",
    native: "தமிழ்",
    code: "ta",
    sampleNotice: "செலாவணி ஆவணங்கள் சட்டம் பிரிவு 138ன் கீழ் சட்ட அறிவிப்பு...",
    samplePlain: "காசோலை திரும்புதல் குறித்த சட்டப்பூர்வ அறிவிப்பு. 15 நாட்களுக்குள் பதிலளிக்கவும்.",
  },
  {
    name: "Telugu",
    native: "తెలుగు",
    code: "te",
    sampleNotice: "నెగోషియబుల్ ఇన్స్ట్రుమెంట్స్ చట్టం సెక్షన్ 138 కింద నోటీసు...",
    samplePlain: "చెక్కు బౌన్స్ లీగల్ నోటీసు. 15 రోజుల్లోగా స్పందించండి లేదా పరిష్కరించండి.",
  },
  {
    name: "Marathi",
    native: "मराठी",
    code: "mr",
    sampleNotice: "निगोशिएबल इन्स्ट्रुमेंट्स ॲक्ट कलम १३८ अन्वये कायदेशीर नोटीस...",
    samplePlain: "धनादेश न वटल्याची कायदेशीर नोटीस. १५ दिवसांत उत्तर किंवा भरणा करा.",
  },
  {
    name: "Gujarati",
    native: "ગુજરાતી",
    code: "gu",
    sampleNotice: "નેગોશિયેબલ ઇન્સ્ટ્રુમેન્ટ્સ એક્ટ કલમ ૧૩૮ હેઠળ કાનૂની નોટિસ...",
    samplePlain: "ચેક બાઉન્સ કાનૂની નોટિસ. ૧૫ દિવસમાં જવાબ આપો અથવા પતાવટ કરો.",
  },
  {
    name: "Kannada",
    native: "ಕನ್ನಡ",
    code: "kn",
    sampleNotice: "ನೆಗೋಶಿಯೇಬಲ್ ಇನ್ಸ್ಟ್ರುಮೆಂಟ್ಸ್ ಕಾಯ್ದೆ ಕಲಂ 138 ಅಡಿಯಲ್ಲಿ ನೋಟಿಸ್...",
    samplePlain: "ಚೆಕ್ ಬೌನ್ಸ್ ಕಾನೂನು ನೋಟಿಸ್. 15 ದಿನಗಳಲ್ಲಿ ಉತ್ತರಿಸಿ ಅಥವಾ ಇತ್ಯರ್ಥಪಡಿಸಿ.",
  },
  {
    name: "Malayalam",
    native: "മലയാളം",
    code: "ml",
    sampleNotice: "നെഗോഷ്യബിൾ ഇൻസ്ട്രുമെന്റ്സ് ആക്ട് സെക്ഷൻ 138 പ്രകാരമുള്ള നോട്ടീസ്...",
    samplePlain: "ചെക്ക് മടങ്ങിയതു സംബന്ധിച്ച ലീഗൽ നോട്ടീസ്. 15 ദിവസത്തിനകം മറുപടി നൽകുക.",
  },
  {
    name: "Punjabi",
    native: "ਪੰਜਾਬੀ",
    code: "pa",
    sampleNotice: "ਨੈਗੋਸ਼ੀਏਬਲ ਇੰਸਟਰੂਮੈਂਟਸ ਐਕਟ ਦੀ ਧਾਰਾ 138 ਅਧੀਨ ਕਾਨੂੰਨੀ ਨੋਟਿਸ...",
    samplePlain: "ਚੈੱਕ ਬਾਊਂਸ ਦਾ ਕਾਨੂੰਨੀ ਨੋਟਿਸ। 15 ਦਿਨਾਂ ਦੇ ਅੰਦਰ ਜਵਾਬ ਜਾਂ ਭੁਗਤਾਨ ਕਰੋ।",
  },
  {
    name: "Odia",
    native: "ଓଡ଼ିଆ",
    code: "or",
    sampleNotice: "ନେଗୋସିଏବୁଲ ଇନଷ୍ଟ୍ରୁମେଣ୍ଟ ଆକ୍ଟ ଧାରା ୧୩୮ ଅନୁଯାୟୀ ଆଇନଗତ ନୋଟିସ...",
    samplePlain: "ଚେକ୍ ବାଉନ୍ସ ଆଇନଗତ ନୋଟିସ। ୧୫ ଦିନ ମଧ୍ୟରେ ଉତ୍ତର ଦିଅନ୍ତୁ କିମ୍ବା ପଇଠ କରନ୍ତୁ।",
  },
  {
    name: "Urdu",
    native: "اردو",
    code: "ur",
    sampleNotice: "نیگوشی ایبل انسٹرومنٹ ایکٹ کی دفعہ 138 کے تحت قانونی نوٹس...",
    samplePlain: "چیک باؤنس کا قانونی نوٹس۔ 15 دنوں کے اندر جواب دیں یا معاملہ حل کریں۔",
  },
  {
    name: "English",
    native: "English",
    code: "en",
    sampleNotice: "Legal Notice under Section 138 of Negotiable Instruments Act...",
    samplePlain: "You received a cheque return notice. You have 15 days to respond or resolve.",
  },
];

export function LanguagesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeLang, setActiveLang] = useState<LanguageSample>(languages[0]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".lang-item",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="languages"
      data-header-theme="dark"
      aria-labelledby="languages-heading"
      className="relative py-28 md:py-36 overflow-hidden select-none"
      style={{
        backgroundColor: "var(--burgundy-deep)",
        color: "var(--ivory)",
      }}
    >
      <LedgerMarginRuler start={1380} end={1480} step={10} theme="dark" />

      <div className="container-lawgic relative z-10">
        {/* Eyebrow tag */}
        <div className="mb-4">
          <span className="text-xs font-sans font-semibold tracking-[0.2em] uppercase text-[var(--brass-light)]">
            05 / Pan-Indian Multilingual Reach
          </span>
        </div>

        {/* Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14">
          <div className="lg:col-span-7">
            <h2
              id="languages-heading"
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[var(--ivory)] tracking-tight leading-[1.12]"
            >
              The Constitution guarantees rights.{" "}
              <span className="font-serif italic text-[var(--brass-light)]">
                We make them legible in your mother tongue.
              </span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="font-sans text-sm md:text-base text-[var(--ivory)]/70 leading-relaxed">
              Legal notices in India are overwhelmingly issued in dense English legalese.
              Lawgic breaks down the barrier, delivering accurate legal clarity in your spoken tongue.
            </p>
          </div>
        </div>

        {/* Live Translation Preview Interactive Display */}
        <div className="mb-12 p-6 md:p-8 rounded-2xl bg-white/[0.06] border border-white/15 backdrop-blur-md">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="font-sans text-xs uppercase tracking-wider text-[var(--brass-light)] font-bold">
                Live Demonstration · {activeLang.name} ({activeLang.native})
              </span>
            </div>
            <span className="text-xs font-sans text-white/50">
              Hover over any language below to preview
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-black/25 border border-white/10">
              <span className="font-sans text-[11px] uppercase tracking-wider text-white/50 block mb-2 font-medium">
                Official Formal Document Excerpt
              </span>
              <p className="font-serif text-sm md:text-base text-white/80 italic leading-relaxed">
                &ldquo;{activeLang.sampleNotice}&rdquo;
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/10 border border-[var(--brass-light)]/30">
              <span className="font-sans text-[11px] uppercase tracking-wider text-[var(--brass-light)] block mb-2 font-bold">
                Lawgic Plain Explanation
              </span>
              <p className="font-sans text-sm md:text-base text-[var(--ivory)] font-medium leading-relaxed">
                {activeLang.samplePlain}
              </p>
            </div>
          </div>
        </div>

        {/* Language Grid with SpotlightCards */}
        <div
          role="list"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5"
        >
          {languages.map((lang) => {
            const isSelected = activeLang.code === lang.code;

            return (
              <div
                key={lang.code}
                role="listitem"
                onMouseEnter={() => setActiveLang(lang)}
                onClick={() => setActiveLang(lang)}
                className="lang-item cursor-pointer"
              >
                <SpotlightCard
                  className={`p-4 rounded-xl text-center transition-all duration-300 border ${
                    isSelected
                      ? "bg-white/20 border-[var(--brass-light)] shadow-lg scale-105"
                      : "bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10"
                  }`}
                  spotlightColor="rgba(212, 175, 122, 0.25)"
                >
                  <div
                    className="font-serif text-2xl font-bold mb-1 transition-transform"
                    style={{
                      color: isSelected ? "var(--brass-light)" : "var(--ivory)",
                    }}
                  >
                    {lang.native}
                  </div>
                  <div className="font-sans text-[11px] font-semibold tracking-wider uppercase text-white/60">
                    {lang.name}
                  </div>
                </SpotlightCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
