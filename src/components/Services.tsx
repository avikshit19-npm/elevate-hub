"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface Service {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  caseStudy: {
    client: string;
    result: string;
    description: string;
  };
  deliverables: string[];
  workflow: string[];
}

const servicesList: Service[] = [
  {
    id: "01",
    title: "STRATEGY",
    subtitle: "Cultural Positioning",
    desc: "We analyze subcultures and market inefficiencies to position your brand where the future is going.",
    caseStudy: {
      client: "Vesper Group",
      result: "+180% Engagement",
      description: "Repositioned legacy luxury estate into an elite community hub.",
    },
    deliverables: ["Subculture Mapping", "Brand Architecture", "Go-to-Market Blueprint"],
    workflow: ["Listen", "Map", "Define", "Blueprint"],
  },
  {
    id: "02",
    title: "CREATIVE",
    subtitle: "High-End Art Direction",
    desc: "We design experiences that capture attention and create desire. We reject the generic.",
    caseStudy: {
      client: "Solas Fragrances",
      result: "+42% Conversion",
      description: "Stunning 3D e-commerce system that visualizes scent profiles.",
    },
    deliverables: ["Visual Identity Systems", "High-Fidelity UI/UX", "3D Motion Design"],
    workflow: ["Ideate", "Prototype", "Refine", "Deliver"],
  },
  {
    id: "03",
    title: "GROWTH",
    subtitle: "Precision Distribution",
    desc: "Performance marketing meets editorial style. We scale without diluting brand equity.",
    caseStudy: {
      client: "Modus Apparel",
      result: "4.8x ROAS Scale",
      description: "Engineered premium funnel strategy capturing high-net-worth audiences.",
    },
    deliverables: ["Conversion Funnels", "Premium SEO Execution", "Targeted Paid Acquisition"],
    workflow: ["Audit", "Optimize", "Experiment", "Scale"],
  },
  {
    id: "04",
    title: "DEV",
    subtitle: "Next-Gen Engineering",
    desc: "Ultra-fast Next.js architecture, WebGL animations, and seamless custom integrations.",
    caseStudy: {
      client: "Aether Finance",
      result: "60fps WebGL Interface",
      description: "A real-time financial tracking application optimized for latency.",
    },
    deliverables: ["Next.js/React Codebases", "Interactive WebGL/GSAP", "Custom Headless CMS"],
    workflow: ["Architecture", "Code", "Animate", "Deploy"],
  },
];

