import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from "@tiptap/starter-kit"
import Document from '@tiptap/extension-document'
import Typography from "@tiptap/extension-typography"
import { TextAlign } from '@tiptap/extension-text-align'
import { useEffect } from 'react'
import { Paragraph } from '@tiptap/extension-paragraph'
import { TiptapToolbar } from './ToolBar'
import Text from '@tiptap/extension-text'
import Color from '@tiptap/extension-color'
import { SpacerNode } from "@easy-access/spacer-extension"
import Focus from '@tiptap/extension-focus'
import './index.css'
import { Column, ColumnBlock } from '@easy-access/column-extension'
import { Command, suggestion } from '@easy-access/commands-extension'
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
        // content: '(columnBlock)*',
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
      Column,
      ColumnBlock,
      Color.configure({
        types: ['textStyle'],
      }),
      Focus.configure({
        className: '!border-primary',
        mode: "deepest"
      }),
      SpacerNode,
      Command.configure({
        HTMLAttributes: {
          class: 'command'
        },
        suggestion
      }),
      TextAlign.configure({
        types: ['paragraph'],
        defaultAlignment: 'left'
      }),
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
