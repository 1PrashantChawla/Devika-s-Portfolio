import { useEffect, useRef, useState } from "react";
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";

/** Image with zoom (buttons, wheel, double-click) and drag-to-pan when zoomed. */
export default function ZoomImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const [z, setZ] = useState(1);
  const [p, setP] = useState({ x: 0, y: 0 });
  const drag = useRef<{ x: number; y: number; px: number; py: number } | null>(null);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => { setZ(1); setP({ x: 0, y: 0 }); }, [src]);
  const set = (nz: number) => { const c = Math.min(4, Math.max(1, nz)); setZ(c); if (c === 1) setP({ x: 0, y: 0 }); };

  useEffect(() => {
    const el = box.current; if (!el) return;
    const wheel = (e: WheelEvent) => { if (!e.ctrlKey && z === 1 && Math.abs(e.deltaY) < 30) return; e.preventDefault(); set(z * (e.deltaY < 0 ? 1.15 : 0.87)); };
    el.addEventListener("wheel", wheel, { passive: false });
    return () => el.removeEventListener("wheel", wheel);
  });

  return (
    <div className={`relative overflow-hidden bg-black/40 ${className}`}>
      <div
        ref={box}
        className={`flex h-full w-full touch-none select-none items-center justify-center ${z > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"}`}
        onDoubleClick={() => set(z > 1 ? 1 : 2.2)}
        onPointerDown={(e) => { if (z === 1) return; (e.target as HTMLElement).setPointerCapture(e.pointerId); drag.current = { x: e.clientX, y: e.clientY, px: p.x, py: p.y }; }}
        onPointerMove={(e) => { if (!drag.current) return; setP({ x: drag.current.px + (e.clientX - drag.current.x) / z, y: drag.current.py + (e.clientY - drag.current.y) / z }); }}
        onPointerUp={() => (drag.current = null)}
      >
        <img src={src} alt={alt} draggable={false} className="max-h-full max-w-full object-contain transition-transform duration-150" style={{ transform: `scale(${z}) translate(${p.x}px, ${p.y}px)` }} />
      </div>
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/10 bg-black/70 p-1 backdrop-blur">
        <button className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/10" onClick={() => set(z / 1.4)} aria-label="Zoom out"><ZoomOut size={15} /></button>
        <span className="w-12 text-center text-xs tabular-nums text-muted">{Math.round(z * 100)}%</span>
        <button className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/10" onClick={() => set(z * 1.4)} aria-label="Zoom in"><ZoomIn size={15} /></button>
        <button className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/10" onClick={() => set(1)} aria-label="Reset zoom"><Maximize2 size={14} /></button>
      </div>
    </div>
  );
}
