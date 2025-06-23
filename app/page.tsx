import Header from "@/components/header"
import Footer from "@/components/footer"
import { AuroraBackground } from "@/components/aurora-background"
import { GlassCard } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Cpu, Lock, Zap } from "lucide-react"
import BackToTop from "@/components/back-to-top"

export default function Page() {
  return (
    <AuroraBackground>
      <div className="relative z-10 min-h-screen bg-transparent">
        <Header />
        <main className="container mx-auto px-4 pt-24 pb-16 sm:pt-32">
          <div className="flex flex-col items-center text-center">
            <GlassCard className="max-w-4xl">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl font-geist">
                The Future of Digital
                <span className="text-primary"> Interaction</span> is Here.
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
                We craft high-performance, next-generation web experiences that captivate and convert. Explore the
                synergy of cutting-edge technology and liquid design.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button size="lg" className="font-semibold">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="font-semibold bg-transparent hover:bg-primary/10">
                  Learn More <span aria-hidden="true">→</span>
                </Button>
              </div>
            </GlassCard>
          </div>

          <section className="mt-20 sm:mt-32">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <GlassCard className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground font-geist">Blazing Fast</h3>
                <p className="mt-2 text-muted-foreground">
                  Optimized for speed with server-side rendering and edge functions.
                </p>
              </GlassCard>
              <GlassCard className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <Cpu className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground font-geist">AI-Powered</h3>
                <p className="mt-2 text-muted-foreground">
                  Leveraging the latest in artificial intelligence to build smarter apps.
                </p>
              </GlassCard>
              <GlassCard className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <Lock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground font-geist">Secure & Scalable</h3>
                <p className="mt-2 text-muted-foreground">
                  Built on a robust infrastructure that grows with your business.
                </p>
              </GlassCard>
            </div>
          </section>
        </main>
        <BackToTop />
        <Footer />
      </div>
    </AuroraBackground>
  )
}
