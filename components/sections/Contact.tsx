"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { profile } from "@/lib/content";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Failed to send.");
      }
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Failed to send.");
    }
  };

  return (
    <section id="contact" className="section-pad relative">
      <SectionHeading
        index="06"
        title="Contact"
        subtitle="Have a project or just want to say hi? My inbox is open."
      />
      <div className="grid gap-10 md:grid-cols-2">
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={onSubmit}
          className="glass flex flex-col gap-4 rounded-3xl p-6"
        >
          <input
            required
            name="name"
            placeholder="Your name"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-accent"
          />
          <input
            required
            type="email"
            name="email"
            placeholder="Your email"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-accent"
          />
          <textarea
            required
            name="message"
            rows={4}
            placeholder="Your message"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-accent"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="interactive rounded-xl bg-gradient-to-r from-accent to-accent2 py-3 font-semibold text-bg transition hover:shadow-glow disabled:opacity-60"
          >
            {status === "sending"
              ? "Sending..."
              : status === "sent"
                ? "Message Sent ✓"
                : "Send Message"}
          </button>
          {status === "sent" && (
            <p className="text-sm text-accent">
              Thanks! Your message has been sent.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-400">{error}</p>
          )}
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center gap-4"
        >
          <a href={`mailto:${profile.email}`} className="text-xl text-white/80 hover:text-accent">
            {profile.email}
          </a>
          <div className="flex flex-wrap gap-3">
            {profile.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="interactive rounded-full border border-white/10 px-5 py-2 text-sm text-white/70 transition hover:border-accent hover:text-accent"
              >
                {s.label}
              </a>
            ))}
          </div>
          <p className="text-white/40">?? {profile.location}</p>
        </motion.div>
      </div>
      <footer className="mt-20 border-t border-white/10 pt-6 text-center text-sm text-white/40">
        © {new Date().getFullYear()} {profile.name}. Built with Next.js, R3F & Framer Motion.
      </footer>
    </section>
  );
}
