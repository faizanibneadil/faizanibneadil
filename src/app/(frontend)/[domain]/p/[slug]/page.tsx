import { BlocksRenderrer } from "@/blocks";
import { CollectionRenderer } from "@/collections";
import { getPayloadConfig } from "@/utilities/getPayloadConfig";
import { CollectionSlug } from "payload";
import { cache } from "react";
import { draftMode, headers as getHeaders } from 'next/headers'
import { RefreshRouteOnSave } from "@/components/RefreshRouteOnSave";

type Props = {
  params: Promise<{ slug: CollectionSlug, domain: string }>
}

export default async function Page({ params }: Props) {
  const { slug = 'home', domain } = (await params)
  const page = await queryPageBySlug({ slug, domain })
  if (!page || !domain) return null
  return (
    <>
      <RefreshRouteOnSave />
      <main className="flex flex-col min-h-[100dvh] space-y-10">
        {page?.mode === 'layout' && (
          <BlocksRenderrer blocks={page.layout} />
        )}
        {page?.mode === 'collection' && (
          <CollectionRenderer params={params as any} />
        )}
      </main>
    </>
  )
}


const queryPageBySlug = cache(async ({ slug, domain }: { slug: string, domain: string }) => {
  const headers = await getHeaders()
  const { isEnabled: isDraftMode } = await draftMode()
  const payload = await getPayloadConfig()
  const { user } = await payload.auth({ headers })
  const result = await payload.find({
    collection: 'pages',
    limit: 1,
    pagination: false,
    overrideAccess: isDraftMode,
    draft: isDraftMode,
    where: {
      and: [
        { slug: { equals: slug } },
        { 'tenant.slug': { equals: domain } }
      ],
    },
  })

  return result.docs?.[0] || null
})