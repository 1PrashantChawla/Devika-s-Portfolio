/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  DEVIKA BAJAJ — PORTFOLIO DATA (single source of truth)
 * ─────────────────────────────────────────────────────────────────────────────
 *  Every fact below was read directly from the supplied certificates and
 *  photographs (folder "for cv": certificates/, live/, work/).
 *  Nothing has been invented. Anything that could not be verified from a file
 *  is left EMPTY ("") or listed in `toConfirm` so it can be filled in later.
 *
 *  HOW TO UPDATE
 *   • Fill in `profile.contact` → links, email and form start working.
 *   • Add verified dates/venues to performances → they appear automatically.
 *   • Add recordings to `audioTracks` → the audio player appears.
 *   • Set SHOW_DRAFT_NOTES = false before publishing publicly to hide all
 *     "to confirm" markers on the website and in the CV.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const SHOW_DRAFT_NOTES = false; // set true to show amber "to confirm" markers

const A = "./assets";

/* ───────────────────────────── Types ───────────────────────────── */

export type CertCategory =
  | "Graded Examination"
  | "Music Course"
  | "Workshop"
  | "Research Publication"
  | "Seminar Participation"
  | "Event Experience / Volunteering";

export interface Certificate {
  id: string;
  title: string;
  subtitle?: string;
  institution: string;
  category: CertCategory;
  /** Human-readable date exactly as verifiable */
  date: string;
  year?: string;
  badge?: string;
  image: string;
  thumb: string;
  details: { label: string; value: string }[];
  downloadable: boolean;
  /** Original document (e.g. PDF report) offered for download instead of the image */
  file?: string;
  /** Pieces of information that still need confirming */
  toConfirm?: string[];
}

export type ProjectCategory = "performances" | "teaching" | "production" | "live-sound" | "research";
export type PerformanceGroup = "solo" | "band" | "collaborative" | "stage";

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  group?: PerformanceGroup;
  image: string;
  thumb: string;
  gallery: { src: string; thumb: string; alt: string }[];
  role: string;
  instruments?: string[];
  /** Only filled when verified */
  venue?: string;
  date?: string;
  description: string;
  /** What is visible in the photograph — factual observation */
  observed?: string[];
  /** YouTube/Vimeo embed URL or local mp4 in /assets/videos — add when supplied */
  video?: string;
  toConfirm?: string[];
}

export interface Skill {
  id: string;
  name: string;
  icon: "guitar" | "teach" | "production" | "logic" | "daw" | "edit" | "live" | "research" | "ensemble";
  description: string;
  evidence: string[];
  projectIds: string[];
  certIds: string[];
}

export interface TimelineItem {
  id: string;
  date?: string; // omitted = undated (not yet confirmed)
  title: string;
  org?: string;
  kind: "Qualification" | "Course" | "Workshop" | "Volunteering" | "Seminar" | "Publication" | "Teaching" | "Performance" | "Production";
  text: string;
  certId?: string;
  projectIds?: string[];
}

export interface AudioTrack {
  title: string;
  src: string; // e.g. "./assets/audio/my-track.mp3"
  description?: string;
}

/* ───────────────────────────── Profile ───────────────────────────── */

export const profile = {
  name: "Devika Bajaj",
  firstName: "Devika",
  positioning: "Musician | Guitarist | Music Educator | Audio Production & Sound Engineering",
  roles: ["Guitarist", "Music Educator", "Musician", "Audio Production Professional", "Live Performer"],
  heroIntro:
    "I'm a musician and guitarist passionate about performance, music education, and audio production. My work brings together live musical expression, teaching, recording technology, and research.",
  heroPortrait: `${A}/portraits/devika-portrait.webp`,
  headshot: `${A}/portraits/devika-headshot.jpg`,
  heroPortraitAlt: "Portrait of Devika Bajaj",
  aboutImage: `${A}/production/office-2.jpg`,
  aboutImageAlt: "Devika Bajaj editing audio on a laptop with studio headphones",
  about: [
    "I'm a music producer and guitarist whose work moves between the stage, the classroom and the studio. My training began with a two-year guitar course at Tansen Sangeet Mahavidyalaya, followed by Trinity College London's Grade 3 Classical Guitar examination, which I passed with Distinction (91/100).",
    "I'm currently studying for a Bachelor of Performing Arts at the School of Music, AAFT (2023–2027). I play classical, acoustic and electric guitar — in college bands, collaborative sets and stage events, and I have taught guitar and ukulele at Modern Public School, Delhi.",
    "As a music producer at Dusq I've produced binaural beats and meditation tracks in Logic Pro and worked on audio narration, editing and processing. I've also handled sound at live events, including volunteering on the sound team at the 16th Global Film Festival Noida.",
    "I'm especially drawn to the meeting point of Indian and Western music. My paper on how the two traditions are perceived as cathartic tools was published in the AAFT Journal in January 2026.",
  ],
  highlights: [
    "Trinity College London — Grade 3 Classical Guitar, Distinction",
    "Two-year guitar course, Tansen Sangeet Mahavidyalaya",
    "Published researcher — AAFT Journal, Vol. 1 Issue 1",
    "Music Producer — Dusq (meditation & binaural audio)",
    "Guitar Teacher — Modern Public School, Delhi",
    "Live-event sound experience",
  ],
  /** Leave blank until supplied — blank items are hidden (or flagged in draft mode). */
  contact: {
    email: "devikabajaj114@gmail.com",
    phone: "+91 9599142673",
    location: "Mansarover Garden, Delhi",
    website: "https://devikabajaj.wix.com",
    linkedin: "",
    instagram: "",
    youtube: "",
  },
  cvPdf: "./Devika-Bajaj-CV.pdf",
};

