import Image from "next/image"
import Link from "next/link"
import { Linkedin, Twitter, Globe } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export interface AuthorProfile {
  id: string
  name: string
  title: string
  avatarUrl: string
  bio: string
  tags?: string[]
  socialLinks?: {
    linkedin?: string
    twitter?: string
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
        <div className="relative w-full h-32 bg-gradient-to-br from-magenta/20 via-purple-500/10 to-blue-500/10">
          <Image
            src={author.avatarUrl || "/placeholder.svg"}
            alt={author.name}
            width={96}
            height={96}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full border-4 border-background object-cover shadow-lg"
          />
        </div>
      </CardHeader>
      <CardContent className="pt-16 text-center">
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
              aria-label={`${author.name} Twitter Profile`}
              className="hover:text-magenta transition-colors"
            >
              <Twitter size={20} />
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
