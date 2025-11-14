import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { CryptoTicker } from "@/components/sections/CryptoTicker";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { InvestmentOptionsSection } from "@/components/sections/InvestmentOptionsSection";
import { InvestmentPlansSection } from "@/components/sections/InvestmentPlansSection";
import { HowToJoinSection } from "@/components/sections/HowToJoinSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FloatingNotifications } from "@/components/FloatingNotifications";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <CryptoTicker />
        <PartnersSection />
        <AboutSection />
        <InvestmentOptionsSection />
        <InvestmentPlansSection />
        <HowToJoinSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingNotifications />
    </div>
  );
};

export default Index;
