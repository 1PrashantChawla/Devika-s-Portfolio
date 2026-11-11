import { BookOpenText, FileText, ExternalLink, User, CalendarDays, Hash } from "lucide-react";
import { certificates } from "../data/portfolio";
import { Reveal, SectionHeading, useModals } from "./ui";

/** Add the paper's public URL here when available — the "Read research" button then appears. */
export const PAPER_URL = "";

export default function ResearchSection() {
  const { openCert } = useModals();
  const c = certificates.find((x) => x.id === "aaftj")!;
  return (
    <section id="research" className="section">
      <div className="container-x">
        <SectionHeading center eyebrow="Research & publications" title="Music Beyond" accent="Performance" />
        <Reveal delay={0.08} className="mx-auto mt-12 max-w-5xl">
          <article className="gradient-border grid overflow-hidden rounded-3xl bg-gradient-to-br from-wine to-burgundy/60 md:grid-cols-[1fr_1.15fr]">
            <button onClick={() => openCert(c.id)} className="group relative bg-white/5 p-5" aria-label="View publication certificate">
              <img src={c.thumb} alt="AAFT Journal certificate of publication" loading="lazy" className="w-full rounded-xl shadow-2xl transition duration-500 group-hover:scale-[1.02]" />
            </button>
            <div className="p-6 sm:p-9">
              <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-rose"><BookOpenText size={14} /> Academic research publication</span>
              <h3 className="mt-4 font-serif text-2xl font-semibold leading-snug sm:text-3xl">“Perception of Correlation Between Indian and Western Music as a Cathartic Tool: A Comparative Study”</h3>
              <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div><dt className="flex items-center gap-1.5 text-muted"><User size={13} /> Author</dt><dd className="mt-1 font-medium">Devika Bajaj</dd></div>
                <div><dt className="flex items-center gap-1.5 text-muted"><BookOpenText size={13} /> Journal</dt><dd className="mt-1 font-medium">AAFT Journal (AAFTJ)</dd></div>
                <div><dt className="flex items-center gap-1.5 text-muted"><CalendarDays size={13} /> Published</dt><dd className="mt-1 font-medium">Vol. 1, Issue 1 · January 2026</dd></div>
                <div><dt className="flex items-center gap-1.5 text-muted"><Hash size={13} /> Paper ID / ISSN</dt><dd className="mt-1 font-medium">AAFTJ 2601005 · 3107-9288</dd></div>
              </dl>
              <p className="mt-6 leading-relaxed text-muted">The paper examines how the relationship between Indian and Western music traditions is perceived when music is used as a cathartic tool — a comparative look at how listeners experience the two.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                {PAPER_URL && <a href={PAPER_URL} target="_blank" rel="noreferrer" className="btn-primary"><ExternalLink size={16} /> Read research</a>}
                <button onClick={() => openCert(c.id)} className={PAPER_URL ? "btn-ghost" : "btn-primary"}><FileText size={16} /> View publication certificate</button>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
