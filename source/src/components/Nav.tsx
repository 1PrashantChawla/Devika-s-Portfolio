import { useEffect, useState } from "react";
import { Menu, X, Music2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export const NAV = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "performances", label: "Live" },
  { id: "teaching", label: "Teaching" },
  { id: "sound", label: "Sound" },
  { id: "certificates", label: "Certificates" },
  { id: "research", label: "Research" },
  { id: "journey", label: "Journey" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV.forEach((n) => { const el = document.getElementById(n.id); if (el) obs.observe(el); });
    const hero = document.getElementById("home"); if (hero) obs.observe(hero);
    return () => { window.removeEventListener("scroll", onScroll); obs.disconnect(); };
  }, []);

  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${scrolled ? "border-b border-white/5 bg-ink/75 backdrop-blur-xl" : ""}`}>
      <nav className="container-x flex h-16 items-center justify-between" aria-label="Main">
        <a href="#home" className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent/15 text-accent"><Music2 size={17} /></span>
          Devika<span className="text-accent">.</span>
        </a>
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                aria-current={active === n.id ? "true" : undefined}
                className={`relative rounded-full px-3 py-1.5 text-[13px] font-medium transition ${active === n.id ? "text-white" : "text-muted hover:text-white"}`}
              >
                {active === n.id && <motion.span layoutId="navpill" className="absolute inset-0 -z-10 rounded-full bg-accent/15 ring-1 ring-accent/40" />}
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#/cv" className="btn-primary hidden !py-2 lg:inline-flex">CV</a>
        <button className="grid h-10 w-10 place-items-center rounded-full border border-white/10 lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open}>
          <Menu size={20} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-50 bg-ink/95 backdrop-blur-xl lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label="Menu">
            <div className="container-x flex h-16 items-center justify-end">
              <button className="grid h-10 w-10 place-items-center rounded-full border border-white/10" onClick={() => setOpen(false)} aria-label="Close menu"><X size={20} /></button>
            </div>
            <ul className="container-x mt-4 space-y-1">
              {NAV.map((n, i) => (
                <motion.li key={n.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}>
                  <a href={`#${n.id}`} onClick={() => setOpen(false)} className={`block rounded-xl px-4 py-3 font-display text-2xl font-semibold ${active === n.id ? "text-accent" : "text-white"}`}>{n.label}</a>
                </motion.li>
              ))}
              <li className="px-4 pt-4"><a href="#/cv" onClick={() => setOpen(false)} className="btn-primary">View CV</a></li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
