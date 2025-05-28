import { BlocksRenderrer } from "@/blocks";
import { getPayloadConfig } from "@/utilities/getPayloadConfig";
import { cache } from "react";

type Props = {
  params: Promise<{ pageSlug: string }>
}

export default async function Page({ params }: Props) {
  const { pageSlug = 'home' } = (await params)
  const page = await queryPageBySlug({ slug: pageSlug })
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