/* ───────────────────────────── Certificates ───────────────────────────── */

export const certificates: Certificate[] = [
  {
    id: "trinity",
    title: "Classical Guitar Grade 3",
    subtitle: "Pass with Distinction · 91 / 100",
    institution: "Trinity College London",
    category: "Graded Examination",
    date: "Examination report dated 9 February 2026",
    year: "2026",
    badge: "Distinction",
    image: `${A}/certificates/trinity-grade-3.jpg`,
    thumb: `${A}/certificates/trinity-grade-3-sm.jpg`,
    file: `${A}/certificates/trinity-grade-3-classical-report.pdf`,
    downloadable: true,
    details: [
      { label: "Syllabus", value: "Classical & Jazz — Classical Guitar, Grade 3" },
      { label: "Result", value: "Pass with Distinction — 91/100" },
      { label: "Piece 1", value: "Attaignant: French Dance (Tourdion) — 20/22" },
      { label: "Piece 2", value: "Carulli: Valse, op. 241 no. 21 — 20/22" },
      { label: "Piece 3", value: "Carcassi: Allegretto in D major — 21/22" },
      { label: "Technical work", value: "13" },
      { label: "Report date", value: "9 February 2026 (Centre 1328)" },
    ],
  },
  {
    id: "tansen",
    title: "Guitar Course — Level II",
    subtitle: "Certificate of Excellence · two-year course completed",
    institution: "Tansen Sangeet Mahavidyalaya",
    category: "Music Course",
    date: "15 March 2019 – 14 March 2021",
    year: "2019–2021",
    badge: "Completed",
    image: `${A}/certificates/tansen-guitar-level-2.jpg`,
    thumb: `${A}/certificates/tansen-guitar-level-2-sm.jpg`,
    downloadable: true,
    details: [
      { label: "Course", value: "Guitar" },
      { label: "Level", value: "II" },
      { label: "Duration", value: "Two years (15 Mar 2019 – 14 Mar 2021)" },
      { label: "Centre", value: "Mansarover Garden" },
      { label: "Certificate dated", value: "10 October 2021" },
    ],
  },
  {
    id: "aaftj",
    title: "Certificate of Publication",
    subtitle: "“Perception of Correlation Between Indian and Western Music as a Cathartic Tool: A Comparative Study”",
    institution: "AAFT Journal (AAFTJ)",
    category: "Research Publication",
    date: "January 2026",
    year: "2026",
    badge: "Published",
    image: `${A}/research/research-certificate.jpg`,
    thumb: `${A}/research/research-certificate-sm.jpg`,
    downloadable: true,
    details: [
      { label: "Journal", value: "AAFT Journal (AAFTJ)" },
      { label: "Issue", value: "Volume 1, Issue 1 — January 2026" },
      { label: "Paper ID", value: "AAFTJ 2601005" },
      { label: "ISSN", value: "3107-9288" },
    ],
  },
  {
    id: "frontrow",
    title: "Guitar Workshop",
    subtitle: "Certificate of Completion",
    institution: "FrontRow",
    category: "Workshop",
    date: "Date not shown on certificate",
    badge: "Completed",
    image: `${A}/certificates/frontrow-workshop.jpg`,
    thumb: `${A}/certificates/frontrow-workshop-sm.jpg`,
    downloadable: true,
    details: [{ label: "Type", value: "Online guitar workshop — certificate of completion" }],
    toConfirm: ["Completion date (not printed on certificate)"],
  },
  {
    id: "aaft-seminar",
    title: "Comparative Study of Indian and Western Music",
    subtitle: "Seminar — School of Performing Arts",
    institution: "AAFT",
    category: "Seminar Participation",
    date: "3 June 2024",
    year: "2024",
    badge: "Participant",
    image: `${A}/certificates/aaft-research.jpg`,
    thumb: `${A}/certificates/aaft-research-sm.jpg`,
    downloadable: false,
    details: [
      { label: "Date", value: "3 June 2024, 11:00 am" },
      { label: "Location", value: "AAFT, Film City, Noida" },
      { label: "Attended as", value: "Student" },
      { label: "Note", value: "Event pass — seminar participation, not a certification" },
    ],
  },
  {
    id: "gff",
    title: "16th Global Film Festival Noida",
    subtitle: "Volunteer — Sound",
    institution: "International Film & Television Club · Marwah Studios",
    category: "Event Experience / Volunteering",
    date: "7–9 December 2023",
    year: "2023",
    badge: "Volunteer · Sound",
    image: `${A}/certificates/gff-sound-volunteer.jpg`,
    thumb: `${A}/certificates/gff-sound-volunteer-sm.jpg`,
    downloadable: false,
    details: [
      { label: "Event", value: "16th Global Film Festival Noida" },
      { label: "Dates", value: "7–9 December 2023" },
      { label: "Venue", value: "Marwah Studios, Film City, Noida" },
      { label: "Role", value: "Volunteer — Sound" },
      { label: "Note", value: "Event volunteer credential, not an academic qualification" },
    ],
  },
];

