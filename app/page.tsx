import Header from "@/components/header"
import SpotlightNewDemo from "@/components/spotlight-new-demo"
import ContainerScrollDemo from "@/components/container-scroll-animation-demo"
import GlowingEffectDemo from "@/components/glowing-effect-demo"
import GoogleGeminiEffectDemo from "@/components/google-gemini-effect-demo"
import StickyScrollRevealDemo from "@/components/sticky-scroll-reveal-demo"
import BackToTop from "@/components/back-to-top"
import Footer from "@/components/footer"

export default function Page() {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <Header />
      <SpotlightNewDemo />
      <ContainerScrollDemo />
      <section className="w-full py-20 px-4 bg-white dark:bg-black">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-12 font-geist text-center">
            Our <span className="text-magenta">Services</span>
          </h2>
          <GlowingEffectDemo />
        </div>
      </section>
      <section className="w-full bg-white dark:bg-black">
       
      </section>
      <StickyScrollRevealDemo />
      <BackToTop />
      <Footer />
    </main>
  )
}
