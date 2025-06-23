import type React from "react"
import { NextResponse } from "next/server"
import { Facebook } from "lucide-react" // For the icon

// Define the expected structure of a review from Facebook API
interface FacebookReviewer {
  name: string
  id: string // User ID, can be used to construct profile picture URL
  picture?: {
    // Optional, as picture data might not always be available or requested
    data?: {
      url?: string
    }
  }
}

interface FacebookReviewData {
  id: string // Unique ID for the review itself
  created_time: string
  reviewer?: FacebookReviewer // Reviewer might be optional if the review is anonymous or user deleted
  rating: number
  review_text?: string // Review text is optional
}

interface FacebookApiResponse {
  data: FacebookReviewData[]
  paging?: {
    // Optional paging information
    cursors?: {
      before: string
      after: string
    }
    next?: string
  }
}

// Define the structure for our application's review card
export interface AppReview {
  id: string
  name: string
  avatarUrl: string
  rating: number
  reviewText: string
  source: string
  sourceIcon?: React.ReactNode // We'll add the Facebook icon here
  timestamp?: string
}

export async function GET() {
  const pageId = process.env.FACEBOOK_PAGE_ID
  const accessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN

  if (!pageId || !accessToken) {
    return NextResponse.json({ error: "Facebook API credentials not configured." }, { status: 500 })
  }

  // Construct the profile picture URL. type=normal, small, large, square
  const getProfilePictureUrl = (userId: string) =>
    `https://graph.facebook.com/${userId}/picture?type=large&access_token=${accessToken}`

  // The fields parameter specifies what data you want for each review.
  // Adjust fields as needed based on Graph API version and permissions.
  // Common fields: created_time, rating, review_text, reviewer{id,name,picture}
  const fields = "id,created_time,rating,review_text,reviewer{id,name}"
  const url = `https://graph.facebook.com/v19.0/${pageId}/ratings?fields=${fields}&access_token=${accessToken}&limit=3` // Fetch 3 reviews

  try {
    const response = await fetch(url)
    if (!response.ok) {
      const errorData = await response.json()
      console.error("Facebook API Error:", errorData)
      return NextResponse.json(
        { error: "Failed to fetch reviews from Facebook.", details: errorData },
        { status: response.status },
      )
    }

    const reviewsData = (await response.json()) as FacebookApiResponse

    if (!reviewsData.data) {
      console.warn("No review data found in Facebook API response:", reviewsData)
      return NextResponse.json([]) // Return empty array if no reviews
    }

    const transformedReviews: AppReview[] = reviewsData.data
      .map((review) => {
        // Handle cases where reviewer might be null or review_text is missing
        if (!review.reviewer || !review.review_text) {
          return null
        }
        return {
          id: review.id,
          name: review.reviewer.name,
          avatarUrl: getProfilePictureUrl(review.reviewer.id),
          rating: review.rating,
          reviewText: review.review_text,
          source: "Facebook", // Facebook brand color
          timestamp: review.created_time,
        }
      })
      .filter(Boolean) as AppReview[] // Filter out any null entries

    return NextResponse.json(transformedReviews)
  } catch (error) {
    console.error("Error fetching Facebook reviews:", error)
    return NextResponse.json({ error: "An unexpected error occurred while fetching reviews." }, { status: 500 })
  }
}
