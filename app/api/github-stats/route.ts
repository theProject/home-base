import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get("username")

  if (!username) {
    return NextResponse.json({ error: "GitHub username is required" }, { status: 400 })
  }

  const GITHUB_PAT = process.env.GITHUB_PAT
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  }

  if (GITHUB_PAT) {
    headers["Authorization"] = `token ${GITHUB_PAT}`
  }

  try {
    // Fetch user data (followers, public_repos)
    const userRes = await fetch(`https://api.github.com/users/${username}`, { headers })
    if (!userRes.ok) {
      const errorData = await userRes.json()
      console.error("GitHub API error (user):", errorData)
      return NextResponse.json(
        { error: `Failed to fetch user data: ${errorData.message || userRes.statusText}` },
        { status: userRes.status },
      )
    }
    const userData = await userRes.json()
    const { followers, public_repos } = userData

    // Fetch all repositories to sum stars
    let totalStars = 0
    let page = 1
    let reposData
    let allRepos: any[] = []

    do {
      const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&page=${page}`, {
        headers,
      })
      if (!reposRes.ok) {
        const errorData = await reposRes.json()
        console.error("GitHub API error (repos):", errorData)
        // If fetching repos fails, we can still return user data
        return NextResponse.json(
          {
            followers,
            public_repos,
            stars: "N/A", // Indicate stars couldn't be fetched
            error: `Failed to fetch repositories: ${errorData.message || reposRes.statusText}`,
          },
          { status: 200 },
        ) // Still 200 as some data is available
      }
      reposData = await reposRes.json()
      allRepos = allRepos.concat(reposData)
      page++
    } while (reposData.length === 100) // GitHub API paginates at 100 per page

    totalStars = allRepos.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0)

    return NextResponse.json({
      followers,
      public_repos,
      stars: totalStars,
    })
  } catch (error: any) {
    console.error("Error fetching GitHub stats:", error)
    return NextResponse.json({ error: `Internal server error: ${error.message}` }, { status: 500 })
  }
}
