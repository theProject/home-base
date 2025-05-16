// app/components/RichText/converters/index.tsx
import React from 'react'
import { DefaultNodeTypes, SerializedBlockNode } from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
} from '@payloadcms/richtext-lexical/react'

import { internalDocToHref } from './internalLink'
import { headingConverter } from './headingConverter'

// These should point at the components you created under /components
import BannerBlock from '@/components/BannerBlock'
import CodeBlock   from '@/components/CodeBlock'
import MediaBlock  from '@/components/MediaBlock'

// Define the exact field shapes for each block type:
type BannerFields = { headline?: string; backgroundImage?: string }
type CodeFields   = { language?: string; code?: string }
type MediaFields  = { src: string; alt?: string; width?: number; height?: number }

// Union of your custom block props
type BlockProps =
  | { type: 'banner';     fields: BannerFields }
  | { type: 'code';       fields: CodeFields }
  | { type: 'mediaBlock'; fields: MediaFields }

// NodeTypes include all core nodes plus your blocks
type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<BannerFields>
  | SerializedBlockNode<CodeFields>
  | SerializedBlockNode<MediaFields>

export const jsxConverter: JSXConvertersFunction<NodeTypes> =
  ({ defaultConverters }) => ({
    // 1. All built-in converters
    ...defaultConverters,
    // 2. Internal links support
    ...LinkJSXConverter({ internalDocToHref }),
    // 3. Heading tweaks
    ...headingConverter,
    // 4. Override your custom block renderers
    blocks: {
      ...defaultConverters.blocks,

      banner: ({ node, nodesToJSX }: any) => {
        const { headline, backgroundImage } = node.fields as BannerFields
        const children = nodesToJSX({ nodes: node.children })
        return (
          <BannerBlock headline={headline} backgroundImage={backgroundImage}>
            {children}
          </BannerBlock>
        )
      },

      code: ({ node }: any) => {
        const { code, language } = node.fields as CodeFields
        return <CodeBlock code={code} language={language} />
      },

      mediaBlock: ({ node }: any) => {
        const { src, alt, width, height } = node.fields as MediaFields
        return <MediaBlock src={src} alt={alt} width={width} height={height} />
      },
    },
  })