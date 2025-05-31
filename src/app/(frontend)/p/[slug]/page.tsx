import { BlocksRenderrer } from "@/blocks";
import { getPayloadConfig } from "@/utilities/getPayloadConfig";
import { CollectionSlug } from "payload";
import { cache } from "react";

type Props = {
  params: Promise<{ slug: CollectionSlug }>
}

export default async function Page({ params }: Props) {
  const { slug = 'home' } = (await params)
  const page = await queryPageBySlug({ slug })
  if (!page) return null
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <BlocksRenderrer blocks={page.layout} />
    </main>
  )
}


const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {

  const payload = await getPayloadConfig()

  const result = await payload.find({
    collection: 'pages',
    limit: 1,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})