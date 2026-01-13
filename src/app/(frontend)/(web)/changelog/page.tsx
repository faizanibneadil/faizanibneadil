import { getServerSideURL } from "@/utilities/getURL"
import type { Metadata } from "next"


export const metadata:Metadata = {
    title: 'Changelogs',
    description: 'Changelogs of product.',
    metadataBase: new URL(getServerSideURL()),
    openGraph: {
        url: './graphics/website-og.png',
        images: [{
            url: './graphics/website-og.png',
        }]
    }
}

export default function Page(){
    return 'changelog'
}