import { NextRequest, NextResponse } from "next/server";
import { protocol, rootDomain } from "./lib/utils";

export async function middleware(req: NextRequest) {
    const url = req.url
    const host = req.headers.get('host') || ''
    const hostname = host?.split(':')[0]
    console.log({ url, host, hostname, rootDomain, protocol })
    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all paths except for:
         * 1. /api routes
         * 2. /_next (Next.js internals)
         * 3. all root files inside /public (e.g. /favicon.ico)
         */
        '/((?!api|_next|[\\w-]+\\.\\w+).*)'
    ]
};