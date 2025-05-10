import Header from "@/components/header"
import Footer from "@/components/footer"
import FocusCardsDemo from "@/components/focus-cards-demo"
import { BorderButton } from "@/components/ui/border-button"
import Link from "next/link"

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

          <FocusCardsDemo />

          <div className="mt-16 text-center">
            <Link href="/contact">
              <BorderButton size="lg">Get in Touch</BorderButton>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
