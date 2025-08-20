import { IncomingCollectionVersions, SanitizedCollectionVersions } from "node_modules/payload/dist/versions/types";

export const VersionConfig = (config?: IncomingCollectionVersions): IncomingCollectionVersions => {
    return {
        drafts: {
            autosave: {
                interval: 375,
            },
            schedulePublish: true,
        },
        maxPerDoc: 50,
        ...(config || {})
    }
}