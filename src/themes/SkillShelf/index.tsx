import type { ThemeConfig } from "@/types";
import { Navbar } from "./components/navbar";
import { __SkillshelfBlocksMap } from "./BlocksMap";
import { __SkillshelfCollectionsMap } from "./CollectionsMap";
import { __SkillshelfDocMap } from "./DocumentMap";
import { CollectionSlug } from "payload";
import { queryCollectionBySlug } from "@/utilities/queryCollectionBySlug";
import { ErrorBoundary } from "react-error-boundary";
import { Fragment, Suspense } from "react";

export const __SkillshelfComponents = {
    navbar: Navbar
}

export const __SkillshelfThemeConfig: ThemeConfig<typeof __SkillshelfComponents> = {
    themeMeta: {
        description: 'SkillShelf theme is the default theme.',
        name: 'SkillShelf',
        slug: 'skill-shelf'
    },
    config: {
        blocksConfig: {
            blocksMap: __SkillshelfBlocksMap
        },
        collectionConfig: {
            collectionsMap: __SkillshelfCollectionsMap
        },
        documentConfig: {
            docMap: __SkillshelfDocMap,
            DocumentRenderer: async (props) => {
                const params = await props.pageProps.params

                if (Object.hasOwn(props.config.docMap, props.config.excludedCollectionSlug)) {
                    const Collection = props.config.docMap[props.config.excludedCollectionSlug]?.component
                    // @ts-expect-error
                    return <Collection entity={props?.config?.entity} params={params} />
                }

                return null
            }
        },
        componentsMap: __SkillshelfComponents,
        layout: (props) => {
            const Nav = props.config.componentsMap.navbar
            return (
                <div className="min-h-screen bg-background font-sans antialiased max-w-2xl mx-auto">
                    <Nav params={props.config.params as any} />
                    {props.children}
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
                return (
                    <div className="bg-border rounded-lg">
                        {blocks.map((block, index) => {
                            const { blockType } = block

                            if (Object.hasOwn(props.config.blocksMap, blockType)) {
                                const Block = props.config.blocksMap[blockType]?.component
                                const Skeleton = props.config.blocksMap[blockType]?.skeleton!

                                if (Block) {
                                    return (
                                        <Suspense key={`${blockType}-${index}`} fallback={<Skeleton />}>
                                            {/* @ts-expect-error there may be some mismatch between the expected types here */}
                                            <Block blockProps={block} params={params} searchParams={searchParams} />
                                        </Suspense>
                                    )
                                }
                            }
                            return null
                        })}
                    </div>
                )
            }
            return null
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