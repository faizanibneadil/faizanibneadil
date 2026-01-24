import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary";
import { GlimpseLink } from "@/components/kibo-ui/glimpse"
import { glimpse } from "@/components/kibo-ui/glimpse/server"
import type { PageProps } from "@/types"
import type { SerializedAutoLinkNode, SerializedLinkNode } from "@payloadcms/richtext-lexical"
import type { JSXConverters } from "@payloadcms/richtext-lexical/react"
import type { ClientConfig } from "payload"
import { getClientSideURL } from "@/utilities/getURL"

type TLinkStyle = 'GlimpseStyle' | 'normal'

export const linkNodeJSXConverter: (args: {
  internalDocToHref?: (args: { node: SerializedLinkNode }) => string,
  params?: Awaited<PageProps['params']>,
  config?: ClientConfig
}) => JSXConverters<SerializedAutoLinkNode | SerializedLinkNode> = ({ internalDocToHref }) => ({
  autolink: ({ node, nodesToJSX }) => {
    const {
      fields: { url, linkStyle },
      children: nodes
    } = node as typeof node & { fields: { linkStyle: TLinkStyle } }

    const children = nodesToJSX({ nodes })

    const rel: string | undefined = node.fields.newTab ? 'noopener noreferrer' : undefined
    const target: string | undefined = node.fields.newTab ? '_blank' : undefined
    const FallbackLink = () => (
      <a
        className="font-medium text-primary underline !text-blue-500"
        target={target}
        rel={rel}
        href={node?.fields?.url}
      >
        {children}
      </a>
    )

    if (linkStyle === 'GlimpseStyle') {
      const getLinkInfo = glimpse(url!)
      return (
        <ErrorBoundary fallback={<FallbackLink />}>
          <Suspense fallback={<FallbackLink />}>
            <GlimpseLink fields={node.fields} getLinkInfo={getLinkInfo} label={children} rel={rel} target={target} />
          </Suspense>
        </ErrorBoundary>
      )
    }

    return (
      <a className="font-medium text-primary underline !text-blue-500" href={node.fields.url} {...{ rel, target }}>
        {children}
      </a>
    )
  },
  link: ({ node, nodesToJSX }) => {
    const {
      fields: { linkType, url, linkStyle },
      children: nodes
    } = node as typeof node & { fields: { linkStyle: TLinkStyle } }

    const children = nodesToJSX({ nodes })

    const rel: string | undefined = node.fields.newTab ? 'noopener noreferrer' : undefined
    const target: string | undefined = node.fields.newTab ? '_blank' : undefined
    let href: string = url ?? ''

    const FallbackLink = () => (
      <a
        className="font-medium text-primary underline !text-blue-500"
        target={target}
        rel={rel}
        href={href}
      >
        {children}
      </a>
    )

    if (linkType === 'internal') {
      if (internalDocToHref) {
        href = internalDocToHref({ node })
      } else {
        console.error('Lexical => JSX converter: Link converter: found internal link, but internalDocToHref is not provided',)
        href = '' // fallback
      }
    }

    if (linkStyle === 'GlimpseStyle') {
      const getLinkInfo = glimpse(new URL(href!, getClientSideURL()).toString())
      return (
        <ErrorBoundary fallback={<FallbackLink />}>
          <Suspense fallback={<FallbackLink />}>
            <GlimpseLink fields={{ ...node.fields, url: href }} getLinkInfo={getLinkInfo} label={children} rel={rel} target={target} />
          </Suspense>
        </ErrorBoundary>
      )
    }
    return (
      <a className="font-medium text-primary underline !text-blue-500" href={href} {...{ rel, target }}>
        {children}
      </a>
    )
  },
})