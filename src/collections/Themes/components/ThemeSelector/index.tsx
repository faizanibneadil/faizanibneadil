'use client'
import { Badge } from "@/components/ui/badge"
// import { _themesRegistry, ThemeConfig } from "@/themes/config"
import { useField } from "@payloadcms/ui"
import type { TextFieldClientProps } from "payload"

export function ThemeSelector(props: TextFieldClientProps) {
    const { value, setValue } = useField({ path: props.path })
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* {Object.entries(_themesRegistry)?.map(([theme, themeConfig], idx) => (
                <button type="button" onClick={() => setValue(theme)} key={`theme-${idx}-${theme}`} className="space-y-1 bg-transparent cursor-pointer border-none p-0 m-0 text-left relative">
                    {themeConfig?.visualizer?.type === 'video' && (
                        <Video {...themeConfig} />
                    )}
                    {themeConfig?.visualizer?.type === 'image' && (
                        <img src={themeConfig?.visualizer?.url instanceof URL ? themeConfig.visualizer.url.toString() : themeConfig?.visualizer?.url} />
                    )}
                    <h3 className="font-bold text-lg">{themeConfig.label}</h3>
                    <p>{themeConfig.description}</p>
                    {theme === value && <Badge className="absolute top-1 left-2 rounded-sm bg-green-600 text-white text-sm shadow-none">Active</Badge>}
                </button>
            ))} */}
        </div>
    )
}

// function Video(props: ThemeConfig) {
//     const url = props?.visualizer?.url instanceof URL ? props.visualizer.url.toString() : props?.visualizer?.url

//     return (
//         <video
//             className="w-full rounded-md"
//             autoPlay
//             muted
//             loop
//             playsInline
//             src={url}
//             onLoadedData={({ currentTarget }) => {
//                 currentTarget.play()
//             }}
//         />
//     )
// }