'use client'
import { IconRenderrer } from '@/components/ui/icon-renderrer'
import { TIconProps } from '@/payload-types'
import { Drawer, DrawerToggler, Pagination, Button, useField, TextInput } from '@payloadcms/ui'
import type { SelectFieldClientProps } from 'payload'
import { useState, useMemo, useCallback } from 'react'

const slug = 'ICON_PICKER_DRAWER'
const ICONS_PER_PAGE = 80

export function IconPickerDrawer(props: SelectFieldClientProps) {
    const { value, setValue } = useField({ path: props?.path })
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState('')

    const allIcons = useMemo(() => {
        return props?.field?.options?.map(option =>
            typeof option === 'object' ? option.value : option
        ) || []
    }, [props?.field?.options])

    // Filter icons based on search term
    const filteredIcons = useMemo(() => {
        if (!searchTerm) return allIcons
        return allIcons.filter(icon =>
            icon.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }, [allIcons, searchTerm])

    const paginatedIcons = useMemo(() => {
        const startIndex = (currentPage - 1) * ICONS_PER_PAGE
        const endIndex = startIndex + ICONS_PER_PAGE
        return filteredIcons.slice(startIndex, endIndex)
    }, [filteredIcons, currentPage])

    const totalPages = useMemo(() => {
        return Math.ceil(filteredIcons.length / ICONS_PER_PAGE)
    }, [filteredIcons.length])

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    // Reset to first page when search term changes
    const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
        setCurrentPage(1)
    }, [])

    return (
        <>
            <DrawerToggler slug={slug} className='!p-0 !m-0 !bg-none'>
                <Button className='p-0 m-0 !bg-none' tooltip='Open Icon Picker'><IconRenderrer icon={value as TIconProps} /></Button>
            </DrawerToggler>
            <Drawer slug={slug} title='Icons'>
                <div className='field-type text'>
                    <div className='field-type__wrap'>
                        <input
                            placeholder='Search icons...'
                            value={searchTerm}
                            onChange={handleSearch}
                            type='text'
                        />
                    </div>
                </div>
                <div className='mt-2 grid grid-cols-3 md:grid-cols-12 gap-2 place-items-stretch'>
                    {paginatedIcons.length > 0 ? (
                        paginatedIcons.map(icon => (
                            <button
                                key={icon}
                                onClick={() => setValue(icon)}
                                className={`p-4 rounded-md border-1 bg-none outline-none hover:bg-gray-100 transition-colors ${value === icon ? 'border-blue-500 bg-blue-50' : 'border-transparent'}`}
                            >
                                <IconRenderrer icon={icon as TIconProps} size={30} />
                            </button>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-8 text-gray-500">
                            No icons found matching "{searchTerm}"
                        </div>
                    )}
                </div>

                {/* Pagination controls */}
                {totalPages > 1 && (
                    <div className="flex w-full items-center justify-end mt-4">
                        <Pagination
                            hasNextPage={currentPage < totalPages}
                            hasPrevPage={currentPage > 1}
                            limit={ICONS_PER_PAGE}
                            nextPage={currentPage + 1}
                            numberOfNeighbors={1}
                            onChange={handlePageChange}
                            page={currentPage}
                            prevPage={currentPage - 1}
                            totalPages={totalPages}
                        />
                    </div>
                )}
            </Drawer>
        </>
    )
}