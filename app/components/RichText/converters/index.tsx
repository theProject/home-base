// app/components/RichText/converters/index.tsx
'use client'

import React from 'react'
import { DefaultNodeTypes, SerializedBlockNode } from '@payloadcms/richtext-lexical'
import { JSXConvertersFunction, LinkJSXConverter } from '@payloadcms/richtext-lexical/react'

import { RichText } from '@/components/RichText'
import { internalDocToHref } from './internalLink'
import { headingConverter } from './headingConverter'

import BannerBlock from '@/components/BannerBlock'
import CodeBlock from '@/components/CodeBlock'
import MediaBlock from '@/components/MediaBlock'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

// Local substitute for Payload's JsonObject constraint
type JsonObject = Record<string, unknown>

// Define exact field shapes for each custom block
export interface BannerFields extends JsonObject {
  headline?: string
  backgroundImage?: string
}
export interface CodeFields extends JsonObject {
  language?: string
  code?: string
}
export interface MediaFields extends JsonObject {
  id: number
  url: string
  alt?: string
  width?: number
  height?: number
  sizes?: Record<string, { url: string }>
  // Serialized Lexical editor state for captions
  caption?: DefaultTypedEditorState
  updatedAt?: string
}

// Block node type
type BlockNode<T extends JsonObject> = SerializedBlockNode<T>
type NodeTypes =
  | DefaultNodeTypes
  | BlockNode<BannerFields>
  | BlockNode<CodeFields>
  | BlockNode<MediaFields>

// Map Payload block types to React components
export const jsxConverter: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  // Include all default serializers (paragraph, list, etc.)
  ...defaultConverters,
  // Support internal document links in Payload
  ...LinkJSXConverter({ internalDocToHref }),
  // Custom heading conversions
  ...headingConverter,
  // Override block rendering
  blocks: {
    ...defaultConverters.blocks,

    banner: ({ node, children }: any) => (
      <BannerBlock {...(node.fields as BannerFields)}>{children}</BannerBlock>
    ),

    code: ({ node }: any) => {
      const { code, language } = node.fields as CodeFields
      return <CodeBlock code={code} language={language} />
    },

    mediaBlock: ({ node }: any) => {
      const media = (node.fields as any).media as MediaFields
      const { url, alt, width, height, sizes, caption, updatedAt } = media

      return (
        <figure className="mb-8">
          <picture className="media-block">
            {sizes?.thumbnail?.url && (
              <source
                srcSet={getMediaUrl(sizes.thumbnail.url, updatedAt)}
                media="(max-width: 640px)"
              />
            )}
            {sizes?.medium?.url && (
              <source
                srcSet={getMediaUrl(sizes.medium.url, updatedAt)}
                media="(min-width: 641px)"
              />
            )}
            <MediaBlock
              src={url}
              cacheTag={updatedAt || ''}
              width={width}
              height={height}
              alt={alt || ''}
            />
          </picture>
          {caption && (
            <figcaption className="text-sm text-gray-500 mt-2">
              <RichText data={caption} className="prose text-sm" />
            </figcaption>
          )}
        </figure>
      )
    },
  },
})
