"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MaintenancePage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [index, setIndex] = useState(0);
  const [isPortrait, setIsPortrait] = useState(false);

  const messages = [
    "Relentless by nature",
    "We redefine what's possible",
    "Innovation begs persistence",
    "Design is calling us forward",
  ];

  // autoplay fix
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    v.muted = true;
    v.setAttribute("muted", "");
    v.playsInline = true;
    v.setAttribute("playsinline", "");
    v.autoplay = true;
    v.loop = true;
    v.controls = false;
    v.load();

    const tryPlay = () => {
      const p = v.play();
      if (p && typeof p.then === "function") p.catch(() => {});
    };
    v.addEventListener("loadeddata", tryPlay, { once: true });
    tryPlay();
    return () => v.removeEventListener("loadeddata", tryPlay);
  }, []);

  // detect portrait mode
  useEffect(() => {
    const handleOrientation = () => {
      setIsPortrait(window.matchMedia("(orientation: portrait)").matches);
    };
    handleOrientation();
    window.addEventListener("resize", handleOrientation);
    window.addEventListener("orientationchange", handleOrientation);
    return () => {
      window.removeEventListener("resize", handleOrientation);
      window.removeEventListener("orientationchange", handleOrientation);
    };
  }, []);

  // haiku fade cycle
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [messages.length]);

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-transparent text-black">
      {/* video */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <video
          ref={videoRef}
          src="/kanji-hero.mp4"
          className="absolute inset-0 h-full w-full object-cover object-center"
          autoPlay
          playsInline
          muted
          loop
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/20 to-transparent pointer-events-none" />
      </div>

      {/* header */}
      <header
        className={`absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-5 py-4 sm:px-10 sm:py-6 transition-colors duration-500 ${
          isPortrait ? "text-white" : "text-black"
        }`}
      >
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
          theProject.
        </h1>

        <nav className="hidden gap-8 text-sm font-medium sm:flex">
          <a href="#" className="hover:opacity-80">
            Status
          </a>
          <a href="#" className="hover:opacity-80">
            Contact
          </a>
        </nav>

        {/* simplified mobile nav */}
        <div className="flex sm:hidden gap-4 text-sm font-medium">
          <a href="#" className="hover:opacity-80">
            Status
          </a>
          <a href="#" className="hover:opacity-80">
            Contact
          </a>
        </div>
      </header>

      {/* haiku fade message */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="absolute bottom-[14%] w-full text-center text-lg sm:text-2xl font-light tracking-[0.25em] text-black drop-shadow-[0_2px_8px_rgba(255,255,255,0.6)]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 2.2, ease: [0.4, 0, 0.2, 1] }}
          style={{
            color: isPortrait ? "white" : "black",
            textShadow: isPortrait
              ? "0 2px 8px rgba(0,0,0,0.7)"
              : "0 1px 4px rgba(255,255,255,0.4)",
          }}
        >
          {messages[index]}
        </motion.div>
      </AnimatePresence>

      {/* footer */}
      <footer
        className={`absolute bottom-0 left-0 right-0 z-20 flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-4 sm:px-10 sm:py-6 text-xs sm:text-sm transition-colors duration-500 ${
          isPortrait ? "text-white" : "text-gray-700"
        }`}
      >
        <span>© {new Date().getFullYear()} theProject.</span>
        <div className="flex gap-4">
          <a href="#" className="hover:opacity-80">
            Status
          </a>
          <a href="#" className="hover:opacity-80">
            Privacy
          </a>
          <a href="#" className="hover:opacity-80">
            Contact
          </a>
        </div>
      </footer>
    </main>
  );
}
