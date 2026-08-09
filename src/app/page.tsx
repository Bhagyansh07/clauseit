import Hero from "@/components/home/hero";
import TrustBar from "@/components/home/trust-bar";
import Problem from "@/components/home/problem";
import HowItWorks from "@/components/home/how-it-works";
import Features from "@/components/home/features";
import Expertise from "@/components/home/expertise";
import WhyUnique from "@/components/home/why-unique";
import PricingTeaser from "@/components/home/pricing-teaser";
import FinalCta from "@/components/home/final-cta";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "ClauseIt",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Upload any PDF, Word document, or a photo of an agreement and get a plain-language analysis: hidden clauses, unfair charges, and a clear risk score.",
  offers: [
    { "@type": "Offer", price: "0", priceCurrency: "INR", description: "Free" },
    { "@type": "Offer", price: "99", priceCurrency: "INR", description: "Pro" },
    { "@type": "Offer", price: "599", priceCurrency: "INR", description: "Premium" },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <TrustBar />
      <Problem />
      <HowItWorks />
      <Features />
      <Expertise />
      <WhyUnique />
      <PricingTeaser />
      <FinalCta />
    </>
  );
}
