"use client"
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal"

const content = [
  {
    title: "Meet Hello, Friend",
    description:
      "Hello, Friend is very secret but close to beta - area will update soon, as we does our PR to the world. For beta, it is limited to USA and Canadian residents - we are working on strict data controls around the world.  It is an AI companion that understands your needs and helps you navigate your digital life. With advanced natural language processing, it learns your preferences and adapts to your unique style.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,#06b6d4,#10b981)] text-white">
        <span className="text-xl font-bold">Hello, Friend.</span>
      </div>
    ),
  },
  {
    title: "Natural Conversations",
    description:
      "Have natural, flowing conversations that feel human. Hello, Friend remembers context, understands nuance, and responds with empathy. It's like talking to a real person who's always there for you.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-black text-white">
        <img
          src="/placeholder.svg?height=300&width=300"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="AI chat interface"
        />
      </div>
    ),
  },
  {
    title: "Personalized Assistance",
    description:
      "Get help with daily tasks, creative projects, research, or just someone to talk to. Hello, Friend adapts to your needs and becomes more helpful the more you interact with it.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,#f97316,#eab308)] text-white">
        <span className="text-xl font-bold">Your Personal AI</span>
      </div>
    ),
  },
  {
    title: "Privacy First",
    description:
      "Your conversations are private and secure. Hello, Friend is designed with privacy at its core, ensuring your data stays yours. We never share your information with third parties or use it for training without your explicit consent.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,#06b6d4,#10b981)] text-white">
        <span className="text-xl font-bold">Secure & Private</span>
      </div>
    ),
  },
]

export default function StickyScrollRevealDemo() {
  return (
    <div className="w-full py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-12 font-geist text-center">
          Introducing <span className="text-magenta">Hello, Friend</span>
        </h2>
        <StickyScroll content={content} />
      </div>
    </div>
  )
}
