"use client"
import { ContainerScroll } from "@/components/ui/container-scroll-animation"

export default function ContainerScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white font-geist">
              Crafting <span className="text-magenta">Digital</span> Experiences <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">Since 2012</span>
            </h1>
          </>
        }
      >
        <img
          src={`./testConcept.png`}
          alt="iPad showing theProject app interface"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  )
}
