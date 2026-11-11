import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2 } from "lucide-react";
import type { AudioTrack } from "../data/portfolio";

/** Accessible audio player with a progress waveform. Never autoplays. */
export default function AudioPlayer({ track }: { track: AudioTrack }) {
  const a = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0);
  const [d, setD] = useState(0);
  const bars = 72;
  useEffect(() => {
    const el = a.current; if (!el) return;
    const u = () => setT(el.currentTime), m = () => setD(el.duration || 0), e = () => setPlaying(false);
    el.addEventListener("timeupdate", u); el.addEventListener("loadedmetadata", m); el.addEventListener("ended", e);
    return () => { el.removeEventListener("timeupdate", u); el.removeEventListener("loadedmetadata", m); el.removeEventListener("ended", e); };
  }, []);
  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
  const toggle = () => { const el = a.current!; if (el.paused) { el.play(); setPlaying(true); } else { el.pause(); setPlaying(false); } };
  const prog = d ? t / d : 0;
  return (
    <div className="glass flex items-center gap-4 p-4">
      <audio ref={a} src={track.src} preload="metadata" />
      <button onClick={toggle} aria-label={playing ? `Pause ${track.title}` : `Play ${track.title}`} className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-accent hover:bg-[#ff1a36]">
        {playing ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
      </button>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2"><span className="truncate text-sm font-semibold">{track.title}</span><span className="text-xs tabular-nums text-muted">{fmt(t)} / {fmt(d)}</span></div>
        <div className="relative mt-2 h-8">
          <div className="absolute inset-0 flex items-center gap-[2px]" aria-hidden>
            {Array.from({ length: bars }).map((_, i) => (
              <span key={i} className={`flex-1 rounded-full ${i / bars < prog ? "bg-accent" : "bg-white/15"}`} style={{ height: `${20 + Math.abs(Math.sin(i * 0.9) * Math.cos(i * 0.31)) * 80}%` }} />
            ))}
          </div>
          <input type="range" min={0} max={d || 0} step={0.1} value={t} onChange={(e) => { a.current!.currentTime = +e.target.value; }} aria-label={`Seek ${track.title}`} className="absolute inset-0 w-full cursor-pointer opacity-0" />
        </div>
      </div>
      <Volume2 size={16} className="hidden text-muted sm:block" aria-hidden />
    </div>
  );
}
