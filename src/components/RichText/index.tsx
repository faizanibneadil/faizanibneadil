// import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { FormBlock } from '@/blocks/Form/components/form-block'
import { cn } from '@/lib/utils'
import type { TFormBlockProps } from '@/payload-types'
import type { PagePropsWithParams } from '@/types'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'
import { linkNodeJSXConverter } from './converters/LinkJSXConverter'
import { generateRoute } from '@/utilities/generateRoute'
import type { CollectionSlug } from 'payload'
import { SerializedLexicalNode } from '@payloadcms/richtext-lexical/lexical'

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

const internalDocToHref = ({ node }: { node: SerializedLinkNode }) => {
  const { value: doc, relationTo } = node.fields.doc!
  if (typeof doc !== 'object') {
    throw new Error('Expected value to be an object')
  }

  const route = generateRoute({
    domain: (doc?.tenant as { domain: string })?.domain as string,
    slug: relationTo as CollectionSlug,
    docSlug: doc?.slug as string,
    id: doc?.id
  })

  const routeMap: { [K in CollectionSlug]?: string } = {
    pages: route.PageRoute,
    blogs: route.RouteWithDocSlug
  }

  const redirectTo = routeMap[relationTo as CollectionSlug]

  return redirectTo ?? '#'

}

function hasGlimpseLink(nodes: any[]): boolean {
  return nodes.some((node) => {
    if (node.type === 'link' && node.fields?.linkStyle === 'GlimpseStyle') {
      return true;
    }
    if (node.children && Array.isArray(node.children) && node.children?.length) {
      return hasGlimpseLink(node.children);
    }
    return false;
  });
};

const jsxConverters: (args: {
  params: Awaited<PagePropsWithParams['params']>
}) => JSXConvertersFunction<NodeTypes> = ({ params }) => {
  return ({ defaultConverters }) => ({
    ...defaultConverters,
    ...linkNodeJSXConverter({ params, internalDocToHref }),
    paragraph: ({ node, nodesToJSX }) => {
      const children = nodesToJSX({ nodes: node.children })

      if (!children?.length) {
        return <br />
      }

      if (hasGlimpseLink(node.children)) {
        return <div role='paragraph'>{children}</div>
      }

      if (node.children.at(0)?.type === 'text') {
        return <p>{children}</p>
      }

      return <div>{children}</div>
    },
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