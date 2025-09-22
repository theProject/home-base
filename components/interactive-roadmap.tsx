"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Zap, Clock, Target, Lightbulb } from "lucide-react"

type RoadmapStatus = "Completed" | "In Progress" | "Planned" | "Future Idea"

interface RoadmapItem {
  id: string
  title: string
  description: string
  status: RoadmapStatus
  date?: string
  icon?: React.ReactNode
  tags?: string[]
}

const roadmapData: RoadmapItem[] = [
  {
    id: "1",
    title: "Project Phoenix: Core Engine",
    description: "Initial development of the core JRPG engine for DarkFrost.",
    status: "Completed",
    date: "Q4 2023",
    icon: <CheckCircle className="text-green-500" />,
    tags: ["DarkFrost JRPG", "Engine"],
  },
  {
    id: "2",
    title: "DarkFrost: Intro Mobile Card Game Launch",
    description: "Public release of the introductory mobile card game.",
    status: "Completed",
    date: "Q1 2024",
    icon: <CheckCircle className="text-green-500" />,
    tags: ["DarkFrost Mobile", "Launch"],
  },
  {
    id: "3",
    title: "Hello, Friend: Alpha Release",
    description: "Internal alpha testing for lifetime context AI.",
    status: "In Progress",
    date: "Q3 2024",
    icon: <Zap className="text-yellow-500" />,
    tags: ["Hello, Friend", "AI", "Alpha"],
  },
  {
    id: "4",
    title: "The Realms of Ambiguity: Beta",
    description: "Closed beta for the upcoming iOS and Android title.",
    status: "Planned",
    date: "Q4 2024",
    icon: <Clock className="text-blue-500" />,
    tags: ["Realms of Ambiguity", "Mobile", "Beta"],
  },
  {
    id: "5",
    title: "DarkFrost JRPG: Chapter 1 Release",
    description: "First playable chapter of the DarkFrost JRPG.",
    status: "Planned",
    date: "Q1 2025",
    icon: <Target className="text-blue-500" />,
    tags: ["DarkFrost JRPG", "Content"],
  },
  {
    id: "6",
    title: "Advanced AI Personalization for Hello, Friend",
    description: "Implementing deeper personalization features.",
    status: "Future Idea",
    icon: <Lightbulb className="text-purple-500" />,
    tags: ["Hello, Friend", "AI", "Personalization"],
  },
]

const statusOrder: RoadmapStatus[] = ["In Progress", "Planned", "Completed", "Future Idea"]

export function InteractiveRoadmap() {
  const [activeTab, setActiveTab] = useState<RoadmapStatus>("In Progress")

  const filteredItems = roadmapData.filter((item) => item.status === activeTab)

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 font-geist text-center">
          Our Journey & <span className="text-primary">What's Next</span>
        </h2>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as RoadmapStatus)} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
            {statusOrder.map((status) => (
              <TabsTrigger
                key={status}
                value={status}
                className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
              >
                {status}
              </TabsTrigger>
            ))}
          </TabsList>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      className="roadmap-item flex flex-col"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="flex items-center mb-3">
                        <span className="mr-3">{item.icon}</span>
                        <h4 className="text-lg font-semibold text-foreground">{item.title}</h4>
                      </div>
                      {item.date && <p className="text-xs text-muted-foreground mb-2">{item.date}</p>}
                      <p className="text-sm text-muted-foreground flex-grow">{item.description}</p>
                      {item.tags && item.tags.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-border/20">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full mr-2 mb-2 inline-block"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">No items for this stage currently.</p>
              )}
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </div>
    </section>
  )
}
