import { Suspense } from "react";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import type { Page } from "@/payload-types";
import type { PageProps } from "@/types";
import type { CollectionSlug } from "payload";
import { BackButton } from "@/components/BackButton";
import { CollectionCount } from "@/components/collection-count";
import { Skeleton } from "@/components/ui/skeleton";
import { isCollection, isLayout } from "@/utilities/getPageMode";
import { queryPageBySlug } from "@/utilities/QueryPageBySlug";
import { queryTotalDocsBySlug } from "@/utilities/QueryTotalDocsBySlug";
import type { Metadata } from "next";
import { CollectionsRegistries } from "@/registries";
import { getProfileAvatarByDomain } from "@/utilities/getProfileAvatar";
import { getServerSideURL } from "@/utilities/getURL";

const BlocksRenderer = dynamic(() => import("@/blocks").then(({ BlocksRenderer }) => ({
  default: BlocksRenderer
})), { ssr: true })

const CollectionRenderer = dynamic(() => import("@/collections").then(({ CollectionRenderer }) => ({
  default: CollectionRenderer
})), { ssr: true })

// TODO: add root page laval metadata
export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const {
    params: paramsFromProps,
  } = props || {}

  const { domain, slug } = await paramsFromProps
  const page = await queryPageBySlug(slug!, domain!)
  const __mode = page?.content?.pageMode?.mode
  const slugFromConfig = page?.content.configurations?.slug as CollectionSlug


  if (__mode) {
    if (isCollection(__mode)) {
      if (Object.hasOwn(CollectionsRegistries, slugFromConfig)) {
        const metadata = CollectionsRegistries[slugFromConfig]?.metadata
        // @ts-expect-error
        return await metadata({ doc: { ...page } })
      }
    }
    if (isLayout(__mode)) {
      const avatarUrl = await getProfileAvatarByDomain(domain)

      return {
        title: page?.meta?.title,
        description: page?.meta?.description,
        metadataBase: new URL(getServerSideURL()),
        ...(avatarUrl && {
          icons: [{ url: avatarUrl, fetchPriority: 'high' }]
        }),
        ...(avatarUrl && {
          openGraph: {
            url: avatarUrl,
            type: 'profile',
            description: page?.meta?.description ?? '',
            images: [{ url: avatarUrl }]
          }
        })
      }
    }
  }

  return {}
}



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