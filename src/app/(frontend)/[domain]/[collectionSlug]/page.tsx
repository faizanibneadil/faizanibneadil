import { Suspense } from "react";
import { PayloadRedirects } from "@/components/PayloadRedirects";
import type { PageProps } from "@/types";
import { getShelfConfig } from "@/utilities/getShelfConfig";
import { hasShelf } from "@/utilities/hasShelf";
import { queryPortfolioSettings } from "@/utilities/queries/queryPortfolioSettings";
import type { Metadata } from "next";

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const [params, searchParams] = await Promise.all([props.params, props.searchParams])
  const settings = await queryPortfolioSettings({
    domain: params.domain
  })

  const {
    shelfID,
    collectionsMap,
    queryPageByConfiguredCollection
  } = getShelfConfig({
    shelf: settings?.shelf,
    params: params,
    searchParams: searchParams
  })

  if (hasShelf(shelfID!)) {
    if (!Object.keys(collectionsMap).includes(params.collectionSlug)) {
      return {
        title: '404 - Not Found.',
        description: 'Page Not Found.'
      }
    }

    const page = await queryPageByConfiguredCollection()

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

  const url = `/${params.domain}/${params.collectionSlug}`

  // const queryCount = await queryCollectionCountBySlug({
  //   collectionSlug: params.collectionSlug,
  //   domain: params.domain
  // })
  const settings = await queryPortfolioSettings({
    domain: params.domain
  })

  const {
    RenderCollection,
    RenderHero,
    collectionsMap,
    queryCollectionBySlug,
    queryHero
  } = getShelfConfig({
    shelf: settings?.shelf,
    params: params,
    searchParams: searchParams
  })

  const [collection, hero] = await Promise.all([queryCollectionBySlug(), queryHero()])


  return (
    <Suspense fallback={null}>
      <PayloadRedirects domain={params.domain} url={url} />
      <RenderHero heroProps={hero} params={params} searchParams={searchParams} />
      <RenderCollection collection={collection} collectionsMap={collectionsMap} params={params} searchParams={searchParams} />
    </Suspense>
  )
}