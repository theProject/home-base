"use client";

import React, { useEffect, useState } from "react";
import { ArrowUpToLine } from "lucide-react";
import BorderButton from "@/components/ui/border-button";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initialize
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <BorderButton
        onClick={scrollToTop}
        size="md"
        className="rounded-lg p-1"
        aria-label="Back to top"
      >
        <ArrowUpToLine className="h-8 w-6" />
      </BorderButton>
    </div>
  );
}
