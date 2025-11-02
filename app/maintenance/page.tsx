"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MaintenancePage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [index, setIndex] = useState(0);

  const messages = [
    "Relentless by nature",
    "We redefine what's possible",
    "Innovation begs persistence",
    "Design is calling us forward",
  ];

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.loop = true;
    v.play().catch(() => {
      console.warn("Autoplay blocked – user gesture may be required");
    });
  }, []);

  // cycle messages every 8 seconds, after a short intro delay
  useEffect(() => {
    const startDelay = setTimeout(() => {
      const timer = setInterval(() => {
        setIndex((prev) => (prev + 1) % messages.length);
      }, 8000);
      return () => clearInterval(timer);
    }, 3000); // wait 3s before showing first line
    return () => clearTimeout(startDelay);
  }, [messages.length]);

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center bg-transparent text-black">
      {/* Hero Background Video */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          src="/kanji-hero.mp4"
          className="absolute inset-0 h-full w-full object-cover object-center"
          autoPlay
          playsInline
          muted
          loop
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-white/10 to-transparent" />
      </div>

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-10 py-6 mix-blend-difference">
        <h1 className="text-2xl font-bold tracking-tight text-white">theProject.</h1>
        <nav className="hidden gap-8 text-sm font-medium text-white/80 sm:flex">
          <a href="#" className="hover:text-white">Status</a>
          <a href="#" className="hover:text-white">Blog</a>
          <a href="#" className="hover:text-white">Contact</a>
        </nav>
      </header>

      {/* 🥋 Zen Ephemeral Fade Message — AAA Cinematic */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="absolute bottom-[12%] w-full text-center text-xl sm:text-2xl font-light tracking-[0.25em] text-black lowercase"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{
            duration: 2.2,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          {messages[index]}
        </motion.div>
      </AnimatePresence>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between px-10 py-6 text-sm text-white/80 mix-blend-difference">
        <span>© {new Date().getFullYear()} theProject.</span>
        <div className="flex gap-4">
          <a href="#" className="hover:text-white">Status</a>
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Contact</a>
        </div>
      </footer>
    </main>
  );
}
