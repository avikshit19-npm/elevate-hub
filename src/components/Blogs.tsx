"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Article {
  id: string;
  title: string;
  category: "Design" | "Strategy" | "Development";
  date: string;
  image: string;
}

const articles: Article[] = [
  {
    id: "01",
    title: "The Aesthetics of Solitude: Designing for Luxury Brands",
    category: "Design",
    date: "JUNE 2026",
    image: "/creative.png",
  },
  {
    id: "02",
    title: "Decoding Subcultures: How Strategy Outruns Search Algorithms",
    category: "Strategy",
    date: "MAY 2026",
    image: "/workspace.png",
  },
  {
    id: "03",
    title: "Next.js & React Compiler: The Technical Future of Frictionless Web",
    category: "Development",
    date: "APRIL 2026",
    image: "/creative.png",
  },
  {
    id: "04",
    title: "Why Minimalist Design is the Ultimate Form of Brand Authority",
    category: "Design",
    date: "MARCH 2026",
    image: "/workspace.png",
  },
];

function BlogCard({ article }: { article: Article }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();

    const xPct = (clientX - left) / width - 0.5;
    const yPct = (clientY - top) / height - 0.5;

    // Limit rotation for high-end feel
    setRotateX(-yPct * 10);
    setRotateY(xPct * 10);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      data-cursor-text="READ"
      animate={{
        rotateX,
        rotateY,
        scale: isHovered ? 1.005 : 1,
      }}
      transition={{ type: "spring", stiffness: 220, damping: 22, mass: 0.25 }}
      className="relative block border border-black/10 dark:border-white/10 p-6 overflow-hidden bg-black/[0.01] dark:bg-white/[0.01] hover:border-black/25 dark:hover:border-white/25 transition-colors duration-300 transform-style-3d cursor-none"
    >
      <div className="flex flex-col h-full justify-between select-none pointer-events-none">
        
        {/* Top Info */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-[9px] tracking-[0.2em] font-bold text-brand-slate uppercase">
            {article.category}
          </span>
          <span className="text-[9px] font-bold text-brand-slate">
            {article.date}
          </span>
        </div>

        {/* Dynamic Image Reveal Block */}
        <div className="relative w-full aspect-[16/10] overflow-hidden mb-6 bg-black/5">
          <motion.div
            initial={{ opacity: 0.25, scale: 1.05 }}
            animate={{ 
              opacity: isHovered ? 1 : 0.35, 
              scale: isHovered ? 1.02 : 1 
            }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover filter grayscale dark:brightness-95 transition-all duration-700"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </motion.div>
        </div>

        {/* Title */}
        <h4 className="text-lg md:text-xl font-light tracking-tight leading-snug text-[#0B0B0B] dark:text-white transition-colors duration-500 mb-4">
          {article.title}
        </h4>
        
        <span className="text-[8px] tracking-[0.2em] font-bold text-brand-slate mt-auto">
          READ INSIGHT &nbsp; // &nbsp; →
        </span>
      </div>
    </motion.div>
  );
}

export default function Blogs() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const categories = ["ALL", "STRATEGY", "DESIGN", "DEVELOPMENT"];

  const filteredArticles = activeCategory === "ALL" 
    ? articles 
    : articles.filter(art => art.category.toUpperCase() === activeCategory);

  return (
    <section id="insights" className="py-32 px-6 md:px-12 bg-transparent relative z-10 transition-colors duration-500 border-t border-black/5 dark:border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-[10px] font-bold tracking-[0.4em] text-brand-slate uppercase mb-3">
              INSIGHTS
            </p>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight text-[#0B0B0B] dark:text-white transition-colors duration-500">
              Agency <span className="font-serif italic">Authority</span>.
            </h2>
          </div>

          {/* Filtering Tabs */}
          <div className="flex flex-wrap gap-3 md:gap-4 border-b border-black/5 dark:border-white/5 pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[9px] tracking-[0.2em] font-bold uppercase py-1 border-b-2 transition-all duration-300 cursor-none ${
                  activeCategory === cat 
                    ? "border-black dark:border-white text-[#0B0B0B] dark:text-white" 
                    : "border-transparent text-brand-slate hover:text-black dark:hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 perspective-1000">
          <AnimatePresence mode="popLayout">
            {filteredArticles.map((art) => (
              <motion.div
                key={art.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <BlogCard article={art} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
