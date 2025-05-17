// utilities/getMediaUrl.ts
/**
 * Turn a Payload path ("/uploads/…") into a full URL:
 *   https://admin.bytheproject.com/uploads/…?cacheTag=…
 */
export function getMediaUrl(path: string, cacheTag?: string) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const base = process.env.NEXT_PUBLIC_PAYLOAD_URL!.replace(/\/$/, '')
  return `${base}${path}${cacheTag ? `?cacheTag=${cacheTag}` : ''}`
}
