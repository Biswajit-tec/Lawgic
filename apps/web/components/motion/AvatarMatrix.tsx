"use client";

import { useState } from "react";

interface Profile {
  id: number;
  name: string;
  role: string;
  city: string;
  avatar: string;
  initials: string;
  active?: boolean;
}

const profiles: Profile[] = [
  { id: 1, name: "Dr. Vikram Seth", role: "Medical Director", city: "New Delhi", avatar: "", initials: "VS" },
  { id: 2, name: "Priya Sundaram", role: "Product Founder", city: "Bengaluru", avatar: "", initials: "PS", active: true },
  { id: 3, name: "Rajesh Kulkarni", role: "Retail MSME Owner", city: "Pune", avatar: "", initials: "RK" },
  { id: 4, name: "Ananya Deshmukh", role: "Tech Legal Lead", city: "Mumbai", avatar: "", initials: "AD" },
  { id: 5, name: "Karthik Raja", role: "SaaS Entrepreneur", city: "Chennai", avatar: "", initials: "KR" },
  { id: 6, name: "Meera Nair", role: "Freelance Architect", city: "Kochi", avatar: "", initials: "MN" },
  { id: 7, name: "Arjun Verma", role: "Independent Consultant", city: "Hyderabad", avatar: "", initials: "AV" },
  { id: 8, name: "Gurpreet Singh", role: "Agri-Enterprise Head", city: "Amritsar", avatar: "", initials: "GS" },
  { id: 9, name: "Ritu Sengupta", role: "NGO Director", city: "Kolkata", avatar: "", initials: "RS" },
  { id: 10, name: "Farhan Qureshi", role: "Logistics Partner", city: "Ahmedabad", avatar: "", initials: "FQ" },
];

export function AvatarMatrix() {
  const [activeProfile, setActiveProfile] = useState<Profile>(profiles[1]);

  return (
    <div className="w-full flex flex-col items-center justify-center select-none py-6">
      {/* Matrix Staggered Rows */}
      <div className="flex flex-col items-center gap-2 max-w-lg mx-auto">
        {/* Row 1 (2 tiles) */}
        <div className="flex items-center gap-3">
          <AvatarTile profile={profiles[0]} active={activeProfile.id === profiles[0].id} onHover={() => setActiveProfile(profiles[0])} />
          <PlaceholderTile />
          <AvatarTile profile={profiles[1]} active={activeProfile.id === profiles[1].id} onHover={() => setActiveProfile(profiles[1])} />
          <PlaceholderTile />
        </div>

        {/* Row 2 (3 tiles) */}
        <div className="flex items-center gap-3">
          <PlaceholderTile />
          <AvatarTile profile={profiles[2]} active={activeProfile.id === profiles[2].id} onHover={() => setActiveProfile(profiles[2])} />
          <AvatarTile profile={profiles[3]} active={activeProfile.id === profiles[3].id} onHover={() => setActiveProfile(profiles[3])} />
          <AvatarTile profile={profiles[4]} active={activeProfile.id === profiles[4].id} onHover={() => setActiveProfile(profiles[4])} />
          <PlaceholderTile />
        </div>

        {/* Row 3 (4 tiles) */}
        <div className="flex items-center gap-3">
          <AvatarTile profile={profiles[5]} active={activeProfile.id === profiles[5].id} onHover={() => setActiveProfile(profiles[5])} />
          <PlaceholderTile />
          <AvatarTile profile={profiles[6]} active={activeProfile.id === profiles[6].id} onHover={() => setActiveProfile(profiles[6])} />
          <PlaceholderTile />
          <AvatarTile profile={profiles[7]} active={activeProfile.id === profiles[7].id} onHover={() => setActiveProfile(profiles[7])} />
        </div>

        {/* Row 4 (2 tiles) */}
        <div className="flex items-center gap-3">
          <PlaceholderTile />
          <AvatarTile profile={profiles[8]} active={activeProfile.id === profiles[8].id} onHover={() => setActiveProfile(profiles[8])} />
          <AvatarTile profile={profiles[9]} active={activeProfile.id === profiles[9].id} onHover={() => setActiveProfile(profiles[9])} />
          <PlaceholderTile />
        </div>
      </div>

      {/* Tooltip Badge for Active Profile */}
      <div className="mt-4 flex items-center justify-center">
        <div className="inline-flex items-center gap-2 bg-[var(--burgundy-deep)] text-[var(--ivory)] text-xs font-sans px-4 py-1.5 rounded-full shadow-md border border-[rgba(255,255,255,0.15)] transition-all duration-300 transform scale-100">
          <span className="font-semibold">{activeProfile.name}</span>
          <span className="opacity-40">/</span>
          <span className="text-[rgba(244,239,228,0.7)]">{activeProfile.role}, {activeProfile.city}</span>
        </div>
      </div>
    </div>
  );
}

function AvatarTile({
  profile,
  active,
  onHover,
}: {
  profile: Profile;
  active: boolean;
  onHover: () => void;
}) {
  return (
    <button
      onMouseEnter={onHover}
      onClick={onHover}
      className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-xs font-serif font-bold transition-all duration-300 border cursor-pointer ${
        active
          ? "bg-[var(--burgundy)] text-[var(--ivory)] border-[var(--brass-light)] scale-110 shadow-lg ring-2 ring-[var(--burgundy)] ring-offset-2 ring-offset-[var(--ivory)]"
          : "bg-[var(--ivory-subtle)] text-[var(--charcoal)] border-[var(--stone-faint)] hover:border-[var(--burgundy)] hover:scale-105"
      }`}
    >
      <span>{profile.initials}</span>
    </button>
  );
}

function PlaceholderTile() {
  return (
    <div
      className="w-12 h-12 md:w-14 md:h-14 rounded-2xl border border-dashed border-[var(--stone-faint)] opacity-40 bg-[rgba(244,239,228,0.3)] hidden sm:block"
      aria-hidden="true"
    />
  );
}
