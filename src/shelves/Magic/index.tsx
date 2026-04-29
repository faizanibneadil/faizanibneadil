import { ShelfConfig } from "@/types";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { __MagicBlocksMap } from "./BlocksMap";
import { __MagicCollectionsMap } from "./CollectionsMap";
import { TawkChatBubble } from "./components/tawk-chat-bubbles";
import { __MagicDocMap } from "./DocumentMap";
import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("./components/navbar").then(({ Navbar }) => ({
    default: Navbar
})));

export const __MagicThemeConfig: ShelfConfig = {
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
            collectionsMap: __MagicCollectionsMap,
            RenderCollection: async ({
                collection,
                collectionsMap,
                params,
                searchParams
            }) => {
                if (Object.hasOwn(collectionsMap, params.collectionSlug)) {
                    const Collection = collectionsMap[params.collectionSlug]?.component

                    // @ts-expect-error
                    return <Collection collection={collection} params={params} searchParams={searchParams} />
                }

                return null
            },
        },
        documentConfig: {
            docMap: __MagicDocMap,
            RenderDocumentView: async ({ collectionSlug, doc, docMap, params, searchParams }) => {

                if (Object.hasOwn(docMap, collectionSlug)) {
                    const Collection = docMap[collectionSlug]?.component
                    // @ts-expect-error
                    return <Collection entity={doc} params={params} />
                }

                return '404 - Document not found'
            }
        },
        layout: (props) => {
            return (
                <div className="min-h-screen bg-background font-sans antialiased max-w-2xl mx-auto py-10 px-6">
                    {props.children}
                    <Suspense fallback={null}>
                        <Navbar params={props.params as any} />
                    </Suspense>
                    <ErrorBoundary fallback={null}>
                        <Suspense fallback={null}>
                            <TawkChatBubble params={props?.params as any} />
                        </Suspense>
                    </ErrorBoundary>
                </div>
            )
        },
        RenderBlocks: (props) => {
            const blocks = props?.blocks
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