import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Award } from "lucide-react";
import { timeline, timelineOngoing, projects } from "../data/portfolio";
import { Reveal, SectionHeading, useModals } from "./ui";

export default function ExperienceTimeline() {
  const { openCert, openProject } = useModals();
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section id="journey" className="section">
      <div className="container-x">
        <SectionHeading center eyebrow="Timeline" title="My Musical" accent="Journey" />
        <div className="relative mx-auto mt-14 max-w-3xl">
          <motion.div className="absolute left-4 top-0 w-px origin-top bg-gradient-to-b from-accent via-rose/50 to-transparent sm:left-1/2" style={{ height: "100%" }} initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, ease: "easeOut" }} aria-hidden />
          <ol className="space-y-10">
            {timeline.map((t, i) => (
              <li key={t.id} className={`relative pl-12 sm:w-1/2 sm:pl-0 ${i % 2 ? "sm:ml-auto sm:pl-10" : "sm:pr-10 sm:text-right"}`}>
                <span className={`absolute left-[9px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-accent bg-ink shadow-[0_0_14px_#E50925] ${i % 2 ? "sm:-left-[7px]" : "sm:left-auto sm:-right-[7px]"}`} aria-hidden />
                <Reveal delay={0.05}>
                  <span className="font-mono text-sm text-rose">{t.date}</span>
                  <h3 className="mt-1 font-display text-lg font-bold">{t.title}</h3>
                  {t.org && <p className="text-sm text-muted">{t.org}</p>}
                  <p className="mt-2 text-sm leading-relaxed text-white/75">{t.text}</p>
                  {t.certId && <button onClick={() => openCert(t.certId!)} className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-rose hover:underline"><Award size={13} /> View credential</button>}
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <Reveal className="mx-auto mt-16 max-w-3xl">
          <h3 className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted">Ongoing experience</h3>
          <div className="mt-5 space-y-3">
            {timelineOngoing.map((o) => {
              const isOpen = open === o.id;
              const ps = projects.filter((p) => o.projectIds?.includes(p.id));
              return (
                <div key={o.id} className="glass overflow-hidden">
                  <button onClick={() => setOpen(isOpen ? null : o.id)} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
                    <span><span className="mr-3 text-[10px] font-semibold uppercase tracking-wider text-rose">{o.kind}</span><span className="font-display font-semibold">{o.title}</span></span>
                    <ChevronDown size={18} className={`shrink-0 transition ${isOpen ? "rotate-180 text-accent" : "text-muted"}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                        <div className="px-5 pb-5">
                          <p className="text-sm leading-relaxed text-muted">{o.text}</p>
                          <div className="mt-4 flex gap-3 overflow-x-auto no-scrollbar">
                            {ps.map((p) => (
                              <button key={p.id} onClick={() => openProject(p.id)} className="group w-40 shrink-0 text-left">
                                <img src={p.thumb} alt={p.gallery[0].alt} loading="lazy" className="aspect-[4/3] w-full rounded-lg object-cover transition group-hover:opacity-80" />
                                <span className="mt-1.5 block text-xs text-white/80">{p.title}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
