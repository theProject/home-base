"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Github, Star, Users, BookMarked, Loader2, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils" // Assuming you have a cn utility

interface GitHubProfileSectionProps {
  username: string
  profileUrl: string
  className?: string
}

interface GitHubStats {
  followers: number
  public_repos: number
  stars: number | "N/A"
}

export function GitHubProfileSection({ username, profileUrl, className }: GitHubProfileSectionProps) {
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStats() {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`/api/github-stats?username=${username}`)
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || `Failed to fetch stats: ${response.statusText}`)
        }
        const data = await response.json()
        setStats(data)
      } catch (err: any) {
        console.error("Error fetching GitHub stats:", err)
        setError(err.message || "Could not load GitHub stats.")
      } finally {
        setLoading(false)
      }
    }

    if (username) {
      fetchStats()
    }
  }, [username])

  const StatCard = ({
    icon: Icon,
    label,
    value,
    isLoading,
  }: { icon: React.ElementType; label: string; value: number | string | undefined; isLoading: boolean }) => (
    <div className="flex flex-col items-center p-4 bg-black/20 backdrop-blur-sm rounded-lg shadow-md border border-white/10 min-w-[100px] text-center">
      <Icon className="w-8 h-8 mb-2 text-pink-400" />
      {isLoading ? (
        <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
      ) : value !== undefined ? (
        <span className="text-2xl font-bold text-slate-100">{value}</span>
      ) : (
        <span className="text-slate-400">-</span>
      )}
      <span className="text-xs text-slate-400 uppercase tracking-wider">{label}</span>
    </div>
  )

  return (
    <section className={cn("py-16 md:py-24 relative overflow-hidden", className)}>
      <div className="container mx-auto px-4">
        <div
          className={cn(
            "relative group p-8 md:p-12 bg-slate-900/70 backdrop-blur-xl rounded-xl shadow-2xl border border-white/10 transition-all duration-300",
            "hover:shadow-[0_0_30px_5px_rgba(236,72,153,0.5),_0_0_10px_2px_rgba(236,72,153,0.3)]", // Enhanced hover glow
            "before:absolute before:inset-0 before:bg-grid-slate-700/[0.07] before:[mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0))]", // Subtle grid
          )}
        >
          <div className="absolute -top-4 -left-4 w-16 h-16 bg-pink-500/30 rounded-full blur-2xl animate-pulse group-hover:scale-150 transition-transform duration-500"></div>
          <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-purple-500/30 rounded-full blur-2xl animate-pulse delay-200 group-hover:scale-150 transition-transform duration-500"></div>

          <div className="relative z-10 flex flex-col items-center text-center">
            <Github className="w-20 h-20 md:w-28 md:h-28 mb-6 text-slate-100 group-hover:text-pink-400 transition-colors duration-300" />
            <h2 className="text-3xl md:text-4xl font-bold mb-3 font-geist-mono text-slate-100">Find me on GitHub</h2>
            <p className="text-slate-400 mb-6 max-w-md font-geist-mono">
              Explore my projects, contributions, and see what I&apos;m currently coding.
            </p>

            {loading && (
              <div className="flex justify-center items-center space-x-4 my-6">
                <Loader2 className="w-10 h-10 text-pink-400 animate-spin" />
                <p className="text-slate-300 font-geist-mono">Loading GitHub Stats...</p>
              </div>
            )}

            {error && !loading && (
              <div className="my-6 p-4 bg-red-900/50 border border-red-700 rounded-md text-red-300 flex items-center space-x-2 font-geist-mono">
                <AlertTriangle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            )}

            {!loading && !error && stats && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 my-8 w-full max-w-2xl">
                <StatCard icon={BookMarked} label="Repositories" value={stats.public_repos} isLoading={loading} />
                <StatCard icon={Users} label="Followers" value={stats.followers} isLoading={loading} />
                <StatCard icon={Star} label="Total Stars" value={stats.stars} isLoading={loading} />
              </div>
            )}

            <Link
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center justify-center px-8 py-3 mt-4 font-geist-mono font-semibold text-slate-100 bg-gradient-to-r from-slate-800 to-slate-700 rounded-lg shadow-md",
                "border border-pink-500/0 group-hover:border-pink-500", // Border appears on hover
                "hover:from-pink-600 hover:to-purple-600 hover:text-white hover:shadow-lg hover:shadow-pink-500/30",
                "transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 focus:ring-offset-slate-900",
              )}
            >
              <Github className="w-5 h-5 mr-2" />@{username}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
