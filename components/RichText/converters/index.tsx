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
import { getMediaUrl } from "@/lib/getMediaUrl";
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

// Local substitute for Payload's JsonObject constraint
type JsonObject = Record<string, unknown>

// Define exact field shapes for each custom block
export interface BannerFields extends JsonObject {
  /** Toast variant: 'success' | 'error' */
  variant?: 'success' | 'error'
  /** RichText content for banner */
  content?: DefaultTypedEditorState
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
  caption?: DefaultTypedEditorState
  updatedAt?: string
}

// Block node type helper
type BlockNode<T extends JsonObject> = SerializedBlockNode<T>

// Combined NodeTypes for converter
type NodeTypes =
  | DefaultNodeTypes
  | BlockNode<BannerFields>
  | BlockNode<CodeFields>
  | BlockNode<MediaFields>

// JSX converter mapping block types to React components
export const jsxConverter: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  // Core converters (paragraph, list, etc.)
  ...defaultConverters,
  // Link converter for internal docs
  ...LinkJSXConverter({ internalDocToHref }),
  // Custom heading overrides
  ...headingConverter,
  // Custom block renderers
  blocks: {
    ...defaultConverters.blocks,

    // Banner (toast) block
    banner: ({ node }: any) => {
      const { variant, content } = node.fields as BannerFields
      const bgClass =
        variant === 'error' ? 'bg-red-600' :
        variant === 'success' ? 'bg-green-600' :
        'bg-pink-400'
      const textClass = 'text-white'

      return (
        <div className={`${bgClass} ${textClass} w-full p-4`}>
          <BannerBlock>
            {content && (
              <RichText
                data={content}
                className="prose text-center text-lg text-white"
              />
            )}
          </BannerBlock>
        </div>
      )
    },

    // Code block
    code: ({ node }: any) => {
      const { code, language } = node.fields as CodeFields
      return <CodeBlock code={code} language={language} />
    },

    // Media block (images)
    mediaBlock: ({ node }: any) => {
      const media = (node.fields as any).media as MediaFields
      const { url, alt, width, height, sizes, caption, updatedAt } = media
      return (
        <figure className="mb-8 text-center">
          <picture className="media-block mx-auto block">
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
