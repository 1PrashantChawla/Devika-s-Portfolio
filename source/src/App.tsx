import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { ModalContext } from "./components/ui";
import Nav from "./components/Nav";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import PerformanceGallery from "./components/PerformanceGallery";
import TeachingSection from "./components/TeachingSection";
import AudioProductionSection from "./components/AudioProductionSection";
import CertificatesGallery from "./components/CertificatesGallery";
import ResearchSection from "./components/ResearchSection";
import ExperienceTimeline from "./components/ExperienceTimeline";
import ProjectGallery from "./components/ProjectGallery";
import ContactSection, { ResumeSection, Footer } from "./components/ContactSection";
import CertificateModal from "./components/CertificateModal";
import ProjectModal from "./components/ProjectModal";
import ResumePage from "./components/ResumePage";
import WorkSection from "./components/WorkSection";

function useHash() {
  const [h, setH] = useState(window.location.hash);
  useEffect(() => { const f = () => setH(window.location.hash); window.addEventListener("hashchange", f); return () => window.removeEventListener("hashchange", f); }, []);
  return h;
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => { const f = () => setShow(window.scrollY > 900); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.a href="#home" aria-label="Back to top" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-5 right-5 z-30 grid h-12 w-12 place-items-center rounded-full bg-accent shadow-[0_10px_30px_-5px_rgba(229,9,37,.7)] hover:bg-[#ff1a36]">
          <ArrowUp size={20} />
        </motion.a>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const hash = useHash();
  const [cert, setCert] = useState<string | null>(null);
  const [proj, setProj] = useState<{ id: string; list?: string[] } | null>(null);

  if (hash.startsWith("#/cv")) return <ResumePage />;

  return (
    <ModalContext.Provider value={{ openCert: setCert, openProject: (id, list) => setProj({ id, list }) }}>
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-accent focus:px-3 focus:py-2">Skip to content</a>
      <Nav />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <WorkSection />
        <PerformanceGallery />
        <TeachingSection />
        <AudioProductionSection />
        <CertificatesGallery />
        <ResearchSection />
        <ExperienceTimeline />
        <ProjectGallery />
        <ResumeSection />
        <ContactSection />
      </main>
      <Footer />
      <BackToTop />
      <AnimatePresence>
        {cert && <CertificateModal key="cert" id={cert} onClose={() => setCert(null)} onNav={setCert} />}
        {proj && <ProjectModal key={"p" + proj.id} id={proj.id} list={proj.list} onClose={() => setProj(null)} />}
      </AnimatePresence>
    </ModalContext.Provider>
  );
}
