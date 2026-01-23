import { Suspense, cache } from "react";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import type { Page } from "@/payload-types";
import type { PageProps } from "@/types";
import { getPayloadConfig } from "@/utilities/getPayloadConfig";
import type { CollectionSlug } from "payload";
import { BackButton } from "@/components/BackButton";
import { CollectionCount } from "@/components/collection-count";
import { Skeleton } from "@/components/ui/skeleton";

const BlocksRenderer = dynamic(() => import("@/blocks").then(({ BlocksRenderer }) => ({
  default: BlocksRenderer
})), { ssr: true })

const CollectionRenderer = dynamic(() => import("@/collections").then(({ CollectionRenderer }) => ({
  default: CollectionRenderer
})), { ssr: true })

const isLayout = (mode: Page['content']['pageMode']['mode']) => mode === 'layout'
const isCollection = (mode: Page['content']['pageMode']['mode']) => mode === 'collection'

export default async function Page(props: PageProps) {
  const {
    params: paramsFromProps,
    searchParams: searchParamsFromProps
  } = props || {}
  const { slug, domain } = await paramsFromProps

  const page = await queryPageBySlug(slug!, domain!)

  const slugFromConfig = page?.content.configurations?.slug as CollectionSlug
  let getTotalDocsQuery: ReturnType<typeof queryTotalDocsBySlug> = Promise.resolve({ totalDocs: 0 })
  if (page && isCollection(page?.content?.pageMode?.mode) && slugFromConfig) {
    getTotalDocsQuery = queryTotalDocsBySlug(slugFromConfig, domain!)
  }

  if (!page || !domain) {
    return notFound()
  }

  return (
    <main className="flex flex-col min-h-[100dvh]">
      {isLayout(page?.content?.pageMode?.mode) && (
        <BlocksRenderer blocks={page?.content.layout} params={paramsFromProps} searchParams={searchParamsFromProps} />
      )}
      {isCollection(page?.content?.pageMode?.mode) && (
        <div className="flex flex-col gap-4">
          {!page.isRootPage && (
            <div className="flex gap-4 items-center">
              <BackButton />
              <div className="flex flex-col items-start gap-">
                <p className="uppercase font-semibold">{page?.content.configurations?.slug}</p>
                <Suspense fallback={<Skeleton className="h-4 w-9" />}>
                  <CollectionCount collectionSlug={slugFromConfig} getTotalDocs={getTotalDocsQuery} />
                </Suspense>
              </div>
            </div>
          )}
          <CollectionRenderer searchParams={searchParamsFromProps} params={paramsFromProps} page={page} />
        </div>
      )}
    </main>
  )
}

const queryTotalDocsBySlug = cache(async (slug: CollectionSlug, domain: string) => {
  const isNumericDomain = !Number.isNaN(Number(domain))
  const payload = await getPayloadConfig()
  const records = await payload.count({
    collection: slug,
    where: {
      or: [
        ...(isNumericDomain
          ? [{
            'tenant.id': {
              equals: Number(domain),
            },
          }]
          : []),
        {
          'tenant.slug': {
            equals: domain
          }
        }
      ]
    },
  })

  return records
})

const queryPageBySlug = cache(async (slug: string, domain: string) => {
  const isNumericDomain = !Number.isNaN(Number(domain))
  const payload = await getPayloadConfig()
  const pages = await payload.find({
    collection: 'pages',
    limit: 1,
    pagination: false,
    where: {
      and: [
        {
          or: [
            ...(isNumericDomain
              ? [{
                'tenant.id': {
                  equals: Number(domain),
                },
              }]
              : []),
            {
              'tenant.slug': {
                equals: domain
              }
            },
          ]
        },
        {
          slug: {
            equals: slug
          }
        },
      ],
    },
  })

  return pages.docs?.at(0) || null
})