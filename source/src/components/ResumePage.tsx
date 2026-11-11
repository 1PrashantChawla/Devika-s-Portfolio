import { useEffect } from "react";
import { profile, cv, certificates, work, workCategories, soundcloudProfile } from "../data/portfolio";

/**
 * ATS-friendly A4 résumé. Rendered at  #/cv  and printed to  public/Devika-Bajaj-CV.pdf
 * by `npm run cv` (real, selectable text — not a screenshot).
 */
export default function ResumePage() {
  useEffect(() => { document.title = "Devika Bajaj — CV"; window.scrollTo(0, 0); }, []);
  const c = profile.contact;
  const H = ({ children }: { children: string }) => <h2 className="mb-1.5 mt-3.5 border-b border-[#E50925]/40 pb-1 text-[10.5pt] font-bold uppercase tracking-[0.12em] text-[#9b0a1d]">{children}</h2>;
  const quals = certificates.filter((x) => ["Graded Examination", "Music Course", "Workshop"].includes(x.category));

  return (
    <div className="min-h-screen bg-neutral-200 py-8 print:bg-white print:py-0" style={{ fontFamily: "Inter, Arial, sans-serif" }}>
      <div className="mx-auto mb-5 flex max-w-[210mm] flex-wrap justify-between gap-3 px-4 print:hidden">
        <a href="#" className="rounded-full bg-neutral-800 px-4 py-2 text-sm text-white">← Back to portfolio</a>
        <a href={profile.cvPdf} download="Devika-Bajaj-CV.pdf" className="rounded-full bg-[#E50925] px-4 py-2 text-sm font-semibold text-white">Download PDF</a>
      </div>
      <article id="cv-sheet" className="mx-auto box-border min-h-[297mm] w-full max-w-[210mm] bg-white px-[14mm] py-[10mm] text-[9pt] leading-[1.4] text-neutral-800 shadow-xl print:shadow-none">
        <header className="flex items-center gap-5 border-b-2 border-[#E50925] pb-3">
          <img src={profile.headshot} alt="" className="h-[24mm] w-[24mm] rounded-full object-cover" />
          <div className="flex-1">
            <h1 className="text-[22pt] font-bold leading-none tracking-tight text-neutral-900" style={{ fontFamily: "'Space Grotesk', Arial, sans-serif" }}>DEVIKA BAJAJ</h1>
            <p className="mt-1 text-[10pt] font-semibold text-[#9b0a1d]">Music Producer · Guitarist · Music Educator</p>
            <p className="mt-1.5 text-[8.6pt] text-neutral-600">{[c.phone, c.email, c.location, c.website.replace(/^https?:\/\//, "")].filter(Boolean).join("  |  ")}</p>
            <p className="mt-0.5 text-[8.6pt] text-neutral-600">Listen: <a href={soundcloudProfile} className="text-[#9b0a1d]">{soundcloudProfile.replace(/^https?:\/\//, "")}</a></p>
          </div>
        </header>

        <H>Professional Summary</H>
        <p>{cv.summary}</p>

        <div className="grid grid-cols-[1fr_58mm] gap-x-7">
          <div>
            <H>Work Experience</H>
            {cv.experience.map((e) => (
              <div key={e.title} className="mb-2">
                <p><b className="text-neutral-900">{e.title}</b> — {e.org}</p>
                <ul className="ml-4 list-disc">{e.points.map((p) => <li key={p}>{p}</li>)}</ul>
              </div>
            ))}

            <H>Selected Work</H>
            <ul className="ml-4 list-disc">
              {workCategories.filter((c) => work.some((w) => w.category === c.id)).map((c) => (
                <li key={c.id}><b className="text-neutral-900">{c.label}:</b> {work.filter((w) => w.category === c.id).map((w, i, a) => <span key={w.id}><a href={w.url} className="text-[#9b0a1d]">{w.title.replace(" (guitars)", "")}</a>{i < a.length - 1 ? ", " : ""}</span>)}</li>
              ))}
            </ul>

            <H>Performance Experience</H>
            <ul className="ml-4 list-disc">
              <li>Electric guitar with the AAFT college band (vocals, drums, guitars)</li>
              <li>Acoustic guitar in collaborative guitar/percussion sets on LED-production stages</li>
              <li>Featured acoustic performance at an AAFT School of Music event</li>
            </ul>

            <H>Sound Engineering Experience</H>
            <ul className="ml-4 list-disc">
              <li>Yoga Nidra live event — sound desk with Yamaha mixer, wireless mics, amplification and laptop playback</li>
              <li>Volunteer, Sound — 16th Global Film Festival Noida, Marwah Studios (7–9 Dec 2023)</li>
            </ul>

            <H>Research Publication</H>
            <p><b className="text-neutral-900">“Perception of Correlation Between Indian and Western Music as a Cathartic Tool: A Comparative Study”</b> — AAFT Journal, Vol. 1, Issue 1, January 2026 (Paper ID AAFTJ 2601005, ISSN 3107-9288).</p>
            <p className="mt-1">Seminar participant: “Comparative Study of Indian and Western Music”, AAFT, Film City, Noida — 3 June 2024.</p>
          </div>

          <aside>
            <H>Education</H>
            {cv.education.map((e) => (
              <div key={e.title} className="mb-1.5">
                <p className="font-bold text-neutral-900">{e.title}</p>
                <p>{e.org}</p>
                <p className="text-neutral-500">{e.date}{e.note && ` · ${e.note}`}</p>
              </div>
            ))}

            <H>Certifications</H>
            {quals.map((q) => (
              <div key={q.id} className="mb-1.5">
                <p className="font-bold text-neutral-900">{q.title}{q.badge === "Distinction" ? ` — Distinction${q.id === "trinity" ? " (91/100)" : ""}` : ""}</p>
                <p>{q.institution}</p>
                {q.year && <p className="text-neutral-500">{q.year}</p>}
              </div>
            ))}

            <H>Musical Skills</H>
            <p>{cv.musicalSkills.join(" · ")}</p>

            <H>Technical Skills</H>
            <p>{cv.technicalSkills.join(" · ")}</p>

            <H>Strengths</H>
            <p>{cv.softSkills.join(" · ")}</p>

            <H>Languages</H>
            <p>{cv.languages.join(" · ")}</p>
          </aside>
        </div>
      </article>
    </div>
  );
}
