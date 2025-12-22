'use client'

import { Activity, ContributionGraph, ContributionGraphBlock, ContributionGraphCalendar, ContributionGraphFooter, ContributionGraphLegend, ContributionGraphTotalCount } from "@/components/kibo-ui/contribution-graph"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { IGithubContributionProps } from "@/payload-types"
import { LoaderIcon } from "lucide-react"
import React from "react"

type GitHubSectionProps = {
    contributions: Promise<Activity[]>
} & IGithubContributionProps

export function GithubContributionsGraph(props: GitHubSectionProps) {
    const {
        blockType,
        contributions,
        username,
        blockName,
        graphBlockMargin,
        graphBlockRadius,
        graphBlockSize,
        graphFontSize,
        hideMonthLabels,
        withTooltip
    } = props || {}

    const data = React.use(contributions)

    if (!username) return null

    // Use smaller blocks to fit within container without horizontal scroll
    // Container max-width is ~768px (md:max-w-3xl)
    // For 53 weeks: 53 * (blockSize + blockMargin) - blockMargin should fit
    // With blockSize=10, blockMargin=3: 53 * 13 - 3 = 686px (fits well)

    return (
        <TooltipProvider>
            <ContributionGraph
                aria-label={blockName ?? blockType}
                className=""
                data={data}
                blockSize={graphBlockSize}
                blockMargin={graphBlockMargin}
                blockRadius={graphBlockRadius}
                fontSize={graphFontSize}
            >
                <ContributionGraphCalendar hideMonthLabels={hideMonthLabels} className="no-scrollbar" title={blockName ?? blockType}>
                    {({ activity, dayIndex, weekIndex }) => {
                        return withTooltip ? (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <g>
                                        <ContributionGraphBlock
                                            className={cn(
                                                'data-[level="0"]:fill-[#ebedf0] dark:data-[level="0"]:fill-[#161b22]',
                                                'data-[level="1"]:fill-[#9be9a8] dark:data-[level="1"]:fill-[#0e4429]',
                                                'data-[level="2"]:fill-[#40c463] dark:data-[level="2"]:fill-[#006d32]',
                                                'data-[level="3"]:fill-[#30a14e] dark:data-[level="3"]:fill-[#26a641]',
                                                'data-[level="4"]:fill-[#216e39] dark:data-[level="4"]:fill-[#39d353]',
                                                "cursor-pointer"
                                            )}
                                            activity={activity}
                                            dayIndex={dayIndex}
                                            weekIndex={weekIndex} />
                                    </g>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="font-semibold">{activity.date}</p>
                                    <p>{activity.count} contributions</p>
                                </TooltipContent>
                            </Tooltip>
                        ) : (
                            <ContributionGraphBlock
                                className={cn(
                                    'data-[level="0"]:fill-[#ebedf0] dark:data-[level="0"]:fill-[#161b22]',
                                    'data-[level="1"]:fill-[#9be9a8] dark:data-[level="1"]:fill-[#0e4429]',
                                    'data-[level="2"]:fill-[#40c463] dark:data-[level="2"]:fill-[#006d32]',
                                    'data-[level="3"]:fill-[#30a14e] dark:data-[level="3"]:fill-[#26a641]',
                                    'data-[level="4"]:fill-[#216e39] dark:data-[level="4"]:fill-[#39d353]',
                                    "cursor-pointer"
                                )}
                                activity={activity}
                                dayIndex={dayIndex}
                                weekIndex={weekIndex}
                            />
                        )
                    }}
                </ContributionGraphCalendar>

                <ContributionGraphFooter>
                    <ContributionGraphTotalCount>
                        {({ totalCount, year }) => (
                            <div className="text-muted-foreground text-xs">
                                {totalCount.toLocaleString('en')} contributions in {year} on{' '}
                                <a
                                    className="font-medium underline underline-offset-4"
                                    href={`https://github.com/${username}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    GitHub
                                </a>
                                .
                            </div>
                        )}
                    </ContributionGraphTotalCount>

                    <ContributionGraphLegend />
                </ContributionGraphFooter>
            </ContributionGraph>
        </TooltipProvider>
    )
}


export function GitHubContributionFallback() {
    return (
        <div className="flex h-[162px] w-full items-center justify-center">
            <LoaderIcon className="animate-spin text-muted-foreground" />
        </div>
    )
}