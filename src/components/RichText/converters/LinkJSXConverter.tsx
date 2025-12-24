import { Suspense } from "react"
import { GlimpseLink } from "@/components/kibo-ui/glimpse"
import { glimpse } from "@/components/kibo-ui/glimpse/server"
import type { PagePropsWithParams } from "@/types"
import type { SerializedAutoLinkNode, SerializedLinkNode } from "@payloadcms/richtext-lexical"
import type { JSXConverters } from "@payloadcms/richtext-lexical/react"
import Link from "next/link"
import type { ClientConfig } from "payload"

const linkTypeMap = {
  custom: 0,
  internal: 1
}
const linkStyleMap = {
  GlimpseStyle: 0
}

export const linkNodeJSXConverter: (args: {
  internalDocToHref?: (args: { node: SerializedLinkNode }) => string,
  params?: Awaited<PagePropsWithParams['params']>,
  config?: ClientConfig
}) => JSXConverters<SerializedAutoLinkNode | SerializedLinkNode> = ({ internalDocToHref }) => ({
  autolink: ({ node, nodesToJSX }) => {
    const {
      fields: { linkType, url, linkStyle },
      children: nodes
    } = node as typeof node & { fields: { linkStyle: keyof typeof linkStyleMap } }

    const children = nodesToJSX({ nodes })

    const rel: string | undefined = node.fields.newTab ? 'noopener noreferrer' : undefined
    const target: string | undefined = node.fields.newTab ? '_blank' : undefined

    if (linkTypeMap[linkType] === 0 && linkStyleMap[linkStyle] === 0) {
      const getLinkInfo = glimpse(url as string)
      return (
        <Suspense fallback={null}>
          <GlimpseLink fields={node.fields} getLinkInfo={getLinkInfo} label={children} />
        </Suspense>
      )
    }

    return (
      <Link className="font-medium text-primary underline !text-blue-500" href={node.fields.url ?? ''} {...{ rel, target }}>
        {children}
      </Link>
    )

  },
  link: ({ node, nodesToJSX }) => {
    const {
      fields: { linkType, url, linkStyle },
      children: nodes
    } = node as typeof node & { fields: { linkStyle: keyof typeof linkStyleMap } }

    const children = nodesToJSX({ nodes })

    const rel: string | undefined = node.fields.newTab ? 'noopener noreferrer' : undefined
    const target: string | undefined = node.fields.newTab ? '_blank' : undefined

    let href: string = node.fields.url ?? ''
    if (linkTypeMap[linkType] === 1) {
      if (internalDocToHref) {
        href = internalDocToHref({ node })
      } else {
        console.error(
          'Lexical => JSX converter: Link converter: found internal link, but internalDocToHref is not provided',
        )
        href = '' // fallback
      }
    }

    if (linkTypeMap[linkType] === 0 && linkStyleMap[linkStyle] === 0) {
      const getLinkInfo = glimpse(url as string)
      return (
        <Suspense fallback={null}>
          <GlimpseLink fields={node.fields} getLinkInfo={getLinkInfo} label={children} />
        </Suspense>
      )
    }
    return (
      <Link className="font-medium text-primary underline !text-blue-500" href={href} {...{ rel, target }}>
        {children}
      </Link>
    )
  },
})