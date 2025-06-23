import Header from "@/components/header"
import Footer from "@/components/footer"
import FocusCardsDemo from "@/components/focus-cards-demo"
import { BorderButton } from "@/components/ui/border-button"
import Link from "next/link"
import { TechStackSection } from "@/components/tech-stack-section" // Import the new section

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background dark:bg-black">
      <Header />
      <main className="pb-16">
        {" "}
        {/* Removed pt-24 from main, TechStackSection will handle its own top padding */}
        <div className="container mx-auto px-4 pt-24">
          {" "}
          {/* Added pt-24 here for the initial content */}
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-white mb-4 font-geist">
              Our <span className="text-primary">Creations</span>
            </h1>
            <p className="text-lg text-muted-foreground dark:text-white/80 mb-12 max-w-2xl">
              Explore our portfolio of mobile applications, video games, and generative AI projects. Each crafted with
              passion and precision.
            </p>
            <FocusCardsDemo />
          </div>
        </div>
        <TechStackSection /> {/* Add the new section here */}
        <div className="container mx-auto px-4 mt-16 text-center">
          {" "}
          {/* Added container for consistent padding */}
          <Link href="/contact">
            <BorderButton size="lg">Get in Touch</BorderButton>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
