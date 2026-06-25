"use client";

import { motion } from "framer-motion";

interface FloatingBubbleProps {
  src: string;
  label: string;
  x: string;
  y: string;
  delay: number;
  size?: number;
}

export function FloatingBubble({ src, label, x, y, delay, size = 72 }: FloatingBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, type: "spring", stiffness: 200 }}
      className="absolute z-10 flex flex-col items-center gap-1"
      style={{ left: x, top: y }}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: delay * 0.5 }}
        className="bg-background rounded-xl shadow-lg p-2 flex flex-col items-center"
        style={{ width: size, height: size + 16 }}
      >
        <img src={src} alt={label} className="w-10 h-10 object-contain" />
        <span className="text-[10px] font-semibold text-foreground mt-0.5 leading-tight text-center">{label}</span>
      </motion.div>
    </motion.div>
  );
}
