import { Skeleton } from "@/components/ui/skeleton"

export function FormBlockSkeleton() {
    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col items-center justify-center space-y-1">
                <Skeleton className="w-20 h-10" />
                <div className="flex flex-col gap-2 w-full">
                    <Skeleton className="w-40 h-2 rounded-lg" />
                    <Skeleton className="w-30 h-2 rounded-lg" />
                    <Skeleton className="w-30 h-2 rounded-lg" />
                    <Skeleton className="w-30 h-2 rounded-lg" />
                    <Skeleton className="w-30 h-2 rounded-lg" />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Array.from({ length: 4 })?.map((item, idx) => (
                    <Skeleton key={`form-block-skeleton-field-${idx}`} className="w-full h-10 rounded-lg" />
                ))}
            </div>
            <Skeleton className="w-full rounded-lg h-10" />
        </div>
    )
}