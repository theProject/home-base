"use client"

import { useEffect, useState } from "react"
import { ReviewCard } from "@/components/review-card"
import type { AppReview } from "@/api/reviews/facebook/route"
import { Loader2, AlertTriangle, Facebook } from "lucide-react"

export function FacebookReviewsSection() {
  const [reviews, setReviews] = useState<AppReview[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchReviews() {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch("/api/reviews/facebook")
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to fetch reviews")
        }
        const data: AppReview[] = await response.json()
        setReviews(data)
      } catch (err) {
        console.error("Fetch reviews error:", err)
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    fetchReviews()
  }, [])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
        <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
        <p>Loading latest reviews...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-destructive">
        <AlertTriangle className="w-12 h-12 mb-4" />
        <p className="font-semibold">Could not load reviews</p>
        <p className="text-sm">{error}</p>
      </div>
    )
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        <p>No reviews available at the moment. Check back soon!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          name={review.name}
          avatarUrl={review.avatarUrl}
          rating={review.rating}
          reviewText={review.reviewText}
          source={review.source}
          sourceIcon={
            review.source === "Facebook" ? (
              <Facebook className="w-4 h-4 text-[#1877F2]" />
            ) : null
          }
          // Add timestamp={review.timestamp} if needed
        />
      ))}
    </div>
  )
}
