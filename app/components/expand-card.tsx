"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface ExpandCardProps {
  title: string
  description: string
  icon: React.ReactNode
  image: string
}

export function ExpandCard({ title, description, icon, image }: ExpandCardProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <motion.article
        layoutId={`card-${title}`}
        onClick={() => setOpen(true)}
        className={cn(
          "interactive-glow-card relative rounded-3xl p-6 overflow-hidden cursor-pointer",
          "bg-gradient-to-br dark:from-slate-900 dark:to-slate-800 from-slate-50 to-slate-100",
          "border border-slate-200 dark:border-slate-700"
        )}
      >
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
          {icon}
        </div>
        <h3 className="mb-2 text-2xl font-bold text-foreground font-geist">{title}</h3>
        <p className="mb-6 text-sm text-muted-foreground">{description}</p>
        <div className="mt-auto flex items-center text-sm font-medium text-primary group-hover:underline">
          Explore
        </div>
      </motion.article>

      <AnimatePresence>
        {open && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent asChild className="max-w-xl p-0 overflow-hidden">
              <motion.div
                layoutId={`card-${title}`}
                className="bg-background rounded-xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative h-48 w-full">
                  <Image src={image} alt={title} fill className="object-cover" />
                  <DialogClose asChild>
                    <button className="absolute top-3 right-3 text-white hover:text-magenta">
                      <X className="h-5 w-5" />
                      <span className="sr-only">Close</span>
                    </button>
                  </DialogClose>
                </div>
                <div className="p-6 space-y-4 overflow-auto max-h-[70vh]">
                  <h3 className="text-2xl font-bold font-geist">{title}</h3>
                  <Button variant="destructive">Development</Button>
                  <p className="text-sm text-muted-foreground">
                    We’re still undergoing development on this section of the site. Please check back soon as we add the creativity you’ve come to expect.
                  </p>
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  )
}

export default ExpandCard
