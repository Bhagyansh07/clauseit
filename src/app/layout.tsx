import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
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
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="flex min-h-screen flex-col bg-paper font-sans text-ink antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