export default function Services() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: scrollRef });
  const [expandedId, setExpandedId] = useState<string | null>("01");

  // Map vertical scroll of the section to horizontal translation of the cards
  const xTranslate = useTransform(scrollYProgress, [0, 1], ["0%", "-52%"]);

  return (
    <div ref={scrollRef} id="services" className="relative h-[250vh] bg-transparent">
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center py-20">
        
        {/* Header */}
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 mb-12 flex justify-between items-end">
          <div>
            <p className="text-[10px] font-bold tracking-[0.4em] text-brand-slate uppercase mb-3">
              SERVICES
            </p>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight text-[#0B0B0B] dark:text-white transition-colors duration-500">
              Pillars of <span className="font-serif italic">Execution</span>.
            </h2>
          </div>
          <p className="hidden md:block text-[10px] text-brand-slate tracking-widest font-semibold uppercase text-right max-w-xs">
            [ Scroll to scroll horizontal. Click card to expand workflow ]
          </p>
        </div>

        {/* Horizontal Container */}
        <div className="relative overflow-hidden flex-1 flex items-center">
          <motion.div 
            style={{ x: xTranslate }} 
            className="flex gap-6 px-6 md:px-12"
          >
            {servicesList.map((svc) => {
              const isExpanded = expandedId === svc.id;

              return (
                <motion.div
                  key={svc.id}
                  onClick={() => setExpandedId(svc.id)}
                  animate={{ width: isExpanded ? "640px" : "320px" }}
                  transition={{ type: "spring", stiffness: 140, damping: 18 }}
                  className="shrink-0 h-[50vh] border border-black/10 dark:border-white/10 p-8 flex flex-col justify-between group cursor-none select-none relative overflow-hidden bg-black/[0.01] dark:bg-white/[0.01] hover:border-black/30 dark:hover:border-white/30 transition-all duration-300"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[9px] tracking-[0.2em] font-bold text-brand-slate block">
                        SERVICE &nbsp; // &nbsp; {svc.id}
                      </span>
                      <h3 className="text-lg font-bold tracking-[0.1em] text-[#0B0B0B] dark:text-white mt-1 transition-colors duration-500">
                        {svc.title}
                      </h3>
                      <p className="text-[9px] tracking-widest text-brand-slate uppercase font-medium mt-0.5">
                        {svc.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Normal view content */}
                  {!isExpanded && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="mt-4"
                    >
                      <p className="text-[11px] text-brand-slate font-light leading-relaxed mb-6">
                        {svc.desc}
                      </p>
                      <span className="inline-flex items-center gap-2 text-[9px] font-bold tracking-widest text-[#0B0B0B] dark:text-white">
                        EXPAND DETAILS <ArrowRight className="h-3 w-3" />
                      </span>
                    </motion.div>
                  )}

                  {/* Expanded view content */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.15 }}
                      className="grid grid-cols-2 gap-8 mt-4 h-full pt-4 border-t border-black/5 dark:border-white/5 overflow-hidden"
                    >
                      {/* Left: Case study & Deliverables */}
                      <div className="flex flex-col justify-between">
                        <div>
                          <p className="text-[8px] font-bold tracking-widest text-brand-slate uppercase mb-1">
                            CASE STUDY // {svc.caseStudy.client}
                          </p>
                          <p className="text-[11px] font-bold text-[#0B0B0B] dark:text-white mb-0.5">
                            {svc.caseStudy.result}
                          </p>
                          <p className="text-[10px] text-brand-slate leading-relaxed font-light mb-4">
                            {svc.caseStudy.description}
                          </p>
                        </div>
                        <div className="mt-auto">
                          <p className="text-[8px] font-bold tracking-widest text-brand-slate uppercase mb-1">
                            DELIVERABLES
                          </p>
                          <ul className="flex flex-col gap-1">
                            {svc.deliverables.map((deliv, idx) => (
                              <li key={idx} className="flex items-center gap-1 text-[9px] text-brand-slate font-medium">
                                <CheckCircle2 className="h-2.5 w-2.5 text-black dark:text-white shrink-0" />
                                {deliv}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Right: Live Interactive Workflow Diagram */}
                      <div className="flex flex-col justify-between items-center border-l border-black/5 dark:border-white/5 pl-8">
                        <p className="text-[8px] font-bold tracking-widest text-brand-slate uppercase self-start mb-2">
                          WORKFLOW PIPELINE
                        </p>
                        
                        {/* Interactive SVG-like vertical flow */}
                        <div className="relative w-full flex-1 flex flex-col justify-around items-center py-2">
                          {svc.workflow.map((flowStep, idx) => {
                            return (
                              <div key={idx} className="flex items-center gap-3 w-full pl-4 relative">
                                {/* Connecting line */}
                                {idx < svc.workflow.length - 1 && (
                                  <div className="absolute left-[19px] top-4 w-[1px] h-[3.5vh] bg-black/10 dark:bg-white/10 overflow-hidden">
                                    <motion.div
                                      className="w-full h-1/2 bg-black dark:bg-white"
                                      animate={{ y: ["0%", "200%"] }}
                                      transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
                                    />
                                  </div>
                                )}
                                
                                <div className="relative flex items-center justify-center">
                                  <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.4 }}
                                    className="w-[7px] h-[7px] rounded-full bg-black dark:bg-white z-10"
                                  />
                                </div>

                                <div className="text-left">
                                  <span className="text-[8px] font-semibold text-brand-slate block leading-none">
                                    PHASE 0{idx + 1}
                                  </span>
                                  <span className="text-[9px] font-bold text-[#0B0B0B] dark:text-white tracking-widest uppercase">
                                    {flowStep}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
