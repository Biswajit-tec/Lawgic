"use client";

interface LaurelWreathSealProps {
  title: string;
  subtitle: string;
  year?: string;
  stars?: number;
  theme?: "light" | "dark";
  className?: string;
}

export function LaurelWreathSeal({
  title,
  subtitle,
  year = "2026",
  stars = 3,
  theme = "light",
  className = "",
}: LaurelWreathSealProps) {
  const isDark = theme === "dark";
  const leafColor = isDark ? "rgba(244, 239, 228, 0.45)" : "rgba(122, 110, 96, 0.4)";
  const starColor = isDark ? "var(--brass-light)" : "var(--burgundy)";
  const textColor = isDark ? "var(--ivory)" : "var(--charcoal)";
  const subColor = isDark ? "rgba(244, 239, 228, 0.6)" : "var(--stone)";

  return (
    <div className={`flex flex-col items-center justify-center select-none text-center px-2 ${className}`}>
      {/* Laurel Wreath SVG */}
      <div className="relative w-28 h-28 flex items-center justify-center">
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Left Wreath Branch */}
          <g stroke={leafColor} strokeWidth="1.2" strokeLinecap="round">
            <path d="M 50 90 C 25 85 14 65 18 45 C 20 30 30 18 45 12" />
            {/* Left Leaves */}
            <path d="M 46 88 C 40 85 36 80 39 76 C 42 77 46 82 46 88 Z" fill={leafColor} />
            <path d="M 36 82 C 28 78 24 72 28 68 C 31 70 36 75 36 82 Z" fill={leafColor} />
            <path d="M 28 71 C 20 65 17 58 22 55 C 25 57 28 64 28 71 Z" fill={leafColor} />
            <path d="M 22 58 C 15 50 14 42 20 40 C 22 43 24 51 22 58 Z" fill={leafColor} />
            <path d="M 20 44 C 15 35 17 28 23 27 C 24 31 24 38 20 44 Z" fill={leafColor} />
            <path d="M 24 31 C 22 22 27 16 33 16 C 33 20 30 26 24 31 Z" fill={leafColor} />
            <path d="M 33 20 C 34 13 41 10 46 12 C 45 16 39 20 33 20 Z" fill={leafColor} />
          </g>

          {/* Right Wreath Branch */}
          <g stroke={leafColor} strokeWidth="1.2" strokeLinecap="round">
            <path d="M 50 90 C 75 85 86 65 82 45 C 80 30 70 18 55 12" />
            {/* Right Leaves */}
            <path d="M 54 88 C 60 85 64 80 61 76 C 58 77 54 82 54 88 Z" fill={leafColor} />
            <path d="M 64 82 C 72 78 76 72 72 68 C 69 70 64 75 64 82 Z" fill={leafColor} />
            <path d="M 72 71 C 80 65 83 58 78 55 C 75 57 72 64 72 71 Z" fill={leafColor} />
            <path d="M 78 58 C 85 50 86 42 80 40 C 78 43 76 51 78 58 Z" fill={leafColor} />
            <path d="M 80 44 C 85 35 83 28 77 27 C 76 31 76 38 80 44 Z" fill={leafColor} />
            <path d="M 76 31 C 78 22 73 16 67 16 C 67 20 70 26 76 31 Z" fill={leafColor} />
            <path d="M 67 20 C 66 13 59 10 54 12 C 55 16 61 20 67 20 Z" fill={leafColor} />
          </g>
        </svg>

        {/* Content inside laurel wreath */}
        <div className="relative z-10 flex flex-col items-center justify-center p-2">
          {/* Stars */}
          <div className="flex items-center gap-0.5 mb-1">
            {Array.from({ length: stars }).map((_, i) => (
              <span key={i} style={{ color: starColor }} className="text-[9px]">
                ★
              </span>
            ))}
          </div>

          {/* Award Title */}
          <span
            className="font-serif text-[10px] md:text-[11px] font-semibold leading-tight max-w-[70px]"
            style={{ color: textColor }}
          >
            {title}
          </span>

          {/* Subtitle / Leader */}
          <span
            className="font-sans text-[8px] font-medium tracking-tight mt-0.5 leading-none"
            style={{ color: subColor }}
          >
            {subtitle}
          </span>

          {/* Year */}
          <span
            className="font-sans text-[7.5px] tracking-wider uppercase mt-1 opacity-60"
            style={{ color: subColor }}
          >
            {year}
          </span>
        </div>
      </div>
    </div>
  );
}
