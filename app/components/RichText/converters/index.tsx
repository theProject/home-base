// app/components/RichText/converters/index.tsx
import React from 'react'
import { DefaultNodeTypes, SerializedBlockNode } from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
} from '@payloadcms/richtext-lexical/react'

import { internalDocToHref } from './internalLink'
import { headingConverter } from './headingConverter'

import BannerBlock from '@/components/BannerBlock'
import CodeBlock   from '@/components/CodeBlock'
import MediaBlock  from '@/components/MediaBlock'

// Exact field shapes:
type BannerFields = { headline?: string; backgroundImage?: string }
type CodeFields   = { language?: string; code?: string }
type MediaFields  = { src: string; alt?: string; width?: number; height?: number }

// Union of your custom block props
type BlockProps =
  | { type: 'banner';     fields: BannerFields }
  | { type: 'code';       fields: CodeFields }
  | { type: 'mediaBlock'; fields: MediaFields }

// Our node types include the defaults plus our blocks:
type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<BannerFields>
  | SerializedBlockNode<CodeFields>
  | SerializedBlockNode<MediaFields>

export const jsxConverter: JSXConvertersFunction<NodeTypes> =
  ({ defaultConverters }) => ({
    // 1. Core text nodes, lists, quotes, etc.
    ...defaultConverters,

    // 2. Internal & external links
    ...LinkJSXConverter({ internalDocToHref }),

    // 3. Heading anchor tweaks
    ...headingConverter,

    // 4. Our custom blocks
    blocks: {
      ...defaultConverters.blocks,

      // Banner: render with its children already converted
      banner: ({ node, children }: any) => (
        <BannerBlock {...(node.fields as BannerFields)}>
          {children}
        </BannerBlock>
      ),

      // Code block: render only with code & language fields
      code: ({ node }: any) => {
        const { code, language } = node.fields as CodeFields
        return <CodeBlock code={code} language={language} />
      },

      // Media: just render the image
      mediaBlock: ({ node }: any) => {
        const { src, alt, width, height } = node.fields as MediaFields
        return <MediaBlock src={src} alt={alt} width={width} height={height} />
      },
    },
  })
