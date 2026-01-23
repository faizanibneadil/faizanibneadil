import Image from "next/image";
import Link from "next/link";
import { IconRenderer } from "@/components/ui/icon-renderer";
import type { DocProps } from "@/types";
import { getMediaUrl, placeholderBlur } from "@/utilities/getURL";
import { hasText } from '@payloadcms/richtext-lexical/shared';
import { BackButton } from "@/components/BackButton";
import RichText from "@/components/RichText"

export async function ProjectEntity(props: DocProps<'projects'>) {
    const {
        entity,
        params: paramsFromProps,
        searchParams: searchParamsFromProps
    } = props || {}

    const params = paramsFromProps instanceof Promise ? await paramsFromProps : paramsFromProps
    const searchParams = searchParamsFromProps instanceof Promise ? await searchParamsFromProps : searchParamsFromProps

    const height = typeof entity?.content?.thumbnail === 'object' && entity?.content?.thumbnail?.height as number
    const width = typeof entity?.content?.thumbnail === 'object' && entity?.content?.thumbnail?.width as number
    return (
        <div className="space-y-2">
            <div className="flex gap-4 items-center">
                <BackButton />
                <p className="capitalize font-semibold line-clamp-2">{entity?.title}</p>
            </div>
            <Image
                height={height as number}
                width={width as number}
                fetchPriority="high"
                loading="lazy"
                alt={entity?.title}
                src={getMediaUrl(entity?.content?.thumbnail)}
                placeholder="blur"
                blurDataURL={placeholderBlur}
                unoptimized
                className="rounded-lg"
            />
            {Boolean(entity?.content?.links?.length) && (
                <div className="relative mx-auto flex w-full max-w-3xl flex-col justify-between gap-y-6 border-x bg-secondary/80 px-2 py-4 md:px-4 dark:bg-secondary/40">
                    <div className="-translate-x-1/2 -top-px pointer-events-none absolute left-1/2 w-screen border-t" />
                    <div className="flex items-center gap-4">
                        {entity?.content?.links?.map(link => (
                            <Link href={link.link} className="flex gap-1 items-center " key={`resource-${link.id}`}>
                                {/* {typeof link.icon === 'number' && <span>ICON</span>} */}
                                {link.iconify && (
                                    <IconRenderer width="1rem" height="1rem" icon={link.iconify} />
                                )}
                                <p>{link?.label}</p>
                            </Link>
                        ))}
                    </div>
                    <div className="-translate-x-1/2 -bottom-px pointer-events-none absolute left-1/2 w-screen border-b" />
                </div>
            )}

            <h1 className="font-medium text-3xl">{entity?.title}</h1>
            {hasText(entity?.content.detailedOverview) && params && Boolean(Object.keys(params || {}).length) && (
                <div className="mt-2 prose max-w-full text-pretty font-sans text-foreground dark:prose-invert">
                    <RichText searchParams={searchParams} data={entity?.content?.detailedOverview!} params={params} />
                </div>
            )}


        </div>
    )
}