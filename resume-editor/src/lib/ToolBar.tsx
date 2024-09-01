import { type Editor } from "@tiptap/react";

import { TextB, TextStrikethrough, TextItalic, Minus, ListNumbers, List, ColumnsPlusRight } from "@phosphor-icons/react";
import { MdFormatSize, MdFormatLineSpacing } from 'react-icons/md'
import { Toggle } from "../components/Toggle";


type Props = {
  editor: Editor | null;
};

export function TiptapToolbar({ editor }: Props) {
  if (!editor) {
    return null;
  }

  return (
    <div className='border border-input bg-transparent'>
      <Toggle size='sm' pressed={editor.isActive("bold")} onPressedChange={() => editor.chain().focus().toggleBold().run()}>
        <TextB className='h-4 w-4' />
      </Toggle>
      <Toggle size='sm' pressed={editor.isActive("italic")} onPressedChange={() => editor.chain().focus().toggleItalic().run()}>
        <TextItalic className='h-4 w-4' />
      </Toggle>
      <Toggle size='sm' pressed={editor.isActive("strikethrough")} onPressedChange={() => editor.chain().focus().toggleStrike().run()}>
        <TextStrikethrough className='h-4 w-4' />
      </Toggle>
      <Toggle size='sm' pressed={editor.isActive("bulletList")} onPressedChange={() => editor.chain().focus().toggleBulletList().run()}>
        <List className='h-4 w-4' />
      </Toggle>
      <Toggle size='sm' pressed={editor.isActive("listItem")} onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}>
        <ListNumbers className='h-4 w-4' />
      </Toggle>
      <Toggle size='sm' pressed={editor.isActive("horizontalRule")} onPressedChange={() => editor.chain().focus().setHorizontalRule().run()}>
        <Minus className='h-4 w-4' />
      </Toggle>
      <Toggle size='sm' pressed={editor.isActive("horizontalRule")} onPressedChange={() => editor.chain().focus().setColumns(2, true).run()}>
        <ColumnsPlusRight className='h-4 w-4' />
      </Toggle>
      <button
        className="border-r px-2 py-1 last:border-none text-accent-6 hover:bg-accent-2 active:bg-accent-3"
      >

        <div className="flex items-center gap-1">
          <label htmlFor="lineHeight"><MdFormatLineSpacing /></label>
          <select
            id="lineHeight"
            className="w-18 text-sm"
            value={parseFloat(editor.getAttributes('textStyle').lineHeight)}
            onChange={(e) => {
              e.preventDefault()
              editor.chain().focus().setLineHeight(+e.target.value).run()
            }
            }>
            <option value={0.5}>0.5rem</option>
            <option value={1.0}>1.0rem</option>
            <option value={1.5}>1.5rem</option>
            <option value={2.0}>2.0rem</option>
            <option value={2.5}>2.5rem</option>
            <option value={3.0}>3.0rem</option>
            <option value={3.5}>3.5rem</option>
            <option value={4.0}>4.0rem</option>
          </select>
        </div>
      </button>
      <button
        className="border-r px-2 py-1 last:border-none text-accent-6 hover:bg-accent-2 active:bg-accent-3"
      >

        <div className="flex items-center gap-1">
          <label htmlFor="fontSize"><MdFormatSize /></label>
          <select
            id="fontSize"
            className="w-18 text-sm"
            value={parseFloat(editor.getAttributes('textStyle').fontSize)}
            onChange={(e) => {
              e.preventDefault()
              editor.chain().focus().setFontSize(+e.target.value).run()
            }}>
            <option value={0.5}>0.5rem</option>
            <option value={1.0}>1.0rem</option>
            <option value={1.5}>1.5rem</option>
            <option value={2.0}>2.0rem</option>
            <option value={2.5}>2.5rem</option>
            <option value={3.0}>3.0rem</option>
            <option value={3.5}>3.5rem</option>
            <option value={4.0}>4.0rem</option>
          </select>
        </div>
      </button>
    </div>
  );
}