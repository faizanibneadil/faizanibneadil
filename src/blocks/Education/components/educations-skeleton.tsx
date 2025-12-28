import { Card, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export async function EducationSkeleton() {
    return (
        <div className="flex min-h-0 flex-col gap-y-3">
            <Skeleton className="w-60 h-4" />
            {Array.from({ length: 5 }).map((item,idx) => (
                <Card className="flex" key={`education-skeleton-${idx}`}>
                    <div className="flex-none">
                        <Skeleton className="border size-12 m-auto bg-muted-background dark:bg-foreground rounded-full" />
                    </div>
                    <div className="flex-grow ml-4 items-center flex-col group">
                        <CardHeader>
                            <div className="flex items-start justify-between gap-x-2 text-base">
                                <div className="flex flex-col items-start justify-start font-semibold leading-none text-xs sm:text-sm">
                                    <Skeleton className="mb-1 w-40 h-2" />
                                    <Skeleton className="mb-1 w-20 h-2" />
                                    {/* <div className="flex flex-wrap gap-1 mt-1">
                                        <h3 className="font-normal">TechStack: </h3>
                                        {skillsFromProps?.map((skill, idx) => (
                                            <React.Suspense key={`skill-${idx}`} fallback={<SkillSkeleton />}>
                                                <Skill id={idx} skill={typeof skill === 'number' ? getSkillById({ id: skill }) : skill} />
                                            </React.Suspense>
                                        ))}
                                    </div> */}
                                </div>
                                <div className="text-xs sm:text-sm tabular-nums text-muted-foreground text-right">
                                    <Skeleton className="mb-1 w-20 h-2" />
                                    <Skeleton className="mb-1 w-24 h-2" />
                                    <Skeleton className="mb-1 w-12 h-2" />
                                    <Skeleton className="mb-1 w-14 h-2" />
                                </div>
                            </div>
                        </CardHeader>
                        <Skeleton className="mb-1 w-10 h-2" />
                        <Skeleton className="mb-1 w-60 h-2" />
                        <Skeleton className="mb-1 w-full h-2" />
                        <Skeleton className="mb-1 w-40 h-2" />
                        <Skeleton className="mb-1 w-80 h-2" />
                    </div>
                </Card>
            ))}
        </div>
    )
}