import Image from "next/image";
import Link from "next/link";
import { IconRenderer } from "@/components/ui/icon-renderer";
import { PagePropsWithParams } from "@/types";
import { getMediaUrl, placeholderBlur } from "@/utilities/getURL";
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { hasText } from '@payloadcms/richtext-lexical/shared';
import { DataFromCollectionSlug } from "payload";
import { BackButton } from "@/components/BackButton";

type Props = {
    entity: DataFromCollectionSlug<'projects'>, params: Awaited<PagePropsWithParams['params']>
}

export function ProjectEntity(props: Props) {
    const { entity, params } = props
    const height = typeof entity.thumbnail === 'object' && entity.thumbnail.height as number
    const width = typeof entity.thumbnail === 'object' && entity.thumbnail.width as number
    return (
        <div className="space-y-2">
            <BackButton />
            <Image
                height={height as number}
                width={width as number}
                fetchPriority="high"
                loading="lazy"
                alt={entity.title}
                src={getMediaUrl(entity.thumbnail)}
                placeholder="blur"
                blurDataURL={placeholderBlur}
                unoptimized
            />
            <div className="relative mx-auto flex w-full max-w-3xl flex-col justify-between gap-y-6 border-x bg-secondary/80 px-2 py-4 md:px-4 dark:bg-secondary/40">
                <div className="-translate-x-1/2 -top-px pointer-events-none absolute left-1/2 w-screen border-t" />
                <div className="flex items-center gap-4">
                {entity?.links?.map(link => (
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

            <h1 className="font-medium text-3xl">{entity.title}</h1>
            {hasText(entity.overview) && (
                <RichText data={entity?.detailedOverview as SerializedEditorState} />
            )}


        </div>
    )
}