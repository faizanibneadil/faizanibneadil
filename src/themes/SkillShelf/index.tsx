import type { ThemeConfig } from "@/types";
import { Navbar } from "./components/navbar";
import { __SkillshelfBlocksMap } from "./BlocksMap";
import { __SkillshelfCollectionsMap } from "./CollectionsMap";
import { __SkillshelfDocMap } from "./DocumentMap";
import { CollectionSlug } from "payload";
import { queryCollectionBySlug } from "@/utilities/queryCollectionBySlug";
import { ErrorBoundary } from "react-error-boundary";
import { Fragment, Suspense } from "react";

export const __SkillshelfThemeConfig: ThemeConfig = {
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
            collectionsMap: __SkillshelfCollectionsMap,
            RenderCollection: ({
                collection,
                collectionSlug,
                collectionsMap,
                params,
                searchParams
            }) => {
                if (Object.hasOwn(collectionsMap, collectionSlug)) {
                    const Collection = collectionsMap[collectionSlug]?.component

                    // @ts-expect-error
                    return <Collection collection={collection} params={params} searchParams={searchParams} />
                }

                return null
            }
        },
        documentConfig: {
            docMap: __SkillshelfDocMap,
            RenderDocumentView: async ({
                docMap,
                collectionSlug,
                params,
                searchParams,
                doc
            }) => {

                if (Object.hasOwn(docMap, collectionSlug)) {
                    const Collection = docMap[collectionSlug]?.component
                    // @ts-expect-error
                    return <Collection entity={doc} params={params} />
                }

                return null

                return '404 - Document not found'
            }
        },
        layout: (props) => {
            return (
                <div className="min-h-screen bg-background font-sans antialiased max-w-2xl mx-auto">
                    <Navbar params={props.params as any} />
                    {props.children}
                </div>
            )
        },
        RenderBlocks: ({
            blocks,
            params,
            searchParams,
            blocksMap
        }) => {
            const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0
            if (hasBlocks) {
                return (
                    <div className="bg-border rounded-lg">
                        {blocks.map((block, index) => {
                            const { blockType } = block

                            if (Object.hasOwn(blocksMap, blockType)) {
                                const Block = blocksMap[blockType]?.component
                                const Skeleton = blocksMap[blockType]?.skeleton!

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