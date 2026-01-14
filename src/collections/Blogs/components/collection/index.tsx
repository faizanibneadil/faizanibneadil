import { BackButton } from "@/components/BackButton";
import BlurFade from "@/components/magicui/blur-fade";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PagePropsWithParams } from "@/types";
import { generateRoute } from "@/utilities/generateRoute";
import { getMediaUrl, placeholderBlur } from "@/utilities/getURL";
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { RichText } from "@payloadcms/richtext-lexical/react";
import Image from "next/image";
import Link from "next/link";
import { DataFromCollectionSlug, PaginatedDocs } from "payload";

type Props = { collection: PaginatedDocs<DataFromCollectionSlug<'blogs'>>, params: Awaited<PagePropsWithParams['params']> }
const BLUR_FADE_DELAY = 0.04;
export function Blogs(props: Props) {
    const { collection: { docs }, params } = props || {}

    const blogs = docs?.map((blog, id) => {
        const { RouteWithDocSlug } = generateRoute({
            domain: params.domain as string,
            slug: params.slug as string,
            docSlug: blog.slug as string
        })
        return (
            <BlurFade
                key={blog.slug}
                delay={BLUR_FADE_DELAY * 12 + id * 0.05}
            >
                <Card className="flex flex-col overflow-hidden border hover:shadow-lg transition-all duration-300 ease-out h-full">
                    <Link href={RouteWithDocSlug} className="block cursor-pointer">
                        {blog?.content?.featured_image && (
                            <Image
                                src={getMediaUrl(blog?.content.featured_image)}
                                placeholder="blur"
                                blurDataURL={placeholderBlur}
                                alt={blog.slug as string}
                                className="h-40 w-full overflow-hidden object-cover object-top"
                                fetchPriority="high"
                                loading="eager"
                                height={40}
                                unoptimized
                                width={200}
                            />
                        )}
                    </Link>
                    <CardHeader className="px-2">
                        <div className="space-y-1">
                            <CardTitle className="mt-1 text-base">{blog.title}</CardTitle>
                            {blog?.content?.description && (<div className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">
                                <RichText data={blog?.content?.description as SerializedEditorState} />
                            </div>)}
                        </div>
                    </CardHeader>
                    <CardFooter></CardFooter>
                </Card>
            </BlurFade>
        )
    })
    return (
        <div className="space-y-2">
            <BackButton />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">{blogs}</div>
        </div>
    )
}