"use client"

import { motion } from "framer-motion"

const sentence = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.2,
      staggerChildren: 0.1,
    },
  },
}

const letter = {
  hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 200,
    },
  },
}

const words = ["Beautiful.", "Creative.", "Relentless."]

export function AnimatedHeroText() {
  return (
    <motion.h1
      className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground font-geist text-center"
      variants={sentence}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-4">
          {word.split("").map((char, index) => (
            <motion.span
              key={char + "-" + index}
              variants={letter}
              className={`inline-block ${
                wordIndex === 0 && index < 9 ? "text-primary" : "" // "Beautiful." in primary
              } ${
                wordIndex === 1 && index < 8 ? "text-accent-foreground dark:text-sky-400" : "" // "Creative." in accent/sky
              } ${
                wordIndex === 2 && index < 10 ? "text-emerald-500" : "" // "Relentless." in emerald
              }`}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h1>
  )
}
