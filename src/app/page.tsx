import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { FeaturesGrid } from "@/components/landing/FeaturesGrid";
import { CTASection } from "@/components/landing/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <FeaturesGrid />
      <CTASection />
    </>
  );
}