/* ───────────────────────────── Projects / gallery ───────────────────────────── */

const img = (folder: string, name: string, alt: string) => ({
  src: `${A}/${folder}/${name}.jpg`,
  thumb: `${A}/${folder}/${name}-sm.jpg`,
  alt,
});

export const projects: Project[] = [
  {
    id: "aaft-school-of-music",
    title: "Acoustic Feature — AAFT School of Music",
    category: "performances",
    group: "solo",
    ...pick(img("performances", "band-performance", "Devika playing acoustic guitar on stage at an AAFT School of Music event")),
    role: "Guitarist (featured, standing)",
    instruments: ["Acoustic guitar"],
    description:
      "A live moment on stage at an AAFT School of Music event, with Devika front and centre on acoustic guitar while other musicians — including a tabla setup and a second guitarist — share the stage.",
    observed: ["AAFT School of Music and Marwah Studios branding on the screens", "Acoustic guitar with clip-on microphone", "Tabla and additional guitarist on stage"],
    toConfirm: ["Event name", "Date", "Whether this was a solo feature or a band set (file was named “Band Performances”)"],
  },
  {
    id: "aaft-band",
    title: "AAFT College Band — Electric Guitar",
    category: "performances",
    group: "band",
    ...pick(img("performances", "aaft-band-electric", "Devika on electric guitar performing with the AAFT college band")),
    role: "Electric guitarist, college band",
    instruments: ["Electric guitar"],
    description:
      "Performing electric guitar with a full college band — two vocalists, drums and additional guitar — on the AAFT stage, with AAFT, Marwah Studios and ICMEI branding on the backdrop.",
    observed: ["Full band line-up: vocals, drum kit, guitars", "Stage lighting and monitor setup"],
    toConfirm: ["Event name and date", "Band name"],
  },
  {
    id: "swaraa-trio",
    title: "Collaborative Guitar Set",
    category: "performances",
    group: "collaborative",
    ...pick(img("performances", "live-1", "Devika on acoustic guitar performing alongside an electric guitarist")),
    gallery: [
      img("performances", "live-1", "Devika on acoustic guitar alongside an electric guitarist"),
      img("performances", "live-2", "The full trio on stage — acoustic guitar, electric guitar and percussion"),
    ],
    role: "Acoustic guitarist, trio",
    instruments: ["Acoustic guitar"],
    description:
      "A collaborative set where two guitars share the melody: Devika on acoustic guitar alongside an electric guitarist and a seated percussionist with vocal microphone, framed by large LED stage visuals.",
    observed: ["LED backdrop showing the word “SWARAA”", "Acoustic guitar, electric guitar, percussion and keyboard on stage"],
    toConfirm: ["Event / band name (backdrop reads “SWARAA”)", "Venue", "Date", "Names of fellow musicians, if they should be credited"],
  },
  {
    id: "stage-lights",
    title: "Under the Stage Lights",
    category: "performances",
    group: "stage",
    ...pick(img("performances", "live-2", "Wide view of Devika performing on a large stage with LED visuals")),
    gallery: [
      img("performances", "live-2", "Wide view of the stage with LED visuals"),
      img("performances", "live-1", "Closer view of Devika performing"),
    ],
    role: "Guitarist",
    instruments: ["Acoustic guitar"],
    description:
      "A large-format stage appearance with full LED visuals and stage monitoring — the kind of setting where tone, timing and stage presence all have to hold up.",
    toConfirm: ["Event, venue and date"],
  },
  {
    id: "classroom",
    title: "Guitar & Group Music Sessions",
    category: "teaching",
    ...pick(img("teaching", "teaching-1", "Devika leading a music session with young students, guitars in the classroom")),
    role: "Guitar Teacher",
    venue: "Modern Public School, Delhi",
    instruments: ["Guitar", "Ukulele", "Music theory"],
    description:
      "Leading an interactive music session with a class of young students. Guitars line the room, and the children respond to cues with hand movements — practical, participation-first music learning.",
    observed: ["Classroom of primary-age students", "Guitars in the room", "Call-and-response style activity"],
    toConfirm: ["Dates of employment"],
  },
  {
    id: "student-band",
    title: "Student Ensemble Showcase",
    category: "teaching",
    ...pick(img("teaching", "teaching-2", "Students performing on acoustic guitar, electric guitar and keyboards, with Devika standing alongside")),
    role: "Guitar Teacher — prepared students for events",
    venue: "Modern Public School, Delhi",
    instruments: ["Acoustic guitar", "Electric guitar", "Keyboard"],
    description:
      "A student ensemble — acoustic guitar, electric guitar and keyboards — performing at a Modern Public School event. Preparing students for events and functions was part of Devika's role as guitar teacher.",
    observed: ["Four student musicians in performance", "Yamaha keyboards, acoustic and electric guitars"],
    toConfirm: ["Event date"],
  },
  {
    id: "logic-session",
    title: "Meditation & Binaural Audio — Dusq",
    category: "production",
    ...pick(img("production", "logic-pro", "A Logic Pro session on a MacBook Air with multiple meditation and breathwork audio tracks")),
    gallery: [
      img("production", "logic-pro", "Logic Pro project with labelled meditation and breathwork tracks"),
      img("production", "office-2", "Devika editing audio on a laptop with studio headphones"),
      img("production", "office-1", "Devika at work on an audio editing workstation"),
    ],
    role: "Music Producer, Dusq (Dwarka, Delhi)",
    instruments: ["Logic Pro", "Studio headphones"],
    description:
      "Producing binaural beats and meditation tracks at Dusq. This multi-track Logic Pro project assembles a guided programme: separate regions for breathwork, visualisation and a multi-part meditation are arranged and balanced on the timeline, with timing notes worked out on the whiteboard behind.",
    observed: ["Logic Pro running on a MacBook Air", "Tracks labelled “Breathwork”, “Visualisation” and “Night 4 meditation pt 2–5”", "Bar/time conversion notes on the whiteboard"],
    toConfirm: ["Dates of employment"],
  },
  {
    id: "sound-design",
    title: "Sound Design on the Move",
    category: "production",
    ...pick(img("production", "daw-session", "Devika designing sounds with a synthesizer plugin in Logic Pro on a laptop")),
    role: "Music producer",
    instruments: ["Logic Pro", "Software synthesizer", "Studio headphones"],
    description:
      "Shaping sounds with a software synthesizer inside a Logic Pro project — working on the move with headphones, building patches and textures for production.",
    observed: ["Logic Pro with a software synthesizer open", "Monitoring on closed-back studio headphones"],
  },
  {
    id: "yog-nidra",
    title: "Yog Nidra — Live Event Sound Work",
    category: "live-sound",
    ...pick(img("production", "yog-nidra-mixing", "Sound desk at the Yoga Nidra event: Yamaha mixer, amplifier, wireless microphones and laptop")),
    role: "Sound — event audio desk",
    instruments: ["Yamaha analogue mixer", "Power amplifier", "Wireless handheld microphones", "Laptop playback", "LED display controller"],
    description:
      "The front-of-house sound station for a large-scale Yoga Nidra session in a hotel ballroom. The setup routes wireless handheld microphones and laptop playback through a Yamaha mixing console into a Soundstandard power amplifier, alongside an LED video display controller driving the event visuals.",
    observed: [
      "Yamaha multi-channel mixer with XLR inputs patched",
      "Soundstandard power amplifier and audio processor",
      "Two wireless handheld microphones",
      "Laptop showing the Yoga Nidra session visuals",
      "VX1 LED display video controller",
    ],
    toConfirm: ["Event date and venue", "Devika's exact responsibilities (e.g. operating the desk, part of a team)"],
  },
  {
    id: "gff-sound",
    title: "16th Global Film Festival — Sound Volunteer",
    category: "live-sound",
    ...pick(img("certificates", "gff-sound-volunteer", "16th Global Film Festival Noida volunteer pass marked Devika (Sound)")),
    role: "Volunteer — Sound team",
    venue: "Marwah Studios, Film City, Noida",
    date: "7–9 December 2023",
    description:
      "Volunteered with the sound team across the three days of the 16th Global Film Festival Noida, presented by the International Film & Television Club at Marwah Studios.",
  },
  {
    id: "research-paper",
    title: "Indian & Western Music as a Cathartic Tool",
    category: "research",
    ...pick(img("research", "research-certificate", "AAFT Journal certificate of publication for Devika Bajaj's paper")),
    gallery: [
      img("research", "research-certificate", "AAFT Journal certificate of publication"),
      img("certificates", "aaft-research", "AAFT seminar pass — Comparative Study of Indian and Western Music, 3 June 2024"),
    ],
    role: "Author",
    date: "January 2026",
    description:
      "Published research in the AAFT Journal (Vol. 1, Issue 1) examining how the relationship between Indian and Western music is perceived in a cathartic context — building on the topic of the AAFT seminar Devika attended in June 2024.",
  },
];

