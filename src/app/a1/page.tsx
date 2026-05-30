import A1Navigation from "@/components/a1/A1Navigation";
import A1Footer from "@/components/a1/A1Footer";
import Stage1Hero from "@/components/a1/Stage1Hero";
import Stage12Transition from "@/components/a1/Stage12Transition";
import Stage2Composition from "@/components/a1/Stage2Composition";
import Stage23ClientsRibbon from "@/components/a1/Stage23ClientsRibbon";
import Stage3Outro from "@/components/a1/Stage3Outro";

export default function A1Home() {
  return (
    <>
      <A1Navigation />
      <main>
        <Stage1Hero />
        <Stage12Transition />
        <Stage2Composition />
        <Stage23ClientsRibbon />
        <Stage3Outro />
      </main>
      <A1Footer />
    </>
  );
}
