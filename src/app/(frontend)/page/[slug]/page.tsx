export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const pageSlug = (await params).slug
    return <div>{pageSlug}</div>
}