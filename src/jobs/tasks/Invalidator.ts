import { getServerSideURL } from "@/utilities/getURL";
import { TaskConfig } from "payload";

export const Invalidator: TaskConfig<'invalidator'> = {
    inputSchema: [{
        type: 'relationship',
        relationTo: 'tenants',
        name: 'tenant'
    }, {
        type: 'relationship',
        relationTo: 'pages',
        name: 'page'
    },{
        type: 'checkbox',
        name: 'invalidateRootRoute',
        defaultValue: false
    },{
        type: 'checkbox',
        name: 'invalidateAllRoutes',
        defaultValue: false
    }],
    outputSchema: [{
        type: 'checkbox',
        name: 'success',
        defaultValue: false
    }],
    interfaceName: 'TInvalidatorTask',
    slug: 'invalidator',
    handler: async ({ input, req }) => {
        try {
            const logger = req.payload.logger

            if (!input.tenant) {
                logger.error('Tenant is required in invalidator')
                throw new Error('Tenant is required in invalidator')
            }

            const url = new URL("/api/invalidate", getServerSideURL())
            const response = await fetch(url.toString(), {
                body: JSON.stringify({ ...input }),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            if (!response.ok) {
                throw new Error('Something went wrong from api of route invalidate')
            }


            return {
                output: {
                    success: true
                },
                state: 'succeeded'
            }
        } catch (error) {
            console.log({ error }, 'Something went wrong to invalidate route.')
            return {
                output: {
                    success: false
                },
                state: 'failed'
            }
        }
    },
    onSuccess: ({ input }) => {
        
    }
}