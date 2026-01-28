import { Skeleton } from "@/components/ui/skeleton";

export function ContactSkeleton() {
    return (
        <div className="flex items-center justify-center flex-col space-y-3 w-full">
            <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                Contact
            </div>
            <Skeleton className="w-40 h-10" />
            <div className="flex flex-col gap-2 w-full">
                <Skeleton className="w-40 h-2 rounded-lg" />
                <Skeleton className="w-30 h-2 rounded-lg" />
                <Skeleton className="w-30 h-2 rounded-lg" />
                <Skeleton className="w-30 h-2 rounded-lg" />
                <Skeleton className="w-30 h-2 rounded-lg" />
            </div>
        </div>
    )
}