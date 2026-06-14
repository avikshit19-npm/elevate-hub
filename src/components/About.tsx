"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

interface ValueItem {
  id: string;
  title: string;
  description: string;
  gradient: string;
}

const values: ValueItem[] = [
  {
    id: "01",
    title: "Radical Candor",
    description: "We speak with absolute honesty to unlock pure creative breakthroughs.",
    gradient: "from-indigo-950/20 via-violet-900/10 to-transparent",
  },
  {
    id: "02",
    title: "Peak Execution",
    description: "Every pixel, transition, and strategy is engineered for high performance.",
    gradient: "from-rose-950/20 via-purple-900/10 to-transparent",
  },
  {
    id: "03",
    title: "Culture First",
    description: "We do not follow trends. We inject brands directly into the cultural conversations.",
    gradient: "from-amber-950/20 via-orange-900/10 to-transparent",
  },
  {
    id: "04",
    title: "Frictionless Design",
    description: "Luxury is the absence of noise. We build experiences that feel like air.",
    gradient: "from-cyan-950/20 via-sky-900/10 to-transparent",
  },
];

export default function About() {
  const [hoveredValue, setHoveredValue] = useState<string | null>(null);

  return (
    <section id="about" className="py-32 px-6 md:px-12 bg-transparent relative z-10 transition-colors duration-500">
      {/* Editorial Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        
        {/* Left Column (Sticky Heading) */}
        <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit flex flex-col justify-between">
          <div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-[10px] font-bold tracking-[0.4em] text-brand-slate uppercase mb-6"
            >
              WHO WE ARE
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.15] text-[#0B0B0B] dark:text-white transition-colors duration-500"
            >
              We craft the <span className="font-serif italic">digital identity</span> of tomorrow.
            </motion.h2>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-12 lg:mt-24 border-t border-black/10 dark:border-white/10 pt-8"
          >
            <p className="text-xs text-brand-slate leading-relaxed font-light max-w-sm">
              Elevate Hub operates at the intersection of cultural storytelling and high-end engineering. We align with visionaries to build legendary brands.
            </p>
          </motion.div>
        </div>

        {/* Right Column (Scrolling content) */}
        <div className="lg:col-span-7 flex flex-col gap-24">
          
          {/* Workspace Image Block */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/3] w-full overflow-hidden border border-black/10 dark:border-white/10 bg-black/5"
          >
            <Image 
              src="/workspace.png" 
              alt="Elevate Hub Studio Workspace" 
              fill
              className="object-cover transition-transform duration-1000 hover:scale-105 filter grayscale"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </motion.div>

          {/* Interactive Core Values Grid */}
          <div>
            <h3 className="text-[10px] font-bold tracking-[0.3em] text-brand-slate uppercase mb-8">
              CORE PHILOSOPHY
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map((val) => (
                <motion.div
                  key={val.id}
                  onMouseEnter={() => setHoveredValue(val.id)}
                  onMouseLeave={() => setHoveredValue(null)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                  className="relative h-64 p-8 border border-black/10 dark:border-white/10 overflow-hidden flex flex-col justify-between group cursor-none select-none bg-black/[0.01] dark:bg-white/[0.01]"
                >
                  {/* Fluid Gradient Background Overlay on Hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-tr ${val.gradient} opacity-0 z-0 transition-opacity duration-500`}
                    animate={{ opacity: hoveredValue === val.id ? 1 : 0 }}
                  />
                  
                  {/* Floating mesh orb */}
                  {hoveredValue === val.id && (
                    <motion.div 
                      className="absolute -right-12 -bottom-12 w-44 h-44 rounded-full bg-black/5 dark:bg-white/5 blur-2xl z-0"
                      animate={{
                        x: [0, -15, 0],
                        y: [0, -15, 0],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  )}

                  <div className="relative z-10 flex justify-between items-start">
                    <span className="text-[10px] tracking-[0.2em] font-bold text-brand-slate">
                      {val.id}
                    </span>
                  </div>

                  <div className="relative z-10 mt-auto">
                    <h4 className="text-base font-semibold tracking-wider mb-2 text-[#0B0B0B] dark:text-white transition-colors duration-500">
                      {val.title}
                    </h4>
                    <p className="text-[11px] text-brand-slate font-light leading-relaxed max-w-xs">
                      {val.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Creative Director Image Block */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[16/10] w-full overflow-hidden border border-black/10 dark:border-white/10 bg-black/5"
          >
            <Image 
              src="/creative.png" 
              alt="Creative Direction Interface" 
              fill
              className="object-cover transition-transform duration-1000 hover:scale-105 filter contrast-125 dark:brightness-90"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
