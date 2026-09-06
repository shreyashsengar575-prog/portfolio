"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { profile, skills } from "@/lib/content";

const techIcons = [
  { name: "React", color: "#61DAFB", symbol: "⚛" },
  { name: "Next.js", color: "#ffffff", symbol: "▲" },
  { name: "TypeScript", color: "#3178C6", symbol: "TS" },
  { name: "Node.js", color: "#339933", symbol: "⬡" },
  { name: "Three.js", color: "#ffffff", symbol: "◆" },
  { name: "Tailwind", color: "#06B6D4", symbol: "☁" },
  { name: "Git", color: "#F05032", symbol: "⟐" },
  { name: "Python", color: "#FFD43B", symbol: "Py" },
];

export default function Picture() {
  return (
    <section id="picture" className="section-pad relative">
      <SectionHeading
        index="02"
        title="Picture"
        subtitle="A little face behind the code."
      />
      <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="group relative"
        >
          {/* Rotating glow ring */}
          <motion.div
            aria-hidden
            className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-tr from-accent via-accent2 to-accent opacity-30 blur-2xl"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          />

          {/* Floating tech badges */}
          {techIcons.map((tech, i) => {
            const angle = (i / techIcons.length) * 2 * Math.PI - Math.PI / 2;
            const radius = 240;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  y: [y - 8, y + 8, y - 8],
                }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.6 + i * 0.08,
                  duration: 3 + i * 0.4,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                }}
                style={{
                  position: "absolute",
                  left: `calc(50% + ${x}px - 24px)`,
                  top: `calc(50% + ${y}px - 24px)`,
                }}
                className="z-10 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-surface/90 text-lg font-bold shadow-lg backdrop-blur-sm"
                title={tech.name}
              >
                <span style={{ color: tech.color }}>{tech.symbol}</span>
              </motion.div>
            );
          })}

          {/* Orbiting dots */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={`dot-${i}`}
              aria-hidden
              className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  i === 0 ? "#5eead4" : i === 1 ? "#a78bfa" : "#38bdf8",
              }}
              animate={{
                x: [0, 200 * Math.cos((i * 2 * Math.PI) / 3)],
                y: [0, 200 * Math.sin((i * 2 * Math.PI) / 3)],
                opacity: [0.8, 0.3, 0.8],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 1.5,
              }}
            />
          ))}

          {/* Profile image card */}
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-glow">
            <Image
              src="/profile.png"
              alt={profile.name}
              width={420}
              height={520}
              priority
              className="h-[420px] w-[340px] object-cover transition duration-700 group-hover:scale-105 md:h-[520px] md:w-[420px]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent" />
            {/* Shine sweep */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ["-120%", "220%"] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Name badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="glass absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-5 py-2 text-sm"
          >
            <span className="neon-text font-semibold">{profile.name}</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
