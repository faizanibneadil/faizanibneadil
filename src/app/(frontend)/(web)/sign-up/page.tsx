
// import { DualModeImage } from "@/components/dual-mode-image";
// import { SignUp } from "../_components/signup";

// import { sdk } from "@/lib/sdk";
import { SignUpForm } from "./_components/sign-up-form";
import { getServerSideURL } from "@/utilities/getURL";
import type { Metadata } from "next";
import config from '@payload-config'
import { getPayload } from "payload";

export const metadata: Metadata = {
    title: {
        default: 'Sign Up - Skill Shelf',
        template: '% - Skill Shelf'
    },
    metadataBase: new URL(getServerSideURL()),
    openGraph: {
        url: './graphics/website-og.png',
        images: [{
            url: './graphics/website-og.png',
        }]
    }
}

async function getIndustries() {
    'use cache'
    const payload = await getPayload({ config })
    const _industries = await payload.find({
        collection: 'industries',
        pagination: false
    })

    return _industries
}

export default async function Page() {
    const industries = await getIndustries()

    return (
        <div className="relative w-full md:min-h-svh py-20">
            <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-4">
                <div className="mx-auto space-y-4 sm:w-sm">
                    <SignUpForm industries={industries.docs} />
                    <p className="mt-8 text-muted-foreground text-sm">
                        By clicking continue, you agree to our{" "}
                        <a
                            className="underline underline-offset-4 hover:text-primary"
                            href="#"
                        >
                            Terms of Service
                        </a>{" "}
                        and{" "}
                        <a
                            className="underline underline-offset-4 hover:text-primary"
                            href="#"
                        >
                            Privacy Policy
                        </a>
                        .
                    </p>
                </div>
            </div>
        </div>

    )
}