import type { JobsConfig } from "payload";
import { Invalidator } from '@/jobs/tasks/Invalidator'

export const jobs: JobsConfig = {
    jobsCollectionOverrides: ({ defaultJobsCollection }) => ({
        ...defaultJobsCollection,
        admin: {
            ...defaultJobsCollection.admin,
            hidden: false,
        },
    }),
    autoRun: [{ queue: 'invalidator' }],
    tasks: [Invalidator]
}