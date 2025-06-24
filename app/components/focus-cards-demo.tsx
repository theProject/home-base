import { FocusCardsContainer, type FocusCardProps } from "./ui/focus-cards" // Ensure correct import path

const cards: FocusCardProps[] = [
  {
    image: "/darkfrost-game-concept.png",
    alt: "DarkFrost Project",
    title: "DarkFrost",
    description: "A chilling adventure into a frozen world. Mobile survival game.",
    summary:
      "DarkFrost is an immersive mobile survival game set in a post-apocalyptic frozen world. Players must scavenge, craft, and battle the elements and mutated creatures to survive.",
    href: "/projects/darkfrost",
    tags: ["Mobile Game", "Survival", "Unity"],
  },
  {
    image: "/dreams-ai-art.png",
    alt: "Project Dreams",
    title: "Project Dreams",
    description: "Generative AI for dream-like visual storytelling.",
    summary:
      "Project Dreams leverages cutting-edge generative AI to transform textual prompts into surreal and captivating visual narratives, exploring the boundaries of art and imagination.",
    href: "/projects/dreams",
    tags: ["Generative AI", "Art", "Python", "Stable Diffusion"],
  },
  {
    image: "/googooit-app-interface.png",
    alt: "GooGooIt Project",
    title: "GooGooIt",
    description: "Mobile app for discovering local baby-friendly places.",
    summary:
      "GooGooIt is a community-driven mobile application designed to help parents find and review baby-friendly locations, from cafes to changing stations, making outings easier.",
    href: "/projects/googooit",
    tags: ["Mobile App", "Community", "React Native"],
  },
  {
    image: "/hellofriend-social-app.png",
    alt: "HelloFriend Project",
    title: "HelloFriend",
    description: "A new take on social networking, focusing on mental well-being.",
    summary:
      "HelloFriend is a social platform that prioritizes meaningful connections and mental well-being, offering tools and a supportive community to foster positive online interactions.",
    href: "/projects/hellofriend",
    tags: ["Social Media", "Well-being", "Flutter"],
  },
  {
    image: "/imagine-platform-showcase.png",
    alt: "iMagine Project",
    title: "iMagine",
    description: "Platform for collaborative AI-driven content creation.",
    summary:
      "iMagine provides a collaborative suite of AI tools for teams to create diverse content, from marketing copy to video scripts, streamlining creative workflows.",
    href: "/projects/imagine",
    tags: ["AI Platform", "Collaboration", "SaaS", "Next.js"],
  },
  {
    image: "/placeholder.svg?height=400&width=600",
    alt: "Political Campaign AI",
    title: "Campaign AI",
    description: "AI tools for political campaign analysis and strategy.",
    summary:
      "Campaign AI offers data-driven insights and predictive analytics for political campaigns, helping strategists optimize outreach and understand voter sentiment.",
    href: "/projects/political",
    tags: ["AI", "Politics", "Data Analysis"],
  },
]

export default function FocusCardsDemo() {
  return (
    <div className="py-12">
      <FocusCardsContainer cards={cards} />
    </div>
  )
}
