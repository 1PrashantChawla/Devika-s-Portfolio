import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, Download, Award, BookOpenText, Guitar } from "lucide-react";
import { profile, certificates } from "../data/portfolio";
import { Waveform } from "./ui";

export default function HeroSection() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % profile.roles.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="home" className="relative flex min-h-[100svh] items-center overflow-hidden pt-20">
      <div className="container-x grid items-center gap-12 py-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        {/* portrait */}
        <motion.div className="relative mx-auto aspect-square w-full max-w-[500px]" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
          <div className="glow absolute inset-[8%] rounded-full bg-accent/40 blur-[70px]" aria-hidden />
          {[0, 7, 14].map((inset, k) => (
            <div key={k} className="ring-pulse absolute rounded-full border border-accent/25" style={{ inset: `${inset}%`, animationDelay: `${k * 1.2}s` }} aria-hidden />
          ))}
          <div className="absolute inset-[14%] rounded-full bg-gradient-to-b from-burgundy via-accent/40 to-wine ring-1 ring-accent/50 shadow-[0_0_90px_-10px_rgba(229,9,37,.7)]" aria-hidden />
          <div className="absolute inset-x-0 bottom-[6%] top-[-4%] overflow-hidden rounded-b-full" style={{ WebkitMaskImage: "linear-gradient(to bottom, #000 78%, transparent 99%)", maskImage: "linear-gradient(to bottom, #000 78%, transparent 99%)" }}>
            <img src={profile.heroPortrait} alt={profile.heroPortraitAlt} className="mx-auto h-full w-auto object-contain object-top drop-shadow-[0_20px_40px_rgba(0,0,0,.6)]" fetchPriority="high" />
          </div>
          <motion.div className="glass absolute left-0 top-[16%] flex items-center gap-2 px-3 py-2 text-xs" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
            <Award size={16} className="text-accent" /> Trinity · Distinction
          </motion.div>
          <motion.div className="glass absolute bottom-[14%] right-1 flex items-center gap-2 px-3 py-2 text-xs" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 }}>
            <BookOpenText size={16} className="text-accent" /> Published researcher
          </motion.div>
          <motion.div className="glass absolute bottom-[2%] left-[12%] flex items-center gap-2 px-3 py-2 text-xs" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
            <Guitar size={16} className="text-accent" /> Classical · Acoustic · Electric
          </motion.div>
        </motion.div>

        {/* copy */}
        <div>
          <motion.span className="eyebrow" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>Available for music opportunities</motion.span>
          <motion.h1 className="mt-5 font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-7xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            Hi, I'm <span className="text-rose">Devika.</span>
          </motion.h1>
          <div className="mt-4 flex h-9 items-center font-mono text-lg text-rose/90 sm:text-xl" aria-live="polite">
            <span className="text-muted/60">&lt;</span>
            <AnimatePresence mode="wait">
              <motion.span key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}>
                {profile.roles[i]}
              </motion.span>
            </AnimatePresence>
            <span className="text-muted/60">&gt;</span>
          </div>
          <motion.p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            {profile.heroIntro}
          </motion.p>

          <div className="mt-7 grid max-w-md grid-cols-3 gap-4">
            {[
              ["2", "Year guitar course"],
              [String(certificates.length), "Credentials"],
              ["1", "Published paper"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-display text-2xl font-bold sm:text-3xl">{n}</div>
                <div className="text-[11px] uppercase tracking-wider text-muted">{l}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#performances" className="btn-ghost">Explore my work <ArrowDown size={16} /></a>
            <a href={profile.cvPdf} download="Devika-Bajaj-CV.pdf" className="btn-primary"><Download size={16} /> Download CV</a>
          </div>
        </div>
      </div>
      <Waveform className="pointer-events-none absolute inset-x-0 bottom-6 opacity-70" bars={96} height={64} />
    </section>
  );
}
