"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface PrestigePopupProps {
  children: React.ReactNode;
}

export function PrestigePopup({ children }: PrestigePopupProps) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const handleClick = (e: MouseEvent) =>
      contentRef.current && !contentRef.current.contains(e.target as Node) && setOpen(false);

    document.addEventListener("keydown", handleKey);
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("mousedown", handleClick);
    };
  }, [open]);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={() => setOpen(true)}
    >
      {/* Base Card (always shown) */}
      <div className="relative z-10 ring-2 ring-teal-400 rounded-xl transition-opacity duration-300">
        <div className={`${open ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}>
          {children}
        </div>
      </div>

      {/* Overlay Modal (only when hovered/clicked) */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 z-20 flex items-center justify-center rounded-xl ring-2 ring-[#e20074] shadow-[0_0_25px_#e20074] bg-black/90"
          >
            <div
              ref={contentRef}
              className="text-center px-6 text-foreground"
            >
              <p className="text-sm leading-relaxed text-white">
                We're currently developing this platform experience and can’t wait to share it with you soon.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default PrestigePopup;
