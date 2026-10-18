import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans, Courier_Prime } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  preload: true,
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const courierPrime = Courier_Prime({
  variable: "--font-typewriter",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    template: "%s | Lawgic",
    default: "Lawgic — Making India's Legal System Understandable",
  },
  description:
    "Lawgic helps you understand legal documents, court orders, and government notices in plain language — in the language you know best.",
  icons: {
    icon: "/favicon.ico",
  },
  keywords: [
    "legal document decoder",
    "Indian legal system",
    "legal aid India",
    "legal document translation",
    "plain language law",
    "legal accessibility India",
  ],
  authors: [{ name: "Lawgic" }],
  creator: "Lawgic",
  metadataBase: new URL("https://lawgic.in"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://lawgic.in",
    siteName: "Lawgic",
    title: "Lawgic — Making India's Legal System Understandable",
    description:
      "Understand legal documents, court orders, and government notices in plain language — in the language you know best.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lawgic — Making India's Legal System Understandable",
    description:
      "Understand legal documents, court orders, and government notices in plain language.",
    creator: "@lawgic_in",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#F4EFE4",
  width: "device-width",
  initialScale: 1,
};

import { ThemeProvider } from "@/components/layout/ThemeContext";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${plusJakarta.variable} ${courierPrime.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
