import { NextRequest, NextResponse, userAgent } from "next/server";

const deviceQueryParams = {
    mobile: 'm',
    desktop: 'd',
    tablet: 't',
}
export function proxy(req: NextRequest) {
    const { device: { type = 'desktop' } } = userAgent(req)
    const deviceType = type as keyof typeof deviceQueryParams || 'desktop';
    const paramValue = deviceQueryParams[deviceType] || 'd';
    const url = req.nextUrl.clone();

    if (url.searchParams.get('vp') === paramValue) {
        return NextResponse.next();
    }
    url.searchParams.set('vp', paramValue);

    return NextResponse.redirect(url);
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};