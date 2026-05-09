import { slugify } from "@/utilities/slugify";
import type { BasePayload } from "payload";

const industries = [
    "Web Development",
    "Mobile App Development",
    "UI/UX Design",
    "Graphic Design",
    "Branding",
    "Digital Marketing",
    "SEO",
    "Content Writing",
    "Copywriting",
    "Video Editing",
    "Animation",
    "Motion Graphics",
    "Photography",
    "Videography",
    "Architecture",
    "Interior Design",
    "Fashion Design",
    "Product Design",
    "Industrial Design",
    "Game Development",
    "3D Modeling",
    "Illustration",
    "Art & Creative",
    "Software Development",
    "Data Science",
    "Artificial Intelligence",
    "Cyber Security",
    "Cloud Engineering",
    "DevOps",
    "E-commerce",
    "Marketing & Advertising",
    "Social Media Management",
    "Film Production",
    "Music Production",
    "Voice Over",
    "Consulting",
    "Business Analysis",
    "Teaching & Training",
    "Event Management",
    "Real Estate",
]

export async function SeedIndustries(payload: BasePayload) {
    payload.logger.info('Checking industries are available or not?')
    const _industries = await payload.count({
        collection: 'industries',
    })

    if (_industries.totalDocs === 0) {
        payload.logger.info(`${_industries.totalDocs} Industries are available`)
        payload.logger.info('We need to seed industries before payload initialization.')
        payload.logger.info('Creating Industries promises.')
        const industriesPromises = industries.map(industry => {
            return payload.create({
                collection: 'industries',
                draft: false,
                data: {
                    title: industry,
                    slug: `${slugify(industry)}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`
                }
            })
        })

        payload.logger.info('Industries Seed Start')
        await Promise.all(industriesPromises)
        payload.logger.info('Industries Seed Done.')
    }
    if (_industries.totalDocs > 0) {
        payload.logger.info('So we don\'t need seed industries.')
    }


}