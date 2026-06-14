"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { X, Play, Pause, Award } from "lucide-react";

interface Testimonial {
  id: string;
  quote: string;
  client: string;
  role: string;
  company: string;
  metrics: { label: string; value: string }[];
}

const testimonials: Testimonial[] = [
  {
    id: "01",
    quote: "Elevate Hub took our brand from a local name to a cultural phenomenon. The metrics speak for themselves.",
    client: "Marcus Aurelius",
    role: "Chief Marketing Officer",
    company: "Vesper Group",
    metrics: [
      { label: "Revenue Growth", value: "+340%" },
      { label: "Community Engagement", value: "+180%" },
      { label: "Capital Raised", value: "$12.5M" },
    ],
  },
  {
    id: "02",
    quote: "Their creative direction is pure luxury. They designed a scent-visualization experience that feels completely weightless.",
    client: "Elena Rostova",
    role: "Founder & Creative Director",
    company: "Solas Fragrances",
    metrics: [
      { label: "Conversion Rate", value: "+42%" },
      { label: "Active Monthly Users", value: "250K+" },
      { label: "SEO Visibility Boost", value: "3.2x" },
    ],
  },
  {
    id: "03",
    quote: "Peak execution at its finest. They built a custom WebGL framework that handles high-traffic trading without a single hiccup.",
    client: "Dax Sterling",
    role: "Chief Technology Officer",
    company: "Aether Finance",
    metrics: [
      { label: "WebGL Performance", value: "60fps" },
      { label: "Latency Spike", value: "0ms" },
      { label: "System Uptime", value: "99.99%" },
    ],
  },
];

