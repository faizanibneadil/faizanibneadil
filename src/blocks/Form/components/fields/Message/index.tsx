import RichText from '@/components/RichText'
import React from 'react'

import { Width } from '../Width'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { PagePropsWithParams } from '@/types'

export const Message: React.FC<{ message: DefaultTypedEditorState,params:Awaited<PagePropsWithParams['params']> }> = ({ message, params}) => {
  return (
    <Width className="my-12" width="100">
      {message && <RichText params={params} data={message} />}
    </Width>
  )
}