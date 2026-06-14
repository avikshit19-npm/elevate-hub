"use client";

import { useRef, useState } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  className?: string;
}

export default function MagneticButton({
  children,
  className,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    
    // Get center of button
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // Calculate distance from center
    const x = (clientX - centerX) * 0.35; // 35% pull strength
    const y = (clientY - centerY) * 0.35;

    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 180, damping: 15, mass: 0.15 }}
      className={cn(
        "relative overflow-hidden border border-black dark:border-white px-8 py-4 text-[10px] font-bold tracking-[0.3em] uppercase transition-colors duration-500 bg-transparent cursor-none",
        isHovered ? "text-white dark:text-[#0B0B0B]" : "text-[#0B0B0B] dark:text-white",
        className
      )}
      {...props}
    >
      {/* Background slide-over overlay */}
      <motion.span
        className="absolute inset-0 bg-[#0B0B0B] dark:bg-white z-0"
        initial={{ x: "-100%" }}
        animate={{ x: isHovered ? "0%" : "-100%" }}
        transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
      />
      {/* Button content */}
      <span className="relative z-10 block pointer-events-none">
        {children}
      </span>
    </motion.button>
  );
}
