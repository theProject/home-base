// src/components/RichText/converters/internalLink.tsx
import type { SerializedLinkNode } from '@payloadcms/richtext-lexical'

export const internalDocToHref = ({
  linkNode,
}: {
  linkNode: SerializedLinkNode
}): string => {
  // We know `fields.doc` is present when it’s an internal link
  const docField = linkNode.fields.doc!
  const { value: rawValue, relationTo } = docField

  // rawValue can be a string (the slug) or an object with a slug property.
  // We cast to `any` for the object‐case so TS will let us do `.slug`.
  const slug =
    typeof rawValue === 'string'
      ? rawValue
      : (rawValue as any).slug ?? String(rawValue)

  if (relationTo === 'posts') return `/blog/${slug}`
  if (relationTo === 'users') return `/users/${slug}`
  return `/${slug}`
}