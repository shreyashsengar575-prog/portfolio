"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import { projects } from "@/lib/content";

function TiltCard({
  children,
  color,
}: {
  children: React.ReactNode;
  color: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * 14}deg) rotateX(${-py * 14}deg) translateZ(0)`;
    el.style.boxShadow = `0 20px 60px ${color}33, 0 0 40px ${color}22`;
  };
  const reset = () => {
    const el = ref.current;
    if (el) {
      el.style.transform = "perspective(900px) rotateY(0) rotateX(0)";
      el.style.boxShadow = "0 10px 40px rgba(0,0,0,0.4)";
    }
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="interactive glass rounded-3xl p-6 transition-transform duration-150 will-change-transform"
    >
      {children}
    </div>
  );
}

export default function Projects() {
  const [active, setActive] = useState<(typeof projects)[number] | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <section id="projects" className="section-pad relative">
      <SectionHeading
        index="03"
        title="Projects"
        subtitle="A selection of things I've designed, built, and shipped. Click an image to view it full size."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
          >
            <TiltCard color={p.color}>
              <button
                type="button"
                onClick={() => p.image && setActive(p)}
                aria-label={p.image ? `View ${p.title} full image` : undefined}
                className="group/img relative mb-5 block h-44 w-full overflow-hidden rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {p.image ? (
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover/img:scale-110"
                  />
                ) : (
                  <div
                    className="h-full w-full"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${p.color}55, transparent 60%), linear-gradient(135deg, #0b0e1f, #131833)`,
                    }}
                  />
                )}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-bg/0 opacity-0 transition-all duration-300 group-hover/img:bg-bg/40 group-hover/img:opacity-100">
                  <span className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur">
                    View full image ⤢
                  </span>
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/80 to-transparent" />
              </button>
              <h3 className="text-2xl font-semibold">{p.title}</h3>
              <p className="mt-2 text-white/60">{p.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-surface shadow-glow"
            >
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-xl text-white transition hover:bg-white/10"
              >
                ×
              </button>
              {active.image && (
                <Image
                  src={active.image}
                  alt={active.title}
                  width={1200}
                  height={750}
                  className="h-auto max-h-[90vh] w-full object-contain"
                />
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-bg/90 to-transparent p-6">
                <h3 className="text-2xl font-semibold neon-text">{active.title}</h3>
                <p className="mt-1 text-sm text-white/60">{active.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
