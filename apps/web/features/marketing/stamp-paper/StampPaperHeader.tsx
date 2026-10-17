"use client";

import React from "react";
import Image from "next/image";

interface StampPaperHeaderProps {
  serialNumber?: string;
  noticeNumber?: string;
  date?: string;
}

export function StampPaperHeader({
  serialNumber = "AP 014507",
  noticeNumber = "NOTICE NO. LG/2026/0173",
  date = "DATED: 18 OCT 2026",
}: StampPaperHeaderProps) {
  return (
    <div className="w-full select-none">
      {/* The Authentic Rs. 100 Indian Non-Judicial Stamp Banner (With Seamless Parchment Texture) */}
      <div className="relative w-full h-[115px] sm:h-[145px] md:h-[160px] overflow-hidden rounded-[2px] shadow-xs border border-[#C6B89F]/40">
        <Image
          src="/stamp-100-vintage-banner.png"
          alt="भारतीय गैर न्यायिक - Rs. 100 - ONE HUNDRED RUPEES - INDIA NON JUDICIAL"
          width={711}
          height={365}
          className="w-full h-full object-cover object-top"
          priority
        />
      </div>

      {/* Under-Stamp Metadata: Illustrative Example (Left) & Notice No / Date / Serial (Right) */}
      <div className="mt-1.5 flex items-center justify-between px-0.5 text-[10px] sm:text-xs font-mono text-[#4A3F33] border-b border-[#D8C7B0]/60 pb-1">
        <div className="uppercase tracking-wider font-semibold text-[#7A6E60]">
          ILLUSTRATIVE STAMP PAPER
        </div>
        <div className="flex items-center gap-2 sm:gap-3 text-right">
          <span className="hidden sm:inline">{date}</span>
          <span className="font-semibold text-[#1C1917]">{noticeNumber}</span>
          <span className="font-bold text-[#DC2626]">{serialNumber}</span>
        </div>
      </div>
    </div>
  );
}
