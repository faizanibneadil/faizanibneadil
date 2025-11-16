'use client'
import { formatSlug } from "@/fields/slug/formatSlug";
import { sdk } from "@/lib/sdk";
import { Icon } from "@iconify/react";
import { getTranslation } from '@payloadcms/translations';
import {
    Gutter,
    ListControls,
    ListHeader,
    ListSelection,
    PageControls,
    RelationshipProvider,
    RenderCustomComponent,
    SelectionProvider,
    SelectMany,
    StickyToolbar,
    TableColumnsProvider,
    useBulkUpload,
    useConfig,
    useListDrawerContext,
    useListQuery,
    useModal,
    useStepNav,
    useTableColumns,
    useTranslation,
    useWindowInfo,
    ViewDescription
} from "@payloadcms/ui";
import { useRouter } from "next/navigation";
import { ListViewClientProps, StaticDescription } from "payload";
import { formatAdminURL, formatFilesize } from "payload/shared";
import React from "react";

const baseClass = "collection-list";

export function CollectionView(props: ListViewClientProps) {
    const {
        AfterList,
        AfterListTable,
        beforeActions,
        BeforeList,
        BeforeListTable,
        collectionSlug,
        columnState,
        Description,
        disableBulkDelete,
        disableBulkEdit,
        disableQueryPresets,
        enableRowSelections,
        hasCreatePermission: hasCreatePermissionFromProps,
        hasDeletePermission,
        listMenuItems,
        newDocumentURL,
        queryPreset,
        queryPresetPermissions,
        renderedFilters,
        resolvedFilterOptions,
        viewType,
    } = props

    const { allowCreate, createNewDrawerSlug, isInDrawer, onBulkSelect } = useListDrawerContext()
    const hasCreatePermission = allowCreate !== undefined ? allowCreate && hasCreatePermissionFromProps : hasCreatePermissionFromProps
    const {
        config: {
            routes: { admin: adminRoute },
        },
        getEntityConfig,
    } = useConfig()
    const router = useRouter()
    const { data, isGroupingBy } = useListQuery()
    const { openModal } = useModal()
    const { drawerSlug: bulkUploadDrawerSlug, setCollectionSlug, setOnSuccess } = useBulkUpload()

    const collectionConfig = getEntityConfig({ collectionSlug })

    const { labels, upload } = collectionConfig

    const isUploadCollection = Boolean(upload)

    const isBulkUploadEnabled = isUploadCollection && collectionConfig.upload.bulkUpload

    const isTrashEnabled = Boolean(collectionConfig.trash)

    const { i18n } = useTranslation()

    const { setStepNav } = useStepNav()

    const {
        breakpoints: { s: smallBreak },
    } = useWindowInfo()

    const docs = React.useMemo(() => {
        if (isUploadCollection) {
            return data?.docs?.map((doc) => {
                return {
                    ...doc,
                    filesize: formatFilesize(doc.filesize),
                }
            })
        } else {
            return data?.docs
        }
    }, [data?.docs, isUploadCollection])

    const openBulkUpload = React.useCallback(() => {
        setCollectionSlug(collectionSlug)
        openModal(bulkUploadDrawerSlug)
        setOnSuccess(() => router.refresh())
    }, [router, collectionSlug, bulkUploadDrawerSlug, openModal, setCollectionSlug, setOnSuccess])

    React.useEffect(() => {
        if (!isInDrawer) {
            const baseLabel = {
                label: getTranslation(labels?.plural, i18n),
                url:
                    isTrashEnabled && viewType === 'trash'
                        ? formatAdminURL({
                            adminRoute,
                            path: `/collections/${collectionSlug}`,
                        })
                        : undefined,
            }

            const trashLabel = {
                label: i18n.t('general:trash'),
            }

            const navItems =
                isTrashEnabled && viewType === 'trash' ? [baseLabel, trashLabel] : [baseLabel]

            setStepNav(navItems)
        }
    }, [adminRoute, setStepNav, labels, isInDrawer, isTrashEnabled, viewType, i18n, collectionSlug])
    return (
        <React.Fragment>
            <TableColumnsProvider collectionSlug={collectionSlug} columnState={columnState}>
                <div className={`${baseClass} ${baseClass}--${collectionSlug}`}>
                    <SelectionProvider docs={docs || []} totalDocs={data?.totalDocs ?? 0}>
                        {BeforeList}
                        <Gutter className={`${baseClass}__wrap`}>
                            <ListHeader
                                collectionConfig={collectionConfig}
                                Description={
                                    <div className={`${baseClass}__sub-header`}>
                                        <RenderCustomComponent
                                            CustomComponent={Description}
                                            Fallback={
                                                <ViewDescription
                                                    collectionSlug={collectionSlug}
                                                    description={collectionConfig?.admin?.description as StaticDescription}
                                                />
                                            }
                                        />
                                    </div>
                                }
                                disableBulkDelete={disableBulkDelete}
                                disableBulkEdit={disableBulkEdit}
                                hasCreatePermission={hasCreatePermission}
                                hasDeletePermission={hasDeletePermission}
                                i18n={i18n}
                                isBulkUploadEnabled={(isBulkUploadEnabled as boolean) && !upload.hideFileInputOnCreate}
                                isTrashEnabled={isTrashEnabled}
                                newDocumentURL={newDocumentURL}
                                openBulkUpload={openBulkUpload}
                                smallBreak={smallBreak}
                                viewType={viewType}
                            />
                            <ListControls
                                beforeActions={
                                    enableRowSelections && typeof onBulkSelect === 'function'
                                        ? beforeActions
                                            ? [...beforeActions, <SelectMany key="select-many" onClick={onBulkSelect} />]
                                            : [<SelectMany key="select-many" onClick={onBulkSelect} />]
                                        : beforeActions
                                }
                                collectionConfig={collectionConfig}
                                collectionSlug={collectionSlug}
                                disableQueryPresets={
                                    collectionConfig?.enableQueryPresets !== true || disableQueryPresets
                                }
                                listMenuItems={listMenuItems}
                                queryPreset={queryPreset}
                                queryPresetPermissions={queryPresetPermissions}
                                renderedFilters={renderedFilters}
                                resolvedFilterOptions={resolvedFilterOptions}
                            />
                            {BeforeListTable}
                            {docs && docs?.length > 0 && (
                                <RelationshipProvider>
                                    <Grid />
                                </RelationshipProvider>
                            )}
                            {docs?.length === 0 && (
                                <RenderSearchResults />
                                // <div className={`${baseClass}__no-results`}>
                                //     <p>
                                //         {i18n.t(viewType === 'trash' ? 'general:noTrashResults' : 'general:noResults', {
                                //             label: getTranslation(labels?.plural, i18n),
                                //         })}
                                //     </p>
                                //     {hasCreatePermission && newDocumentURL && viewType !== 'trash' && (
                                //         <React.Fragment>
                                //             {isInDrawer ? (
                                //                 <Button el="button" onClick={() => openModal(createNewDrawerSlug as string)}>
                                //                     {i18n.t('general:createNewLabel', {
                                //                         label: getTranslation(labels?.singular, i18n),
                                //                     })}
                                //                 </Button>
                                //             ) : (
                                //                 <Button el="link" to={newDocumentURL}>
                                //                     {i18n.t('general:createNewLabel', {
                                //                         label: getTranslation(labels?.singular, i18n),
                                //                     })}
                                //                 </Button>
                                //             )}
                                //         </React.Fragment>
                                //     )}
                                // </div>
                            )}
                            {AfterListTable}
                            {docs && docs?.length > 0 && !isGroupingBy && (
                                <PageControls
                                    AfterPageControls={
                                        smallBreak ? (
                                            <div className={`${baseClass}__list-selection`}>
                                                <ListSelection
                                                    collectionConfig={collectionConfig}
                                                    disableBulkDelete={disableBulkDelete}
                                                    disableBulkEdit={disableBulkEdit}
                                                    label={getTranslation(collectionConfig.labels.plural, i18n)}
                                                    showSelectAllAcrossPages={!isGroupingBy}
                                                />
                                                <div className={`${baseClass}__list-selection-actions`}>
                                                    {enableRowSelections && typeof onBulkSelect === 'function'
                                                        ? beforeActions
                                                            ? [
                                                                ...beforeActions,
                                                                <SelectMany key="select-many" onClick={onBulkSelect} />,
                                                            ]
                                                            : [<SelectMany key="select-many" onClick={onBulkSelect} />]
                                                        : beforeActions}
                                                </div>
                                            </div>
                                        ) : null
                                    }
                                    collectionConfig={collectionConfig}
                                />
                            )}
                        </Gutter>
                        {AfterList}
                    </SelectionProvider>
                </div>
            </TableColumnsProvider>
            {docs && docs?.length > 0 && isGroupingBy && data && data?.totalPages > 1 && (
                <StickyToolbar>
                    <PageControls collectionConfig={collectionConfig} />
                </StickyToolbar>
            )}
        </React.Fragment>
    )
}

