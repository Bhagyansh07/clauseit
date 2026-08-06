import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  Fraunces,
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  IBM_Plex_Sans_Devanagari,
} from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plex = IBM_Plex_Sans({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexDevanagari = IBM_Plex_Sans_Devanagari({
  variable: "--font-plex-deva",
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://clauseit.in"),
  title: {
    default: "ClauseIt — Read the clauses, not the fine print",
    template: "%s | ClauseIt",
  },
  description:
    "Upload any PDF, Word document, or a photo of an agreement and ClauseIt explains it in plain language: hidden clauses, unfair charges, and a clear risk score.",
  openGraph: {
    type: "website",
    siteName: "ClauseIt",
    title: "ClauseIt — Read the clauses, not the fine print",
    description:
      "Upload any document and get a plain-language breakdown: hidden clauses, unfair charges, and a clear risk score.",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${plex.variable} ${plexDevanagari.variable} ${plexMono.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-parchment font-sans text-ink antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
