export const VersionConfig = (config?: any): any => {
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