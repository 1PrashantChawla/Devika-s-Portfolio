import { useState } from "react";
import { Award, Eye, CalendarDays } from "lucide-react";
import { certificates } from "../data/portfolio";
import { Reveal, SectionHeading, useModals } from "./ui";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "qual", label: "Qualifications", cats: ["Graded Examination", "Music Course", "Workshop"] },
  { id: "research", label: "Research & Seminars", cats: ["Research Publication", "Seminar Participation"] },
  { id: "event", label: "Event Experience", cats: ["Event Experience / Volunteering"] },
];

export default function CertificatesGallery() {
  const { openCert } = useModals();
  const [f, setF] = useState("all");
  const cats = FILTERS.find((x) => x.id === f)?.cats;
  const list = certificates.filter((c) => !cats || cats.includes(c.category));

  return (
    <section id="certificates" className="section">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Certifications" title="Certificates &" accent="Achievements" sub="Original certificates and credentials — open any one to zoom in or download." />
          <Reveal className="flex flex-wrap gap-2">
            {FILTERS.map((x) => (
              <button key={x.id} onClick={() => setF(x.id)} aria-pressed={f === x.id} className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${f === x.id ? "bg-accent text-white" : "border border-white/10 text-muted hover:text-white"}`}>{x.label}</button>
            ))}
          </Reveal>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((c, i) => (
            <Reveal key={c.id} delay={(i % 3) * 0.06}>
              <article className="group glass gradient-border flex h-full flex-col overflow-hidden !rounded-3xl">
                <button onClick={() => openCert(c.id)} className="relative block aspect-[4/3] overflow-hidden bg-black/30" aria-label={`View ${c.title} certificate`}>
                  <img src={c.thumb} alt={`${c.title} certificate`} loading="lazy" className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-105" />
                  {c.badge && <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${c.badge === "Distinction" ? "bg-accent shadow-[0_0_20px_rgba(229,9,37,.8)]" : "bg-black/70 backdrop-blur"}`}>{c.badge}</span>}
                </button>
                <div className="flex flex-1 flex-col p-5">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-rose">{c.category}</span>
                  <h3 className="mt-2 font-display text-lg font-bold leading-snug">{c.title}</h3>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-muted"><Award size={14} className="text-accent" />{c.institution}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-muted"><CalendarDays size={13} />{c.year ?? "—"}</p>
                  <button onClick={() => openCert(c.id)} className="btn-ghost mt-auto self-start !py-1.5 text-xs" style={{ marginTop: "1rem" }}><Eye size={14} /> View certificate</button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
