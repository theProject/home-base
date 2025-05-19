// app/api/posts/route.ts
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const qs = url.searchParams.toString()

  // Read whichever env var you’ve actually configured
  const upstreamBase =
    process.env.PAYLOAD_URL ||
    process.env.NEXT_PUBLIC_PAYLOAD_API_URL ||
    ''
  if (!upstreamBase) {
    console.error('Missing Payload URL env var')
    return NextResponse.error()
  }

  const upstream = `${upstreamBase.replace(/\/$/, '')}/api/posts${qs ? `?${qs}` : ''}`
  console.log('Proxying to:', upstream)

  const res = await fetch(upstream)
  if (!res.ok) return NextResponse.error()

  const json = await res.json()
  return NextResponse.json(json, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  })
}
