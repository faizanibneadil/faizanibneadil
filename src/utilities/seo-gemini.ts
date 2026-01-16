import type { CollectionSlug } from "payload";

export async function seoGemini({
    collection,
    data,
    entity
}: {
    data: any,
    collection: CollectionSlug,
    entity: 'title' | 'description'
}) {
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'
    let generatedContent = ''
    const characters = entity === 'title' ? '50-60' : '100-150'
    const maxCharacters = entity === 'title' ? '60' : '150'

    const prompt = `Generate an SEO-optimized meta ${entity} for the following ${collection} content. 
The output MUST be between ${characters} characters ONLY. 
Do not exceed ${maxCharacters} characters under any circumstances. 
Include primary keywords and a call to action when appropriate. 
Return ONLY the meta ${entity} text without extra words or explanations.
${collection} Content: ${data}`;
    try {

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-goog-api-key': process.env.GEMINI_API_KEY!
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: { maxOutputTokens: 150, temperature: 0.7 }
            })
        })
        const json = await response.json()
        generatedContent = json?.candidates?.[0]?.content?.parts?.[0]?.text;
    } catch (error) {
        console.error(error)
        generatedContent = data
    }
    return generatedContent
}