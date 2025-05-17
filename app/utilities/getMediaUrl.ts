// utilities/getMediaUrl.ts
export function getMediaUrl(path: string, cacheTag?: string) {
  // strip any leading slash so we can append to our API route
  const clean = path.replace(/^\//, '')
  return `/api/media/${clean}${cacheTag ? `?cacheTag=${cacheTag}` : ''}`
}
