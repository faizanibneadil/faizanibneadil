import dynamic from "next/dynamic";
const BlocksRenderer = dynamic(() => import("@/blocks").then(({ BlocksRenderer }) => {
  return BlocksRenderer
}), { ssr: true })
const CollectionRenderer = dynamic(() => import("@/collections").then(({ CollectionRenderer }) => {
  return CollectionRenderer
}), { ssr: true })
import { getPayloadConfig } from "@/utilities/getPayloadConfig";
import { CollectionSlug } from "payload";
import { cache } from "react";
import type { Page } from "@/payload-types";

type Props = {
  params: Promise<{ slug: CollectionSlug, domain: string }>
}

const isLayout = (mode: Page['pageMode']['mode']) => mode === 'layout'
const isCollection = (mode: Page['pageMode']['mode']) => mode === 'collection'

export default async function Page({ params }: Props) {
  const { slug = 'home', domain } = (await params)
  const page = await queryPageBySlug({ slug, domain })
  if (!page || !domain) return null
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      {isLayout(page?.pageMode?.mode) && (
        <BlocksRenderer blocks={page.layout} />
      )}
      {isCollection(page?.pageMode?.mode) && (
        <CollectionRenderer params={params as any} configurations={page?.configurations} />
      )}
    </main>
  )
}


const queryPageBySlug = cache(async ({ slug, domain }: { slug: string, domain: string }) => {

  const payload = await getPayloadConfig()

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