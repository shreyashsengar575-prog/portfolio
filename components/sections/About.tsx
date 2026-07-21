"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { profile, stats } from "@/lib/content";

function Counter({ value }: { value: number }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          let start = 0;
          const step = () => {
            start += Math.ceil(value / 40);
            if (start >= value) setN(value);
            else {
              setN(start);
              requestAnimationFrame(step);
            }
          };
          step();
          obs.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);
  return <span ref={ref}>{n}</span>;
}

export default function About() {
  return (
    <section id="about" className="section-pad relative">
      <SectionHeading index="01" title="About" subtitle={profile.bio} />
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="glass rounded-2xl p-6 text-center"
          >
            <div className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-4xl font-bold text-transparent">
              <Counter value={s.value} />+
            </div>
            <p className="mt-2 text-sm text-white/60">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
