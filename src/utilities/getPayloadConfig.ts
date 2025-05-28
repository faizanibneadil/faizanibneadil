import config from '@payload-config'
import { getPayload } from "payload"

export const getPayloadConfig = async () => await getPayload({ config }) 