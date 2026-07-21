"use client";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { skills } from "@/lib/content";

export default function Skills() {
  return (
    <section id="skills" className="section-pad relative">
      <SectionHeading
        index="05"
        title="Skills"
        subtitle="Technologies I use to bring ideas to life."
      />
      <div className="grid gap-6 sm:grid-cols-2">
        {skills.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="glass rounded-2xl p-5"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="font-medium">{s.name}</span>
              <span className="font-mono text-sm text-accent">{s.level}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${s.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-accent to-accent2"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
