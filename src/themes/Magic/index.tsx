import { ThemeConfig } from "@/types";
import { queryCollectionBySlug } from "@/utilities/queryCollectionBySlug";
import { CollectionSlug } from "payload";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { __MagicBlocksMap } from "./BlocksMap";
import { __MagicCollectionsMap } from "./CollectionsMap";
import { Navbar } from "./components/navbar";
import { TawkChatBubble } from "./components/tawk-chat-bubbles";
import { __MagicDocMap } from "./DocumentMap";

export const __MagicThemeConfig: ThemeConfig = {
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
                const params = await props.params

                if (Object.hasOwn(props.docMap, props.excludedCollectionSlug)) {
                    const Collection = props.docMap[props.excludedCollectionSlug]?.component
                    // @ts-expect-error
                    return <Collection entity={props.entity} params={params} />
                }

                return null
            }
        },
        layout: (props) => {
            return (
                <div className="min-h-screen bg-background font-sans antialiased max-w-2xl mx-auto py-10 px-6">
                    {props.children}
                    <Navbar params={props.params as any} />
                    <ErrorBoundary fallback={null}>
                        <Suspense fallback={null}>
                            <TawkChatBubble params={props?.params as any} />
                        </Suspense>
                    </ErrorBoundary>
                </div>
            )
        },
        PageRenderer: async (props) => {
            const params = await props.params
            const searchParams = await props.searchParams

            if (props.enableCollection) {
                const slugFromConfig = props.page?.content?.configuredCollectionSlug as CollectionSlug
                const domain = params.domain

                const collectionToRenderProps = await queryCollectionBySlug(slugFromConfig, domain!)
                if (Object.hasOwn(props.collectionMap, slugFromConfig) && collectionToRenderProps) {
                    const CollectionToRender = props.collectionMap[slugFromConfig]?.component!
                    const Skeleton = props.collectionMap[slugFromConfig]?.skeleton!

                    return (
                        <ErrorBoundary fallback={null}>
                            <Suspense fallback={<Skeleton />}>
                                {/* @ts-expect-error */}
                                <CollectionToRender collection={collectionToRenderProps} searchParams={props.searchParams} params={props.params} />
                            </Suspense>
                        </ErrorBoundary>
                    )
                }
                return null
            }

            const blocks = props?.page?.content?.layout
            const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

            if (hasBlocks) {
                return blocks.map((block, index) => {
                    const { blockType } = block

                    if (Object.hasOwn(props.blocksMap, blockType)) {
                        const Block = props.blocksMap[blockType]?.component
                        const Skeleton = props.blocksMap[blockType]?.skeleton!

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