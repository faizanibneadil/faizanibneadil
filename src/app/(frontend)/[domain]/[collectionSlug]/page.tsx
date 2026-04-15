import type { Page } from "@/payload-types";
import type { PageProps } from "@/types";
import type { CollectionSlug } from "payload";
import { queryPageBySlug } from "@/utilities/QueryPageBySlug";
import type { Metadata } from "next";
import { queryThemeByDomain } from "@/utilities/QueryThemeByDomain";
import { themesRegistry } from "@/themes";
import { getMediaUrl } from "@/utilities/getURL";
import { queryCollectionByCollectionSlug } from "@/utilities/queryCollectionByCollectionSlug";

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const [params, searchParams] = await Promise.all([props.params, props.searchParams])

  const collection = await queryCollectionByCollectionSlug({
    collectionSlug: params.collectionSlug,
    domain: params.domain
  })



  const themeId = await queryThemeByDomain({
    domain: params.domain
  })
  if (Object.hasOwn(themesRegistry, themeId)) {
    const collectionMap = themesRegistry[themeId]?.config?.collectionConfig.collectionsMap

    if (Object.hasOwn(collectionMap, params.collectionSlug)) {
      const metadata = collectionMap[params.collectionSlug]?.metadata
      if (typeof metadata === 'function') {
        // @ts-expect-error
        return await metadata({ doc: collection })
      }

      return metadata ?? {}
    }

  }

  return {}
}




export default async function Page(props: PageProps) {
  const [params,searchPrams] = await Promise.all([props.params, props.searchParams])

  const collection = await queryCollectionByCollectionSlug({
    collectionSlug: params.collectionSlug,
    domain: params.domain
  })

  const themeId = await queryThemeByDomain({
    domain: params.domain
  })

  
  if (Object.hasOwn(themesRegistry, themeId)) {
    const blocksMap = themesRegistry[themeId]?.config?.blocksConfig.blocksMap
    const collectionMap = themesRegistry[themeId]?.config?.collectionConfig.collectionsMap
    const RenderCollection = themesRegistry[themeId]?.config?.collectionConfig?.RenderCollection

    return <RenderCollection params={params} searchParams={searchPrams} collection={collection} collectionsMap={collectionMap} collectionSlug={params.collectionSlug} />
  }
}