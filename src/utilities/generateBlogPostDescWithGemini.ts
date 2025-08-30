import { convertLexicalToPlaintext } from "@payloadcms/richtext-lexical/plaintext";
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'


export async function generateBlogPostDescWithGemini(data: SerializedEditorState) {
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'
    let description = ''

    const prompt = `Generate an SEO-optimized meta description for the following blog content. 
The output MUST be between 100-150 characters ONLY. 
Do not exceed 150 characters under any circumstances. 
Include primary keywords and a call to action when appropriate. 
Return ONLY the meta description text without extra words or explanations.
                    Blog Content: ${convertLexicalToPlaintext({ data })}`;
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
        description = json?.candidates?.[0]?.content?.parts?.[0]?.text;

    } catch (error) {
        console.error(error)
        description = convertLexicalToPlaintext({ data })
    }
    return description
}