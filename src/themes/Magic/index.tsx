import { ThemeConfig } from "@/types";
import { __MagicDocMap } from "./DocumentMap";
import { __MagicBlocksMap } from "./BlocksMap";
import { __MagicCollectionsMap } from "./CollectionsMap";
import { CollectionSlug } from "payload";
import { queryCollectionBySlug } from "@/utilities/queryCollectionBySlug";
import { ErrorBoundary } from "react-error-boundary";
import { Fragment, Suspense } from "react";
import dynamic from "next/dynamic";

export const __MagicComponents = {
    navbar: dynamic(() => import("@/themes/Magic/components/navbar").then(({ Navbar }) => ({
        default: Navbar
    }))),
    TawkChatBubble: dynamic(() => import("@/themes/Magic/components/tawk-chat-bubbles").then(({ TawkChatBubble }) => ({
        default: TawkChatBubble
    })))
}

export const __MagicThemeConfig: ThemeConfig<typeof __MagicComponents> = {
    themeMeta: {
        description: 'SkillShelf theme is the default theme.',
        name: 'SkillShelf',
        slug: 'skill-shelf'
    },
    config: {
        blocksConfig: {
            blocksMap: __MagicBlocksMap
        },
        collectionConfig: {
            collectionsMap: __MagicCollectionsMap
        },
        documentConfig: {
            docMap: __MagicDocMap,
            DocumentRenderer: async (props) => {
                const params = await props.pageProps.params

                if (Object.hasOwn(props.config.docMap, props.config.excludedCollectionSlug)) {
                    const Collection = props.config.docMap[props.config.excludedCollectionSlug]?.component
                    // @ts-expect-error
                    return <Collection entity={props.entity} params={params} />
                }

                return null
            }
        },
        componentsMap: __MagicComponents,
        layout: (props) => {
            const Navbar = props.config.componentsMap.navbar
            const TawkChatBubble = props.config?.componentsMap.TawkChatBubble
            return (
                <div className="min-h-screen bg-background font-sans antialiased max-w-2xl mx-auto py-10 px-6">
                    {props.children}
                    <Navbar params={props.config.params as any} />
                    <ErrorBoundary fallback={null}>
                        <Suspense fallback={null}>
                            <TawkChatBubble params={props.config?.params as any} />
                        </Suspense>
                    </ErrorBoundary>
                </div>
            )
        },
        PageRenderer: async (props) => {
            const params = await props.pageProps.params
            const searchParams = await props.pageProps.searchParams

            if (props.config.enableCollection) {
                const slugFromConfig = props.config.page?.content?.configuredCollectionSlug as CollectionSlug
                const domain = params.domain

                const collectionToRenderProps = await queryCollectionBySlug(slugFromConfig, domain!)
                if (Object.hasOwn(props.config.collectionMap, slugFromConfig) && collectionToRenderProps) {
                    const CollectionToRender = props.config.collectionMap[slugFromConfig]?.component!
                    const Skeleton = props.config.collectionMap[slugFromConfig]?.skeleton!

                    return (
                        <ErrorBoundary fallback={null}>
                            <Suspense fallback={<Skeleton />}>
                                {/* @ts-expect-error */}
                                <CollectionToRender collection={collectionToRenderProps} searchParams={props.pageProps.searchParams} params={props.pageProps.params} />
                            </Suspense>
                        </ErrorBoundary>
                    )
                }
                return null
            }

            const blocks = props?.config?.page?.content?.layout
            const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

            if (hasBlocks) {
                return blocks.map((block, index) => {
                    const { blockType } = block

                    if (Object.hasOwn(props.config.blocksMap, blockType)) {
                        const Block = props.config.blocksMap[blockType]?.component
                        const Skeleton = props.config.blocksMap[blockType]?.skeleton!

                        if (Block) {
                            return (
                                <div className="my-5 first:mt-0" key={`${blockType}-${index}`}>
                                    <Suspense fallback={<Skeleton />}>
                                        {/* @ts-expect-error there may be some mismatch between the expected types here */}
                                        <Block blockProps={block} params={params} searchParams={searchParams} />
                                    </Suspense>
                                </div>
                            )
                        }
                    }
                    return null
                })
            }
        },
        skeleton: (props) => {
            const HeroSkeleton = props.blocksMap?.hero?.skeleton
            const AboutSkeleton = props.blocksMap?.about?.skeleton
            const GithubContributionsSkeleton = props.blocksMap?.["github-contributions"]?.skeleton
            const ExperienceSkeleton = props.blocksMap?.experience?.skeleton
            const ProjectSkeleton = props.blocksMap?.project?.skeleton
            const SkillsSkeleton = props.blocksMap?.skill?.skeleton
            const ContactSkeleton = props.blocksMap?.contact?.skeleton
            return (
                <div>
                    {HeroSkeleton && <HeroSkeleton />}
                    {AboutSkeleton && <AboutSkeleton />}
                    {GithubContributionsSkeleton && <GithubContributionsSkeleton />}
                    {ExperienceSkeleton && <ExperienceSkeleton />}
                    {ProjectSkeleton && <ProjectSkeleton />}
                    {SkillsSkeleton && <SkillsSkeleton />}
                    {ContactSkeleton && <ContactSkeleton />}
                </div>
            )
        }
    }
}