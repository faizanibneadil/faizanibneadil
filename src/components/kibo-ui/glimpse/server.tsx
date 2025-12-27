const TITLE_REGEX = /<title[^>]*>([^<]+)<\/title>/;
const OG_TITLE_REGEX = /<meta[^>]*property="og:title"[^>]*content="([^"]+)"/;
const DESCRIPTION_REGEX = /<meta[^>]*name="description"[^>]*content="([^"]+)"/;
const OG_DESCRIPTION_REGEX = /<meta[^>]*property="og:description"[^>]*content="([^"]+)"/;
const OG_IMAGE_REGEX = /<meta[^>]*property="og:image"[^>]*content="([^"]+)"/;

function decodeUrl(url: string): string {
  try {
    const decodedUrl = decodeURIComponent(url);
    // console.log({decodedUrl})
    if (decodedUrl === url) {
      return decodedUrl;
    }
    return decodeUrl(decodedUrl);

  } catch (error) {
    console.error("Something went wrong to decode url", error)
    return url;
  }
}

export const glimpse = async (url: string) => {
  let title: string | null = null
  let description: string | null = null
  let image: string | null = null
  // console.log({ url })
  const decodedUrl = decodeUrl(url)
  // console.log({ decodedUrl })
  if (decodedUrl) {
    try {
      const _url = new URL(decodedUrl)
      const _doc = await fetch(_url.toString());
      const docText = await _doc.text();
      const titleMatch = docText.match(TITLE_REGEX) || docText.match(OG_TITLE_REGEX);
      const descriptionMatch = docText.match(DESCRIPTION_REGEX) || docText.match(OG_DESCRIPTION_REGEX);
      const imageMatch = docText.match(OG_IMAGE_REGEX);

      title = titleMatch?.at(1) ?? null
      description = descriptionMatch?.at(1) ?? null
      image = imageMatch?.at(1) ?? null
    } catch (error) {
      console.error('Something went wrong to extract title, description, image from glimpse provided url', error)
    }
  }

  // console.log({ title, description, image })

  return {
    title,
    description,
    image,
  };
};
