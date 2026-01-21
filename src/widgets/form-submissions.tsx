'use client'

import React, { ErrorInfo } from "react";
import { getRecentFormSubmissions } from "@/utilities/getRecentFormSubmissions";
import { ClientWidget } from "payload";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useTenantSelection } from "@payloadcms/plugin-multi-tenant/client";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

function fallbackRender({ error, resetErrorBoundary }: FallbackProps) {
    // Call resetErrorBoundary() to reset the error boundary and retry the render.

    return (
        <div role="alert">
            <p>Something went wrong:</p>
            <pre style={{ color: "red" }}>{error.message}</pre>
            <button onClick={resetErrorBoundary}>Reset</button>
        </div>
    );
}

const logError = (error: Error, info: ErrorInfo) => {
    // Do something with the error, e.g. log to an external API
    console.error({ error, info })
};

export function FormSubmissions(props: ClientWidget) {
    const { selectedTenantID } = useTenantSelection()

    if (!selectedTenantID) {
        return null
    }

    const formSubmissions = getRecentFormSubmissions(selectedTenantID)
    return (
        <ErrorBoundary fallbackRender={fallbackRender} onError={logError}>
            <React.Suspense fallback="Loading Submissions....">
                <FormSubmissionsTable formSubmissions={formSubmissions} />
            </React.Suspense>
        </ErrorBoundary>
    )
}

function FormSubmissionsTable(props: { formSubmissions: ReturnType<typeof getRecentFormSubmissions> }) {
    const submissions = React.use(props.formSubmissions)

    if (submissions?.length === 0) {
        return null
    }

    return (
        <div className="border border-solid border-[var(--theme-border-color)] bg-[var(--theme-elevation-50)] rounded-[var(--style-radius-m)]">
            <h4 className="p-2">Recent Form Submissions</h4>
            <Table>
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                {/* <TableHeader>
                <TableRow>
                    {Object.keys(submissions?.at(0)?.submissionData?.at(0) || {}).map(k => (

                        <TableHead key={k}>{k}</TableHead>
                    ))}
                    <TableHead className="w-[100px]">Invoice</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader> */}
                <TableBody>
                    {submissions?.map((submission) => (
                        <TableRow key={submission.id}>
                            {submission?.submissionData?.map(itm => (
                                <TableCell className="p-2" key={itm.id}>{itm.value}</TableCell>
                            ))}
                            {/* <TableCell className="font-medium">{submission.submissionData.}</TableCell>
                        <TableCell>{invoice.paymentMethod}</TableCell>
                        <TableCell className="text-right">{invoice.totalAmount}</TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell className='p-2' colSpan={3}>These submissions are recently created.</TableCell>
                        <TableCell className="text-right p-2">View All</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}