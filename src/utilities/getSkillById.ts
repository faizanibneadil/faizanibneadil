import React from "react"
import { getPayloadConfig } from "./getPayloadConfig"

export const getSkillById = React.cache(async ({ id }: { id: number }) => {
  const payload = await getPayloadConfig()
  const skill = await payload.findByID({ collection: 'skills', id })
  return skill
})