function pick(i: { src: string; thumb: string; alt: string }) {
  return { image: i.src, thumb: i.thumb, gallery: [i] };
}

/* ───────────────────────────── Skills ───────────────────────────── */

export const skills: Skill[] = [
  {
    id: "guitar",
    name: "Guitar Performance",
    icon: "guitar",
    description: "Classical, acoustic and electric guitar in stage, band and collaborative settings, built on formal graded training.",
    evidence: ["Trinity Grade 3 Classical Guitar — Distinction (91/100)", "Two-year guitar course (Level II)", "Stage performances on classical, acoustic and electric guitar"],
    projectIds: ["aaft-school-of-music", "aaft-band", "swaraa-trio"],
    certIds: ["trinity", "tansen", "frontrow"],
  },
  {
    id: "education",
    name: "Music Education",
    icon: "teach",
    description: "Practical, participatory music sessions and guiding student ensembles towards performance.",
    evidence: ["Classroom music sessions with young students", "Student ensemble showcase"],
    projectIds: ["classroom", "student-band"],
    certIds: [],
  },
  {
    id: "production",
    name: "Music Production",
    icon: "production",
    description: "Building tracks and sounds inside a DAW — arranging, layering and shaping tone with software instruments.",
    evidence: ["Sound design with software synthesizers in Logic Pro"],
    projectIds: ["sound-design", "logic-session"],
    certIds: [],
  },
  {
    id: "logic",
    name: "Logic Pro",
    icon: "logic",
    description: "Day-to-day work in Apple Logic Pro for multi-track editing, arrangement and sound design.",
    evidence: ["Multi-track guided-session project", "Synth-based sound design session"],
    projectIds: ["logic-session", "sound-design"],
    certIds: [],
  },
  {
    id: "daw",
    name: "Digital Audio Workstations",
    icon: "daw",
    description: "Comfortable with DAW workflows: tracks, regions, timeline navigation, software instruments and monitoring.",
    evidence: ["Logic Pro projects on laptop-based setups"],
    projectIds: ["logic-session", "sound-design"],
    certIds: [],
  },
  {
    id: "editing",
    name: "Audio Editing",
    icon: "edit",
    description: "Cutting, arranging and balancing spoken-word and music regions into a finished programme.",
    evidence: ["Breathwork, visualisation and multi-part meditation regions arranged in one project"],
    projectIds: ["logic-session"],
    certIds: [],
  },
  {
    id: "live-sound",
    name: "Live Sound Mixing",
    icon: "live",
    description: "Event audio with analogue mixers, wireless microphones, amplification and playback.",
    evidence: ["Yoga Nidra event sound desk", "16th Global Film Festival Noida — Sound volunteer"],
    projectIds: ["yog-nidra", "gff-sound"],
    certIds: ["gff"],
  },
  {
    id: "research",
    name: "Music Research",
    icon: "research",
    description: "Academic enquiry into Indian and Western music traditions and their cathartic role.",
    evidence: ["Published paper — AAFT Journal, January 2026", "AAFT seminar on Indian & Western music, June 2024"],
    projectIds: ["research-paper"],
    certIds: ["aaftj", "aaft-seminar"],
  },
  {
    id: "ensemble",
    name: "Ensemble Performance",
    icon: "ensemble",
    description: "Locking in with bands and small groups — vocals, drums, percussion and second guitar.",
    evidence: ["College band on electric guitar", "Acoustic trio with guitar and percussion"],
    projectIds: ["aaft-band", "swaraa-trio"],
    certIds: [],
  },
];

