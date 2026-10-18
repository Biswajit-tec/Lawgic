"use client";

import React, { useState } from "react";

export function ChessMatrixGraphic() {
  const [hoveredCell, setHoveredCell] = useState<number | null>(4);

  // 9 Light-Colored Cubes in a 3x3 Chessboard Grid
  const cells = [
    { id: 0, piece: "♟", label: "Rights" },
    { id: 1, piece: "♚", label: "Precedent" },
    { id: 2, piece: "♟", label: "Statute" },
    { id: 3, piece: "♜", label: "Defense" },
    { id: 4, piece: "♞", label: "Strategy", isCenter: true },
    { id: 5, piece: "♝", label: "Counsel" },
    { id: 6, piece: "♟", label: "Clause" },
    { id: 7, piece: "♛", label: "Advisory" },
    { id: 8, piece: "⚖", label: "Action" },
  ];

  return (
    <div className="relative w-full max-w-[205px] aspect-square mx-auto flex items-center justify-center select-none">
      {/* 1. Underlying Soft Glow */}
      <div className="absolute inset-2 rounded-2xl bg-[#5EEAD4]/20 blur-lg pointer-events-none" />

      {/* 2. Solid Light Chessboard Tray */}
      <div
        className="relative z-10 w-[195px] h-[195px] p-2 rounded-2xl bg-white/95 border border-white/80"
        style={{
          boxShadow:
            "0 14px 28px rgba(0, 0, 0, 0.12), inset 0 1px 1px rgba(255, 255, 255, 0.9)",
        }}
      >
        {/* 3. 3x3 Grid of 9 Light-Colored Tiles */}
        <div className="grid grid-cols-3 gap-1.5 w-full h-full">
          {cells.map((cell, idx) => {
            const isSelected = hoveredCell === cell.id;
            const row = Math.floor(idx / 3);
            const col = idx % 3;
            const isAlternate = (row + col) % 2 === 1;

            return (
              <div
                key={cell.id}
                onMouseEnter={() => setHoveredCell(cell.id)}
                className={`relative rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors duration-200 border ${
                  isSelected
                    ? "border-[#004741]/50 bg-[#E6F4F1] shadow-xs"
                    : cell.isCenter
                    ? "border-[#B8935A]/50 bg-[#FFFDF8] shadow-xs"
                    : isAlternate
                    ? "border-black/[0.05] bg-[#F4EFE6] shadow-xs"
                    : "border-black/[0.04] bg-white shadow-xs"
                }`}
              >
                {/* Specular cushion highlight on tile */}
                <div className="absolute inset-0 rounded-xl pointer-events-none bg-gradient-to-b from-white/70 via-transparent to-black/[0.03]" />

                {/* Chess piece symbol */}
                <span
                  className={`text-xl sm:text-2xl leading-none mb-0.5 filter drop-shadow-xs transition-colors duration-200 ${
                    cell.isCenter || isSelected
                      ? "text-[#004741]"
                      : "text-[#004741]/85"
                  }`}
                >
                  {cell.piece}
                </span>

                {/* Subtitle label */}
                <span
                  className={`text-[7px] font-sans font-bold tracking-wider uppercase transition-colors duration-200 ${
                    cell.isCenter || isSelected
                      ? "text-[#004741]"
                      : "text-[#2A7B72]"
                  }`}
                >
                  {cell.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
