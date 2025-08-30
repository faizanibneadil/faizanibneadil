export default async function Page(props: { params: Promise<{ id: string }> }) {
    const id = (await props.params)?.id
    return id
}