import { formatSlug } from "@/fields/slug/formatSlug";
import type { BasePayload } from "payload";

const industries = [
    // Must-have portfolio industries
    "Frontend Development",
    "Fullstack Development",
    "UX/UI Design",
    "Mobile App Development",
    "Game Development",
    "Product Design",
    "Graphic Design",
    "Branding",
    "Motion Graphics",
    "Animation",
    "Illustration",
    "3D Design",
    "Video Editing",
    "Photography",
    "Architecture",
    "Interior Design",
    "Content Writing",
    "Copywriting",
    "Technical Writing",
    "Journalism",
    "Creative Writing",
    "Social Media Management",
    "Digital Marketing",
    "Performance Marketing",
    "SEO Specialist",
    "Email Marketing",
    "Funnel Building",

    // Optional but beneficial
    "Project Management",
    "Product Management",
    "Business Consulting",
    "Data Science",
    "Data Analysis",
    "Machine Learning",
    "Business Intelligence",

    // Additional
    "Education & Training",
    "Fitness Training",
    "Nutrition",
    "Music & Audio",
    "Influencer / Creator",
    "Public Speaking",
    "Event Planning",
    "Real Estate",
    "B2B Sales"
];

export async function createIndustries(payload: BasePayload) {
    try {
        const _industries = industries
            .map(item => {
                return {
                    title: item,
                    slug: formatSlug(item)
                }
            })
            .map(item => {
                return payload.db.upsert({
                    collection: 'industries',
                    data: {
                        title: item.title,
                        slug: item.slug
                    },
                    where: { slug: { equals: item.slug }}
                })
            })
        await Promise.all(_industries)
    } catch (error) {
        payload.logger.error(error, 'Something went wrong when creating industries')
    }
}