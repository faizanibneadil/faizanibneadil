import config from '@payload-config'
import { getPayload } from 'payload'

export const queryShelves = async () => {
    const payload = await getPayload({config})
    const shelves = await payload.find({
        collection: 'shelves',
        pagination: true
    })

    return shelves
}