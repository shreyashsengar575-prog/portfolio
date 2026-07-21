"use client";
import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Picture from "@/components/sections/Picture";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import Loader from "@/components/ui/Loader";

const BackgroundScene = dynamic(
  () => import("@/components/three/BackgroundScene"),
  { ssr: false }
);

export default function Page() {
  return (
    <main className="relative">
      <Loader />
      <BackgroundScene />
      <Hero />
      <About />
      <Picture />
      <Projects />
      <Experience />
      <Skills />
      <Contact />
    </main>
  );
}