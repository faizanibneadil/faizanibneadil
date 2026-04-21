import { getPayloadConfig } from "./getPayloadConfig"

// TODO: wrap into next unstable cache for better performance
export const getProjectById = async ({id}:{id: number}) => {
    const payload = await getPayloadConfig()
    const project = await payload.findByID({ collection: 'projects', id })
    return project
}