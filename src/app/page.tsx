import type { Metadata } from "next";
import Navigation from "@/components/v3/Navigation";
import HeroSection from "@/components/v3/HeroSection";
import StanceSection from "@/components/v3/StanceSection";
import MethodologySection from "@/components/v3/MethodologySection";
import SystemSection from "@/components/v3/SystemSection";
import ServicesSection from "@/components/v3/ServicesSection";
import VoiceSection from "@/components/v3/VoiceSection";
import ContactSection from "@/components/v3/ContactSection";
import Footer from "@/components/v3/Footer";

export const metadata: Metadata = {
  title: "Siriai — Architecture for thinking with AI",
  description:
    "AI로 사고하는 조직을 위한 의사결정 구조 설계. 서울 기반 AI 아키텍처 · 리터러시 컨설팅.",
};

export default function V3Home() {
  return (
    <>
      <Navigation />
      <main
        style={{
          backgroundColor: "var(--surface-base)",
          color: "var(--fg-default)",
          fontFamily: "var(--font-sans)",
        }}
      >
        <HeroSection />
        <StanceSection />
        <MethodologySection />
        <SystemSection />
        <ServicesSection />
        <VoiceSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
