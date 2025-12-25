// import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { FormBlock } from '@/blocks/Form/components/form-block'
import { cn } from '@/lib/utils'
import type { TFormBlockProps } from '@/payload-types'
import type { PagePropsWithParams } from '@/types'
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
import { paragraphNodeJSCConverter } from './converters/ParagraphJSXConverter'
import { internalDocToHref } from '@/utilities/internalDocToHref'

// import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'

// import type {
//   BannerBlock as BannerBlockProps,
//   CallToActionBlock as CTABlockProps,
//   MediaBlock as MediaBlockProps,
// } from '@/payload-types'
// import { BannerBlock } from '@/blocks/Banner/Component'
// import { CallToActionBlock } from '@/blocks/CallToAction/Component'
// import { cn } from '@/lib/ui'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<TFormBlockProps>

const jsxConverters: (args: {
  params: Awaited<PagePropsWithParams['params']>
}) => JSXConvertersFunction<NodeTypes> = ({ params }) => {
  return ({ defaultConverters }) => ({
    ...defaultConverters,
    ...linkNodeJSXConverter({ params, internalDocToHref }),
    ...paragraphNodeJSCConverter(),
    blocks: {
      formBlock: ({ node }) => <FormBlock blockProps={node.fields} params={Promise.resolve({ ...params })} />,
      // banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
      // mediaBlock: ({ node }) => (
      //   <MediaBlock
      //     className="col-start-1 col-span-3"
      //     imgClassName="m-0"
      //     {...node.fields}
      //     captionClassName="mx-auto max-w-[48rem]"
      //     enableGutter={false}
      //     disableInnerContainer={true}
      //   />
      // ),
      // code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
      // cta: ({ node }) => <CallToActionBlock {...node.fields} />,
    },
  })
}

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement> & { params: Awaited<PagePropsWithParams['params']> }

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, params, ...rest } = props
  return (
    <ConvertRichText
      converters={jsxConverters({ params })}
      className={cn(
        'payload-richtext w-full mb-5',
        {
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