import type { ShelfConfig } from "@/types";
import { Suspense } from "react";
import { __SkillshelfBlocksMap } from "./BlocksMap";
import { __SkillshelfCollectionsMap } from "./CollectionsMap";
import { __SkillshelfDocMap } from "./DocumentMap";
import dynamic from "next/dynamic";
import { SkillShelfRichText } from "./components/RichText";
const Navbar = dynamic(() => import("./components/navbar").then(({ Navbar }) => ({
    default: Navbar
})))

export const __SkillshelfThemeConfig: ShelfConfig = {
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
                collectionsMap,
                params,
                searchParams
            }) => {
                if (Object.hasOwn(collectionsMap, params.collectionSlug)) {
                    const Collection = collectionsMap[params.collectionSlug]?.component

                    return (
                        <div className="min-h-screen bg-background font-sans antialiased max-w-2xl mx-auto">
                            {/* @ts-expect-error */}
                            <Collection collection={collection} params={params} searchParams={searchParams} />
                        </div>
                    )
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

                return '404 - Document not found'
            }
        },
        layout: (props) => {
            return (
                <>
                    <div className="max-w-2xl mx-auto">
                        <Suspense fallback={null}>
                            <Navbar params={props.params as any} />
                        </Suspense>
                    </div>
                    {props.children}
                </>
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
                    <div className="min-h-screen bg-background font-sans antialiased max-w-2xl mx-auto">
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
                    </div>
                )
            }
            return null
        },
        RenderHero: ({ heroProps, params, searchParams }) => {
            return (
                <SkillShelfRichText data={heroProps?.heroContent} params={params} searchParams={searchParams} />
            )
        },
        skeleton: (props) => {
            const ProfileSkeleton = props.blocksMap?.profile?.skeleton
            const AboutSkeleton = props.blocksMap?.about?.skeleton
            const GithubContributionsSkeleton = props.blocksMap?.["github-contributions"]?.skeleton
            const ExperienceSkeleton = props.blocksMap?.experience?.skeleton
            const ProjectSkeleton = props.blocksMap?.project?.skeleton
            const SkillsSkeleton = props.blocksMap?.skill?.skeleton
            const ContactSkeleton = props.blocksMap?.contact?.skeleton
            return (
                <div>
                    {ProfileSkeleton && <ProfileSkeleton />}
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