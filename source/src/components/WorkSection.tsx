import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, ExternalLink, Headphones, Clock, Music2 } from "lucide-react";
import { work, workCategories, soundcloudProfile, type WorkCategory, type WorkItem } from "../data/portfolio";
import { Reveal, SectionHeading } from "./ui";

/** Artwork with a branded fallback (used if the CDN image can't load, e.g. offline / PDF export). */
function Artwork({ w, className = "" }: { w: WorkItem; className?: string }) {
  const [err, setErr] = useState(false);
  if (err)
    return (
      <div className={`relative overflow-hidden bg-gradient-to-br from-accent via-burgundy to-ink ${className}`}>
        <div className="absolute inset-x-0 bottom-[18%] flex h-16 items-end justify-center gap-[3px] opacity-60" aria-hidden>
          {Array.from({ length: 40 }).map((_, i) => <span key={i} className="w-[3px] rounded-full bg-white/70" style={{ height: `${15 + Math.abs(Math.sin(i * 1.3 + w.title.length) * Math.cos(i * 0.4)) * 85}%` }} />)}
        </div>
        <span className="absolute inset-x-0 bottom-5 px-5 text-center font-display text-base font-bold leading-tight">{w.title}</span>
      </div>
    );
  return <img src={w.artwork} alt={`${w.title} artwork`} loading="lazy" referrerPolicy="no-referrer" onError={() => setErr(true)} className={`object-cover ${className}`} />;
}

function WorkCard({ w }: { w: WorkItem }) {
  const [playing, setPlaying] = useState(false);
  const cat = workCategories.find((c) => c.id === w.category)!;
  const isYT = w.platform === "youtube";

  return (
    <motion.article layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.3 }}
      className={`work-card gradient-border flex flex-col overflow-hidden rounded-3xl bg-wine/80 ${w.vertical ? "sm:row-span-2" : ""}`}>
      <div className={`relative overflow-hidden bg-black ${w.vertical ? "aspect-[9/14]" : isYT ? "aspect-video" : "aspect-square"}`}>
        {playing ? (
          <iframe
            src={w.embed}
            title={`${w.title} player`}
            className="absolute inset-0 h-full w-full"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            style={!isYT ? { height: "100%" } : undefined}
          />
        ) : (
          <button onClick={() => setPlaying(true)} className="group absolute inset-0" aria-label={`Play ${w.title}`}>
            <Artwork w={w} className="h-full w-full transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
            <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent shadow-[0_0_40px_rgba(229,9,37,.7)] transition group-hover:scale-110">
              <Play size={26} className="ml-1" fill="currentColor" />
            </span>
            <span className="absolute left-3 top-3 rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider backdrop-blur">
              {isYT ? "YouTube" : "SoundCloud"}
            </span>
          </button>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-rose">{cat.label}</span>
        <h3 className="mt-1.5 font-display text-lg font-bold leading-snug">{w.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/75">{w.description}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {w.genre && <span className="chip flex items-center gap-1"><Music2 size={10} />{w.genre}</span>}
          <span className="chip flex items-center gap-1"><Clock size={10} />{w.duration}</span>
          {w.tags?.map((t) => <span key={t} className="chip">{t}</span>)}
        </div>
        <a href={w.url} target="_blank" rel="noreferrer" className="mt-auto inline-flex items-center gap-1.5 pt-4 text-xs font-semibold text-rose hover:underline">
          Open on {isYT ? "YouTube" : "SoundCloud"} <ExternalLink size={12} />
        </a>
      </div>
    </motion.article>
  );
}

export default function WorkSection() {
  const used = workCategories.filter((c) => work.some((w) => w.category === c.id));
  const [cat, setCat] = useState<"all" | WorkCategory>("all");
  const list = work.filter((w) => cat === "all" || w.category === cat);

  return (
    <section id="listen" className="section">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Portfolio · Audio" title="Listen to" accent="My Work" sub="Original productions, guitar arrangements, binaural meditation tracks and ad scoring. Press play on any track." />
          <Reveal>
            <a href={soundcloudProfile} target="_blank" rel="noreferrer" className="btn-ghost"><Headphones size={16} /> SoundCloud profile</a>
          </Reveal>
        </div>

        <Reveal className="mt-8 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {[{ id: "all" as const, label: "All" }, ...used].map((c) => (
            <button key={c.id} onClick={() => setCat(c.id)} aria-pressed={cat === c.id}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${cat === c.id ? "bg-accent text-white" : "border border-white/10 text-muted hover:text-white"}`}>
              {c.label}
              <span className="ml-1.5 opacity-60">{c.id === "all" ? work.length : work.filter((w) => w.category === c.id).length}</span>
            </button>
          ))}
        </Reveal>

        <motion.div layout className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((w) => <WorkCard key={w.id} w={w} />)}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
