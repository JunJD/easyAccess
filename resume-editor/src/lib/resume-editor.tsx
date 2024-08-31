"use client"
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from "@tiptap/starter-kit"
import Document from '@tiptap/extension-document'
import Typography from "@tiptap/extension-typography"
import { useEffect } from 'react'
import { SectionNode } from '../extensions/node/section'
// import { extensions } from './extensions'


interface Props {
  content: string | undefined;
  preview: boolean
}
export const ResumeEditor = ({
  content,
  preview
}: Props) => {
  const editor = useEditor({
    extensions: [
      SectionNode,
      Document.extend({
        content: 'section+'
      }),
      StarterKit.configure({  heading: false, document: false, blockquote: false }),
      Typography
    ],
    content: `
      <page-section>
        <p>Make something amazing!</p>
      </page-section>
    `,
    editorProps: {
      attributes: {
        class: 'prose prose-sm focus:outline-none w-full max-w-full',
      }
    },
  }, [])

  useEffect(() => {
    if (!editor) {
      return undefined
    }
    editor.setEditable(!preview)
  }, [editor, preview])

  return (
    <>
      <EditorContent className='prose prose-sm focus:outline-none w-full max-w-full' editor={editor} />
    </>
  )
}
