"use client"

import type React from "react"

import { Box, Lock, Search, Settings, Sparkles } from "lucide-react"
import { GlowingEffect } from "@/components/ui/glowing-effect"

export default function GlowingEffectDemo() {
  return (
    <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
      <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
        icon={<Box className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="darkFrost"
        description="We are built to be videogame developers, both in-house and available for contract work with Unity and Unreal engines."
      />

      <GridItem
        area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
        icon={<Settings className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="The Lehigh Valleys AI Warriors"
        description="We live in the frontier of AI and are ready to help you with your next project."
      />

      <GridItem
        area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
        icon={<Lock className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="Hello, Friend is launching on beta"
        description="A breakthrough according to academic partners, allowing you - the user to collect every facet of your life - as your Friend trains soley on you.  Your data will becomne valuable ro advertisers.  Your AI friends can communicate with your real friends, further powering its perception of you.  We offer lifetime meory, your ancestors will be able to talk to you.  We can't wait to share."
      />

      <GridItem
        area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
        icon={<Sparkles className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="Web dev with the newest trends, including AI for your business"
        description="It's highly recomended to get acclimated, and our team can lead your integration and training for enterprise."
      />

      <GridItem
        area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
        icon={<Search className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="App Development?"
        description="We are lomg time dev partners with Apple, Google, AWS, Azure and more.  Try us."
      />
    </ul>
  )
}

interface GridItemProps {
  area: string
  icon: React.ReactNode
  title: string
  description: React.ReactNode
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-2xl border border-gray-300 dark:border-gray-700 p-2 md:rounded-3xl md:p-3">
        <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-6 md:p-6 shadow-lg dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-gray-300 dark:border-gray-600 p-2">{icon}</div>
            <div className="space-y-3">
              <h3 className="-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-black md:text-2xl/[1.875rem] dark:text-white">
                {title}
              </h3>
              <h2 className="font-sans text-sm/[1.125rem] text-black md:text-base/[1.375rem] dark:text-neutral-400 md:[&_b]:font-semibold md:[&_strong]:font-semibold">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}
