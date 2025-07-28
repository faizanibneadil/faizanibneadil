'use client'
import { Drawer, DrawerToggler } from '@payloadcms/ui'
export function CollectionSlugField() {
    return (
        <>
            <DrawerToggler slug='my-collection'>OPEN</DrawerToggler>
            <Drawer slug='my-collection' title='Collections'>
                <div className='grid grid-cols-3 md:grid-cols-12'>
                    <div>One</div>
                    <div>One</div>
                    <div>One</div>
                    <div>One</div>
                    <div>One</div>
                    <div>One</div>
                    <div>One</div>
                    <div>One</div>
                    <div>One</div>
                    <div>One</div>
                    <div>One</div>
                    <div>One</div>
                    <div>One</div>
                    <div>One</div>
                    <div>One</div>
                    <div>One</div>
                    <div>One</div>
                </div>
            </Drawer>
        </>
    )
}