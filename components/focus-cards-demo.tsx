import { FocusCards } from "@/components/ui/focus-cards"

export default function FocusCardsDemo() {
  const cards = [
    {
      title: "The Prequel - darkFrost ~0~",
      description: "Our world is so big, we made a game just for you to learn how deep this goes!",
      src: "/frostMonster.png",
      href: "/projects/darkfrost",
    },
    {
      title: "Sleepy Game",
      description: "Having Four Daughters sure lends to some really cool games for the kiddos!",
      src: "/sleepyGame.png",
      href: "/projects/dreams",
    },
    {
      title: "SlimeBoi",
      description:
        'SlimeBoi met his match when he met "friend". Jump in to uncover the roadmap of what Hello, Friend! IS? It\'s the end all of AI, we figured out long term.',
      src: "/slimeBoi.png",
      href: "/projects/hellofriend",
    },
    {
      title: "AI / Cloud Power Users",
      description:
        "Come check out some thin systems we've been working on and see the incredible work just talking about ideas gets us.",
      src: "/aiDan.png",
      href: "/projects/political",
    },
    {
      title: "iMagineering",
      description:
        "Our state of the art Photo generating and orchestration - placing your work with any tool at the center of what you do. There is nothing better.",
      src: "/iMagine.png",
      href: "/projects/imagine",
    },
    {
      title: "darkFrost",
      description: "Welcome to darkFrost - where we are engaged to build the ultimate game. The one that never ends.",
      src: "/darkFrostArt.png",
      href: "/projects/googooit",
    },
  ]

  return <FocusCards cards={cards} />
}
