import { useState } from "react";
import { Mail, Phone, MapPin, Globe, Send, Download, FileText, ArrowUp, Music2 } from "lucide-react";
import { profile, cv } from "../data/portfolio";
import { Reveal, SectionHeading } from "./ui";
import { SocialLinks } from "./AboutSection";

export function ResumeSection() {
  return (
    <section id="cv" className="py-16">
      <div className="container-x">
        <Reveal>
          <div className="gradient-border relative grid items-center gap-8 overflow-hidden rounded-3xl bg-gradient-to-r from-burgundy to-wine p-6 sm:p-10 md:grid-cols-[auto_1fr_auto]">
            <img src={profile.headshot} alt="Devika Bajaj" loading="lazy" className="h-24 w-24 rounded-full object-cover ring-4 ring-accent/50" />
            <div>
              <span className="eyebrow">Digital CV</span>
              <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">Download my professional CV</h2>
              <p className="mt-2 max-w-xl text-sm text-muted">A clean, printable A4 résumé — experience, education, certifications and research on one page.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={profile.cvPdf} download="Devika-Bajaj-CV.pdf" className="btn-primary"><Download size={16} /> Download CV (PDF)</a>
              <a href="#/cv" className="btn-ghost"><FileText size={16} /> View online</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function ContactSection() {
  const c = profile.contact;
  const [f, setF] = useState({ name: "", email: "", subject: "", message: "" });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `${f.message}\n\n— ${f.name} (${f.email})`;
    window.location.href = `mailto:${c.email}?subject=${encodeURIComponent(f.subject || `Hello from ${f.name}`)}&body=${encodeURIComponent(body)}`;
  };
  const input = "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";
  const rows = [
    c.email && { Icon: Mail, label: c.email, href: `mailto:${c.email}` },
    c.phone && { Icon: Phone, label: c.phone, href: `tel:${c.phone.replace(/\s/g, "")}` },
    c.location && { Icon: MapPin, label: c.location },
    c.website && { Icon: Globe, label: c.website.replace(/^https?:\/\//, ""), href: c.website },
  ].filter(Boolean) as { Icon: typeof Mail; label: string; href?: string }[];

  return (
    <section id="contact" className="section">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <SectionHeading eyebrow="Contact" title="Let's Create Something" accent="Beautiful" sub="Whether it's music education, live performance, creative collaboration, or audio production, I'd love to connect." />
          <Reveal delay={0.1}>
            <ul className="mt-8 space-y-3">
              {rows.map(({ Icon, label, href }) => (
                <li key={label}>
                  {href ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="glass flex items-center gap-3 px-4 py-3 text-sm transition hover:border-accent/50"><Icon size={18} className="text-accent" />{label}</a>
                    : <div className="glass flex items-center gap-3 px-4 py-3 text-sm"><Icon size={18} className="text-accent" />{label}</div>}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs text-muted">Languages: {cv.languages.join(" · ")}</p>
            <SocialLinks className="mt-5" />
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <form onSubmit={submit} className="glass gradient-border space-y-4 !rounded-3xl p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block"><span className="mb-1.5 block text-xs text-muted">Name</span><input required className={input} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} placeholder="Your name" /></label>
              <label className="block"><span className="mb-1.5 block text-xs text-muted">Email</span><input required type="email" className={input} value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} placeholder="you@example.com" /></label>
            </div>
            <label className="block"><span className="mb-1.5 block text-xs text-muted">Subject</span><input className={input} value={f.subject} onChange={(e) => setF({ ...f, subject: e.target.value })} placeholder="Guitar lessons, performance, collaboration…" /></label>
            <label className="block"><span className="mb-1.5 block text-xs text-muted">Message</span><textarea required rows={5} className={input} value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} placeholder="Tell me a little about what you have in mind" /></label>
            <button className="btn-primary w-full sm:w-auto" disabled={!c.email}><Send size={16} /> Send message</button>
            <p className="text-[11px] text-muted/70">Opens your email app with the message ready to send to {c.email}.</p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="container-x flex flex-col items-center justify-between gap-3 text-xs text-muted sm:flex-row">
        <span className="flex items-center gap-2"><Music2 size={14} className="text-accent" /> © {new Date().getFullYear()} Devika Bajaj · Musician · Guitarist · Music Educator</span>
        <a href="#home" className="flex items-center gap-1 hover:text-white">Back to top <ArrowUp size={13} /></a>
      </div>
    </footer>
  );
}
