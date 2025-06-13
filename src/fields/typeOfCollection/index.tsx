import type { TextField } from 'payload'
import { getCollectionSlug } from './hooks/afterRead/getCollectionSlug'
export function typeOfCollection(): TextField {
    return {
        type: 'text',
        name: 'type',
        admin: { disabled: true },
        hooks: {
            afterRead: [getCollectionSlug]
        }
    }
}