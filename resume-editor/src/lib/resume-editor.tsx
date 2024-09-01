"use client"
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from "@tiptap/starter-kit"
import Document from '@tiptap/extension-document'
import Typography from "@tiptap/extension-typography"
import { useEffect } from 'react'

import { TiptapToolbar } from './ToolBar'
import Text from '@tiptap/extension-text'
import './index.css'
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
      Document,
      StarterKit.configure({ document: false }),
      Typography,
      Text
    ],
    immediatelyRender: false,
    content,

    editorProps: {
      attributes: {
        class: 'prose prose-sm bg-white shadow focus:outline-none w-full max-w-full h-screen',
      }
    },

  }, [])

  useEffect(() => {
    if (!editor) {
      return undefined
    }
    (window as any).editor = editor

    editor.setEditable(!preview)
  }, [editor, preview])

  return (
    <>
      <TiptapToolbar editor={editor} />
      <EditorContent editor={editor} />
    </>
  )
}
