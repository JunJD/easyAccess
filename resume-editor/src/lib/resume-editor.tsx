"use client"
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from "@tiptap/starter-kit"
import Document from '@tiptap/extension-document'
import Typography from "@tiptap/extension-typography"
import { useEffect } from 'react'
import { Paragraph } from '@tiptap/extension-paragraph'
import { TiptapToolbar } from './ToolBar'
import Text from '@tiptap/extension-text'
import Color from '@tiptap/extension-color'
import { SpacerNode } from "@easy-access/spacer-extension"
import Focus from '@tiptap/extension-focus'
import './index.css'
import { ResumeTextStyle } from '@easy-access/text-extensions'
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
      StarterKit.configure({ paragraph: false, heading: false, document: false }),
      Paragraph.extend({
        draggable: true,
        addKeyboardShortcuts: () => ({
          "mod-a": ({ editor }) => {
            editor.chain().focus().selectAll().run()
            return true
          }
        })
      }).configure({
        HTMLAttributes: {
          class: 'box-border border border-transparent rounded-sm'
        }
      }),
      Text,
      ResumeTextStyle,
      Color.configure({
        types: ['textStyle'],
      }),
      Focus.configure({
        className: '!border-primary',
        mode: "deepest"
      }),
      SpacerNode,
      Typography,
    ],
    immediatelyRender: false,
    content,

    editorProps: {
      attributes: {
        class: 'prose prose-sm aspect-a4 bg-white shadow focus:outline-none w-full',
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
