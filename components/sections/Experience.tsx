"use client";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { experience, profile } from "@/lib/content";

export default function Experience() {
  return (
    <section id="experience" className="section-pad relative">
      <SectionHeading
        index="04"
        title="Experience"
        subtitle="My journey so far — roles, companies, and what I built."
      />
      <div className="relative ml-4 border-l border-white/10 pl-8">
        {experience.map((e, i) => (
          <motion.div
            key={e.company}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: i * 0.12, duration: 0.6 }}
            className="relative mb-12"
          >
            <span className="absolute -left-[2.55rem] top-2 h-4 w-4 rounded-full bg-accent shadow-glow" />
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-2xl font-semibold">{e.role}</h3>
              <span className="font-mono text-sm text-accent/80">{e.period}</span>
            </div>
            <p className="mt-1 text-accent2">{e.company}</p>
            <p className="mt-3 max-w-2xl text-white/60">{e.description}</p>
          </motion.div>
        ))}
      </div>
      <motion.a
        href={profile.resumeUrl}
        download
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="interactive mt-6 inline-flex items-center gap-2 rounded-full border border-accent/50 px-6 py-3 text-accent transition hover:bg-accent/10 hover:shadow-glow"
      >
        ? Download Résumé (PDF)
      </motion.a>
    </section>
  );
}
