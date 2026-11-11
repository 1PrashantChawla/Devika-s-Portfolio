import { Guitar, Users, Sparkles, Music, Presentation, Hand } from "lucide-react";
import { projects } from "../data/portfolio";
import { Reveal, SectionHeading, useModals, DraftChip } from "./ui";

const FOCUS = [
  { Icon: Guitar, t: "Guitar instruction" },
  { Icon: Presentation, t: "Classroom music activities" },
  { Icon: Users, t: "Group learning" },
  { Icon: Sparkles, t: "Student performances" },
  { Icon: Music, t: "Music education" },
  { Icon: Hand, t: "Practical instrumental learning" },
];

export default function TeachingSection() {
  const { openProject } = useModals();
  const t = projects.filter((p) => p.category === "teaching");
  const ids = t.map((p) => p.id);
  return (
    <section id="teaching" className="section">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:items-center">
          <div>
            <SectionHeading eyebrow="Music education" title="Sharing Music" accent="Through Teaching" />
            <Reveal delay={0.1}>
              <blockquote className="mt-6 border-l-2 border-accent pl-5 font-serif text-xl italic leading-relaxed text-white/90">
                “Music education is an important part of my creative journey. Through practical instruction and collaborative learning, I aim to make music accessible, engaging, and meaningful for students.”
              </blockquote>
            </Reveal>
            <Reveal delay={0.15}>
              <ul className="mt-8 grid grid-cols-2 gap-3">
                {FOCUS.map(({ Icon, t }) => (
                  <li key={t} className="glass flex items-center gap-3 px-3 py-3 text-sm">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent/15 text-rose"><Icon size={16} /></span>{t}
                  </li>
                ))}
              </ul>
            </Reveal>
            <div className="mt-5"><DraftChip>School name, role title and dates not yet supplied — intentionally not shown</DraftChip></div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {t.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.1} className={i === 0 ? "sm:col-span-2" : "sm:col-span-2"}>
                <button onClick={() => openProject(p.id, ids)} className="group gradient-border relative block w-full overflow-hidden rounded-3xl text-left">
                  <img src={p.image} alt={p.gallery[0].alt} loading="lazy" className={`w-full object-cover transition duration-700 group-hover:scale-105 ${i === 0 ? "aspect-[16/8.5]" : "aspect-[16/9] object-[50%_40%]"}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="font-display text-lg font-bold sm:text-xl">{p.title}</h3>
                    <p className="mt-1 line-clamp-2 max-w-lg text-sm text-white/75">{p.description}</p>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
