import { BlocksRenderrer } from "@/blocks";
import { getPayloadConfig } from "@/utilities/getPayloadConfig";
import { cache } from "react";

type Props = {
  params: Promise<{ page: string }>
}

export default async function Page({ params }: Props) {
  const { page: pageId = 36 } = (await params)
  console.log({ pageId })
  const page = await queryPageById({ id: pageId })
  if (!page) return null
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <BlocksRenderrer blocks={page.layout} />
    </main>
  )
}


const queryPageById = cache(async ({ id }: { id: string | number }) => {

  const payload = await getPayloadConfig()

  const result = await payload.find({
    collection: 'pages',
    limit: 1,
    pagination: false,
    where: {
      id: {
        equals: id,
      },
    },
  })

  return result.docs?.[0] || null
})