export default function Testimonials() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const activeTestimonial = testimonials.find((t) => t.id === selectedId);

  const handleTestimonialClick = (id: string) => {
    setSelectedId(id);
    setIsPlaying(false);
  };

  return (
    <section id="testimonials" className="py-32 px-6 md:px-12 bg-transparent relative z-10 transition-colors duration-500 border-t border-black/5 dark:border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <p className="text-[10px] font-bold tracking-[0.4em] text-brand-slate uppercase mb-3">
            PROOF
          </p>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight text-[#0B0B0B] dark:text-white transition-colors duration-500">
            Client <span className="font-serif italic">Reviews</span>.
          </h2>
        </div>

        {/* Draggable Carousel */}
        <div className="relative overflow-hidden cursor-grab active:cursor-grabbing pb-8">
          <motion.div 
            ref={carouselRef}
            drag="x"
            dragConstraints={{ left: -500, right: 0 }}
            className="flex gap-8 md:gap-12 w-max"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.id}
                onClick={() => handleTestimonialClick(t.id)}
                whileHover={{ scale: 0.995 }}
                className="w-[85vw] md:w-[540px] border border-black/10 dark:border-white/10 p-10 md:p-12 bg-black/[0.01] dark:bg-white/[0.01] hover:border-black/25 dark:hover:border-white/25 transition-all duration-300 flex flex-col justify-between h-[360px] cursor-none select-none"
                data-cursor-text="OPEN"
              >
                <div className="text-xl md:text-2xl font-light italic leading-relaxed text-black dark:text-white tracking-wide font-serif mb-8">
                  &ldquo;{t.quote}&rdquo;
                </div>

                <div className="flex items-center justify-between mt-auto pt-6 border-t border-black/5 dark:border-white/5">
                  <div>
                    <h4 className="text-[10px] font-bold tracking-widest text-[#0B0B0B] dark:text-white uppercase">
                      {t.client}
                    </h4>
                    <p className="text-[9px] text-brand-slate mt-0.5 font-medium">
                      {t.role}, {t.company}
                    </p>
                  </div>
                  <span className="text-[8px] font-bold tracking-widest text-brand-slate uppercase block">
                    VIEW AUDITED METRICS // ↘
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Drawer Component Overlay */}
        <AnimatePresence>
          {selectedId && activeTestimonial && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedId(null)}
                className="fixed inset-0 z-[45] bg-black/70 backdrop-blur-sm"
              />

              {/* Slide-up Drawer */}
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 220, damping: 24 }}
                className="fixed bottom-0 left-0 right-0 z-50 h-[85vh] bg-[#0B0B0B] text-white border-t border-white/10 rounded-t-[24px] p-8 md:p-16 flex flex-col overflow-y-auto cursor-none"
              >
                {/* Drawer Close Button */}
                <button
                  onClick={() => setSelectedId(null)}
                  className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors duration-300 p-2 rounded-full border border-white/10 cursor-none"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start h-full mt-4">
                  
                  {/* Left Column: Metrics & Info */}
                  <div className="lg:col-span-5 flex flex-col justify-between h-full py-2">
                    <div>
                      <span className="text-[9px] tracking-[0.3em] text-white/40 font-bold block mb-4">
                        METRICS DELIVERED
                      </span>
                      <h3 className="text-2xl md:text-3xl font-serif italic text-white mb-2 leading-tight">
                        {activeTestimonial.company}
                      </h3>
                      <p className="text-[11px] text-white/50 font-light leading-relaxed mb-8 max-w-sm">
                        Partnering with their leadership to scale digital ecosystems. Here are the audited growth parameters achieved.
                      </p>

                      {/* Hard Metrics List */}
                      <div className="flex flex-col gap-6">
                        {activeTestimonial.metrics.map((metric, idx) => (
                          <div key={idx} className="border-l border-white/20 pl-4 py-1">
                            <span className="text-[9px] tracking-[0.2em] font-bold text-white/40 block">
                              {metric.label.toUpperCase()}
                            </span>
                            <span className="text-2xl font-extrabold tracking-tight text-white mt-1 block">
                              {metric.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-12 lg:mt-20 flex items-center gap-4 border-t border-white/10 pt-6">
                      <div className="bg-white/5 p-3 rounded-full">
                        <Award className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <span className="text-[8px] text-white/50 block">CASE REVIEWER</span>
                        <span className="text-[10px] font-bold tracking-widest uppercase text-white block mt-0.5">
                          {activeTestimonial.client}
                        </span>
                        <span className="text-[9px] text-white/40">{activeTestimonial.role}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Premium Mock Video Player */}
                  <div className="lg:col-span-7 flex flex-col h-full py-2">
                    <span className="text-[9px] tracking-[0.3em] text-white/40 font-bold block mb-4">
                      CASE STUDY FILM
                    </span>

                    <div 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="relative flex-1 aspect-[16/9] lg:aspect-auto min-h-[300px] border border-white/10 bg-black/40 flex items-center justify-center overflow-hidden group select-none"
                    >
                      {/* Abstract Animated Mesh Background */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-tr from-violet-950/20 via-indigo-950/30 to-black z-0"
                        animate={isPlaying ? {
                          scale: [1, 1.05, 1],
                        } : {}}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                      />

                      {/* Glowing Floating Orb */}
                      {isPlaying && (
                        <motion.div 
                          className="absolute w-60 h-60 rounded-full bg-indigo-500/10 blur-3xl"
                          animate={{
                            x: [0, 30, -30, 0],
                            y: [0, -20, 20, 0],
                          }}
                          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        />
                      )}

                      <div className="relative z-10 text-center flex flex-col items-center">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          className="w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center text-white cursor-none"
                        >
                          {isPlaying ? <Pause className="h-5 w-5 fill-white" /> : <Play className="h-5 w-5 fill-white translate-x-0.5" />}
                        </motion.button>

                        <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/60 mt-3 block">
                          {isPlaying ? "PAUSE CASE FILM" : "PLAY CASE FILM"}
                        </span>
                        <p className="text-[8px] text-white/40 mt-1 max-w-[200px]">
                          [ An abstract visualization of their conversion workflow ]
                        </p>
                      </div>

                      {/* Mock loading bar when playing */}
                      {isPlaying && (
                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10">
                          <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                            className="h-full bg-white"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
