import { PayloadRedirects } from "@/components/PayloadRedirects";
import { ShelvesMaps } from "@/shelves";
import type { PageProps } from "@/types";
import { queryCollectionBySlug } from "@/utilities/queries/queryCollectionBySlug";
import { queryHero } from "@/utilities/queries/queryHero";
import { queryPageByConfiguredCollection } from "@/utilities/queries/queryPageByConfiguiredCollection";
import { queryPortfolioSettings } from "@/utilities/queries/queryPortfolioSettings";
import type { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const [params, searchParams] = await Promise.all([props.params, props.searchParams])
  const settings = await queryPortfolioSettings({
    domain: params.domain
  })

  const shelfID = typeof settings?.shelf === 'object' ? settings?.shelf?.id : settings?.shelf

  if (Object.hasOwn(ShelvesMaps, shelfID!)) {
    const collectionsMap = ShelvesMaps?.[shelfID!]?.config?.collectionConfig?.collectionsMap

    if (!Object.keys(collectionsMap).includes(params.collectionSlug)) {
      return {
        title: '404 - Not Found.',
        description: 'Page Not Found.'
      }
    }

    const page = await queryPageByConfiguredCollection({
      collectionSlug: params.collectionSlug,
      domain: params.domain
    })

    const metadata = collectionsMap[params.collectionSlug]?.metadata

    if (typeof metadata === 'function') {
      return await metadata({ doc: page! })
    } else {
      return metadata ?? {}
    }

  } else {
    return {
      title: 'No Theme Configured'
    }
  }
}


export default async function Page(props: PageProps) {
  const [params, searchParams] = await Promise.all([props.params, props.searchParams])
  // const queryCount = await queryCollectionCountBySlug({
  //   collectionSlug: params.collectionSlug,
  //   domain: params.domain
  // })
  const settings = await queryPortfolioSettings({
    domain: params.domain
  })

  const shelfID = typeof settings?.shelf === 'object' ? settings?.shelf?.id : settings?.shelf

  const shelfConfig = ShelvesMaps?.[shelfID!]
  const collectionsMap = shelfConfig?.config?.collectionConfig?.collectionsMap
  const RenderCollection = shelfConfig?.config?.collectionConfig?.RenderCollection
  const RenderHero = shelfConfig?.config?.RenderHero

  const [collection, hero] = await Promise.all([queryCollectionBySlug({
    collectionSlug: params.collectionSlug,
    domain: params.domain
  }), queryHero({
    collectionSlug: params.collectionSlug,
    domain: params.domain
  })])


  return (
    <Suspense fallback='loading ...'>
      <PayloadRedirects domain={params.domain} url={`/${params.collectionSlug}`} />
      <RenderHero heroProps={hero} params={params} searchParams={searchParams} />
      <RenderCollection collection={collection} collectionsMap={collectionsMap} params={params} searchParams={searchParams} />
    </Suspense>
  )
}