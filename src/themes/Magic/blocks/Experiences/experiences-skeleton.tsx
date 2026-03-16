import { Skeleton } from "@/components/ui/skeleton"

export async function ExperienceSkeleton() {
    return (
        <div className="flex min-h-0 flex-col gap-y-3">
            <Skeleton className="w-40 h-6" />
            {Array.from({ length: 5 }).map((item, idx) => (
                <div className="space-y-2" key={`experience-skeleton-${idx}`}>
                    <div className="flex gap-2 items-center justify-between">
                        <Skeleton className="border size-12 m-auto rounded-full" />
                        <div className="flex flex-col gap-1 flex-1">
                            <Skeleton className="w-40 h-5" />
                            <Skeleton className="font-sans h-5 w-20 text-xs capitalize font-normal text-muted-foreground group-hover:hover:text-blue-600 group-hover:underline" />
                        </div>
                        <div className="text-xs sm:text-sm tabular-nums text-muted-foreground text-right">
                            <Skeleton className="w-40 h-4" />
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-1 md:ml-14">
                        <Skeleton className="w-20 h-6 rounded-full" />
                        <Skeleton className="w-20 h-6 rounded-full" />
                        <Skeleton className="w-20 h-6 rounded-full" />
                    </div>
                    <div className="flex flex-col gap-2 md:ml-14">
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
            ))}
        </div>
    )
}