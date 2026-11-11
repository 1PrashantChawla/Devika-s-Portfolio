import { createContext, useContext, type ReactNode } from "react";
import { motion } from "framer-motion";
import {
  Guitar, GraduationCap, SlidersHorizontal, AudioWaveform, Music4, Scissors, Speaker, BookOpenText, Users, CircleAlert,
} from "lucide-react";
import { SHOW_DRAFT_NOTES, type Skill } from "../data/portfolio";

/* ---------- modal context ---------- */
interface ModalCtx { openCert: (id: string) => void; openProject: (id: string, list?: string[]) => void; }
export const ModalContext = createContext<ModalCtx>({ openCert: () => {}, openProject: () => {} });
export const useModals = () => useContext(ModalContext);

/* ---------- reveal on scroll ---------- */
export function Reveal({ children, delay = 0, className = "", y = 24 }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ eyebrow, title, accent, sub, center = false }: { eyebrow: string; title: string; accent?: string; sub?: string; center?: boolean }) {
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="h2 mt-4">
        {title} {accent && <span className="accent-text">{accent}</span>}
      </h2>
      {sub && <p className="mt-4 text-muted leading-relaxed">{sub}</p>}
    </Reveal>
  );
}

export function DraftChip({ children }: { children: ReactNode }) {
  if (!SHOW_DRAFT_NOTES) return null;
  return (
    <span className="draft-chip" title="Visible only while SHOW_DRAFT_NOTES is true in src/data/portfolio.ts">
      <CircleAlert size={12} aria-hidden /> {children}
    </span>
  );
}

const iconMap = {
  guitar: Guitar, teach: GraduationCap, production: SlidersHorizontal, logic: AudioWaveform, daw: Music4,
  edit: Scissors, live: Speaker, research: BookOpenText, ensemble: Users,
} as const;
export function SkillIcon({ name, size = 26 }: { name: Skill["icon"]; size?: number }) {
  const I = iconMap[name];
  return <I size={size} strokeWidth={1.6} aria-hidden />;
}

/* ---------- decorative waveform ---------- */
export function Waveform({ bars = 64, className = "", height = 56 }: { bars?: number; className?: string; height?: number }) {
  return (
    <div className={`flex items-end justify-center gap-[3px] ${className}`} style={{ height }} aria-hidden>
      {Array.from({ length: bars }).map((_, i) => {
        const env = Math.sin((i / (bars - 1)) * Math.PI); // fade edges
        const h = 18 + Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.43)) * 82;
        return (
          <span
            key={i}
            className="eq-bar w-[3px] rounded-full bg-gradient-to-t from-accent to-rose"
            style={{ height: `${Math.max(8, h * env)}%`, animationDelay: `${(i % 11) * -0.14}s`, animationDuration: `${1.2 + (i % 5) * 0.22}s`, opacity: 0.35 + env * 0.6 }}
          />
        );
      })}
    </div>
  );
}

export function Img(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  return <img loading="lazy" decoding="async" {...props} />;
}
