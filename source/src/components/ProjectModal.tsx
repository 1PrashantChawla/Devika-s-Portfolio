import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, CalendarDays, Mic2, Eye } from "lucide-react";
import { projects } from "../data/portfolio";
import Modal from "./Modal";
import ZoomImage from "./ZoomImage";
import { DraftChip } from "./ui";

export const CATEGORY_LABEL: Record<string, string> = {
  performances: "Performance", teaching: "Teaching", production: "Music Production", "live-sound": "Live Sound", research: "Research",
};

function VideoEmbed({ url }: { url: string }) {
  if (/\.(mp4|webm|mov)$/i.test(url)) return <video src={url} controls preload="metadata" className="aspect-video w-full rounded-xl bg-black" />;
  return <iframe src={url} title="Performance video" className="aspect-video w-full rounded-xl" allow="accelerometer; encrypted-media; picture-in-picture" allowFullScreen loading="lazy" />;
}

export default function ProjectModal({ id, onClose, list }: { id: string; onClose: () => void; list?: string[] }) {
  const ids = list ?? projects.map((p) => p.id);
  const [cur, setCur] = useState(id);
  const [img, setImg] = useState(0);
  useEffect(() => setImg(0), [cur]);
  const p = projects.find((x) => x.id === cur);
  if (!p) return null;
  const pos = ids.indexOf(cur);
  const goProject = (d: number) => setCur(ids[(pos + d + ids.length) % ids.length]);
  const goImg = (d: number) => setImg((v) => (v + d + p.gallery.length) % p.gallery.length);
  const g = p.gallery[img];

  return (
    <Modal onClose={onClose} label={p.title} wide onKey={(e) => {
      if (e.key === "ArrowRight") p.gallery.length > 1 && img < p.gallery.length - 1 ? goImg(1) : goProject(1);
      if (e.key === "ArrowLeft") p.gallery.length > 1 && img > 0 ? goImg(-1) : goProject(-1);
    }}>
      <div className="grid min-h-0 flex-1 overflow-y-auto lg:grid-cols-[1.45fr_1fr] lg:overflow-hidden">
        <div className="flex flex-col">
          <div className="relative h-[55svh] lg:h-auto lg:flex-1 lg:min-h-[60vh]">
            <ZoomImage src={g.src} alt={g.alt} className="h-full" />
            {p.gallery.length > 1 && (
              <>
                <button onClick={() => goImg(-1)} aria-label="Previous photo" className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/60 hover:bg-accent"><ChevronLeft size={18} /></button>
                <button onClick={() => goImg(1)} aria-label="Next photo" className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/60 hover:bg-accent"><ChevronRight size={18} /></button>
              </>
            )}
          </div>
          {p.gallery.length > 1 && (
            <div className="flex gap-2 overflow-x-auto border-t border-white/10 p-3 no-scrollbar">
              {p.gallery.map((x, i) => (
                <button key={x.src} onClick={() => setImg(i)} aria-label={`Show photo ${i + 1}`} className={`h-16 w-24 shrink-0 overflow-hidden rounded-lg ring-2 ${i === img ? "ring-accent" : "ring-transparent opacity-60 hover:opacity-100"}`}>
                  <img src={x.thumb} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="overflow-y-auto border-t border-white/10 p-6 sm:p-8 lg:border-l lg:border-t-0">
          <span className="chip">{CATEGORY_LABEL[p.category]}</span>
          <h3 className="mt-4 pr-10 font-display text-2xl font-bold leading-tight sm:text-3xl">{p.title}</h3>
          <div className="mt-4 space-y-2 text-sm text-muted">
            <p className="flex gap-2"><Mic2 size={16} className="mt-0.5 shrink-0 text-accent" />{p.role}</p>
            {p.venue && <p className="flex gap-2"><MapPin size={16} className="mt-0.5 shrink-0 text-accent" />{p.venue}</p>}
            {p.date && <p className="flex gap-2"><CalendarDays size={16} className="mt-0.5 shrink-0 text-accent" />{p.date}</p>}
          </div>
          <p className="mt-5 leading-relaxed text-white/90">{p.description}</p>
          {p.instruments && (
            <div className="mt-5 flex flex-wrap gap-2">{p.instruments.map((i) => <span key={i} className="chip">{i}</span>)}</div>
          )}
          {p.observed && (
            <div className="mt-6">
              <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted"><Eye size={14} /> In the photograph</h4>
              <ul className="mt-2 space-y-1.5 text-sm text-muted">{p.observed.map((o) => <li key={o} className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />{o}</li>)}</ul>
            </div>
          )}
          {p.video && <div className="mt-6"><VideoEmbed url={p.video} /></div>}
          {p.toConfirm && <div className="mt-6 flex flex-wrap gap-2">{p.toConfirm.map((t) => <DraftChip key={t}>To confirm: {t}</DraftChip>)}</div>}
          <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-4 text-sm">
            <button onClick={() => goProject(-1)} className="flex items-center gap-1 text-muted hover:text-white"><ChevronLeft size={16} /> Previous</button>
            <span className="text-xs text-muted/70">{pos + 1} / {ids.length}</span>
            <button onClick={() => goProject(1)} className="flex items-center gap-1 text-muted hover:text-white">Next <ChevronRight size={16} /></button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