/* ───────────────────────────── Timeline ───────────────────────────── */

export const timeline: TimelineItem[] = [
  { id: "t-tansen", date: "2019 – 2021", title: "Guitar Course — Level II", org: "Tansen Sangeet Mahavidyalaya", kind: "Course", text: "Completed a two-year guitar course (15 March 2019 – 14 March 2021) at the Mansarover Garden centre.", certId: "tansen" },
  { id: "t-bpa", date: "2023 – 2027", title: "Bachelor of Performing Arts", org: "School of Music, AAFT", kind: "Course", text: "Undergraduate study in performing arts with a focus on music (in progress)." },
  { id: "t-gff", date: "Dec 2023", title: "Sound Volunteer", org: "16th Global Film Festival Noida", kind: "Volunteering", text: "Volunteered with the sound team, 7–9 December 2023, Marwah Studios, Film City, Noida.", certId: "gff" },
  { id: "t-seminar", date: "Jun 2024", title: "Seminar: Indian & Western Music", org: "AAFT, Film City, Noida", kind: "Seminar", text: "Attended the School of Performing Arts seminar “Comparative Study of Indian and Western Music” as a student.", certId: "aaft-seminar" },
  { id: "t-paper", date: "Jan 2026", title: "Research Publication", org: "AAFT Journal", kind: "Publication", text: "“Perception of Correlation Between Indian and Western Music as a Cathartic Tool: A Comparative Study” — Vol. 1, Issue 1.", certId: "aaftj" },
  { id: "t-trinity", date: "Feb 2026", title: "Classical Guitar Grade 3 — Distinction", org: "Trinity College London", kind: "Qualification", text: "Pass with Distinction, 91/100 — pieces by Attaignant, Carulli and Carcassi.", certId: "trinity" },
];

