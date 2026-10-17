"use client";

interface LedgerMarginRulerProps {
  start?: number;
  end?: number;
  step?: number;
  theme?: "light" | "dark";
  className?: string;
}

export function LedgerMarginRuler({
  start = 0,
  end = 210,
  step = 10,
  theme = "light",
  className = "",
}: LedgerMarginRulerProps) {
  const count = Math.floor((end - start) / step) + 1;
  const numbers = Array.from({ length: count }, (_, i) => start + i * step);

  const lineColor = theme === "dark" ? "rgba(255, 255, 255, 0.12)" : "rgba(122, 110, 96, 0.18)";
  const textColor = theme === "dark" ? "rgba(244, 239, 228, 0.28)" : "rgba(122, 110, 96, 0.38)";
  const tickColor = theme === "dark" ? "rgba(255, 255, 255, 0.18)" : "rgba(122, 110, 96, 0.25)";

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-0 select-none overflow-hidden hidden md:block ${className}`}
      aria-hidden="true"
    >
      {/* Left ruler */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "clamp(0.75rem, 2vw, 2rem)",
          width: "28px",
          borderRight: `1px solid ${lineColor}`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          paddingTop: "2rem",
          paddingBottom: "2rem",
        }}
      >
        {numbers.map((num, i) => (
          <div
            key={`l-${num}`}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              paddingRight: "6px",
              height: "14px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-sans), monospace",
                fontSize: "8px",
                letterSpacing: "0.08em",
                color: textColor,
                lineHeight: 1,
                transform: "rotate(-90deg)",
                transformOrigin: "center right",
              }}
            >
              {num}
            </span>
            <span
              style={{
                position: "absolute",
                right: 0,
                width: i % 2 === 0 ? "5px" : "3px",
                height: "1px",
                background: tickColor,
              }}
            />
          </div>
        ))}
      </div>

      {/* Right ruler */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: "clamp(0.75rem, 2vw, 2rem)",
          width: "28px",
          borderLeft: `1px solid ${lineColor}`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          paddingTop: "2rem",
          paddingBottom: "2rem",
        }}
      >
        {numbers.map((num, i) => (
          <div
            key={`r-${num}`}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              paddingLeft: "6px",
              height: "14px",
            }}
          >
            <span
              style={{
                position: "absolute",
                left: 0,
                width: i % 2 === 0 ? "5px" : "3px",
                height: "1px",
                background: tickColor,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-sans), monospace",
                fontSize: "8px",
                letterSpacing: "0.08em",
                color: textColor,
                lineHeight: 1,
                transform: "rotate(90deg)",
                transformOrigin: "center left",
              }}
            >
              {num}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
