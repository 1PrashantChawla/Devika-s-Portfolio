import { Images, MapPin, CalendarDays } from "lucide-react";
import { projects, type PerformanceGroup } from "../data/portfolio";
import { Reveal, SectionHeading, useModals, DraftChip } from "./ui";

const GROUPS: { id: PerformanceGroup; label: string }[] = [
  { id: "solo", label: "Solo Guitar Performances" },
  { id: "band", label: "Band Performances" },
  { id: "collaborative", label: "Collaborative Performances" },
  { id: "stage", label: "Stage Performances" },
];

export default function PerformanceGallery() {
  const { openProject } = useModals();
  const perf = projects.filter((p) => p.category === "performances");
  const ids = perf.map((p) => p.id);

  return (
    <section id="performances" className="section relative">
      <div className="container-x">
        <SectionHeading eyebrow="On stage" title="Live" accent="Performances" sub="Classical, acoustic and electric guitar across featured spots, college band sets, collaborative trios and large-format stages." />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-12">
          {GROUPS.map((g, gi) => {
            const p = perf.find((x) => x.group === g.id);
            if (!p) return null;
            const span = ["lg:col-span-5 lg:row-span-2", "lg:col-span-7", "lg:col-span-7", "lg:col-span-12"][gi];
            const aspect = ["aspect-[4/5] lg:aspect-auto lg:min-h-[420px] lg:flex-1", "aspect-[16/9]", "aspect-[16/9]", "aspect-[16/9] lg:aspect-[21/7]"][gi];
            return (
              <Reveal key={g.id} delay={gi * 0.06} className={span}>
                <article className="group gradient-border relative flex h-full flex-col overflow-hidden rounded-3xl bg-wine/80">
                  <button onClick={() => openProject(p.id, ids)} className={`relative block w-full overflow-hidden ${aspect}`} aria-label={`Open ${p.title}`}>
                    <img src={p.image} alt={p.gallery[0].alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" style={{ objectPosition: { solo: "50% 30%", band: "50% 55%", collaborative: "50% 72%", stage: "50% 55%" }[g.id] }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-wine/90 via-transparent to-transparent" />
                  </button>
                  <div className="relative p-5 sm:p-6">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-rose">{g.label}</span>
                    <h3 className="mt-2 font-display text-xl font-bold sm:text-2xl">{p.title}</h3>
                    <p className="mt-1 text-sm text-muted">{p.role} · {p.instruments?.join(", ")}</p>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted">
                      {p.venue ? <span className="flex items-center gap-1"><MapPin size={12} />{p.venue}</span> : <DraftChip>Venue to confirm</DraftChip>}
                      {p.date ? <span className="flex items-center gap-1"><CalendarDays size={12} />{p.date}</span> : <DraftChip>Date to confirm</DraftChip>}
                    </div>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/75">{p.description}</p>
                    <button onClick={() => openProject(p.id, ids)} className="btn-ghost mt-4 !py-2 text-xs">
                      <Images size={14} /> View gallery {p.gallery.length > 1 && `(${p.gallery.length})`}
                    </button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
