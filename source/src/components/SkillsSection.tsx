import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Award, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { skills, projects, certificates, type Skill } from "../data/portfolio";
import { Reveal, SectionHeading, SkillIcon, useModals } from "./ui";
import Modal from "./Modal";

const RING_COLORS = ["#FF6475", "#E50925", "#ff8a5c", "#FF6475", "#E50925", "#ff8a5c", "#FF6475", "#E50925", "#ff8a5c"];

/** Animated indicator ring — deliberately has NO percentage (none has been self-assessed yet). */
function Ring({ color, children }: { color: string; children: React.ReactNode }) {
  const r = 44, c = 2 * Math.PI * r;
  return (
    <div className="relative h-28 w-28">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden>
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="5" />
        <motion.circle
          cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" strokeDasharray={`${c * 0.07} ${c * 0.018}`}
          initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, ease: "easeOut" }}
        />
      </svg>
      <motion.div className="absolute inset-0 rounded-full" style={{ boxShadow: `0 0 40px -12px ${color}` }} animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 4, repeat: Infinity }} aria-hidden />
      <div className="absolute inset-0 grid place-items-center" style={{ color }}>{children}</div>
    </div>
  );
}

function SkillDetail({ s, onClose }: { s: Skill; onClose: () => void }) {
  const { openCert, openProject } = useModals();
  const ps = projects.filter((p) => s.projectIds.includes(p.id));
  const cs = certificates.filter((c) => s.certIds.includes(c.id));
  const photos = ps.flatMap((p) => p.gallery.slice(0, 1).map((g) => ({ ...g, pid: p.id })));
  return (
    <Modal onClose={onClose} label={s.name}>
      <div className="overflow-y-auto p-6 sm:p-8">
        <div className="flex items-center gap-4">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent/15 text-rose"><SkillIcon name={s.icon} /></span>
          <div><span className="eyebrow">Skill</span><h3 className="mt-2 font-display text-2xl font-bold">{s.name}</h3></div>
        </div>
        <p className="mt-5 leading-relaxed text-muted">{s.description}</p>

        <h4 className="mt-7 text-xs font-semibold uppercase tracking-wider text-muted">Relevant experience</h4>
        <ul className="mt-3 space-y-2">{s.evidence.map((e) => <li key={e} className="flex gap-2 text-sm"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-accent" />{e}</li>)}</ul>

        {photos.length > 0 && (
          <>
            <h4 className="mt-7 text-xs font-semibold uppercase tracking-wider text-muted">Supporting photographs</h4>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {photos.map((ph) => (
                <button key={ph.src} onClick={() => { onClose(); setTimeout(() => openProject(ph.pid), 50); }} className="group relative aspect-[4/3] overflow-hidden rounded-xl">
                  <img src={ph.thumb} alt={ph.alt} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                </button>
              ))}
            </div>
          </>
        )}

        {cs.length > 0 && (
          <>
            <h4 className="mt-7 text-xs font-semibold uppercase tracking-wider text-muted">Associated certificates</h4>
            <div className="mt-3 space-y-2">
              {cs.map((c) => (
                <button key={c.id} onClick={() => { onClose(); setTimeout(() => openCert(c.id), 50); }} className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-left hover:border-accent/50">
                  <Award size={18} className="shrink-0 text-accent" />
                  <span className="flex-1 text-sm"><b className="font-semibold">{c.title}</b><span className="block text-xs text-muted">{c.institution}</span></span>
                  <ArrowUpRight size={16} className="text-muted" />
                </button>
              ))}
            </div>
          </>
        )}

        {ps.length > 0 && (
          <>
            <h4 className="mt-7 text-xs font-semibold uppercase tracking-wider text-muted">Related projects</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {ps.map((p) => <button key={p.id} onClick={() => { onClose(); setTimeout(() => openProject(p.id), 50); }} className="chip !text-xs hover:border-accent hover:text-white">{p.title}</button>)}
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}

export default function SkillsSection() {
  const [sel, setSel] = useState<Skill | null>(null);
  return (
    <section id="skills" className="section">
      <div className="container-x">
        <SectionHeading center eyebrow="Expertise" title="My Musical" accent="Expertise" sub="Tap any skill to see the experience, photographs and certificates behind it." />
        <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:gap-y-14">
          {skills.map((s, i) => {
            const n = s.projectIds.length + s.certIds.length;
            return (
              <Reveal key={s.id} delay={(i % 3) * 0.06}>
                <button onClick={() => setSel(s)} className="group mx-auto flex flex-col items-center text-center focus:outline-none" aria-haspopup="dialog">
                  <div className="transition duration-300 group-hover:-translate-y-1 group-hover:scale-105 group-focus-visible:scale-105">
                    <Ring color={RING_COLORS[i]}><SkillIcon name={s.icon} size={30} /></Ring>
                  </div>
                  <span className="mt-4 font-display text-[15px] font-semibold group-hover:text-rose">{s.name}</span>
                  <span className="mt-1 text-[11px] text-muted">{n} {n === 1 ? "piece" : "pieces"} of evidence →</span>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
      <AnimatePresence>{sel && <SkillDetail s={sel} onClose={() => setSel(null)} />}</AnimatePresence>
    </section>
  );
}
