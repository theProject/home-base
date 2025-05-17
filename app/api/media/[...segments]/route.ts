// app/api/media/[...segments]/route.ts
export const runtime = 'nodejs'  // use Node so we can fetch binary data

export async function GET(request: Request, { params: { segments } }: { params: { segments: string[] } }) {
  // Reconstruct the path you’d have hit on Payload:
  const upstreamUrl = `https://admin.bytheproject.com/${segments.join('/')}`

  // Fetch the image (binary) from your Payload server
  const upstreamRes = await fetch(upstreamUrl)
  if (!upstreamRes.ok) {
    return new Response('Not found', { status: 404 })
  }

  const contentType = upstreamRes.headers.get('Content-Type') || 'application/octet-stream'
  const buffer = await upstreamRes.arrayBuffer()

  // Return it with a wide-open CORS header
  return new Response(buffer, {
    status: 200,
    headers: {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      // you can lock this down to your exact domain if you prefer:
      // 'Access-Control-Allow-Origin': 'https://bytheproject.com',
    },
  })
}