function Grid() {
    const { data } = useListQuery()
    const { columns } = useTableColumns()
    const activeColumns = columns?.filter((col) => col?.active).sort((a, b) => {
        const pa = a.accessor === "title" ? 1 : 0;
        const pb = b.accessor === "title" ? 1 : 0;
        return pa - pb;
    })

    const docs = data?.docs?.map((row, rowIndex) => (
        <div key={`${String(row.id)}-${rowIndex}`} className="">
            {activeColumns.map(({ accessor, renderedCells }, colIndex) => {
                return accessor === 'title' ? (
                    <div className="p-2 truncate" key={colIndex}>
                        {renderedCells[rowIndex]}
                    </div>
                ) : (
                    <div className="p-2 bg-[#2f2f2f] rounded-lg" key={colIndex}>
                        {renderedCells[rowIndex]}
                    </div>
                )
            })}
        </div>
    ))



    return (
        <div className="grid grid-cols-12 gap-2">
            {docs}
        </div>
    )
}

function RenderSearchResults() {
    const router = useRouter()
    const [_icons, setIcons] = React.useState<Record<string, any>>({})
    const { query } = useListQuery()

    React.useEffect(() => {
        if (query.search) {
            const url = new URL('/search', 'https://api.iconify.design')
            url.searchParams.set('query', query.search)
            fetch(url.toString()).then(res => res.json()).then(setIcons)
        }
    }, [query.search])

    async function onCreateIcon(icon: string) {
        try {
            const url = new URL(window.location.href)
            const isAlreadyExist = await sdk.find({
                collection: 'icons',
                where: { slug: { equals: formatSlug(icon) } },
                select: { slug: true }
            })
            if (isAlreadyExist.docs?.length) {
                await sdk.update({
                    where: { slug: { equals: formatSlug(icon) } },
                    collection: 'icons',
                    data: {
                        title: icon,
                        slug: formatSlug(icon),
                        iconSpecs: {
                            type: 'html',
                            iconCode: '<svg></svg>'
                        }
                    },
                })
            } else {
                await sdk.create({
                    collection: 'icons',
                    data: {
                        title: icon,
                        slug: formatSlug(icon),
                        iconSpecs: {
                            type: 'html',
                            iconCode: '<svg></svg>'
                        }
                    }
                })
            }
            
            setTimeout(() => {
                url.searchParams.delete('search')
                router.replace(url.toString())
            })
        } catch (error) {
            console.error('Something went wrong when adding icon in icons collection', error)
        }
    }

    const icons = _icons?.icons?.map((icon: string, idx: number) => (
        <div role="button" onClick={() => onCreateIcon(icon)} key={`${icon}-${idx}`} className="cursor-pointer">
            <div className="p-2 bg-[#2f2f2f] rounded-lg" >
                <Icon width='100%' height='5.5em' className='p-4' icon={icon} />
            </div>
            <div className="p-2 truncate" >
                {icon}
            </div>
        </div>
    ))

    return (
        <div className="grid grid-cols-12 gap-2">
            {icons}
        </div>
    )
}