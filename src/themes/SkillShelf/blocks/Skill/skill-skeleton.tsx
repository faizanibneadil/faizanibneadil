import { Skeleton } from "@/components/ui/skeleton"

export function SkillSkeleton() {
    return (
        <div className="flex min-h-0 flex-col gap-y-3">
            <Skeleton className="w-20 h-5" />
            <div className="flex flex-wrap gap-1">
                {Array.from({ length: 20 })?.map((item, idx) => (
                    <Skeleton key={`skill-skeleton-${idx}`} className="size-10 rounded-lg" />
                ))}
            </div>
        </div>
    )
}