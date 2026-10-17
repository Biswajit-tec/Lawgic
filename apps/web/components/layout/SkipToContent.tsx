"use client";

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      style={{
        position: "fixed",
        top: "-100%",
        left: "1rem",
        background: "var(--burgundy)",
        color: "var(--ivory)",
        padding: "0.75rem 1.25rem",
        borderRadius: "var(--radius-md)",
        fontFamily: "var(--font-sans)",
        fontWeight: 600,
        fontSize: "0.875rem",
        textDecoration: "none",
        zIndex: 9999,
        transition: "top 0.2s ease",
      }}
      onFocus={(e) => ((e.target as HTMLElement).style.top = "1rem")}
      onBlur={(e) => ((e.target as HTMLElement).style.top = "-100%")}
    >
      Skip to main content
    </a>
  );
}
