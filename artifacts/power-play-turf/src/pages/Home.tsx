import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { SportsSection } from "@/components/SportsSection";
import { WhyUsSection } from "@/components/WhyUsSection";
import { StatsSection } from "@/components/StatsSection";
import { BookingSection } from "@/components/BookingSection";
import { GallerySection } from "@/components/GallerySection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { HowToBookSection } from "@/components/HowToBookSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary selection:text-white">
      <Navbar />
      
      <main>
        <HeroSection />
        <SportsSection />
        <WhyUsSection />
        <StatsSection />
        <HowToBookSection />
        <BookingSection />
        <GallerySection />
        <TestimonialsSection />
        <AboutSection />
        <ContactSection />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
