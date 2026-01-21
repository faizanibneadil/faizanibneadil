import type { CollectionSlug } from "payload";

export async function CollectionCount(props: {
    getTotalDocs: Promise<{
        totalDocs: number;
    }>,
    collectionSlug: CollectionSlug
}) {
    const docs = await props.getTotalDocs
    return <p className="text-sm capitalize">{docs.totalDocs} {props.collectionSlug}</p>
}