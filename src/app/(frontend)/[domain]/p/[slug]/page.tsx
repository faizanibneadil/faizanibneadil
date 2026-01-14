// import { RefreshRouteOnSave } from "@/components/RefreshRouteOnSave";
import type { Page } from "@/payload-types";
import { PagePropsWithParams } from "@/types";
import { getPayloadConfig } from "@/utilities/getPayloadConfig";
import dynamic from "next/dynamic";
// import { headers as getHeaders } from 'next/headers';
import { notFound } from "next/navigation";
import { CollectionSlug } from "payload";
import { cache } from "react";
const BlocksRenderer = dynamic(() => import("@/blocks").then(({ BlocksRenderer }) => {
  return BlocksRenderer
}), { ssr: true })
const CollectionRenderer = dynamic(() => import("@/collections").then(({ CollectionRenderer }) => {
  return CollectionRenderer
}), { ssr: true })

const isLayout = (mode: Page['content']['pageMode']['mode']) => mode === 'layout'
const isCollection = (mode: Page['content']['pageMode']['mode']) => mode === 'collection'

export default async function Page({ params }: PagePropsWithParams) {
  const { slug = 'home', domain } = await params
  const page = await queryPageBySlug({ slug: slug as CollectionSlug, domain })
  if (!page || !domain) return notFound()
  return (
    <main className="flex flex-col min-h-[100dvh]">
      {/* <RefreshRouteOnSave /> */}
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
  // const { isEnabled: isDraftMode } = await draftMode()
  // const headers = await getHeaders()
  const payload = await getPayloadConfig()
  // const user = await payload.auth({ headers })
  const result = await payload.find({
    collection: 'pages',
    limit: 1,
    pagination: false,
    where: {
      and: [
        { slug: { equals: slug } },
        { 'tenant.slug': { equals: domain } }
      ],
    },
  })

  return result.docs?.[0] || null
})