import type { JobsConfig } from "payload";

export const jobs: JobsConfig = {
    jobsCollectionOverrides: ({ defaultJobsCollection }) => ({
        ...defaultJobsCollection,
        admin: {
            ...defaultJobsCollection.admin,
            hidden: false,
        },
    }),
    autoRun: [],
    tasks: []
}