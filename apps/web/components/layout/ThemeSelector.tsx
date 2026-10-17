"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme, THEME_OPTIONS, ThemeId } from "./ThemeContext";

export function ThemeSelector() {
  const { theme, setTheme, currentThemeOption } = useTheme();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [open]);

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-sans font-medium text-[var(--charcoal-mid)] hover:text-[var(--burgundy)] bg-black/[0.03] hover:bg-black/[0.06] border border-black/5 transition-all duration-200 cursor-pointer"
        aria-label="Change color theme"
        aria-expanded={open}
      >
        <span
          className="w-2.5 h-2.5 rounded-full border border-black/15 shadow-xs flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, ${currentThemeOption.bgHex} 50%, ${currentThemeOption.primaryHex} 50%)`,
          }}
        />
        <span className="hidden sm:inline text-[11px] tracking-wide">
          {currentThemeOption.name.split(" ")[0]}
        </span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="m4 6 4 4 4-4" />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute right-0 mt-2 w-56 rounded-2xl bg-[var(--ivory-subtle)]/95 backdrop-blur-xl border border-black/10 shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="px-2.5 py-1.5 text-[10px] font-sans font-semibold uppercase tracking-wider text-[var(--stone)] border-b border-black/5">
            Select Light Palette
          </div>
          <div className="mt-1 flex flex-col gap-1">
            {THEME_OPTIONS.map((opt) => {
              const isSelected = opt.id === theme;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setTheme(opt.id);
                    setOpen(false);
                  }}
                  role="menuitem"
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? "bg-black/[0.06] text-[var(--charcoal)] font-medium"
                      : "hover:bg-black/[0.03] text-[var(--charcoal-mid)]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-5 h-5 rounded-full border border-black/15 shadow-xs overflow-hidden flex"
                      title={opt.subtitle}
                    >
                      <span
                        className="w-1/2 h-full"
                        style={{ backgroundColor: opt.bgHex }}
                      />
                      <span
                        className="w-1/2 h-full"
                        style={{ backgroundColor: opt.primaryHex }}
                      />
                    </div>
                    <div>
                      <div className="text-xs font-sans font-medium">
                        {opt.name}
                      </div>
                      <div className="text-[10px] font-sans text-[var(--stone)]">
                        {opt.subtitle}
                      </div>
                    </div>
                  </div>
                  {isSelected && (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--burgundy)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
