"use client"

import type React from "react"
import { Box, Lock, Search, Settings, Sparkles } from "lucide-react"
import { GlowingEffect } from "@/components/ui/glowing-effect" // Assuming this path is correct

export default function GlowingEffectDemo() {
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
      <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
        bgImage="/cardBack1.svg"
        icon={<Box className="h-4 w-4 text-black dark:text-white" />}
        title="darkFrost"
        description="We are built to be videogame developers, both in-house and available for contract work with Unity and Unreal engines."
      />

      <GridItem
        area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
        bgImage="/cardBack2.svg"
        icon={<Settings className="h-4 w-4 text-black dark:text-white" />}
        title="The Lehigh Valleys AI Warriors"
        description="We live in the frontier of AI and are ready to help you with your next project."
      />

      <GridItem
        area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
        bgImage="/cardBack3.svg"
        icon={<Lock className="h-4 w-4 text-black dark:text-white" />}
        title="Hello, Friend is launching on beta"
        description={
          <>
            A breakthrough according to academic partners, allowing you – the user – to collect every facet of
            your life as your Friend trains solely on you. Your data becomes valuable to advertisers. Your AI
            friends can communicate with your real friends, further powering its perception of you. We offer
            lifetime memory – your ancestors will be able to talk to you. We can't wait to share.
          </>
        }
      />

      <GridItem
        area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
        bgImage="/cardBack4.svg"
        icon={<Sparkles className="h-4 w-4 text-black dark:text-white" />}
        title="Web dev with the newest trends, including AI for your business"
        description="It's highly recommended to get acclimated, and our team can lead your integration and training for enterprise."
      />

      <GridItem
        area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
        bgImage="/cardBack5.svg"
        icon={<Search className="h-4 w-4 text-black dark:text-white" />}
        title="App Development?"
        description="Years of a loving passion for iOS, macOS, Android, Windows, and your favorite game consoles and stores. Let's connect and make dreams a reality."
      />
    </ul>
  )
}

interface GridItemProps {
  area: string
  bgImage: string
  icon: React.ReactNode
  title: string
  description: React.ReactNode
}

const GridItem = ({ area, bgImage, icon, title, description }: GridItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      {/* This is the outer container that includes padding/border for the glow to potentially sit around */}
      <div className="relative h-full rounded-2xl border border-gray-300 dark:border-gray-700 p-2 md:rounded-3xl md:p-3">
        
        {/* GlowingEffect with restored props */}
        <GlowingEffect 
          spread={40}      // Changed from 8 back to 40 (from your original working version)
          glow             // This is equivalent to glow={true}
          disabled={false} // Explicitly set to false (from your original working version)
          proximity={64} 
          inactiveZone={0.01} 
        />

        {/* Card: This is the direct sibling to GlowingEffect. 
            Added bg-white dark:bg-black back, similar to original working version. */}
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl
                        border border-gray-200 dark:border-gray-800
                        bg-white dark:bg-black {/* Added back from original working version */}
                        shadow-lg dark:shadow-[0px_0px_27px_0px_#2D2D2D]
                        p-6 md:p-6">
          
          {/* SVG background: This will now sit on top of the bg-white/dark:bg-black */}
          <div
            className="absolute inset-0 bg-cover bg-center filter invert-0 dark:invert"
            style={{ backgroundImage: `url(${bgImage})` }}
          />

          {/* Content: This has z-10, so it will be on top of the SVG background */}
          <div className="relative z-10 flex flex-1 flex-col justify-between gap-3 text-black dark:text-white">
            <div className="w-fit rounded-lg border border-gray-300 dark:border-gray-600 p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="font-sans text-xl/[1.375rem] font-semibold md:text-2xl/[1.875rem]">
                {title}
              </h3>
              <h2 className="font-sans text-sm/[1.125rem] md:text-base/[1.375rem]">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}