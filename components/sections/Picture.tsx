"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { profile } from "@/lib/content";

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
          whileHover={{ scale: 1.03, rotate: -1 }}
          className="group relative"
        >
          <motion.div
            aria-hidden
            className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-accent via-accent2 to-accent opacity-40 blur-2xl"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-glow">
            <Image
              src="/profile.jpeg"
              alt={profile.name}
              width={420}
              height={520}
              priority
              className="h-[420px] w-[340px] object-cover transition duration-700 group-hover:scale-105 md:h-[520px] md:w-[420px]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent" />
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
