import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { X } from "lucide-react";

/** Accessible modal shell: Esc closes, focus is trapped and restored, body scroll locked. */
export default function Modal({ onClose, label, children, wide = false, onKey }: { onClose: () => void; label: string; children: ReactNode; wide?: boolean; onKey?: (e: KeyboardEvent) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const keyRef = useRef(onKey);
  keyRef.current = onKey;

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current?.focus();
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); onClose(); return; }
      if (e.key === "Tab" && ref.current) {
        const f = ref.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input,textarea,select,[tabindex]:not([tabindex="-1"])');
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
      keyRef.current?.(e);
    };
    document.addEventListener("keydown", handler);
    return () => { document.removeEventListener("keydown", handler); document.body.style.overflow = prevOverflow; prev?.focus(); };
  }, [onClose]);

  return createPortal(
    <motion.div className="fixed inset-0 z-[60] flex items-stretch justify-center bg-black/85 backdrop-blur-md sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        className={`relative flex max-h-[100svh] w-full flex-col overflow-hidden border border-white/10 bg-[#1a1018] shadow-2xl outline-none sm:max-h-[92vh] sm:rounded-3xl ${wide ? "sm:max-w-6xl" : "sm:max-w-3xl"}`}
        initial={{ y: 30, scale: 0.98 }} animate={{ y: 0, scale: 1 }} exit={{ y: 30, opacity: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <button onClick={onClose} aria-label="Close" className="absolute right-3 top-3 z-20 grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur hover:bg-accent">
          <X size={18} />
        </button>
        {children}
      </motion.div>
    </motion.div>,
    document.body,
  );
}
