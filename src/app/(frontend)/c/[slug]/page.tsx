import type { CollectionSlug } from "payload";

export default async function Collection(props: { params: Promise<{ collection: CollectionSlug }> }) {
    return (await props.params).collection
}