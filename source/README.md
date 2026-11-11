# Devika Bajaj — Music Portfolio & CV

## Just want to look at it?
Open **website/index.html** (double-click). Works offline, no install.
The CV is **Devika-Bajaj-CV.pdf**; the whole webpage as a PDF is **Devika-Bajaj-Portfolio.pdf** (re-make with `npm run site-pdf`).

## Put it online (free, ~2 minutes)
Drag the **website** folder onto https://app.netlify.com/drop — you get a public link.
(Vercel, GitHub Pages or any web host also work: upload the folder contents as-is.)

## Change text, photos or details
Everything lives in one file: **source/src/data/portfolio.ts**
(contact, about text, certificates, projects, skills, timeline, CV content).
Then, inside the `source` folder:

    npm install          # first time only
    npm run dev          # live preview at http://localhost:5173
    npm run build        # makes a new website in source/dist
    npm run cv           # re-prints Devika-Bajaj-CV.pdf from the CV page

Optional:
- Audio: drop mp3s in `public/assets/audio/` and list them in `audioTracks`.
- Video: add a YouTube embed URL to a project's `video` field.
- Research link: set `PAPER_URL` in `src/components/ResearchSection.tsx`.
- Set `SHOW_DRAFT_NOTES = true` to see amber "to confirm" markers for missing details.

Built with React, TypeScript, Tailwind CSS, Framer Motion and Lucide icons.
