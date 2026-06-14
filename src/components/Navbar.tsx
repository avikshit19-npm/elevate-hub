"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "HOME", href: "#home" },
    { name: "ABOUT", href: "#about" },
    { name: "SERVICES", href: "#services" },
    { name: "INSIGHTS", href: "#insights" },
    { name: "REVIEWS", href: "#testimonials" },
    { name: "CONTACT", href: "#contact" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  // Hamburger line variants
  const topVariants = {
    closed: { rotate: 0, y: 0 },
    opened: { rotate: 45, y: 6 },
  } as const;

  const middleVariants = {
    closed: { opacity: 1, scale: 1 },
    opened: { opacity: 0, scale: 0 },
  } as const;

  const bottomVariants = {
    closed: { rotate: 0, y: 0 },
    opened: { rotate: -45, y: -6 },
  } as const;

  const menuVariants = {
    closed: {
      y: "-100%",
      transition: {
        duration: 0.65,
        ease: [0.76, 0, 0.24, 1] as const,
      },
    },
    opened: {
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.76, 0, 0.24, 1] as const,
      },
    },
  } as const;

  const listVariants = {
    opened: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
    closed: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  } as const;

  const itemVariants = {
    opened: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const,
      },
    },
    closed: {
      y: 40,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn" as const,
      },
    },
  } as const;

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-40 h-16 flex items-center justify-between px-6 md:px-12 backdrop-blur-md border-b border-white/[0.03] bg-[#0B0B0B]/70 text-white transition-colors duration-500">
        {/* Minimal Image Logo */}
        <a
          href="#home"
          className="relative block select-none h-9 md:h-10 w-48 md:w-56 transition-opacity duration-300 hover:opacity-80 cursor-none"
        >
          <Image
            src="/logo.png"
            alt="ELEVATE HUB Logo"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 144px, 160px"
            priority
          />
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 lg:gap-12">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-[9px] tracking-[0.3em] font-semibold text-white/50 hover:text-white transition-colors duration-300"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Hamburger Icon */}
        <button
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          className="relative z-50 flex flex-col justify-center gap-1.5 w-6 h-6 items-end"
        >
          <motion.span
            variants={topVariants}
            animate={isOpen ? "opened" : "closed"}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-6 h-[1px] bg-white origin-center"
          />
          <motion.span
            variants={middleVariants}
            animate={isOpen ? "opened" : "closed"}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="w-4 h-[1px] bg-white"
          />
          <motion.span
            variants={bottomVariants}
            animate={isOpen ? "opened" : "closed"}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-6 h-[1px] bg-white origin-center"
          />
        </button>
      </nav>

      {/* Full-screen Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="opened"
            exit="closed"
            className="fixed inset-0 z-30 bg-[#0B0B0B] flex flex-col justify-center items-center h-screen w-screen"
          >
            <motion.ul
              variants={listVariants}
              animate={isOpen ? "opened" : "closed"}
              className="flex flex-col gap-6 text-center"
            >
              {navItems.map((item) => (
                <motion.li
                  key={item.name}
                  variants={itemVariants}
                  className="overflow-hidden"
                >
                  <a
                    href={item.href}
                    onClick={toggleMenu}
                    className="block text-2xl md:text-4xl font-light tracking-[0.4em] text-white/75 hover:text-white hover:font-normal transition-all duration-300 py-2"
                  >
                    {item.name}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
