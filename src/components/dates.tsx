import React from 'react';

export type DatesProps = {
    from?: string | null | undefined;
    to?: string | null | undefined;
};

export function Dates({ from, to }: DatesProps) {
    const formatDate = (dateString: string | null | undefined) => {
        if (!dateString) return null;

        const date = new Date(dateString);
        if (isNaN(date.getTime())) return null;

        return {
            month: date.toLocaleString('default', { month: 'short' }),
            year: date.getFullYear(),
            datetime: date.toISOString()
        };
    };

    const start = formatDate(from);
    const end = formatDate(to);

    // Only 'to' date exists
    if (!start && end) {
        return (
            <time className="font-sans text-xs" dateTime={end.datetime}>
                {end.month} {end.year}
            </time>
        );
    }

    // Only 'from' date exists
    if (start && !end) {
        return (
            <time className="font-sans text-xs" dateTime={start.datetime}>
                {start.month} {start.year}
            </time>
        );
    }

    // Both dates exist
    if (start && end) {
        const isSameYear = start.year === end.year;
        const isSameMonth = start.month === end.month;

        if (isSameMonth && isSameYear) {
            return (
                <time className="font-sans text-xs" dateTime={start.datetime}>
                    {start.month} {start.year}
                </time>
            );
        }

        if (isSameYear) {
            return (
                <>
                    <time className="font-sans text-xs" dateTime={start.datetime}>
                        {start.month}
                    </time>
                    {' - '}
                    <time className="font-sans text-xs" dateTime={end.datetime}>
                        {end.month} {end.year}
                    </time>
                </>
            );
        }

        return (
            <>
                <time className="font-sans text-xs" dateTime={start.datetime}>
                    {start.month} {start.year}
                </time>
                {' - '}
                <time className="font-sans text-xs" dateTime={end.datetime}>
                    {end.month} {end.year}
                </time>
            </>
        );
    }

    // Neither date exists - render nothing
    return null;
}