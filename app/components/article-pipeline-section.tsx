"use client"

import { Mail, Edit3, Search, CheckCircle, Clock } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface PipelineItem {
  id: string
  title: string
  status: "Researching" | "Drafting" | "Reviewing" | "Scheduled"
  expectedDate?: string // e.g., "Late July", "August 2024"
  description: string
}

const pipelineItemsData: PipelineItem[] = [
  {
    id: "1",
    title: "The Future of Decentralized AI: Opportunities and Challenges",
    status: "Drafting",
    expectedDate: "Early July 2024",
    description:
      "Exploring how AI and blockchain technologies are converging and what it means for developers and users.",
  },
  {
    id: "2",
    title: "Mastering Quantum-Resistant Encryption Algorithms",
    status: "Researching",
    expectedDate: "Mid July 2024",
    description: "A deep dive into the next generation of cryptography to protect data from quantum threats.",
  },
  {
    id: "3",
    title: "Ethical Frameworks for Generative Art and Media",
    status: "Reviewing",
    expectedDate: "Late July 2024",
    description: "Navigating the complex ethical landscape of AI-generated content and intellectual property.",
  },
  {
    id: "4",
    title: "Building Scalable Microservices with Rust and WebAssembly",
    status: "Scheduled",
    expectedDate: "August 2024",
    description: "A practical guide to leveraging Rust and Wasm for high-performance, secure microservices.",
  },
]

const statusIcons = {
  Researching: <Search className="h-5 w-5 text-blue-500" />,
  Drafting: <Edit3 className="h-5 w-5 text-yellow-500" />,
  Reviewing: <Clock className="h-5 w-5 text-purple-500" />,
  Scheduled: <CheckCircle className="h-5 w-5 text-green-500" />,
}

export function ArticlePipelineSection() {
  return (
    <section className="py-16 md:py-24 bg-neutral-100/50 dark:bg-neutral-900/80 border-t border-border dark:border-neutral-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
          What We&apos;re <span className="text-magenta">Working On Next</span>
        </h2>
        <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          A sneak peek into the articles currently in our pipeline, bringing you fresh insights soon.
        </p>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line for the timeline */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-border dark:bg-neutral-700 transform -translate-x-1/2 hidden sm:block"></div>

          {pipelineItemsData.map((item, index) => (
            <div key={item.id} className="mb-10 flex items-start sm:items-center group">
              {/* Icon and Dot for timeline */}
              <div className="relative z-10 flex-shrink-0 sm:transform sm:-translate-x-1/2">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-card border-2 border-magenta shadow-md group-hover:scale-110 transition-transform">
                  {statusIcons[item.status]}
                </div>
              </div>

              {/* Content Card */}
              <div className="ml-6 sm:ml-0 sm:w-1/2 sm:pl-10 flex-grow">
                <div
                  className={`p-6 rounded-xl shadow-lg transition-all duration-300 group-hover:shadow-magenta/20 border border-border dark:border-neutral-700 bg-card hover:border-magenta/50 ${index % 2 === 0 ? "sm:text-left" : "sm:text-left sm:ml-auto"}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-magenta transition-colors">
                      {item.title}
                    </h3>
                    {item.expectedDate && (
                      <span className="text-xs font-medium text-magenta bg-magenta/10 px-2 py-0.5 rounded-full">
                        {item.expectedDate}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                  <span
                    className={`inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                      item.status === "Researching"
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-700/30 dark:text-blue-300"
                        : item.status === "Drafting"
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-700/30 dark:text-yellow-300"
                          : item.status === "Reviewing"
                            ? "bg-purple-100 text-purple-700 dark:bg-purple-700/30 dark:text-purple-300"
                            : "bg-green-100 text-green-700 dark:bg-green-700/30 dark:text-green-300"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold mb-3 text-foreground">Have a Story Idea or Want to Contribute?</h3>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            We&apos;re always looking for fresh perspectives and groundbreaking topics. Reach out to our editorial team.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-magenta text-primary-foreground hover:bg-magenta/90 group transition-all duration-300 hover:shadow-lg hover:shadow-magenta/40"
          >
            <Link href="mailto:tjsmith@bytheproject.com">
              <Mail className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-[-15deg] group-hover:scale-110" />
              Email Our Editor
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
