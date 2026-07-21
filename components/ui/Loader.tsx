"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1800);
    return () => clearTimeout(t);
  }, []);
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: done ? 0 : 1 }}
      transition={{ duration: 0.6 }}
      onAnimationComplete={() => {
        if (done) document.body.style.overflow = "";
      }}
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-bg ${
        done ? "pointer-events-none" : ""
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-accent border-t-transparent" />
        <p className="font-mono text-sm text-accent/80">Initializing system…</p>
      </div>
    </motion.div>
  );
}
