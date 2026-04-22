import { queryShelves } from "@/utilities/queries/queryShelves";

export const Shelves:React.FC<{queryShelves:ReturnType<typeof queryShelves>}> = async (props) => {
    const shelves = await props.queryShelves

    return (
        <div className="max-w-2xl mx-auto grid grid-cols-2 gap-2">
            {shelves?.docs?.map(shelf => (
                <div key={shelf.id}>
                    <div>Shelf Thumbnail</div>
                    <h2>{shelf.title}</h2>
                    {/* <p>{shelf?.description}</p> */}
                </div>
            ))}
        </div>
    )
}