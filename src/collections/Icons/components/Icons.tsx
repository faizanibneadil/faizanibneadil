import type { ListViewServerProps } from "payload"
import { Button } from "@payloadcms/ui"
import Link from "next/link"
import { Icon } from "@/payload-types"
const baseClass = 'list-create-new-doc'
export const listHeaderClass = 'list-header'
export function Icons(props: ListViewServerProps) {
    // console.log({ props })
    const {
        newDocumentURL,
        data,
        collectionSlug,
        Table
    } = props
    
    return (
        <div className="px-[3.75rem]">
            <div className="flex items-center justify-between ">
                <h1 className={`${listHeaderClass}__title capitalize`}>{collectionSlug}</h1>
                <Button
                    buttonStyle="pill"
                    className={`${baseClass}__create-new-button`}
                    el={'link'}
                    key="create-new-button"
                    size="small"
                    to={newDocumentURL}
                >
                    Create New
                </Button>
            </div>
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-12">
                {data?.docs?.map((item: any) => (
                    <div
                        key={`${item?.id}-${item?.name}`}
                        className="flex items-center justify-center text-center no-underline relative aspect-square p-2"
                    >
                        <Link
                            href={newDocumentURL?.replace('create', item?.id)}
                            className="w-8 h-8 [&>svg]:w-full [&>svg]:h-full group-hover:[&>svg]:text-black group-hover:bg-white"
                            dangerouslySetInnerHTML={{ __html: item?.iconCode }}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}