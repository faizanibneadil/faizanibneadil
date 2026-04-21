import Image from "next/image";
import Link from "next/link";
import { IconRenderer } from "@/components/ui/icon-renderer";
import type { DocProps } from "@/types";
import { getMediaUrl, placeholderBlur } from "@/utilities/getURL";
import { hasText } from '@payloadcms/richtext-lexical/shared';
import { BackButton } from "@/components/BackButton";
import { SkillShelfRichText } from "../components/RichText";
import { formatHref } from "@/utilities/fomatHref";

export async function ProjectEntity(props: DocProps<'projects'>) {
    const {
        entity,
        params,
        searchParams
    } = props || {}
    
    const height = typeof entity?.thumbnail === 'object' && entity?.thumbnail?.height as number
    const width = typeof entity?.thumbnail === 'object' && entity?.thumbnail?.width as number
    return (
        <div className="rounded-lg bg-border shadow">
            <Image
                height={height as number}
                width={width as number}
                fetchPriority="high"
                loading="lazy"
                alt={entity?.title}
                src={getMediaUrl(entity?.thumbnail)}
                placeholder="blur"
                blurDataURL={placeholderBlur}
                unoptimized
                className='rounded-lg border bg-background'
            />
            {Boolean(entity?.resources?.length) && (
                <div className="relative mx-auto flex w-full max-w-3xl flex-col justify-between gap-y-6 border-x bg-secondary/80 px-2 py-4 md:px-4 dark:bg-secondary/40">
                    <div className="-translate-x-1/2 -top-px pointer-events-none absolute left-1/2 w-screen border-t" />
                    <div className="flex items-center gap-4">
                        {entity?.resources?.map(link => (
                            <Link href={formatHref({ domain: params.domain, item: link})} className="flex gap-1 items-center " key={`resource-${link.id}`}>
                                {link.label}
                            </Link>
                        ))}
                    </div>
                    <div className="-translate-x-1/2 -bottom-px pointer-events-none absolute left-1/2 w-screen border-b" />
                </div>
            )}

            <h1 className="font-medium text-2xl rounded-lg border bg-background p-4">{entity?.title}</h1>
            <div className="[&>*:not([data-type='block'])]:rounded-lg
    [&>*:not([data-type='block'])]:border
    [&>*:not([data-type='block'])]:bg-background
    [&>*:not([data-type='block'])]:p-4
    [&>br]:hidden">
            <SkillShelfRichText data={entity?.detailedOverview} params={params} searchParams={searchParams} />
    </div>


        </div>
    )
}