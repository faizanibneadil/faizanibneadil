import type { CollectionSlug } from "payload";

export default async function Collection(props: { params: Promise<{ slug: CollectionSlug }> }) {
    return (await props.params).slug
}