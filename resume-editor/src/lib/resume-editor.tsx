"use client"
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from "@tiptap/starter-kit"
import Document from '@tiptap/extension-document'
import Typography from "@tiptap/extension-typography"
import { useEffect } from 'react'
import { SectionNode } from '../extensions/node/section'
// import { extensions } from './extensions'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import { TiptapToolbar } from './ToolBar'
import { Column, ColumnBlock } from '@easy-access/column-extension'
import TableRow from "@tiptap/extension-table-row";

import { TableCellExtension, TableExtension, TableHeaderExtension } from '@easy-access/superTable-extension'
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
      // override Document to allow columns
      StarterKit.configure({ document: false }),
      Document.extend({
        content: 'columnBlock'
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      ColumnBlock.extend({
        content: 'column+',
        addAttributes() {
          return {
            class: {
              default: 'h-screen'
            },
          }
        },
      }),
      TableExtension.configure({
        HTMLAttributes: {
          class: "table-extension",
        },
      }),
      TableRow,
      TableHeaderExtension,
      TableCellExtension,
      Column.extend({
        content: "(paragraph|block|section)+",
        // content: "(paragraph|block)*",
        addAttributes() {
          return {
            class: {
              default: 'h-screen'
            },
          }
        },
      }),
      SectionNode.extend({
        content: "(paragraph|block|column)*",
      }),
      Typography,
    ],
    immediatelyRender: false,
    content: {
      type: 'doc',
      content: [
        {
          type: 'columnBlock',
          content: [
            {
              type: 'column',
            },
          ],
        },
      ],
    },

    editorProps: {
      attributes: {
        class: 'prose prose-sm focus:outline-none w-full max-w-full h-screen',
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
      <EditorContent className='prose prose-sm focus:outline-none w-full max-w-full' editor={editor} />
    </>
  )
}
