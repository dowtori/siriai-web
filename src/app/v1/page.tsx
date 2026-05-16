import SmoothScroll from "@/components/v1/SmoothScroll";
import ScrollProgressBar from "@/components/v1/ScrollProgressBar";
import SectionIndicator from "@/components/v1/SectionIndicator";
import Navigation from "@/components/v1/Navigation";
import HeroSection from "@/components/v1/HeroSection";
import ConnectionSection from "@/components/v1/ConnectionSection";
import RelationshipIntroSection from "@/components/v1/RelationshipIntroSection";
import ArchitectureSection from "@/components/v1/ArchitectureSection";
import PhilosophySection from "@/components/v1/PhilosophySection";
import AIStudioSection from "@/components/v1/AIStudioSection";
import CreatorSection from "@/components/v1/CreatorSection";
import ArchivingSection from "@/components/v1/ArchivingSection";
import ManifestoQuoteSection from "@/components/v1/ManifestoQuoteSection";
import GrowthSection from "@/components/v1/GrowthSection";
import ServicesSection from "@/components/v1/ServicesSection";
import WorksSection from "@/components/v1/WorksSection";
import CTASection from "@/components/v1/CTASection";
import FooterSection from "@/components/v1/FooterSection";

export default function Home() {
  return (
    <SmoothScroll>
      <ScrollProgressBar />
      <SectionIndicator />
      <Navigation />
      <main>
        <div id="s-hero"><HeroSection /></div>
        <div id="s-connection"><ConnectionSection /></div>
        <div id="s-relationship"><RelationshipIntroSection /></div>
        <div id="s-architecture"><ArchitectureSection /></div>
        <div id="s-philosophy"><PhilosophySection /></div>
        <div id="s-aistudio"><AIStudioSection /></div>
        <div id="s-creator"><CreatorSection /></div>
        <div id="s-archiving"><ArchivingSection /></div>

        {/* Dark Act — Manifesto + Growth share one continuous dark background */}
        <div className="bg-[#111110]">
          <div id="s-manifesto"><ManifestoQuoteSection /></div>
          {/* subtle bridge between the two dark sections */}
          <div className="flex justify-center">
            <div className="w-12 h-px bg-white/[0.07]" />
          </div>
          <div id="s-growth"><GrowthSection /></div>
        </div>

        <div id="s-services"><ServicesSection /></div>
        <WorksSection />
        <CTASection />
      </main>
      <FooterSection />
    </SmoothScroll>
  );
}
