import { ChevronLeft, ChevronRight, Download, Building2, CalendarDays } from "lucide-react";
import { certificates } from "../data/portfolio";
import Modal from "./Modal";
import ZoomImage from "./ZoomImage";
import { DraftChip } from "./ui";

export default function CertificateModal({ id, onClose, onNav }: { id: string; onClose: () => void; onNav: (id: string) => void }) {
  const idx = certificates.findIndex((c) => c.id === id);
  const c = certificates[idx];
  if (!c) return null;
  const go = (d: number) => onNav(certificates[(idx + d + certificates.length) % certificates.length].id);

  return (
    <Modal onClose={onClose} label={`Certificate: ${c.title}`} wide onKey={(e) => { if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); }}>
      <div className="grid min-h-0 flex-1 overflow-y-auto lg:grid-cols-[1.5fr_1fr] lg:overflow-hidden">
        <div className="relative h-[58svh] lg:h-auto lg:min-h-[78vh]">
          <ZoomImage src={c.image} alt={`${c.title} — ${c.institution} certificate`} className="h-full" />
          <button onClick={() => go(-1)} aria-label="Previous certificate" className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/60 hover:bg-accent"><ChevronLeft size={18} /></button>
          <button onClick={() => go(1)} aria-label="Next certificate" className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/60 hover:bg-accent lg:right-3"><ChevronRight size={18} /></button>
        </div>
        <div className="overflow-y-auto border-t border-white/10 p-6 sm:p-8 lg:border-l lg:border-t-0">
          <span className="chip">{c.category}</span>
          {c.badge && <span className="ml-2 rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider">{c.badge}</span>}
          <h3 className="mt-4 font-display text-2xl font-bold leading-tight">{c.title}</h3>
          {c.subtitle && <p className="mt-2 text-sm text-rose">{c.subtitle}</p>}
          <div className="mt-5 space-y-2 text-sm text-muted">
            <p className="flex gap-2"><Building2 size={16} className="mt-0.5 shrink-0 text-accent" />{c.institution}</p>
            <p className="flex gap-2"><CalendarDays size={16} className="mt-0.5 shrink-0 text-accent" />{c.date}</p>
          </div>
          <dl className="mt-6 divide-y divide-white/5 rounded-xl border border-white/10 text-sm">
            {c.details.map((d) => (
              <div key={d.label} className="grid grid-cols-[110px_1fr] gap-3 px-4 py-2.5">
                <dt className="text-muted">{d.label}</dt><dd>{d.value}</dd>
              </div>
            ))}
          </dl>
          {c.toConfirm?.map((t) => <div key={t} className="mt-3"><DraftChip>To confirm: {t}</DraftChip></div>)}
          <div className="mt-6 flex flex-wrap gap-3">
            {c.downloadable && <a className="btn-primary" href={c.file ?? c.image} download={c.file ? `Devika-Bajaj-${c.id}.pdf` : `Devika-Bajaj-${c.id}-certificate.jpg`}><Download size={16} /> Download{c.file ? " report (PDF)" : ""}</a>}
          </div>
          <p className="mt-6 text-xs text-muted/70">Tip: double-click or use the controls to zoom · drag to pan · ← → to browse · Esc to close</p>
        </div>
      </div>
    </Modal>
  );
}
