import { useRef } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AnnouncementsSection from "@/components/AnnouncementsSection";
import AboutSection from "@/components/AboutSection";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  const announcementsRef = useRef<HTMLDivElement>(null);

  const scrollToAnnouncements = () => {
    announcementsRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection onGetStarted={scrollToAnnouncements} />

      <div ref={announcementsRef}>
        <AnnouncementsSection />
      </div>
      <AboutSection />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
