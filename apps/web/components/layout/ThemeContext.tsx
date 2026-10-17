"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemeId =
  | "classic-ivory"
  | "sand-cyprus"
  | "lime-canopy"
  | "milk-matcha"
  | "petal-espresso";

export interface ThemeOption {
  id: ThemeId;
  name: string;
  subtitle: string;
  bgHex: string;
  primaryHex: string;
  accentHex: string;
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: "classic-ivory",
    name: "Classic Ivory",
    subtitle: "Warm Ivory & Burgundy",
    bgHex: "#F4EFE4",
    primaryHex: "#6E1F1F",
    accentHex: "#B8935A",
  },
  {
    id: "sand-cyprus",
    name: "Sand & Cyprus",
    subtitle: "Minimal Sand & Deep Emerald",
    bgHex: "#F0EDE6",
    primaryHex: "#004741",
    accentHex: "#2A7B72",
  },
  {
    id: "milk-matcha",
    name: "Milk Honey & Matcha",
    subtitle: "Warm Cream & Herbal Sage",
    bgHex: "#F5EFCF",
    primaryHex: "#4B5A2F",
    accentHex: "#9CA763",
  },
  {
    id: "petal-espresso",
    name: "Petal Frost & Espresso",
    subtitle: "Soft Blush & Rich Espresso",
    bgHex: "#FAF0F4",
    primaryHex: "#4F2B1F",
    accentHex: "#A05A44",
  },
  {
    id: "lime-canopy",
    name: "Lime Sprout & Canopy",
    subtitle: "Airy Lime & Deep Forest",
    bgHex: "#F4FBE7",
    primaryHex: "#2D3E2C",
    accentHex: "#608A5E",
  },
];

interface ThemeContextType {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
  currentThemeOption: ThemeOption;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "classic-ivory",
  setTheme: () => {},
  currentThemeOption: THEME_OPTIONS[0],
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>("classic-ivory");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("lawgic-theme") as ThemeId | null;
    if (saved && THEME_OPTIONS.some((t) => t.id === saved)) {
      setThemeState(saved);
      document.documentElement.setAttribute("data-theme", saved);
    } else {
      document.documentElement.setAttribute("data-theme", "classic-ivory");
    }
  }, []);

  const setTheme = (newTheme: ThemeId) => {
    setThemeState(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("lawgic-theme", newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
    }
  };

  const currentThemeOption =
    THEME_OPTIONS.find((t) => t.id === theme) || THEME_OPTIONS[0];

  return (
    <ThemeContext.Provider value={{ theme, setTheme, currentThemeOption }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
