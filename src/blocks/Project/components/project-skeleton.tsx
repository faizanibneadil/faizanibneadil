import { Skeleton } from "@/components/ui/skeleton"

export function ProjectSkeleton() {
    const projects = Array.from({ length: 10 }).map((item, idx) => (
        <div key={`project-${idx}`} className="flex flex-col gap-4">
            <Skeleton className="w-full h-40 rounded-lg" />
            <div className="flex flex-col gap-2">
                <Skeleton className="w-40 h-2 rounded-lg" />
                <Skeleton className="w-30 h-2 rounded-lg" />
            </div>
            <div className="flex flex-col gap-2">
                <Skeleton className="w-40 h-2 rounded-lg" />
                <Skeleton className="w-30 h-2 rounded-lg" />
                <Skeleton className="w-30 h-2 rounded-lg" />
                <Skeleton className="w-30 h-2 rounded-lg" />
                <Skeleton className="w-30 h-2 rounded-lg" />
                <Skeleton className="w-30 h-2 rounded-lg" />
                <Skeleton className="w-30 h-2 rounded-lg" />
                <Skeleton className="w-30 h-2 rounded-lg" />
                <Skeleton className="w-30 h-2 rounded-lg" />
            </div>
            <div className="flex gap-2">
                <Skeleton className="w-20 h-10 rounded-lg" />
                <Skeleton className="w-20 h-10 rounded-lg" />
            </div>
        </div>
    ))
    return (
        <div className="space-y-2 w-full py-12">

            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="col space-y-2 w-full">
                    <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                        My Projects
                    </div>
                    <Skeleton className="w-40 h-10" />
                    <div className="flex flex-col gap-2">
                        <Skeleton className="w-40 h-2 rounded-lg" />
                        <Skeleton className="w-30 h-2 rounded-lg" />
                        <Skeleton className="w-30 h-2 rounded-lg" />
                        <Skeleton className="w-30 h-2 rounded-lg" />
                        <Skeleton className="w-30 h-2 rounded-lg" />
                        <Skeleton className="w-30 h-2 rounded-lg" />
                        <Skeleton className="w-30 h-2 rounded-lg" />
                        <Skeleton className="w-30 h-2 rounded-lg" />
                        <Skeleton className="w-30 h-2 rounded-lg" />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">{projects}</div>
        </div>
    )
}