import { BlocksRenderrer } from "@/blocks";
import { CollectionRenderer } from "@/collections";
import { getPayloadConfig } from "@/utilities/getPayloadConfig";
import { CollectionSlug } from "payload";
import { cache } from "react";

type Props = {
  params: Promise<{ slug: CollectionSlug, domain: string }>
}

export default async function Page({ params }: Props) {
  const { slug = 'home', domain } = (await params)
  const page = await queryPageBySlug({ slug, domain })
  if (!page || !domain) return null
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      {page?.mode === 'layout' && (
        <BlocksRenderrer blocks={page.layout} />
      )}
      {page?.mode === 'collection' && (
        <CollectionRenderer params={params as any} />
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