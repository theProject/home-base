import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Mobile App for Healthcare",
    description:
      "A comprehensive healthcare application that connects patients with doctors for virtual consultations.",
    image: "/placeholder.svg?height=600&width=800",
    category: "Mobile Development",
    link: "/projects/healthcare-app",
  },
  {
    id: 2,
    title: "AR Gaming Experience",
    description: "An augmented reality game that transforms your surroundings into an interactive playground.",
    image: "/placeholder.svg?height=600&width=800",
    category: "Game Development",
    link: "/projects/ar-game",
  },
  {
    id: 3,
    title: "AI Content Generator",
    description: "A generative AI tool that creates custom content for marketing and social media.",
    image: "/placeholder.svg?height=600&width=800",
    category: "Generative AI",
    link: "/projects/ai-generator",
  },
  {
    id: 4,
    title: "E-commerce Mobile App",
    description: "A feature-rich mobile shopping experience with personalized recommendations.",
    image: "/placeholder.svg?height=600&width=800",
    category: "Mobile Development",
    link: "/projects/ecommerce-app",
  },
  {
    id: 5,
    title: "Educational Game for Kids",
    description: "An interactive game designed to teach children basic math and language skills.",
    image: "/placeholder.svg?height=600&width=800",
    category: "Game Development",
    link: "/projects/educational-game",
  },
  {
    id: 6,
    title: "AI Image Enhancement Tool",
    description: "A tool that uses AI to enhance and restore old or low-quality images.",
    image: "/placeholder.svg?height=600&width=800",
    category: "Generative AI",
    link: "/projects/ai-image-tool",
  },
]

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4 font-geist">
            Our <span className="text-magenta">Projects</span>
          </h1>
          <p className="text-lg text-black/80 dark:text-white/80 mb-12 max-w-2xl">
            Explore our portfolio of mobile applications, video games, and generative AI projects.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="group">
                <Link href={project.link} className="block">
                  <div className="overflow-hidden rounded-lg mb-4">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={800}
                      height={600}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-magenta uppercase tracking-wider">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold text-black dark:text-white mt-2 group-hover:text-magenta transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-black/70 dark:text-white/70 mt-2">{project.description}</p>
                    <div className="mt-4 flex items-center text-magenta font-medium">
                      <span>View Project</span>
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
