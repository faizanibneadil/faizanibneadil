import { GoogleGenAI, Type } from "@google/genai";
import type { CollectionSlug } from "payload";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!
});

export async function seoGemini({
    collection,
    data,
    entity
}: {
    data: any,
    collection: CollectionSlug,
    entity: 'title' | 'description'
}) {
    let generatedContent = '';
    const characters = entity === 'title' ? '50-60' : '140-160';
    const maxCharacters = entity === 'title' ? '60' : '160';

    // Entity ke hisaab se guidelines aur schema property name set karna
    const isTitle = entity === 'title';
    const propertyName = isTitle ? 'seoTitle' : 'metaDescription';
    const guideline = isTitle 
        ? `SEO Title should be catchy, include keywords, and be under ${maxCharacters} characters.`
        : `Meta Description should be a compelling summary, include keywords, and be between ${characters} characters.`;

    try {
        // Yahan function ke andar naya instance banane ki zaroorat nahi agar bahar define hai, 
        // lekin agar aap environment variable change karna chahte hain tou theek hai.
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Generate an SEO-optimized ${entity} for the following ${collection} content.
            The output MUST be between ${characters} characters ONLY.
            Include primary keywords and a call to action when appropriate.
            
            ${collection} Content: ${JSON.stringify(data)}
            
            Guidelines:
            - ${guideline}`,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        [propertyName]: {
                            type: Type.STRING,
                            description: `The optimized SEO ${entity}`,
                        },
                    },
                    required: [propertyName],
                },
            },
        });

        // Response handle karna aur string return karna
        if (response.text) {
            const parsedData = JSON.parse(response.text);
            generatedContent = parsedData[propertyName] || '';
        }

    } catch (error) {
        console.error("Gemini Error:", error);
        // Fallback to original data if string, else empty
        generatedContent = typeof data === 'string' ? data.slice(0, parseInt(maxCharacters)) : '';
    }

    return generatedContent;
}