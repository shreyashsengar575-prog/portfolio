"use client";
import { motion } from "framer-motion";
import { Suspense } from "react";
import HeroScene from "@/components/three/HeroScene";
import { profile } from "@/lib/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function Hero() {
  const reduce = useReducedMotion();
  return (
    <section id="top" className="relative flex h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        {reduce ? (
          <div className="h-full w-full bg-[radial-gradient(circle_at_50%_40%,rgba(94,234,212,0.15),transparent_60%)]" />
        ) : (
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        )}
      </div>

      <div className="pointer-events-none relative z-10 px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-4 font-mono text-sm uppercase tracking-[0.3em] text-accent"
        >
          {profile.role}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="text-6xl font-bold leading-tight tracking-tight md:text-8xl"
        >
          <span className="neon-text">{profile.name}</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mx-auto mt-6 max-w-xl text-lg text-white/70"
        >
          {profile.tagline}
        </motion.p>
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          href="#projects"
          className="interactive pointer-events-auto mt-10 inline-block rounded-full border border-accent/50 px-8 py-3 text-accent transition hover:bg-accent/10 hover:shadow-glow"
        >
          Explore my work ↓
        </motion.a>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs text-white/40"
      >
        scroll to enter
      </motion.div>
    </section>
  );
}
