export default async function Subdomain({ params }: { params: Promise<{ subdomain: string }> }) {
    const subdomain = (await params)?.subdomain
    return subdomain
}