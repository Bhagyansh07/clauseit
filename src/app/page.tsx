import Hero from "@/components/home/hero";
import Problem from "@/components/home/problem";
import HowItWorks from "@/components/home/how-it-works";
import Features from "@/components/home/features";
import Expertise from "@/components/home/expertise";
import WhyUnique from "@/components/home/why-unique";
import PricingTeaser from "@/components/home/pricing-teaser";
import FinalCta from "@/components/home/final-cta";

export default function Home() {
  return (
    <>
      <Hero />
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
