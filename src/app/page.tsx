import SmoothScroll from "@/components/SmoothScroll";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import PhilosophySection from "@/components/PhilosophySection";
import WorksSection from "@/components/WorksSection";
import CTASection from "@/components/CTASection";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  return (
    <SmoothScroll>
      <Navigation />
      <main>
        <HeroSection />
        <PhilosophySection />
        <WorksSection />
        <CTASection />
      </main>
      <FooterSection />
    </SmoothScroll>
  );
}
