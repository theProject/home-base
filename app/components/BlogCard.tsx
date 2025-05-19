"use client";
import { cn } from "@/lib/utils";
import Link from 'next/link';
import { format } from 'date-fns';
import Image from 'next/image';
import { Clock } from 'lucide-react';

interface Author { id: string; name: string; avatar?: { url: string; alt?: string } }
interface Category { id: string; name: string; slug: string }
interface Post {
  id: string;
  title: string;
  slug: string;
  publishedAt: string;
  description?: string;
  heroImage?: { url: string; alt?: string };
  authors?: Author[];
  categories?: Category[];
  readTime?: number;
}

interface BlogCardProps {
  post: Post;
}

export function BlogCard({ post }: BlogCardProps) {
  const author = post.authors?.[0];

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group/card block rounded-md overflow-hidden shadow-md transition-transform duration-200 hover:scale-105 focus:scale-105",
        "border-2",
        "dark:border-[#e20074]",
        "light:border-[#05F2AF]"
      )}
    >
      <div className="relative aspect-video w-full">
        {post.heroImage?.url && (
          <Image
            src={`/api/media/${post.heroImage.url.replace(/^\//, '')}`}
            alt={post.heroImage.alt || post.title}
            layout="fill"
            objectFit="cover"
            className="transition-opacity duration-300 group-hover:opacity-90"
          />
        )}
        {!post.heroImage?.url && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-500 dark:from-neutral-700 dark:to-neutral-900 flex items-center justify-center">
            <span className="text-lg text-gray-600 dark:text-gray-400">{post.title}</span>
          </div>
        )}
      </div>
      <div className="p-4 bg-white dark:bg-neutral-800" style={{ minHeight: 'calc(200px + 20%)' }}>
        <h3 className="font-bold text-lg text-black dark:text-white line-clamp-2 mb-2">{post.title}</h3>
        {post.description && (
          <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 mb-3">{post.description}</p>
        )}
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          {author?.avatar?.url && (
            <Image
              src={`/api/media/${author.avatar.url.replace(/^\//, '')}`}
              alt={author.name || 'Author'}
              width={20}
              height={20}
              className="rounded-full mr-2 object-cover"
            />
          )}
          <span>{author?.name}</span>
          {post.readTime && (
            <span className="ml-auto flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {post.readTime} min read
            </span>
          )}
        </div>
        <p className="text-xs text-gray-400 mt-2">{format(new Date(post.publishedAt), 'MMM d')}</p>
      </div>
    </Link>
  );
}