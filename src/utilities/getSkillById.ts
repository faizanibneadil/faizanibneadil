import { getPayloadConfig } from "./getPayloadConfig"

// TODO: wrap into next unstable cache for better performance
export const getSkillById = async ({ id }: { id: number }) => {
  const payload = await getPayloadConfig()
  const skill = await payload.findByID({ collection: 'skills', id })
  return skill
}