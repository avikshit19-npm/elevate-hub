"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import MagneticButton from "@/components/ui/MagneticButton";
import About from "@/components/About";
import Services from "@/components/Services";
import Blogs from "@/components/Blogs";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const { scrollY } = useScroll();

  // Dark theme colors (subtle scroll mapping from pure black to deep charcoal for depth)
  const bgColor = useTransform(scrollY, [0, 500], ["#030303", "#0B0B0B"]);
  const textColor = "#ffffff";
  
  // Constant dark theme settings for sub-elements
  const badgeBg = "rgba(255,255,255,0.03)";
  const badgeBorder = "rgba(255,255,255,0.08)";
  const badgeText = "rgba(255,255,255,0.6)";
  
  const titleColor1 = "#ffffff";
  const titleColor1Fade = "rgba(255,255,255,0.8)";
  const titleColor2 = "#a5b4fc"; // Indigo-300
  const titleColor3 = "#fda4af"; // Rose-300
  const descColor = "rgba(255,255,255,0.4)";

  return (
    <motion.div
      style={{
        backgroundColor: bgColor,
        color: textColor,
        // Propagate colors to child components via CSS variables
        "--hero-bg": bgColor,
        "--hero-badge-bg": badgeBg,
        "--hero-badge-border": badgeBorder,
        "--hero-badge-text": badgeText,
        "--hero-text-1": titleColor1,
        "--hero-text-1-fade": titleColor1Fade,
        "--hero-text-2": titleColor2,
        "--hero-text-3": titleColor3,
        "--hero-desc": descColor,
      } as any}
      className="w-full min-h-screen relative flex flex-col transition-colors duration-500 overflow-x-hidden"
    >
      {/* 1. Hero Section */}
      <section id="home" className="relative w-full min-h-screen flex items-center justify-center">
        <HeroGeometric 
          badge="" 
          title1="ELEVATE HUB" 
          title2="WE SCALE BRANDS INTO CULTURE" 
        />
        
        {/* Scroll Call to Action */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
          <a href="#about">
            <MagneticButton className="shadow-sm">
              Discover the Hub
            </MagneticButton>
          </a>
        </div>
      </section>

      {/* 2. About Us Section */}
      <About />

      {/* 3. Services Section */}
      <Services />

      {/* 4. Insights Section */}
      <Blogs />

      {/* 5. Testimonials Section */}
      <Testimonials />

      {/* 6. Contact Us Section */}
      <Contact />

      {/* 7. Footer */}
      <Footer />
    </motion.div>
  );
}