/** Ongoing strands without confirmed dates — shown as expandable entries */
export const timelineOngoing: TimelineItem[] = [
  { id: "o-teach", title: "Teaching Experience", kind: "Teaching", text: "Guitar Teacher at Modern Public School, Delhi — guitar, ukulele and music theory, preparing students for events. Earlier, Guitar Assistant intern at Synergy Institute of Music, Kamla Nagar.", projectIds: ["classroom", "student-band"] },
  { id: "o-live", title: "Live Performances", kind: "Performance", text: "Stage performances on acoustic guitar, including a collaborative trio set with LED stage production.", projectIds: ["aaft-school-of-music", "swaraa-trio", "stage-lights"] },
  { id: "o-band", title: "Band Participation", kind: "Performance", text: "Electric guitar with the AAFT college band.", projectIds: ["aaft-band"] },
  { id: "o-prod", title: "Music Producer — Dusq", kind: "Production", text: "Binaural beats and meditation tracks, audio narration with Hume AI, editing and processing in Logic Pro; live sound at the Yoga Nidra event.", projectIds: ["logic-session", "sound-design", "yog-nidra"] },
];

/* ───────────────────────────── Audio ───────────────────────────── */

/** Add real recordings here. Nothing is shown until a track is added. */
export const audioTracks: AudioTrack[] = [];

/* ───────────────────────────── CV extras ───────────────────────────── */

