"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-transparent border-t border-black/10 dark:border-white/10 pt-24 pb-12 px-6 md:px-12 relative z-10 transition-all duration-500">
      <div className="max-w-7xl mx-auto">
        
        {/* Massive Typography & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-black/5 dark:border-white/5">
          
          {/* Left Column (Let's Talk Header) */}
          <div className="lg:col-span-7">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="text-6xl sm:text-7xl md:text-8xl font-light tracking-tighter leading-none text-[#0B0B0B] dark:text-white transition-colors duration-500 font-serif"
            >
              LET&apos;S <br />
              <span className="italic">TALK.</span>
            </motion.h2>
          </div>

          {/* Right Column (Newsletter Gateway) */}
          <div className="lg:col-span-5 flex flex-col justify-end">
            <span className="text-[9px] tracking-[0.25em] font-bold text-[#707070] uppercase mb-4 block">
              SUBSCRIBE TO INSIGHTS
            </span>

            {subscribed ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 py-4 border-b border-black dark:border-white"
              >
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-[10px] tracking-widest text-[#707070] font-semibold">YOU ARE SUBSCRIBED</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex items-center border-b border-black/20 dark:border-white/20 focus-within:border-black dark:focus-within:border-white pb-3 transition-colors duration-300">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-transparent text-xs font-light text-[#0B0B0B] dark:text-white placeholder-black/20 dark:placeholder-white/20 focus:outline-none cursor-none"
                />
                <button 
                  type="submit" 
                  aria-label="Subscribe"
                  className="text-black dark:text-white hover:opacity-60 transition-opacity duration-300 cursor-none ml-2"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 text-left border-b border-black/5 dark:border-white/5">
          
          <div>
            <span className="text-[9px] tracking-[0.2em] font-bold text-[#707070] block mb-4 uppercase">
              SOCIAL
            </span>
            <ul className="flex flex-col gap-2">
              {["Instagram", "LinkedIn", "Twitter/X", "Behance"].map((soc) => (
                <li key={soc}>
                  <a 
                    href={`#${soc.toLowerCase()}`}
                    className="text-[11px] font-light text-[#707070] hover:text-black dark:hover:text-white transition-colors duration-300 inline-flex items-center gap-1 group"
                  >
                    {soc}
                    <ArrowUpRight className="h-2.5 w-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-[9px] tracking-[0.2em] font-bold text-[#707070] block mb-4 uppercase">
              PAGES
            </span>
            <ul className="flex flex-col gap-2">
              {["Home", "About", "Services", "Insights", "Reviews", "Contact"].map((p) => (
                <li key={p}>
                  <a 
                    href={`#${p.toLowerCase()}`}
                    className="text-[11px] font-light text-[#707070] hover:text-black dark:hover:text-white transition-colors duration-300 inline-flex items-center gap-1 group"
                  >
                    {p}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-[9px] tracking-[0.2em] font-bold text-[#707070] block mb-4 uppercase">
              CONTACT
            </span>
            <ul className="flex flex-col gap-2">
              <li>
                <a 
                  href="mailto:hello@elevatehub.com"
                  className="text-[11px] font-light text-[#707070] hover:text-black dark:hover:text-white transition-colors duration-300"
                >
                  hello@elevatehub.com
                </a>
              </li>
              <li>
                <a 
                  href="tel:+3120123456"
                  className="text-[11px] font-light text-[#707070] hover:text-black dark:hover:text-white transition-colors duration-300"
                >
                  +31 20 123 456
                </a>
              </li>
            </ul>
          </div>

          <div>
            <span className="text-[9px] tracking-[0.2em] font-bold text-[#707070] block mb-4 uppercase">
              INQUIRIES
            </span>
            <p className="text-[11px] font-light text-[#707070] leading-relaxed">
              Seeking design reviews, branding audits, or dev briefs? Connect via our conversion board.
            </p>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-12">
          <span className="text-[9px] text-[#707070] font-light uppercase tracking-wider">
            © {currentYear} ELEVATE HUB. ALL RIGHTS RESERVED.
          </span>
          <span className="text-[9px] text-[#707070] font-light uppercase tracking-wider">
            DESIGNED & DEVELOPED IN AMSTERDAM.
          </span>
        </div>

      </div>
    </footer>
  );
}
