"use client";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function ShinyText({
  text,
  disabled = false,
  speed = 5,
  className = "",
  style = {},
}: ShinyTextProps) {
  const animationDuration = `${speed}s`;

  return (
    <span
      className={`shiny-text ${disabled ? "" : "animate-shiny"} ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(120deg, var(--burgundy) 0%, var(--burgundy) 35%, var(--brass-light) 50%, var(--burgundy) 65%, var(--burgundy) 100%)",
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        display: "inline-block",
        ...style,
      }}
    >
      {text}
      <style>{`
        @keyframes shinyMove {
          0% {
            background-position: 100% 0;
          }
          100% {
            background-position: -100% 0;
          }
        }
        .animate-shiny {
          animation: shinyMove ${animationDuration} ease-in-out infinite;
        }
      `}</style>
    </span>
  );
}
