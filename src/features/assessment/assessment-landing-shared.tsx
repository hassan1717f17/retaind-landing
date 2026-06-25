"use client";

import Link from "next/link";
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

export function AssessmentFooter() {
  return (
    <footer className="py-8 bg-foreground text-center">
      <div className="max-w-7xl mx-auto px-4">
        <img
          src="/assets/Retaind_Logo_with_strapline_1769251859256.png"
          alt="Retaind.ai"
          className="h-6 mx-auto mb-4 brightness-200"
        />
        <div className="flex items-center justify-center gap-6 text-sm text-background/50">
          <Link href="/privacy" className="hover:text-background transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-background transition-colors">
            Terms
          </Link>
          <a href="mailto:support@retaind.ai" className="hover:text-background transition-colors">
            Contact
          </a>
        </div>
        <p className="text-xs text-background/30 mt-4">
          © {new Date().getFullYear()} Retaind.ai Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
