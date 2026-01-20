import { cache } from "react";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import type { Page } from "@/payload-types";
import type { PagePropsWithParams } from "@/types";
import { getPayloadConfig } from "@/utilities/getPayloadConfig";
import type { CollectionSlug } from "payload";

const BlocksRenderer = dynamic(() => import("@/blocks").then(({ BlocksRenderer }) => ({
  default: BlocksRenderer
})), { ssr: true })

const CollectionRenderer = dynamic(() => import("@/collections").then(({ CollectionRenderer }) => ({
  default: CollectionRenderer
})), { ssr: true })

const isLayout = (mode: Page['content']['pageMode']['mode']) => mode === 'layout'
const isCollection = (mode: Page['content']['pageMode']['mode']) => mode === 'collection'

export default async function Page({ params }: PagePropsWithParams) {
  const { slug, domain } = await params
  const page = await queryPageBySlug({ slug: slug as CollectionSlug, domain })

  if (!page || !domain) {
    return notFound()
  }

  return (
    <main className="flex flex-col min-h-[100dvh]">
      {isLayout(page?.content?.pageMode?.mode) && (
        <BlocksRenderer blocks={page?.content.layout} params={params} />
      )}
      {isCollection(page?.content?.pageMode?.mode) && (
        <CollectionRenderer params={params} configurations={page?.content?.configurations} />
      )}
    </main>
  )
}


const queryPageBySlug = cache(async ({ slug, domain }: Awaited<PagePropsWithParams['params']>) => {
  const payload = await getPayloadConfig()
  const pages = await payload.find({
    collection: 'pages',
    limit: 1,
    pagination: false,
    where: {
      and: [
        {
          slug: {
            equals: slug
          }
        },
        {
          'tenant.slug': {
            equals: domain
          }
        }
      ],
    },
  })

  return pages.docs?.at(0) || null
})