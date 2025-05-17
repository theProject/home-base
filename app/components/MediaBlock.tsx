// components/MediaBlock.tsx
'use client'
import React from 'react'
import { getMediaUrl } from '../utilities/getMediaUrl'

type MediaBlockProps = {
  src: string
  alt?: string
  width?: number
  height?: number
  cacheTag?: string
}

export default function MediaBlock({ src, alt = '', width, height, cacheTag }: MediaBlockProps) {
  const imageUrl = getMediaUrl(src, cacheTag)
  return (
    <img
      className="media-block"
      src={imageUrl}
      alt={alt}
      width={width}
      height={height}
    />
  )
}
