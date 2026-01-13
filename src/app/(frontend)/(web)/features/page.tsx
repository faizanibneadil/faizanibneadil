import { FeatureSection } from "@/components/feature-section";
import { getServerSideURL } from "@/utilities/getURL";
import type { Metadata } from "next";

export const metadata:Metadata = {
    title: 'Feature - SkillShelf',
    description: 'What SkillShelf offering features.',
    metadataBase: new URL(getServerSideURL()),
    openGraph: {
        url: './graphics/website-og.png',
        images: [{
            url: './graphics/website-og.png',
        }]
    }
}

export default function Page() {
    return (
        <section className="min-h-screen place-content-center p-4">
            <FeatureSection />
        </section>
    )
}