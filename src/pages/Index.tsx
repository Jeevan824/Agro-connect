import { HeroSection } from "@/components/HeroSection";
import { LanguageProvider } from "@/contexts/LanguageContext";

const Index = () => {
  return (
    <LanguageProvider>
      <HeroSection />
    </LanguageProvider>
  );
};

export default Index;