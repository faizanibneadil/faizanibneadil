import * as cheerio from 'cheerio';

export const getLinkInfo = async (url: string) => {
    let title: string | null = null;
    let description: string | null = null;
    let image: string | null = null;
    let favicon: string | null = null;

    try {
        const decodedUrl = decodeURIComponent(url);
        const _url = new URL(decodedUrl);

        const res = await fetch(_url.toString(), {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; LinkPreviewBot/1.0)',
            },
        });

        const html = await res.text();
        const $ = cheerio.load(html);

        // -------------------------
        // TITLE
        // -------------------------
        title =
            $('meta[property="og:title"]').attr('content') ||
            $('title').text() ||
            null;

        // -------------------------
        // DESCRIPTION
        // -------------------------
        description =
            $('meta[property="og:description"]').attr('content') ||
            $('meta[name="description"]').attr('content') ||
            null;

        // -------------------------
        // IMAGE
        // -------------------------
        image = $('meta[property="og:image"]').attr('content') || null;

        // -------------------------
        // FAVICON (multiple options)
        // -------------------------
        favicon =
            $('link[rel="icon"]').attr('href') ||
            $('link[rel="shortcut icon"]').attr('href') ||
            $('link[rel="apple-touch-icon"]').attr('href') ||
            null;

        // -------------------------
        // FIX RELATIVE URLS
        // -------------------------
        const makeAbsolute = (link: string | null) => {
            if (!link) return null;
            try {
                return new URL(link, _url.origin).href;
            } catch {
                return link;
            }
        };

        image = makeAbsolute(image);
        favicon = makeAbsolute(favicon);

        // -------------------------
        // FAVICON FALLBACK
        // -------------------------
        if (!favicon) {
            favicon = `${_url.origin}/favicon.ico`;
        }

    } catch (error) {
        console.error('Error extracting preview:', error);
    }

    return {
        title,
        description,
        image,
        favicon,
    };
};