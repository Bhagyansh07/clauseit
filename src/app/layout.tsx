import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  Poppins,
  Inter,
  Noto_Sans_Devanagari,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const notoDevanagari = Noto_Sans_Devanagari({
  variable: "--font-noto-deva",
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
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
      className={`${poppins.variable} ${inter.variable} ${notoDevanagari.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=window.localStorage.getItem("theme");var d=s==="dark"||(!s&&window.matchMedia("(prefers-color-scheme: dark)").matches);if(d)document.documentElement.classList.add("dark");}catch(e){}})();`,
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col bg-parchment font-sans text-ink antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
