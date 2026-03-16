import { Skeleton } from "@/components/ui/skeleton";

export async function HeroSkeleton() {
    return (
        <section >
            <div className="mx-auto w-full max-w-2xl space-y-8">
                <div className="gap-2 flex justify-between">
                    <div className="flex-col flex flex-1 space-y-1.5">
                        <Skeleton className="w-50 h-12" />
                        <Skeleton className="w-60 h-4" />
                        <Skeleton className="w-80 h-4" />
                    </div>
                    <Skeleton className="size-28 border rounded-full" />
                </div>
            </div>
        </section>
    )
}