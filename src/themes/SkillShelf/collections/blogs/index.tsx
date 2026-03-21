import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { CollectionProps } from "@/types";
import { generateRoute } from "@/utilities/generateRoute";
import { getMediaUrl, placeholderBlur } from "@/utilities/getURL";
import Image from "next/image";
import Link from "next/link";
import { SkillShelfRichText } from "../../components/RichText";

const BLUR_FADE_DELAY = 0.04;
export async function Blogs(props: CollectionProps<'blogs'>) {
    const {
        collection,
        params: paramsFromProps,
        searchParams: searchParamsFromProps
    } = props || {}

    const {
        docs,
        hasNextPage,
        hasPrevPage,
        limit,
        pagingCounter,
        totalDocs,
        totalPages,
        nextPage,
        page,
        prevPage
    } = collection || {}

    const params = paramsFromProps instanceof Promise ? await paramsFromProps : paramsFromProps
    const searchParams = searchParamsFromProps instanceof Promise ? await searchParamsFromProps : searchParamsFromProps

    const blogs = docs?.map((blog, id) => {
        const { RouteWithDocSlug } = generateRoute({
            domain: params.domain as string,
            slug: params.slug as string,
            docSlug: blog.slug as string
        })
        return (
            <div key={`blog-${blog.id}`} className="rounded-lg border bg-background">
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
                            <CardTitle className="mt-1 text-base">
                                <Link href={RouteWithDocSlug} className="block cursor-pointer">
                                    {blog.title}
                                </Link>
                            </CardTitle>
                            <SkillShelfRichText data={blog?.content?.description} params={params} searchParams={searchParams} />
                        </div>
                    </CardHeader>
                    <CardFooter></CardFooter>
                </Card>
            </div>
        )
    })
    return <div className="grid grid-cols-1 sm:grid-cols-2 max-w-[800px] mx-auto rounded-lg bg-border shadow">{blogs}</div>
}