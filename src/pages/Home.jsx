import React from "react";
import FlowLine from "@/components/landing/FlowLine";
import MouseTracker from "@/components/landing/MouseTracker";
import HeroSection from "@/components/landing/HeroSection";
import AboutSection from "@/components/landing/AboutSection";
import ServicesSection from "@/components/landing/ServicesSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import ApproachSection from "@/components/landing/ApproachSection";
import PortfolioSection from "@/components/landing/PortfolioSection";
import ResultsSection from "@/components/landing/ResultsSection";
import ProcessSection from "@/components/landing/ProcessSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import FAQSection from "@/components/landing/FAQSection";
import BlogSection from "@/components/landing/BlogSection";
import ContactSection from "@/components/landing/ContactSection";
import Footer from "@/components/landing/Footer";
import SectionFrame from "@/components/landing/SectionFrame";
import Marquee from "@/components/landing/Marquee";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      <MouseTracker />
      <FlowLine />

      {/* Hero Section */}
      <HeroSection />

      {/* Marquee Banner */}
      <section className="relative py-6 border-y border-border bg-background/60 backdrop-blur-sm">
        <Marquee speed={26}>
          <span className="flux-skew font-heading font-black text-3xl md:text-6xl text-foreground/80 px-8">
            FLUXENTIQ · AUTOMATE · ORCHESTRATE · DOMINATE · EVOLVE ·{" "}
          </span>
        </Marquee>
        <Marquee reverse speed={34} className="mt-3">
          <span className="flux-skew font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-muted-foreground px-8">
            Not a tool, a perspective — because Fluxentiq is everything systems could be —{" "}
          </span>
        </Marquee>
      </section>

      {/* Page Sections */}
      <SectionFrame className="overflow-hidden">
        <AboutSection />
      </SectionFrame>

      <SectionFrame className="overflow-hidden">
        <ServicesSection />
      </SectionFrame>

      <SectionFrame className="overflow-hidden">
        <BenefitsSection />
      </SectionFrame>

      <SectionFrame className="overflow-hidden">
        <ApproachSection />
      </SectionFrame>

      <SectionFrame className="overflow-hidden">
        <PortfolioSection />
      </SectionFrame>

      <SectionFrame className="overflow-hidden">
        <ResultsSection />
      </SectionFrame>

      <SectionFrame className="overflow-hidden">
        <ProcessSection />
      </SectionFrame>

      <SectionFrame className="overflow-hidden">
        <TestimonialsSection />
      </SectionFrame>

      <SectionFrame className="overflow-hidden">
        <FAQSection />
      </SectionFrame>

      <SectionFrame className="overflow-hidden">
        <BlogSection />
      </SectionFrame>

      <SectionFrame className="overflow-hidden">
        <ContactSection />
      </SectionFrame>

      <Footer />
    </main>
  );
}