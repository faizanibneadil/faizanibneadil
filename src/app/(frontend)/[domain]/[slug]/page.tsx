import type { Page } from "@/payload-types";
import type { PageProps } from "@/types";
import type { CollectionSlug } from "payload";
import { queryPageBySlug } from "@/utilities/QueryPageBySlug";
import type { Metadata } from "next";
import { queryThemeByDomain } from "@/utilities/QueryThemeByDomain";
import { themesRegistry } from "@/themes";
import { getMediaUrl } from "@/utilities/getURL";

// TODO: add root page laval metadata
export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const {
    params: paramsFromProps,
    // searchParams:searchPramsFromProps
  } = props || {}

  const { domain, slug } = await paramsFromProps
  // const searchParams = await searchPramsFromProps
  const page = await queryPageBySlug(slug!, domain!)

  const excludedCollectionSlug = slug?.split('-').at(0) as CollectionSlug
  const slugFromConfig = excludedCollectionSlug ?? page?.content?.configuredCollectionSlug as CollectionSlug

  const themeId = await queryThemeByDomain(domain!)
  if (Object.hasOwn(themesRegistry, themeId)) {
    const collectionMap = themesRegistry[themeId]?.config?.collectionConfig.collectionsMap

    if (Object.hasOwn(collectionMap, slugFromConfig)) {
      const metadata = collectionMap[slugFromConfig]?.metadata
      if (typeof metadata === 'function') {
        // @ts-expect-error
        return await metadata({ doc: { ...page } })
      }

      return metadata ?? {}
    }

    return {
      title: page?.meta?.title ?? page?.title ?? 'No Title',
      description: page?.meta?.description ?? 'No Description',
      ...(page?.meta?.image && {
        icons: [{ url: getMediaUrl(page?.meta?.image), fetchPriority: 'high' }]
      }),
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
  const themeId = await queryThemeByDomain(domain!)

  if (Object.hasOwn(themesRegistry, themeId)) {
    const blocksMap = themesRegistry[themeId]?.config?.blocksConfig.blocksMap
    const collectionMap = themesRegistry[themeId]?.config?.collectionConfig.collectionsMap
    const PageToRender = themesRegistry[themeId]?.config?.PageRenderer


    return <PageToRender pageProps={props} config={{
      blocksMap,
      collectionMap,
      enableCollection: page?.enableCollection!,
      page,
      themeId
    }} />
  }

  // const slugFromConfig = page?.content.configurations?.slug as CollectionSlug
  // let getTotalDocsQuery: ReturnType<typeof queryTotalDocsBySlug> = Promise.resolve({ totalDocs: 0 })
  // if (page && isCollection(page?.content?.pageMode?.mode) && slugFromConfig) {
  //   getTotalDocsQuery = queryTotalDocsBySlug(slugFromConfig, domain!)
  // }

  // if (!page || !domain) {
  //   return notFound()
  // }

  // return (
  //   <main className="flex flex-col min-h-[100dvh]">
  //     {isLayout(page?.content?.pageMode?.mode) && (
  //       <BlocksRenderer blocks={page?.content.layout} params={paramsFromProps} searchParams={searchParamsFromProps} />
  //     )}
  //     {isCollection(page?.content?.pageMode?.mode) && (
  //       <div className="flex flex-col gap-4">
  //         {!page.isRootPage && (
  //           <div className="flex gap-4 items-center">
  //             <BackButton />
  //             <div className="flex flex-col items-start gap-">
  //               <p className="uppercase font-semibold">{page?.content.configurations?.slug}</p>
  //               <Suspense fallback={<Skeleton className="h-4 w-9" />}>
  //                 <CollectionCount collectionSlug={slugFromConfig} getTotalDocs={getTotalDocsQuery} />
  //               </Suspense>
  //             </div>
  //           </div>
  //         )}
  //         <CollectionRenderer searchParams={searchParamsFromProps} params={paramsFromProps} page={page} />
  //       </div>
  //     )}
  //   </main>
  // )
}