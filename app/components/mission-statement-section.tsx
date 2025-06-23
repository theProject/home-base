"use client"

import { motion } from "framer-motion"
import { Sparkles, Heart, Users } from "lucide-react"

export function MissionStatementSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-background to-background/80 dark:from-slate-900 dark:to-slate-900/80 backdrop-blur-md">
      <motion.div
        className="container mx-auto px-4 text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground font-geist mb-6"
          variants={itemVariants}
        >
          Our <span className="text-primary">Driving Force</span>
        </motion.h2>

        <motion.div className="max-w-3xl mx-auto space-y-8" variants={itemVariants}>
          <div className="p-6 rounded-xl bg-card/50 border border-border/50 shadow-lg">
            <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-foreground mb-2 font-geist">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              To craft <span className="mission-highlight">beautiful</span>,{" "}
              <span className="mission-highlight">creative</span>, and{" "}
              <span className="mission-highlight">relentlessly</span> innovative digital experiences that empower users,
              solve real-world problems, and push the boundaries of technology. We strive to build not just products,
              but platforms for joy, connection, and growth.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-card/50 border border-border/50 shadow-lg">
            <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-foreground mb-2 font-geist">From Imposter to Innovator</h3>
            <p className="text-muted-foreground leading-relaxed">
              Many of us started this journey feeling like imposters in a vast tech landscape. That feeling fueled a{" "}
              <span className="mission-highlight">relentless</span> pursuit of knowledge and mastery. Today, we channel
              that drive into doing what we truly love: building amazing things. We believe that passion, born from
              challenge, is the heart of <span className="mission-highlight">creativity</span> and the soul of{" "}
              <span className="mission-highlight">beautiful</span> design.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-card/50 border border-border/50 shadow-lg">
            <Users className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-foreground mb-2 font-geist">Why We Share</h3>
            <p className="text-muted-foreground leading-relaxed">
              We remember the struggle and the search for guidance. That's why we're committed to sharing our knowledge,
              tools, and scripts. We believe in empowering the next wave of creators and fostering a community where
              everyone can overcome their doubts and build their dreams.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
