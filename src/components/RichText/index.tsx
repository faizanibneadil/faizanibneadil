import dynamic from 'next/dynamic'
import { cn } from '@/lib/utils'
import type { TCodeBlockProps, TFormBlockProps } from '@/payload-types'
import type { PageProps } from '@/types'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'
import { linkNodeJSXConverter } from './converters/LinkJSXConverter'
import { paragraphNodeJSXConverter } from './converters/ParagraphJSXConverter'
import { internalDocToHref } from '@/utilities/internalDocToHref'

const FormBlock = dynamic(() => import('@/themes/Magic/blocks/Form/form-block').then(({ FormBlock }) => FormBlock))
const CodeBlock = dynamic(() => import('@/themes/Magic/blocks/Code/CodeBlock').then(({ CodeBlock }) => CodeBlock))

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<TFormBlockProps | TCodeBlockProps>

const jsxConverters: (args: {
  params: Awaited<PageProps['params']>,
  searchParams: Awaited<PageProps['searchParams']>
  blocks?: ReturnType<JSXConvertersFunction<NodeTypes>>['blocks']
  inlineBlocks?: ReturnType<JSXConvertersFunction<NodeTypes>>['inlineBlocks']
}) => JSXConvertersFunction<NodeTypes> = ({ params, searchParams, blocks, inlineBlocks }) => {
  return ({ defaultConverters }) => ({
    ...defaultConverters,
    ...linkNodeJSXConverter({ params, internalDocToHref }),
    ...paragraphNodeJSXConverter(),
    ...(Boolean(Object.keys(blocks || {}).length) && { blocks: { ...blocks } }),
    ...(Boolean(Object.keys(inlineBlocks || {}).length) && { inlineBlocks: { ...inlineBlocks } }),
  })
}

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
  blocks?: ReturnType<JSXConvertersFunction<NodeTypes>>['blocks']
  inlineBlocks?: ReturnType<JSXConvertersFunction<NodeTypes>>['inlineBlocks']
} & React.HTMLAttributes<HTMLDivElement> & { params: Awaited<PageProps['params']> } & { searchParams: Awaited<PageProps['searchParams']> }

export default function RichText(props: Props) {
  const {
    className,
    enableProse = true,
    enableGutter = true,
    params,
    searchParams,
    blocks,
    inlineBlocks,
    ...rest
  } = props
  
  return (
    <ConvertRichText
      converters={jsxConverters({ params, searchParams, blocks, inlineBlocks })}
      className={cn('payload-richtext w-full mb-5', {
        container: enableGutter,
        'max-w-none': !enableGutter,
        'mx-auto prose md:prose-md dark:prose-invert': enableProse,
      },
        className,
      )}
      disableContainer={true}
      {...rest}
    />
  )
}