export const cv = {
  summary:
    "Music producer and guitarist with a background in classical, acoustic and electric guitar, and experience in recording, mixing, audio editing and music production. Interested in immersive audio and the connection between music, sound and storytelling; studies in psychology and music shape a research-led approach. Formal guitar training (Trinity College London Grade 3 Classical Guitar — Distinction, 91/100; two-year Level II course, Tansen Sangeet Mahavidyalaya). Published researcher on Indian and Western music as a cathartic tool (AAFT Journal, 2026).",
  musicalSkills: ["Classical, acoustic & electric guitar", "Fingerstyle guitar", "Ukulele", "Music theory teaching", "Band & ensemble performance", "Student event preparation"],
  technicalSkills: ["Music production", "Recording", "Mixing", "Audio editing & processing", "Logic Pro", "Binaural / meditation audio", "Sound design (software synths)", "Live sound: mixers, wireless mics, PA"],
  education: [
    { title: "Bachelor of Performing Arts", org: "School of Music, AAFT, Noida", date: "2023 – 2027", note: "" },
    { title: "Class 12", org: "Bhatnagar International School", date: "2022 – 2023", note: "98.4%" },
  ],
  experience: [
    { title: "Music Producer", org: "Dusq, Dwarka, Delhi", points: ["Produced binaural beats and meditation tracks", "Worked with Hume AI to provide audio narrations", "Audio editing and processing for precision, impact and accuracy"] },
    { title: "Guitar Teacher", org: "Modern Public School, Delhi", points: ["Taught guitar and ukulele to students", "Prepared students for events and functions", "Taught music theory along with practical training"] },
    { title: "Guitar Assistant (Intern)", org: "Synergy Institute of Music, Kamla Nagar, Delhi", points: ["Assisted students with guitar and ukulele", "Co-ordinated with other teachers during events and performances", "Made lesson plans along with the guitar teacher"] },
  ],
  softSkills: ["Precision", "Effective communication", "Creative thinking", "Teamwork"],
  languages: ["English (Fluent)", "Hindi (Fluent)", "Punjabi (Basic)"],
};

/** Phase-2 list: everything that still needs confirming. */
export const toConfirm = [
  "Dates for the Dusq, Modern Public School and Synergy roles",
  "Event names / venues / dates for the stage photos (backdrop reads “SWARAA”)",
  "Yoga Nidra event: date, venue and Devika's exact role on the desk",
  "FrontRow Guitar Workshop completion date",
  "Link to the full research paper (only the certificate was supplied)",
  "LinkedIn / Instagram / YouTube links, audio recordings, videos",
];

/* ───────────────────────────── Work / Listen (SoundCloud + YouTube) ─────────────────────────────
 * Scraped from Devika's own SoundCloud & YouTube links (Nov 2026).
 * To add a track: copy one block, paste the share link's details. `embed` is the
 * SoundCloud API uri (includes the secret token for private tracks).            */

export type WorkCategory = "production" | "guitar" | "binaural" | "ad" | "vocal";

export const workCategories: { id: WorkCategory; label: string }[] = [
  { id: "production", label: "Music Production & Mixing" },
  { id: "guitar", label: "Guitar Arrangements" },
  { id: "binaural", label: "Binaural Beats & Meditation" },
  { id: "ad", label: "Ad Scoring" },
  { id: "vocal", label: "Vocal Processing" },
];

export interface WorkItem {
  id: string;
  title: string;
  category: WorkCategory;
  platform: "soundcloud" | "youtube";
  url: string;
  embed: string;
  artwork: string;
  duration: string;
  genre?: string;
  tags?: string[];
  summary: string;
  description: string;
  vertical?: boolean;
}

const sc = (apiUri: string) =>
  `https://w.soundcloud.com/player/?url=${encodeURIComponent(apiUri)}&color=%23e50925&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true`;

