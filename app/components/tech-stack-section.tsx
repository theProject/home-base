import Image from "next/image"
import { SkillRadialChart } from "./skill-radial-chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Database, Cloud, Palette, Brain, Bot, Wand2, BarChart3, GitMerge, TerminalSquare } from "lucide-react"

const techStackData = [
  {
    category: "Frontend Development",
    icon: <Palette className="h-6 w-6 text-primary" />,
    skills: [
      { name: "Next.js", proficiency: 95, color: "hsl(var(--primary))", icon: <TerminalSquare /> },
      { name: "React", proficiency: 90, color: "hsl(200 100% 60%)", icon: <Code /> },
      { name: "Tailwind CSS", proficiency: 85, color: "hsl(180 100% 40%)", icon: <Palette /> },
      { name: "TypeScript", proficiency: 90, color: "hsl(220 100% 60%)", icon: <Code /> },
    ],
  },
  {
    category: "Backend & Databases",
    icon: <Database className="h-6 w-6 text-primary" />,
    skills: [
      { name: "Node.js", proficiency: 80, color: "hsl(120 60% 50%)", icon: <GitMerge /> },
      { name: "Python", proficiency: 75, color: "hsl(45 100% 50%)", icon: <Bot /> },
      { name: "PostgreSQL", proficiency: 70, color: "hsl(210 80% 60%)", icon: <Database /> },
      { name: "Supabase", proficiency: 85, color: "hsl(150 70% 50%)", icon: <Database /> },
    ],
  },
  {
    category: "AI & Machine Learning",
    icon: <Brain className="h-6 w-6 text-primary" />,
    skills: [
      { name: "Generative AI", proficiency: 88, color: "hsl(var(--primary))", icon: <Wand2 /> },
      { name: "LLMs", proficiency: 82, color: "hsl(270 70% 65%)", icon: <Brain /> },
      { name: "Data Analysis", proficiency: 70, color: "hsl(30 100% 60%)", icon: <BarChart3 /> },
    ],
  },
  {
    category: "DevOps & Cloud",
    icon: <Cloud className="h-6 w-6 text-primary" />,
    skills: [
      { name: "Vercel", proficiency: 92, color: "hsl(0 0% 80%)", icon: <Cloud /> },
      { name: "Docker", proficiency: 65, color: "hsl(205 90% 55%)", icon: <TerminalSquare /> },
      { name: "GitHub Actions", proficiency: 78, color: "hsl(0 0% 50%)", icon: <GitMerge /> },
    ],
  },
]

const teamMembers = [
  { name: "Alex Nova", avatar: "/alex-nova-avatar.png", role: "Lead Developer / AI Specialist" },
  { name: "Jamie Byte", avatar: "/jamie-byte-avatar.png", role: "Frontend Wizard / UI/UX" },
  { name: "Casey Pixel", avatar: "/casey-pixel-avatar.png", role: "Backend Architect / Data" },
  // Add more team members if you have them
  { name: "The Project", avatar: "/placeholder.svg?width=100&height=100", role: "Collective Brainpower" },
]

export function TechStackSection() {
  return (
    <section className="py-16 md:py-24 bg-background dark:bg-neutral-900/50">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground font-geist md:text-4xl lg:text-5xl">
            Our Tech <span className="text-primary">Arsenal</span> & Expertise
          </h2>
          <p className="mt-4 text-lg text-muted-foreground md:text-xl">
            Leveraging cutting-edge technologies to build innovative solutions.
          </p>
        </div>

        <div className="mb-16 flex flex-wrap justify-center gap-8 md:gap-12 items-center">
          {teamMembers.map((member) => (
            <div key={member.name} className="flex flex-col items-center text-center group">
              <Image
                src={member.avatar || "/placeholder.svg"}
                alt={member.name}
                width={100}
                height={100}
                className="rounded-full mb-3 border-2 border-transparent group-hover:border-primary transition-all duration-300 shadow-lg group-hover:shadow-primary/30"
              />
              <h4 className="text-md font-semibold text-foreground font-geist">{member.name}</h4>
              <p className="text-xs text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>

        <div className="space-y-12">
          {techStackData.map((category) => (
            <Card key={category.category} className="overflow-hidden interactive-glow-card border-border/50">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  {category.icon}
                  <CardTitle className="text-2xl font-geist text-foreground">{category.category}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                  {category.skills.map((skill) => (
                    <SkillRadialChart
                      key={skill.name}
                      skillName={skill.name}
                      proficiency={skill.proficiency}
                      color={skill.color}
                      icon={skill.icon}
                      size={120}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
