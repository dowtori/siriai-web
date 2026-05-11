import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import SectionIndicator from "@/components/SectionIndicator";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ConnectionSection from "@/components/ConnectionSection";
import RelationshipIntroSection from "@/components/RelationshipIntroSection";
import ArchitectureSection from "@/components/ArchitectureSection";
import PhilosophySection from "@/components/PhilosophySection";
import AIStudioSection from "@/components/AIStudioSection";
import CreatorSection from "@/components/CreatorSection";
import ArchivingSection from "@/components/ArchivingSection";
import ManifestoQuoteSection from "@/components/ManifestoQuoteSection";
import GrowthSection from "@/components/GrowthSection";
import ServicesSection from "@/components/ServicesSection";
import WorksSection from "@/components/WorksSection";
import CTASection from "@/components/CTASection";
import FooterSection from "@/components/FooterSection";

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
