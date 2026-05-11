"use client";

import { motion } from "framer-motion";
import { ReactNode, useState } from "react";

interface GlowingCardProps {
  children: ReactNode;
  className?: string;
}

export default function GlowingCard({ children, className = "" }: GlowingCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden rounded-2xl bg-zinc-900 border border-white/10 group ${className}`}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15), transparent 40%)`,
        }}
      />
      <div className="relative h-full z-10 p-8">
        {children}
      </div>
    </motion.div>
  );
}
