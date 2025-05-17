// app/components/RichText/converters/index.tsx
import React from 'react'
import { DefaultNodeTypes, SerializedBlockNode } from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
} from '@payloadcms/richtext-lexical/react'

import { RichText } from '@/components/RichText'
import { internalDocToHref } from './internalLink'
import { headingConverter } from './headingConverter'

import BannerBlock from '@/components/BannerBlock'
import CodeBlock   from '@/components/CodeBlock'
// Note: We keep MediaBlock import if needed for fallback, but we now render <picture>
// import MediaBlock  from '@/components/MediaBlock'

// Define exact field shapes
type BannerFields = { headline?: string; backgroundImage?: string }
type CodeFields   = { language?: string; code?: string }
type MediaFields  = {
  url: string
  alt?: string
  width?: number
  height?: number
  sizes?: Record<string, { url: string }>
  caption?: any
}

// Union of your custom block props
type BlockProps =
  | { type: 'banner';     fields: BannerFields }
  | { type: 'code';       fields: CodeFields }
  | { type: 'mediaBlock'; fields: MediaFields }

// NodeTypes include core plus blocks
type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<BannerFields>
  | SerializedBlockNode<CodeFields>
  | SerializedBlockNode<MediaFields>

export const jsxConverter: JSXConvertersFunction<NodeTypes> =
  ({ defaultConverters }) => ({
    // Core text, lists, quotes, etc.
    ...defaultConverters,
    // Links
    ...LinkJSXConverter({ internalDocToHref }),
    // Headings
    ...headingConverter,
    // Blocks
    blocks: {
      ...defaultConverters.blocks,

      banner: ({ node, children }: any) => (
        <BannerBlock {...(node.fields as BannerFields)}>
          {children}
        </BannerBlock>
      ),

      code: ({ node }: any) => {
        const { code, language } = node.fields as CodeFields
        return <CodeBlock code={code} language={language} />
      },

      mediaBlock: ({ node, children }: any) => {
        // Custom picture rendering with captions
        const {
          url,
          alt,
          width,
          height,
          sizes,
          caption,
        } = node.fields as MediaFields
        const baseUrl = process.env.NEXT_PUBLIC_PAYLOAD_API_URL || ''
        return (
          <figure className="mb-8">
            <picture className="media-block">
              {/* Responsive sources */}
              {sizes?.thumbnail && (
                <source
                  srcSet={baseUrl + sizes.thumbnail.url}
                  media="(max-width: 640px)"
                />
              )}
              {sizes?.medium && (
                <source
                  srcSet={baseUrl + sizes.medium.url}
                  media="(min-width: 641px)"
                />
              )}
              {/* Fallback image */}
              <img
                src={baseUrl + url}
                alt={alt || ''}
                width={width}
                height={height}
                className="w-full rounded"
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
