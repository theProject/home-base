// components/MediaBlock.tsx
import React from 'react'

type MediaBlockProps = {
  src: string
  alt?: string
  width?: number
  height?: number
}

export default function MediaBlock({ src, alt, width, height }: MediaBlockProps) {
  return (
    <img
      className="media-block"
      src={src}
      alt={alt || ''}
      width={width}
      height={height}
    />
  )
}