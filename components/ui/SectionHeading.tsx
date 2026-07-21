"use client";
import { motion } from "framer-motion";

export default function SectionHeading({
  index,
  title,
  subtitle,
}: {
  index: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="mb-14"
    >
      <span className="font-mono text-sm text-accent/80">{index}</span>
      <h2 className="mt-2 text-4xl font-bold tracking-tight md:text-6xl">
        <span className="neon-text">{title}</span>
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-xl text-white/60">{subtitle}</p>
      )}
    </motion.div>
  );
}
