import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, type ProjectCategory } from "../data/portfolio";
import { SectionHeading, useModals, Reveal } from "./ui";
import { CATEGORY_LABEL } from "./ProjectModal";

const CATS: { id: "all" | ProjectCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "performances", label: "Performances" },
  { id: "teaching", label: "Teaching" },
  { id: "production", label: "Music Production" },
  { id: "live-sound", label: "Live Sound" },
  { id: "research", label: "Research" },
];

export default function ProjectGallery() {
  const { openProject } = useModals();
  const [cat, setCat] = useState<(typeof CATS)[number]["id"]>("all");
  const list = projects.filter((p) => cat === "all" || p.category === cat);
  const ids = list.map((p) => p.id);
  return (
    <section id="work" className="section">
      <div className="container-x">
        <SectionHeading eyebrow="Portfolio" title="Selected" accent="Musical Work" />
        <Reveal className="mt-8 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {CATS.map((c) => (
            <button key={c.id} onClick={() => setCat(c.id)} aria-pressed={cat === c.id} className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${cat === c.id ? "bg-accent text-white" : "border border-white/10 text-muted hover:text-white"}`}>{c.label}</button>
          ))}
        </Reveal>
        <motion.div layout className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((p) => (
              <motion.button layout key={p.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }}
                onClick={() => openProject(p.id, ids)} className="group overflow-hidden rounded-2xl border border-white/10 bg-wine/70 text-left">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={p.thumb} alt={p.gallery[0].alt} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-accent/0 transition group-hover:bg-accent/15" />
                  <span className="absolute right-3 top-3 grid h-9 w-9 translate-y-2 place-items-center rounded-full bg-accent opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100"><ArrowUpRight size={16} /></span>
                </div>
                <div className="p-4">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-rose">{CATEGORY_LABEL[p.category]}</span>
                  <h3 className="mt-1 font-display font-semibold">{p.title}</h3>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">{p.description}</p>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
