import BlurFade from "@/components/magicui/blur-fade";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getClientSideURL } from "@/utilities/getURL";
import Image from "next/image";
import Link from "next/link";
import { DataFromCollectionSlug, PaginatedDocs } from "payload"
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { RichText } from "@payloadcms/richtext-lexical/react";

const BLUR_FADE_DELAY = 0.04;
export function Blogs(props: PaginatedDocs<DataFromCollectionSlug<'blogs'>>) {
    const { docs } = props || {}
    const blogs = docs.map((blog, id) => {
        return (
            <BlurFade
                key={blog.slug}
                delay={BLUR_FADE_DELAY * 12 + id * 0.05}
            >
                <Card className="flex flex-col overflow-hidden border hover:shadow-lg transition-all duration-300 ease-out h-full">
                    <Link href={"#"} className="block cursor-pointer">
                        {blog?.featured_image && (
                            <Image
                                src={blog.featured_image && typeof blog.featured_image === 'object' && blog?.featured_image?.filename ? `${getClientSideURL()}/api/media/file/${blog.featured_image?.filename}` : ''}
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
                            {blog?.description && (<div className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">
                                <RichText data={blog.description as SerializedEditorState} />
                            </div>)}
                        </div>
                    </CardHeader>
                    <CardFooter></CardFooter>
                </Card>
            </BlurFade>
        )
    })
    return <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">{blogs}</div>
}