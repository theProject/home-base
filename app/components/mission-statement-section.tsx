"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Sparkles, Heart, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MissionStatementSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
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
          {/* Mission */}
          <div className="p-6 rounded-xl bg-card/50 border border-border/50 shadow-lg">
            <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-foreground mb-2 font-geist">Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              We are <span className="font-semibold text-foreground">relentless</span>. Mission-first,
              design-obsessed, engineering-led. We ship real products—fast. We turn constraints into fuel
              and build things that are <span className="font-semibold">useful, beautiful,</span> and
              <span className="font-semibold"> durable</span>. Every sprint raises the bar.
            </p>
          </div>

          {/* Ethos */}
          <div className="p-6 rounded-xl bg-card/50 border border-border/50 shadow-lg">
            <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-foreground mb-2 font-geist">From the “Dark Side” of Learning</h3>
            <p className="text-muted-foreground leading-relaxed">
              We learned by doing—shipping in the dark, breaking things, fixing them, and sharing what sticks.
              That grit turned imposters into innovators. We support others walking the same path with
              <span className="font-semibold"> guidance, tools,</span> and <span className="font-semibold">time</span>.
            </p>
          </div>

          {/* Open Roles / Interns */}
          <div className="p-6 rounded-xl bg-card/50 border border-border/50 shadow-lg">
            <Users className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-foreground mb-2 font-geist">We’re Hiring: 2 Unpaid Interns</h3>
            <p className="text-muted-foreground leading-relaxed">
              Mission- and vision-driven apprenticeships for people who want to learn fast by building for real users.
              You’ll work alongside us—no busywork—on design/front-end or game/AI tracks.
            </p>
            <ul className="mt-4 grid gap-2 text-sm text-muted-foreground text-left max-w-lg mx-auto">
              <li>• 6–8 weeks • ~5–10 hrs/week • Flexible, remote</li>
              <li>• Real shipping tasks, code reviews, and mentorship</li>
              <li>• Portfolio credit + recommendation letter</li>
              <li>• We teach; you build. We support; you level up.</li>
            </ul>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Button asChild size="lg" className="gap-2">
                <Link href="/contact?role=intern">Apply now</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">General contact</Link>
              </Button>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Note: This is an unpaid, educational/portfolio experience. We invest time, teaching, and real project exposure.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

