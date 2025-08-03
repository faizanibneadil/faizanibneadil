import { DataFromCollectionSlug, PaginatedDocs } from "payload"

export function Achievements(props: PaginatedDocs<DataFromCollectionSlug<'achievements'>>) {
    const { docs } = props || {}
    const projects = docs.map(doc => {
        return (
            <div key={doc.id} className="flex flex-col gap-4">
                <h3>{doc.title}</h3>
                <p>Short Descriptin Of The Project</p>
            </div>
        )
    })
    return <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">{projects}</div>
}