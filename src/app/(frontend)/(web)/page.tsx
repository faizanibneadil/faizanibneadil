import HeroSection from "@/components/hero-section";
import type { Metadata } from "next";


export const metadata: Metadata = {
    icons: [{
        url: './skillshelf-symble.svg'
    }],
    title: {
        default: 'Skill Shelf',
        template: '% - Skill Shelf'
    }
}

export default function Page() {
    return <HeroSection />
}
