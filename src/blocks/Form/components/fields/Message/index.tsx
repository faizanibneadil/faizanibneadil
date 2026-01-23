import RichText from '@/components/RichText'
import React from 'react'

import { Width } from '../Width'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { PageProps } from '@/types'

export const Message: React.FC<{ message: DefaultTypedEditorState, params: Awaited<PageProps['params']>, searchParams: Awaited<PageProps['searchParams']> }> = ({ message, params,searchParams }) => {
  return (
    <Width className="my-12" width="100">
      {message && <RichText params={params} data={message} searchParams={searchParams} />}
    </Width>
  )
}