export const work: WorkItem[] = [
  {
    id: "spaces",
    title: "Spaces",
    category: "production",
    platform: "soundcloud",
    url: "https://soundcloud.com/devika-bajaj-97767670/spaces/s-pBrzwMKnatt",
    embed: sc("https://api.soundcloud.com/tracks/soundcloud%3Atracks%3A2432451375?secret_token=s-pBrzwMKnatt"),
    artwork: "https://i1.sndcdn.com/artworks-CH4nZjSVVHHy6C1q-URXv5w-t500x500.jpg",
    duration: "1:23",
    genre: "Electronic",
    tags: ["Downtempo", "Ambient", "Soundscape"],
    summary: "Ambient electronic composition with evolving textures and cinematic layers.",
    description:
      "An ambient electronic composition built around evolving textures, spacious soundscapes and a slow, flowing atmosphere. Blending rhythmic elements with cinematic layers, the track creates a sense of movement while maintaining a calm and immersive character.",
  },
  {
    id: "bahano-bahano",
    title: "Bahano Bahano",
    category: "production",
    platform: "soundcloud",
    url: "https://soundcloud.com/devika-bajaj-97767670/bahano-bahano-project/s-HQ7o1KhXHG7",
    embed: sc("https://api.soundcloud.com/tracks/soundcloud%3Atracks%3A2431930932?secret_token=s-HQ7o1KhXHG7"),
    artwork: "https://i1.sndcdn.com/artworks-OJSWvdZ0N4yAc9G6-dQglRw-t500x500.jpg",
    duration: "0:58",
    genre: "Ambient",
    summary: "Recreation of the background score and texture of ‘Bahano Bahano’ (college assignment).",
    description:
      "A college assignment: replicate the background music and texture of a song and upload a part of it. Devika chose ‘Bahano Bahano’ by Shivam Sengupta and Anuj Danait, from the Netflix series “Yeh Kaali Kaali Aankhein”, and produced her own version of it.",
  },
  {
    id: "fly-me-to-the-moon",
    title: "Fly Me to the Moon (guitars)",
    category: "guitar",
    platform: "soundcloud",
    url: "https://soundcloud.com/devika-bajaj-97767670/fly-me-to-the-moon-guitars",
    embed: sc("https://api.soundcloud.com/tracks/soundcloud%3Atracks%3A2431926237"),
    artwork: "https://i1.sndcdn.com/artworks-g4fXheUwe3h6yXlu-T5Bqtg-t500x500.jpg",
    duration: "1:22",
    genre: "Jazz & Blues",
    tags: ["Classical guitar", "Guitar arrangement", "Nylon strings"],
    summary: "Multi-layered nylon-string guitar arrangement of the jazz standard.",
    description:
      "A nylon-string arrangement of ‘Fly Me to the Moon’. Multiple guitars are layered: a low-end layer and a higher lead layer, panned to create space between the frequencies. Harmonics add a subtle bell-like effect, chords are built mostly from the tonic, mediant, dominant and leading notes, and power chords give the track its punch. In the second half, light percussion played on the guitar's body joins in — keeping the arrangement all-guitar.",
  },
  {
    id: "in-sync",
    title: "In Sync",
    category: "binaural",
    platform: "soundcloud",
    url: "https://soundcloud.com/devika-bajaj-97767670/in-sync/s-Nhu1293xdUW",
    embed: sc("https://api.soundcloud.com/tracks/soundcloud%3Atracks%3A2431935246?secret_token=s-Nhu1293xdUW"),
    artwork: "https://i1.sndcdn.com/artworks-oLtblm0vcpzf6Efp-H3uFjw-t500x500.jpg",
    duration: "2:27",
    genre: "Ambient",
    tags: ["6 Hz theta", "E Major"],
    summary: "Meditation track: 6 Hz theta binaural beats with ambient music in E Major.",
    description:
      "An immersive meditation composition combining 6 Hz theta-range binaural beats with ambient musical elements composed in E Major. Best experienced on headphones.",
  },
  {
    id: "wavy-silence",
    title: "Wavy Silence",
    category: "binaural",
    platform: "soundcloud",
    url: "https://soundcloud.com/devika-bajaj-97767670/wavy-silence/s-WnusqLyLHgR",
    embed: sc("https://api.soundcloud.com/tracks/soundcloud%3Atracks%3A2431939869?secret_token=s-WnusqLyLHgR"),
    artwork: "https://i1.sndcdn.com/artworks-6qFSynmTAg8jWuuZ-ROby2g-t500x500.jpg",
    duration: "2:49",
    genre: "Ambient",
    tags: ["6 Hz theta", "C Major", "Ocean sounds"],
    summary: "6 Hz binaural beat layered with a C Major composition and ocean sounds.",
    description:
      "An ambient meditation composition: two slightly different frequencies create a 6 Hz theta binaural beat, layered with a C Major musical composition and ocean sound effects to calm the mind and deepen relaxation. Best experienced on headphones.",
  },
  {
    id: "sony-ad",
    title: "Sony — Headphones Advertisement",
    category: "ad",
    platform: "youtube",
    url: "https://youtube.com/shorts/_f0cr7L79lI",
    embed: "https://www.youtube-nocookie.com/embed/_f0cr7L79lI?autoplay=1&rel=0",
    artwork: "https://i.ytimg.com/vi/_f0cr7L79lI/hq2.jpg",
    duration: "Short",
    tags: ["Ad scoring", "Sync to picture"],
    summary: "An ad-scoring exercise: original music written to picture for a Sony headphones ad.",
    description: "An attempt at ad scoring — composing and producing original music to picture for a Sony headphones advertisement.",
    vertical: true,
  },
];

export const soundcloudProfile = "https://soundcloud.com/devika-bajaj-97767670";
