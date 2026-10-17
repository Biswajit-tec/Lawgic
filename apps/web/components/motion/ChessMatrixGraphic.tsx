"use client";

import { useState } from "react";

export function ChessMatrixGraphic() {
  const [hoveredCell, setHoveredCell] = useState<number | null>(4);

  // 3x3 grid definition
  const cells = [
    { id: 0, piece: null, label: "" },
    { id: 1, piece: "♚", label: "Rights", active: true },
    { id: 2, piece: null, label: "" },
    { id: 3, piece: null, label: "" },
    { id: 4, piece: "♞", label: "Strategy", active: true },
    { id: 5, piece: "♛", label: "Precedent", active: true },
    { id: 6, piece: "♝", label: "Counsel", active: true },
    { id: 7, piece: "♜", label: "Defense", active: true },
    { id: 8, piece: "♟", label: "Action", active: true },
  ];

  return (
    <div className="relative w-full aspect-square max-w-[260px] mx-auto flex items-center justify-center p-3 select-none">
      {/* Background circle */}
      <div className="absolute inset-2 rounded-full border border-[var(--burgundy)] opacity-15" />
      <div className="absolute inset-8 rounded-full border border-dashed border-[var(--stone-light)] opacity-30" />

      {/* 3x3 Grid */}
      <div className="relative z-10 grid grid-cols-3 gap-1.5 w-[180px] h-[180px]">
        {cells.map((cell) => {
          const isSelected = hoveredCell === cell.id;
          const isOdd = (Math.floor(cell.id / 3) + (cell.id % 3)) % 2 === 1;

          return (
            <div
              key={cell.id}
              onMouseEnter={() => setHoveredCell(cell.id)}
              className="relative rounded-lg flex flex-col items-center justify-center transition-all duration-300 cursor-pointer border"
              style={{
                backgroundColor: isSelected
                  ? "var(--burgundy)"
                  : isOdd
                  ? "rgba(184, 147, 90, 0.12)"
                  : "rgba(244, 239, 228, 0.7)",
                borderColor: isSelected
                  ? "var(--burgundy-deep)"
                  : "rgba(122, 110, 96, 0.15)",
                transform: isSelected ? "scale(1.06)" : "scale(1)",
                boxShadow: isSelected ? "0 8px 20px rgba(110, 31, 31, 0.25)" : "none",
              }}
            >
              {cell.piece ? (
                <>
                  <span
                    className="text-2xl transition-colors duration-200"
                    style={{
                      color: isSelected
                        ? "var(--ivory)"
                        : isOdd
                        ? "var(--burgundy)"
                        : "var(--charcoal)",
                    }}
                  >
                    {cell.piece}
                  </span>
                  <span
                    className="text-[7.5px] font-sans font-medium tracking-tight uppercase transition-colors"
                    style={{
                      color: isSelected ? "rgba(244,239,228,0.8)" : "var(--stone)",
                    }}
                  >
                    {cell.label}
                  </span>
                </>
              ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--stone-faint)]" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
