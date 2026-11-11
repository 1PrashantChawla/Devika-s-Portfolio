import { ArrowRight, Check, Camera, Briefcase, MonitorPlay, Mail, Globe, Phone } from "lucide-react";
import { profile } from "../data/portfolio";
import { Reveal, DraftChip } from "./ui";

export function SocialLinks({ className = "" }: { className?: string }) {
  const c = profile.contact;
  const items = [
    { href: c.website, label: "Website", Icon: Globe },
    { href: c.instagram, label: "Instagram", Icon: Camera },
    { href: c.youtube, label: "YouTube", Icon: MonitorPlay },
    { href: c.linkedin, label: "LinkedIn", Icon: Briefcase },
    { href: c.email ? `mailto:${c.email}` : "", label: "Email", Icon: Mail },
    { href: c.phone ? `tel:${c.phone.replace(/\s/g, "")}` : "", label: "Phone", Icon: Phone },
  ].filter((i) => i.href);
  if (!items.length) return <div className={className}><DraftChip>Social links: add in portfolio.ts → contact</DraftChip></div>;
  return (
    <div className={`flex gap-3 ${className}`}>
      {items.map(({ href, label, Icon }) => (
        <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-muted transition hover:border-accent hover:text-white">
          <Icon size={16} />
        </a>
      ))}
    </div>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="section overflow-hidden">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <div>
          <Reveal><span className="eyebrow">About me</span></Reveal>
          <Reveal delay={0.05}>
            <h2 className="h2 mt-4">My Journey <br className="hidden sm:block" /><span className="font-serif italic text-rose">Through Music</span></h2>
          </Reveal>
          <div className="mt-6 space-y-4 leading-relaxed text-muted">
            {profile.about.map((p, i) => <Reveal key={i} delay={0.08 + i * 0.05}><p>{p}</p></Reveal>)}
          </div>
          <Reveal delay={0.2}>
            <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
              {profile.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/15 text-accent"><Check size={12} /></span>{h}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.25} className="mt-8 flex flex-wrap items-center gap-5">
            <a href="#contact" className="btn-primary">Let's talk <ArrowRight size={16} /></a>
            <SocialLinks />
          </Reveal>
        </div>

        <Reveal delay={0.1} className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="absolute -inset-3 sm:-inset-6 rounded-[42%_58%_55%_45%/45%_40%_60%_55%] bg-gradient-to-br from-accent to-burgundy opacity-90 blur-[2px]" aria-hidden />
          <div className="relative overflow-hidden rounded-[42%_58%_55%_45%/45%_40%_60%_55%] border-4 border-accent/50 shadow-2xl">
            <img src={profile.aboutImage} alt={profile.aboutImageAlt} loading="lazy" className="aspect-square w-full object-cover object-[50%_22%]" />
          </div>
          <div className="glass absolute -bottom-5 left-1/2 w-[85%] -translate-x-1/2 px-5 py-3 text-center text-sm">
            <span className="font-serif italic text-rose">Indian & Western</span> <span className="text-muted">— performance, teaching, sound & research</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
