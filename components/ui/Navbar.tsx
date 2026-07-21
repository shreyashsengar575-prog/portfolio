"use client";
import { motion } from "framer-motion";
import { profile } from "@/lib/content";

const links = [
  { href: "#about", label: "About" },
  { href: "#picture", label: "Picture" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-4 md:px-12"
    >
      <a href="#top" className="text-lg font-bold tracking-tight neon-text">
        {profile.name}
      </a>
      <nav className="hidden gap-8 md:flex">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="group relative text-sm text-white/70 transition hover:text-white"
          >
            {l.label}
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
      </nav>
      <a
        href="#contact"
        className="rounded-full border border-accent/50 px-4 py-2 text-sm text-accent transition hover:bg-accent/10 hover:shadow-glow"
      >
        Let&apos;s talk
      </a>
    </motion.header>
  );
}
