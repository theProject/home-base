import Image from "next/image"
import Link from "next/link"
import { Linkedin, Globe } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Custom X (formerly Twitter) icon
const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className="w-5 h-5"
    {...props}
  >
    <path d="M4 3h16c.6 0 1 .4 1 1v16c0 .6-.4 1-1 1H4c-.6 0-1-.4-1-1V4c0-.6.4-1 1-1zm9.5 10.2l4.2-6.2H16l-3.2 4.8L10 7H8.3l4.3 6.5-4.3 6.5H9l3.3-4.9 3.4 4.9h1.6l-4.3-6.3z" />
  </svg>
)

export interface AuthorProfile {
  id: string
  name: string
  title: string
  avatarUrl: string
  bio: string
  tags?: string[]
  socialLinks?: {
    linkedin?: string
    twitter?: string // still called twitter in our mock data, luicide isn't doing it; points to https://x.com
    website?: string
  }
}

interface AuthorCardProps {
  author: AuthorProfile
}

export function AuthorCard({ author }: AuthorCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:border-magenta/50 dark:bg-neutral-800/50 dark:hover:bg-neutral-800">
      <CardHeader className="p-0">
        <div className="relative w-full h-40 bg-gradient-to-br from-magenta/20 via-purple-500/10 to-blue-500/10">
          <Image
            src={author.avatarUrl || "/placeholder.svg"}
            alt={author.name}
            width={256}
            height={256}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full border-4 border-background object-cover shadow-lg w-44 h-44"
          />
        </div>
      </CardHeader>
      <CardContent className="pt-20 text-center">
        <CardTitle className="text-xl font-semibold text-foreground">{author.name}</CardTitle>
        <CardDescription className="text-magenta mb-3">{author.title}</CardDescription>
        <p className="text-sm text-muted-foreground mb-4 px-2 line-clamp-3 min-h-[60px]">{author.bio}</p>

        {author.tags && author.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap justify-center gap-2">
            {author.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex justify-center space-x-3 text-muted-foreground">
          {author.socialLinks?.linkedin && (
            <Link
              href={author.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${author.name} LinkedIn Profile`}
              className="hover:text-magenta transition-colors"
            >
              <Linkedin size={20} />
            </Link>
          )}
          {author.socialLinks?.twitter && (
            <Link
              href={author.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${author.name} X Profile`}
              className="hover:text-magenta transition-colors"
            >
              <XIcon />
            </Link>
          )}
          {author.socialLinks?.website && (
            <Link
              href={author.socialLinks.website}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${author.name} Website`}
              className="hover:text-magenta transition-colors"
            >
              <Globe size={20} />
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
