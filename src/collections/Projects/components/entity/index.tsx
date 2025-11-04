import { PagePropsWithParams } from "@/types"
import { getMediaUrl } from "@/utilities/getURL"
import Image from "next/image"
import { DataFromCollectionSlug } from "payload"
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { hasText } from '@payloadcms/richtext-lexical/shared'
import Link from "next/link";
import { IconRenderer } from "@/components/ui/icon-renderer";
import { getIconById } from "@/utilities/getIconById";
import React from "react";

type Props = {
    entity: DataFromCollectionSlug<'projects'>, params: Awaited<PagePropsWithParams['params']>
}

export function ProjectEntity(props: Props) {
    const { entity, params } = props
    const height = typeof entity.thumbnail === 'object' && entity.thumbnail.height as number
    const width = typeof entity.thumbnail === 'object' && entity.thumbnail.width as number
    return (
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-8 space-y-4">
                <Image height={height as number} width={width as number} fetchPriority="high" loading="eager" alt={entity.title} src={getMediaUrl(entity.thumbnail)} />
                <h1>{entity.title}</h1>
                {/* <p className="prose"> */}
                {hasText(entity.overview) && (
                    <RichText data={entity?.detailedOverview as SerializedEditorState} />
                )}
                {/* </p> */}
            </div>
            <div className="col-span-4 flex flex-col gap-4">
                {entity?.links?.map(link => (
                    <Link href={link.link} className="flex gap-4 items-center " key={`resource-${link.id}`}>
                        {/* {typeof link.icon === 'number' && <span>ICON</span>} */}
                        {typeof link.icon && (
                            <React.Suspense fallback='loading...'>
                                <IconRenderer className="[&>svg]:size-4" icon={typeof link.icon === 'number' ? getIconById({ id: link.icon }) : link.icon} />
                            </React.Suspense>
                        )}
                        <p>{link?.label}</p>
                    </Link>
                ))}

            </div>
        </div>
    )
}