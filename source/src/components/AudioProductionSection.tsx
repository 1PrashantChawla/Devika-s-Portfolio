import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal, Scissors, Speaker, ArrowUpRight, Images, Headphones, CircleDot } from "lucide-react";
import { projects, audioTracks } from "../data/portfolio";
import { Reveal, SectionHeading, useModals, DraftChip, Waveform } from "./ui";
import AudioPlayer from "./AudioPlayer";

const TABS = [
  {
    id: "production", label: "Music Production", Icon: SlidersHorizontal, projectIds: ["sound-design", "logic-session"],
    text: "Working inside Logic Pro on laptop-based setups — building sounds with software synthesizers, arranging regions and monitoring on studio headphones.",
    points: ["Logic Pro", "Software synthesizers & sound design", "Laptop-based, mobile production setup"],
  },
  {
    id: "editing", label: "Audio Editing & Mixing", Icon: Scissors, projectIds: ["logic-session"],
    text: "Assembling multi-part spoken-word and music programmes: separate tracks for breathwork, visualisation and a multi-part meditation, cut, placed and balanced on the timeline.",
    points: ["Multi-track editing & arrangement", "Spoken-word programme assembly", "Bar / timecode planning"],
  },
  {
    id: "live", label: "Live Sound", Icon: Speaker, projectIds: ["yog-nidra", "gff-sound"],
    text: "Event audio with an analogue mixing console, wireless microphones, power amplification and laptop playback — plus festival sound-team volunteering.",
    points: ["Yamaha analogue mixer", "Wireless handheld mics & amplification", "16th Global Film Festival Noida — Sound volunteer"],
  },
] as const;

export default function AudioProductionSection() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("production");
  const { openProject } = useModals();
  const cur = TABS.find((t) => t.id === tab)!;
  const ps = projects.filter((p) => (cur.projectIds as readonly string[]).includes(p.id));
  const yog = projects.find((p) => p.id === "yog-nidra")!;
  const soundIds = projects.filter((p) => p.category === "production" || p.category === "live-sound").map((p) => p.id);

  return (
    <section id="sound" className="section relative">
      <div className="container-x">
        <SectionHeading eyebrow="Production & engineering" title="Behind the" accent="Sound" sub="From DAW sessions to the event mixing desk." />

        {/* studio-style console tabs */}
        <Reveal delay={0.05} className="mt-10">
          <div className="glass gradient-border overflow-hidden !rounded-3xl">
            <div role="tablist" aria-label="Audio categories" className="flex overflow-x-auto border-b border-white/10 no-scrollbar">
              {TABS.map((t, i) => (
                <button key={t.id} role="tab" aria-selected={tab === t.id} aria-controls={`panel-${t.id}`} id={`tab-${t.id}`} onClick={() => setTab(t.id)}
                  className={`relative flex flex-1 items-center justify-center gap-2 whitespace-nowrap px-5 py-4 text-sm font-semibold transition ${tab === t.id ? "text-white" : "text-muted hover:text-white"}`}>
                  <span className="hidden font-mono text-[10px] text-accent sm:inline">CH{i + 1}</span>
                  <t.Icon size={16} /> {t.label}
                  {tab === t.id && <motion.span layoutId="tabline" className="absolute inset-x-4 bottom-0 h-0.5 rounded bg-accent shadow-[0_0_12px_#E50925]" />}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={tab} id={`panel-${tab}`} role="tabpanel" aria-labelledby={`tab-${tab}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}
                className="grid gap-6 p-5 sm:p-8 lg:grid-cols-[1fr_1.3fr]">
                <div>
                  <h3 className="font-display text-2xl font-bold">{cur.label}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{cur.text}</p>
                  <ul className="mt-5 space-y-2">{cur.points.map((pt) => <li key={pt} className="flex gap-2 text-sm"><CircleDot size={14} className="mt-1 shrink-0 text-accent" />{pt}</li>)}</ul>
                  {/* faux meters */}
                  <div className="mt-6 flex h-16 items-end gap-1.5" aria-hidden>
                    {Array.from({ length: 14 }).map((_, i) => (
                      <span key={i} className="eq-bar w-2 rounded-sm bg-gradient-to-t from-emerald-400 via-amber-300 to-accent" style={{ height: `${30 + ((i * 37) % 70)}%`, animationDelay: `${i * -0.21}s` }} />
                    ))}
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {ps.map((p) => (
                    <button key={p.id} onClick={() => openProject(p.id, soundIds)} className={`group relative overflow-hidden rounded-2xl text-left ${ps.length === 1 ? "sm:col-span-2" : ""}`}>
                      <img src={p.thumb} alt={p.gallery[0].alt} loading="lazy" className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-transparent" />
                      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4">
                        <span className="font-display font-semibold leading-tight">{p.title}</span>
                        <ArrowUpRight size={18} className="shrink-0 text-rose" />
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>

        {/* featured: Yog Nidra */}
        <Reveal delay={0.05} className="mt-14">
          <article className="gradient-border relative overflow-hidden rounded-3xl bg-gradient-to-br from-burgundy/70 to-wine">
            <div className="grid lg:grid-cols-[1.25fr_1fr]">
              <button onClick={() => openProject(yog.id, soundIds)} className="group relative overflow-hidden" aria-label="Open Yog Nidra gallery">
                <img src={yog.image} alt={yog.gallery[0].alt} loading="lazy" className="h-full max-h-[520px] w-full object-cover transition duration-700 group-hover:scale-105" />
                <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-wider">Featured audio project</span>
              </button>
              <div className="p-6 sm:p-9">
                <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-rose"><Headphones size={14} /> Live event sound</span>
                <h3 className="mt-3 font-display text-3xl font-bold leading-tight">Yog Nidra — <span className="font-serif italic text-rose">Live Event Sound Work</span></h3>
                <p className="mt-4 leading-relaxed text-muted">{yog.description}</p>
                <h4 className="mt-6 text-xs font-semibold uppercase tracking-wider text-muted">Signal path</h4>
                <ol className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                  {["Wireless mics + laptop", "Yamaha mixer", "Power amplifier", "PA speakers"].map((s, i, arr) => (
                    <li key={s} className="flex items-center gap-2"><span className="rounded-md border border-white/10 bg-black/30 px-2.5 py-1.5">{s}</span>{i < arr.length - 1 && <span className="text-accent">→</span>}</li>
                  ))}
                </ol>
                <div className="mt-5 flex flex-wrap gap-2">{yog.toConfirm?.map((t) => <DraftChip key={t}>To confirm: {t}</DraftChip>)}</div>
                <button onClick={() => openProject(yog.id, soundIds)} className="btn-primary mt-6"><Images size={16} /> View project</button>
              </div>
            </div>
          </article>
        </Reveal>

        {/* recordings */}
        <Reveal delay={0.05} className="mt-14">
          <h3 className="font-display text-xl font-semibold">Recordings</h3>
          {audioTracks.length ? (
            <div className="mt-4 grid gap-4 md:grid-cols-2">{audioTracks.map((t) => <AudioPlayer key={t.src} track={t} />)}</div>
          ) : (
            <div className="glass mt-4 flex flex-col items-center gap-4 px-6 py-8 text-center sm:flex-row sm:text-left">
              <Waveform bars={36} height={36} className="opacity-50" />
              <p className="text-sm text-muted">Audio recordings will be added here soon.</p>
              <DraftChip>Add tracks to /assets/audio and list them in audioTracks</DraftChip>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
